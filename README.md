# Lumina Code VS Code Theme Family

Lumina Code is a minimal, premium theme family for Visual Studio Code, presenting a curated palette of vibrant lavenders, teals, and soft periwinkle grays designed for high readability and visual comfort.

Additionally, this theme comes with **no italic styles**, providing a consistent, clean, and highly readable look.

## Theme Variants

Lumina Code provides four distinct variants to suit your workspace preferences:

1. **Lumina Code (Standard)**: The standard dark theme with a premium deep navy background (`#0b1326`).
2. **Lumina Code (Deep)**: A deeper dark theme featuring a midnight navy-black background (`#060e20`) for maximum contrast and coding comfort.
3. **Lumina Code (Lighter)**: A softer dark theme with a lighter slate-blue background (`#131b2e`) to reduce eye strain.
4. **Lumina Code Light**: A premium light theme with a clean, light periwinkle background (`#f8f9ff`) and dark navy text.

## Palette Details

The theme features the following color mappings:

### Dark Mappings
- **Keywords / Control Flow**: Vibrant Lavender (`#ddb7ff`)
- **Functions & Classes**: Vibrant Teal-Cyan (`#44e2cd`)
- **Strings**: Bright Cyan (`#62fae3`)
- **Errors**: Coral (`#ffb4ab`)
- **Operators / Types**: Lavender-Blue (`#c0c1ff`)

### Light Mappings
- **Keywords / Control Flow**: Deep Purple (`#6900b3`)
- **Functions & Classes**: Deep Teal (`#005047`)
- **Strings**: Midnight Teal (`#003731`)
- **Errors**: Dark Red (`#ba1a1a`)
- **Operators / Types**: Royal Blue (`#2f2ebe`)

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
