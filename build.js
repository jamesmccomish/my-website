import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { marked } from 'marked';

const pagesDir = './pages/**/*.html';
const componentsDir = './components';
const contentDir = './content';
const outputDir = './public';

// Ensure output directories exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
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

  let markdownText = fs.readFileSync(file, 'utf8');

  // Update image references to point to the new /images path
  const dirName = path.dirname(file).replace(contentDir, '');
  markdownText = markdownText.replace(
    /<img\s+src="([^"]+)"/g,
    (match, src) => {
      const depth = dirName.split('/').filter(Boolean).length;
      const upLevels = '../'.repeat(depth + 1);
      return `<img src="${upLevels}${dirName}/${src}"`;
    }
  );
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

  // Special handling for the reading table
  if (file.includes('reading.html')) {
    console.log("Processing reading CSV file...");
    try {
      const csvPath = path.join(contentDir, 'reading', 'reading.csv');
      if (fs.existsSync(csvPath)) {
        const csvData = fs.readFileSync(csvPath, 'utf8');
        const rows = csvData.split('\n');

        let tableRows = '';

        // Process rows starting from index 1 to skip header
        for (let i = 1; i < rows.length; i++) {
          if (!rows[i].trim()) continue;

          // Parse CSV properly handling quoted values
          const values = [];
          let insideQuotes = false;
          let currentValue = '';

          for (let char of rows[i]) {
            if (char === '"') {
              insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
              values.push(currentValue);
              currentValue = '';
            } else {
              currentValue += char;
            }
          }
          values.push(currentValue);

          // Clean values of quotes
          const cleanValues = values.map(value => value.replace(/^"|"$/g, ''));

          // Create table row
          tableRows += '<tr>';
          cleanValues.forEach(value => {
            tableRows += `<td>${value}</td>`;
          });
          tableRows += '</tr>\n';
        }

        // Replace placeholder with generated rows
        content = content.replace(/<tbody id="table-body">\s*<!-- Will be populated at build time -->\s*<\/tbody>/s,
          `<tbody id="table-body">\n${tableRows}</tbody>`);
      }
    } catch (error) {
      console.error(`Error processing reading CSV: ${error.message}`);
    }
  }

  const relativePath = path.relative('./pages', file);
  const outputPath = path.join(outputDir, relativePath);

  // Ensure the output directory exists and write the processed file
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content);
});

// Copy CSS files
console.log("Copying CSS files...");
fs.cpSync('./css', path.join(outputDir, 'css'), { recursive: true });

// Copy components for runtime loading (only needed if not fully pre-processed)
console.log("Copying components...");
fs.cpSync('./components', path.join(outputDir, 'components'), { recursive: true });

// Copy image files from content directory
console.log("Copying image files...");
const imageExtensions = ['.jpg'];
const imageFiles = glob.sync(`${contentDir}/**/*.*`).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return imageExtensions.includes(ext);
});
console.log(`Found ${imageFiles.length} images to copy`);

// Copy avatar
fs.copyFileSync('./avatar.png', path.join(outputDir, 'avatar.png'));

// Copy the favicon
fs.copyFileSync('./favicon.ico', path.join(outputDir, 'favicon.ico'));

// Copy .well-known directory for Farcaster manifest
if (fs.existsSync('./pages/.well-known')) {
  console.log("Copying .well-known directory...");
  fs.cpSync('./pages/.well-known', path.join(outputDir, '.well-known'), { recursive: true });
}

// Copy each image to the public directory maintaining the same structure
imageFiles.forEach(file => {
  const relativePath = path.relative(contentDir, file);
  // Copy to public/content/[path] to maintain original structure
  const outputPath = path.join(outputDir, 'content', relativePath);

  // Ensure the output directory exists and copy
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.copyFileSync(file, outputPath);
});

console.log('\nBuild complete!'); 