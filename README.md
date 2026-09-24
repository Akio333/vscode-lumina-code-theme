# Lumina Code VS Code Theme Family

Lumina Code is a minimal, premium theme family for Visual Studio Code with deep navy surfaces and a balanced palette of softened violet, teal, mint, indigo, blue-gray, and coral accents. It is designed for clear semantic hierarchy, comfortable contrast, and reduced visual fatigue during long coding sessions.

High-chroma accents are restrained and reserved for meaningful syntax and state changes, while neutral code remains calm and readable. The result is a focused workspace that stays expressive without producing distracting neon glare.

Additionally, this theme comes with **no italic styles**, providing a consistent, clean, and highly readable look.

## Theme Variants

Lumina Code provides four distinct variants to suit your workspace preferences:

1. **Lumina Code (Standard)**: The balanced deep-space surface (`#0b1326`).
2. **Lumina Code (Deep)**: The lowest, quietest surface tier (`#060e20`).
3. **Lumina Code (Dim)**: A raised navy surface (`#171f33`) for brighter surroundings. Formerly named "Lighter"; existing settings keep working.
4. **Lumina Code Light**: A low-glare violet-slate workspace (`#f6f4f9`).

## Palette Details

Each hue has one job, so a glance at the color tells you what a token is.

| Role | Dark | Light |
|---|---|---|
| Default code, punctuation | `#aeb9d2` | `#45506a` |
| Variables, parameters, properties | `#dae2fd` | `#303244` |
| Keywords and storage (`if`, `return`, `const`, `import`) | `#c6a5e3` | `#78519c` |
| Function and method declarations | `#aeb0e8` | `#3d63a6` |
| Function calls | `#dae2fd` at 80% | `#303244` at 80% |
| Types, classes, interfaces | `#aeb9d2` at 75% | `#5d6880` |
| Strings, numbers, booleans, regular expressions | `#85c9bd` | `#26766d` |
| Built-ins, `this`, tags, decorators, links | `#72c7bc` | `#1d6a86` |
| Operators, attributes | `#98a4d6` | `#4e527d` |
| `null`, `undefined`, errors, destructive keywords | `#d98986` | `#a5525a` |
| Comments | `#7b86a0` at 70% | `#6c778e` |

Source control and the terminal follow the same mapping: added and green are mint, modified and blue are lavender, deleted and red are coral.

Semantic highlighting is enabled and uses the same colors as the TextMate rules, so tokens don't change color once a language server loads.

## No Italics

Designed specifically for developers who prefer clean and stable typography, no semantic element or comment will be rendered with italics in any of the variants.

## Installation

You can install **Lumina Code** through the official marketplaces:

<a href="https://marketplace.visualstudio.com/items?itemName=Akio333.lumina-code">
  <img src="https://img.shields.io/badge/VS%20Code%20Marketplace-Install-blue?style=for-the-badge&logo=visual-studio-code&logoColor=white&color=007ACC" alt="VS Code Marketplace" />
</a>
<a href="https://open-vsx.org/extension/Akio333/lumina-code">
  <img src="https://img.shields.io/badge/Open%20VSX%20Registry-Install-orange?style=for-the-badge&logo=open-vsx&logoColor=white&color=F68536" alt="Open VSX Registry" />
</a>

### Manual Installation
You can download the pre-packaged `.vsix` file from the [latest release assets](https://github.com/Akio333/vscode-lumina-code-theme/releases/latest) and install it manually.

### Build from Source
If you prefer to build the extension yourself:
1. Clone the repository:
   ```bash
   git clone https://github.com/Akio333/vscode-lumina-code-theme.git
   cd vscode-lumina-code-theme
   ```
2. Install the package dependencies:
   ```bash
   npm install
   ```
3. Package the extension into a `.vsix` file:
   ```bash
   npm run package
   ```
4. Install the generated `.vsix` file:
   - In VS Code, open the Extensions sidebar (`Cmd+Shift+X` or `Ctrl+Shift+X`).
   - Click the `...` menu button in the top-right corner of the sidebar.
   - Select **Install from VSIX...** and select the built `lumina-code-*.vsix` file.

## Editing the Theme

The files in `themes/` are generated. Change colors in `scripts/build.js`, then run:

```bash
npm run build
npm run validate
```

`validate` fails if a generated file is out of date, a token falls below WCAG contrast (4.5:1 for code, 3:1 for comments), a selector can never match, or a key UI state is invisible.

## License

This project is licensed under the [MIT License](LICENSE).
