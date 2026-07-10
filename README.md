# Lumina Code VS Code Theme Family

Lumina Code is a minimal, premium theme family for Visual Studio Code. It keeps the Lumina palette's lavender, teal, and periwinkle character, but uses calmer dark surfaces and restrained accents for comfortable long coding sessions.

Additionally, this theme comes with **no italic styles**, providing a consistent, clean, and highly readable look.

## Theme Variants

Lumina Code provides four distinct variants to suit your workspace preferences:

1. **Lumina Code (Standard)**: A balanced blue-black workspace (`#1b1e28`).
2. **Lumina Code (Deep)**: A quieter, deeper workspace (`#151821`).
3. **Lumina Code (Lighter)**: A soft slate workspace (`#222634`) for brighter surroundings.
4. **Lumina Code Light**: A low-glare warm-periwinkle workspace (`#f5f4f8`).

## Palette Details

The theme features the following color mappings:

### Dark Mappings
- **Keywords / Control Flow**: Soft Lavender (`#c9b8e8`)
- **Functions & Classes**: Muted Teal (`#89c8c0`)
- **Strings**: Gentle Mint (`#9dcdc3`)
- **Errors**: Soft Coral (`#d98b85`)
- **Operators / Types**: Periwinkle (`#aeb5d8`)

### Light Mappings
- **Keywords / Control Flow**: Muted Purple (`#704f9a`)
- **Functions & Classes**: Balanced Teal (`#316c68`)
- **Strings**: Deep Teal (`#285451`)
- **Errors**: Muted Red (`#b55d5a`)
- **Operators / Types**: Slate Indigo (`#48465f`)

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
