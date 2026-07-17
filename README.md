# Lumina Code VS Code Theme Family

Lumina Code is a minimal, premium theme family for Visual Studio Code with deep navy surfaces and a balanced palette of softened violet, teal, mint, indigo, blue-gray, and coral accents. It is designed for clear semantic hierarchy, comfortable contrast, and reduced visual fatigue during long coding sessions.

High-chroma accents are restrained and reserved for meaningful syntax and state changes, while neutral code remains calm and readable. The result is a focused workspace that stays expressive without producing distracting neon glare.

Additionally, this theme comes with **no italic styles**, providing a consistent, clean, and highly readable look.

## Theme Variants

Lumina Code provides four distinct variants to suit your workspace preferences:

1. **Lumina Code (Standard)**: The balanced deep-space surface (`#0b1326`).
2. **Lumina Code (Deep)**: The lowest, quietest surface tier (`#060e20`).
3. **Lumina Code (Lighter)**: A raised navy surface (`#171f33`) for brighter surroundings.
4. **Lumina Code Light**: A low-glare violet-slate workspace (`#f6f4f9`).

## Palette Details

The theme features the following color mappings:

### Dark Mappings

- **Default code**: Soft blue-gray (`#aeb9d2`)
- **Keywords / Control Flow**: Eye-softened violet (`#c6a5e3`)
- **Functions / Imports**: Technical teal (`#72c7bc`)
- **Strings / Regular Expressions**: Gentle mint (`#85c9bd`)
- **Types / Operators**: Receding indigo (`#98a4d6`)
- **Errors / Destructive Semantics**: Soft coral (`#d98986`)

### Light Mappings

- **Keywords / Control Flow**: Muted purple (`#78519c`)
- **Functions / Strings**: Balanced teal (`#26766d`)
- **Errors**: Muted coral (`#ad5c62`)
- **Operators / Types**: Slate indigo (`#4e527d`)

Semantic highlighting is enabled so functions, types, properties, strings, numbers, and decorators keep the same hierarchy across languages that support semantic tokens.

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
## License

This project is licensed under the [MIT License](LICENSE).
