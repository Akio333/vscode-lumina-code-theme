const fs = require('fs');
const path = require('path');

const themes = [
  'lumina-code-color-theme.json',
  'lumina-code-deep-color-theme.json',
  'lumina-code-lighter-color-theme.json',
  'lumina-code-light-color-theme.json'
];

let errors = 0;

function contrastRatio(foreground, background) {
  const toRgb = hex => [1, 3, 5].map(offset => parseInt(hex.slice(offset, offset + 2), 16) / 255);
  const luminance = hex => toRgb(hex).map(channel => (
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  )).reduce((total, channel, index) => total + channel * [0.2126, 0.7152, 0.0722][index], 0);
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

themes.forEach(file => {
  const filePath = path.join(__dirname, '../themes', file);
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File ${file} does not exist!`);
      errors++;
      return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(content);
    const editorContrast = contrastRatio(json.colors['editor.foreground'], json.colors['editor.background']);

    if (editorContrast < 7) {
      console.error(`Error: Theme ${file} editor text contrast is ${editorContrast.toFixed(2)}:1; expected at least 7:1.`);
      errors++;
    }
    
    // Check for italics in tokenColors
    if (json.tokenColors && Array.isArray(json.tokenColors)) {
      const italics = json.tokenColors.filter(tc => 
        tc.settings && tc.settings.fontStyle && tc.settings.fontStyle.toLowerCase().includes('italic')
      );
      
      if (italics.length > 0) {
        console.error(`Error: Theme ${file} contains ${italics.length} italic fontStyles!`);
        errors++;
      } else {
        console.log(`Success: ${file} is valid, has no italic fontStyles, and editor text contrast is ${editorContrast.toFixed(2)}:1.`);
      }
    } else {
      console.warn(`Warning: Theme ${file} has no tokenColors array.`);
    }
  } catch (e) {
    console.error(`Error: Failed to parse ${file}: ${e.message}`);
    errors++;
  }
});

if (errors > 0) {
  process.exit(1);
}
