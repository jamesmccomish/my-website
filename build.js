import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { marked } from 'marked';

// Process HTML and Markdown files in the pages directory
const pagesDir = './pages/**/*.html';
const componentsDir = './components';
const contentDir = './content';
const outputDir = './public';
const libDir = path.join(outputDir, 'lib');

// Ensure output directories exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

// Create a directory for pre-processed content
const processedContentDir = path.join(outputDir, 'content');
if (!fs.existsSync(processedContentDir)) {
  fs.mkdirSync(processedContentDir, { recursive: true });
}

// Read component files
console.log("Reading components...");
const headContent = fs.readFileSync(path.join(componentsDir, 'head.html'), 'utf8');

// Process all Markdown files
console.log("Processing Markdown files...");
const markdownFiles = glob.sync(`${contentDir}/**/*.md`);

markdownFiles.forEach(file => {
  console.log(`- Processing Markdown: ${file}...`);
  const markdownText = fs.readFileSync(file, 'utf8');
  const htmlContent = marked.parse(markdownText);
  
  const relativePath = path.relative(contentDir, file);
  const outputPath = path.join(processedContentDir, relativePath.replace('.md', '.html'));
  
  // Ensure the output directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  
  // Write processed markdown as HTML
  fs.writeFileSync(outputPath, htmlContent);
});

// Process all HTML files
console.log("Processing HTML files...");
const files = glob.sync(pagesDir);

files.forEach(file => {
  console.log(`- Processing HTML: ${file}...`);
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace head placeholder with actual head content
  content = content.replace(/<head id="head-content"><\/head>/, headContent);
  
  // Process Markdown inclusions at build time
  const markdownRegex = /<div[^>]*data-markdown-src=["']([^"']+)["'][^>]*><\/div>/g;
  content = content.replace(markdownRegex, (match, markdownPath) => {
    // Convert content path to the processed html path
    const processedPath = markdownPath.replace('../../content/', '');
    const htmlPath = path.join(processedContentDir, processedPath.replace('.md', '.html'));
    
    try {
      if (fs.existsSync(htmlPath)) {
        return `<div class="markdown-content">${fs.readFileSync(htmlPath, 'utf8')}</div>`;
      } else {
        console.warn(`Warning: Markdown file not found at ${htmlPath}`);
        return `<div class="markdown-content"><p>Error: Markdown content not found.</p></div>`;
      }
    } catch (error) {
      console.error(`Error processing markdown inclusion: ${error.message}`);
      return `<div class="markdown-content"><p>Error processing content: ${error.message}</p></div>`;
    }
  });
  
  const relativePath = path.relative('./pages', file);
  const outputPath = path.join(outputDir, relativePath);
  
  // Ensure the output directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  
  // Write processed file to output directory
  fs.writeFileSync(outputPath, content);
});

// Copy CSS files
fs.cpSync('./css', path.join(outputDir, 'css'), { recursive: true });

// Copy components for runtime loading (only needed if not fully pre-processed)
fs.cpSync('./components', path.join(outputDir, 'components'), { recursive: true });

console.log('\nBuild complete!'); 