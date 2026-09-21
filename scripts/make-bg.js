const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'public', 'landscape', 'index2.html');
const destPath = path.join(__dirname, '..', 'public', 'landscape', 'background.html');

const html = fs.readFileSync(srcPath, 'utf8');
const vertexMatch = html.match(/<script id="custom-vertex"[\s\S]*?<\/script>/);
const fragmentMatch = html.match(/<script id="custom-fragment"[\s\S]*?<\/script>/);

if (!vertexMatch || !fragmentMatch) {
  console.error('Shaders not found');
  process.exit(1);
}

const bgHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>3D Interactive Landscape</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 100%; height: 100%; overflow: hidden; background: #060606; }
      canvas.landscape { width: 100vw; height: 100vh; display: block; position: fixed; top: 0; left: 0; z-index: 1; }
    </style>
  </head>
  <body>
    <canvas class="landscape"></canvas>
    ${vertexMatch[0]}
    ${fragmentMatch[0]}
    <script src="js/vendor/three.min.js"></script>
    <script src="js/vendor/Sky.js"></script>
    <script src="js/vendor/hammer.min.js"></script>
    <script src="js/vendor/charming.min.js"></script>
    <script src="js/vendor/TweenMax.min.js"></script>
    <script src="js/demo2.js"></script>
  </body>
</html>`;

fs.writeFileSync(destPath, bgHtml, 'utf8');
console.log('Successfully generated', destPath);
