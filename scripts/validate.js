const fs = require('fs');
const path = require('path');

const themes = [
  'lumina-code-color-theme.json',
  'lumina-code-deep-color-theme.json',
  'lumina-code-lighter-color-theme.json',
  'lumina-code-light-color-theme.json'
];

// Keys VS Code no longer reads; the replacement is noted for the error message.
const deprecatedKeys = {
  'editorInlineHint.foreground': 'editorInlayHint.foreground',
  'editorInlineHint.background': 'editorInlayHint.background',
  'editorIndentGuide.background': 'editorIndentGuide.background1',
  'editorIndentGuide.activeBackground': 'editorIndentGuide.activeBackground1'
};

// UI states that must be visibly different from the editor background (CIE76 ΔE).
const visibleStates = {
  'editor.selectionBackground': 12,
  'editor.lineHighlightBackground': 4,
  'editorSuggestWidget.selectedBackground': 4,
  'quickInputList.focusBackground': 4,
  'list.activeSelectionBackground': 4,
  'scrollbarSlider.background': 4,
  'editorGroup.border': 2,
  'diffEditor.insertedTextBackground': 6,
  'diffEditor.removedTextBackground': 6
};

const HEX = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

let errors = 0;
const fail = message => {
  console.error(`Error: ${message}`);
  errors++;
};

const toRgba = hex => {
  const full = hex.length <= 5 ? `#${[...hex.slice(1)].map(c => c + c).join('')}` : hex;
  const channels = [1, 3, 5].map(offset => parseInt(full.slice(offset, offset + 2), 16));
  const alpha = full.length === 9 ? parseInt(full.slice(7, 9), 16) / 255 : 1;
  return { channels, alpha };
};

// Blend a possibly translucent color over an opaque background.
function composite(foreground, background) {
  const fg = toRgba(foreground);
  const bg = toRgba(background);
  const mixed = fg.channels.map((channel, i) => Math.round(channel * fg.alpha + bg.channels[i] * (1 - fg.alpha)));
  return `#${mixed.map(channel => channel.toString(16).padStart(2, '0')).join('')}`;
}

const linear = hex => toRgba(hex).channels.map(channel => {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
});

function contrastRatio(foreground, background) {
  const luminance = hex => linear(hex).reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0);
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

function deltaE(first, second) {
  const lab = hex => {
    const [r, g, b] = linear(hex);
    const f = t => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
    const x = f((r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047);
    const y = f(r * 0.2126 + g * 0.7152 + b * 0.0722);
    const z = f((r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883);
    return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
  };
  const [p, q] = [lab(first), lab(second)];
  return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
}

// VS Code theme selectors only support space-separated descendant scopes (and `>`),
// so exclusion (` - `), alternation (`|`), wildcards and capitals never match.
function invalidSelector(scope) {
  return / - |\||\*|[A-Z]|,/.test(scope);
}

themes.forEach(file => {
  const filePath = path.join(__dirname, '../themes', file);
  let json;
  try {
    json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    fail(`Failed to read ${file}: ${e.message}`);
    return;
  }

  const background = json.colors['editor.background'];

  for (const [key, value] of Object.entries(json.colors)) {
    if (!HEX.test(value)) fail(`${file} ${key} has invalid color ${value}.`);
    if (deprecatedKeys[key]) fail(`${file} uses ${key}; use ${deprecatedKeys[key]}.`);
  }

  const editorContrast = contrastRatio(json.colors['editor.foreground'], background);
  if (editorContrast < 7) {
    fail(`${file} editor text contrast is ${editorContrast.toFixed(2)}:1; expected at least 7:1.`);
  }

  for (const [key, minimum] of Object.entries(visibleStates)) {
    const value = json.colors[key];
    if (!value) {
      fail(`${file} is missing ${key}.`);
      continue;
    }
    const difference = deltaE(composite(value, background), background);
    if (difference < minimum) {
      fail(`${file} ${key} is barely visible (ΔE ${difference.toFixed(1)}, expected ${minimum}+).`);
    }
  }

  const seen = new Map();
  (json.tokenColors || []).forEach((rule, index) => {
    const scopes = Array.isArray(rule.scope) ? rule.scope : String(rule.scope || '').split(',').map(s => s.trim());
    const { foreground, fontStyle } = rule.settings || {};

    if (fontStyle && fontStyle.toLowerCase().includes('italic')) {
      fail(`${file} rule ${index} uses an italic fontStyle.`);
    }

    scopes.forEach(scope => {
      if (invalidSelector(scope)) fail(`${file} rule ${index} has a selector VS Code cannot match: "${scope}".`);
      if (seen.has(scope)) fail(`${file} scope "${scope}" is defined in rules ${seen.get(scope)} and ${index}.`);
      seen.set(scope, index);
    });

    if (foreground) {
      if (!HEX.test(foreground)) {
        fail(`${file} rule ${index} has invalid color ${foreground}.`);
        return;
      }
      const isComment = scopes.some(scope => scope.startsWith('comment') || scope.startsWith('punctuation.definition.comment'));
      const minimum = isComment ? 3 : 4.5;
      const ratio = contrastRatio(composite(foreground, background), background);
      if (ratio < minimum) {
        fail(`${file} "${scopes[0]}" contrast is ${ratio.toFixed(2)}:1; expected at least ${minimum}:1.`);
      }
    }
  });

  for (const [token, value] of Object.entries(json.semanticTokenColors || {})) {
    const foreground = typeof value === 'string' ? value : value.foreground;
    if (!foreground) continue;
    const minimum = token === 'comment' ? 3 : 4.5;
    const ratio = contrastRatio(composite(foreground, background), background);
    if (ratio < minimum) fail(`${file} semantic token "${token}" contrast is ${ratio.toFixed(2)}:1.`);
  }

  if (errors === 0) {
    console.log(`Success: ${file} passes (editor text contrast ${editorContrast.toFixed(2)}:1).`);
  }
});

if (errors > 0) {
  process.exit(1);
}
