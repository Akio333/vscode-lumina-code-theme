const fs = require('fs');
const path = require('path');

const themes = [
  'lumina-code-color-theme.json',
  'lumina-code-deep-color-theme.json',
  'lumina-code-lighter-color-theme.json',
  'lumina-code-light-color-theme.json'
];

let errors = 0;

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
    
    // Check for italics in tokenColors
    if (json.tokenColors && Array.isArray(json.tokenColors)) {
      const italics = json.tokenColors.filter(tc => 
        tc.settings && tc.settings.fontStyle && tc.settings.fontStyle.toLowerCase().includes('italic')
      );
      
      if (italics.length > 0) {
        console.error(`Error: Theme ${file} contains ${italics.length} italic fontStyles!`);
        errors++;
      } else {
        console.log(`Success: ${file} is valid and has no italic fontStyles.`);
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
