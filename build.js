import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Process HTML and Markdown files in the pages directory
const pagesDir = './pages/**/*.html';
const componentsDir = './components';
const outputDir = './public';
const libDir = path.join(outputDir, 'lib');

// Ensure output directories exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

// Read component files
console.log("Reading components...");
const headContent = fs.readFileSync(path.join(componentsDir, 'head.html'), 'utf8');

// Process all HTML and Markdown files
console.log("Processing files...");
const files = glob.sync(pagesDir);

files.forEach(file => {
  console.log(`- Processing ${file}...`);
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace head placeholder with actual head content
  content = content.replace(/<head id="head-content"><\/head>/, headContent);
  
  const relativePath = path.relative('./pages', file);
  const outputPath = path.join(outputDir, relativePath);
  
  // Ensure the output directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  
  // Write processed file to output directory
  fs.writeFileSync(outputPath, content);
});

// Copy CSS files
fs.cpSync('./css', path.join(outputDir, 'css'), { recursive: true });

// Copy scripts
fs.cpSync('./scripts', path.join(outputDir, 'scripts'), { recursive: true });

console.log('\nBuild complete!'); 