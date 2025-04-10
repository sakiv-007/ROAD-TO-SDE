// This script creates the necessary directories and placeholder files for the chess pieces
// Run this with Node.js: node create-assets.js

const fs = require('fs');
const path = require('path');

// Create directories
const directories = [
    'assets',
    'assets/images',
    'assets/images/pieces',
    'css',
    'js'
];

directories.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
        console.log(`Created directory: ${dirPath}`);
    }
});

// Create placeholder SVG files for chess pieces
const pieces = ['pawn', 'rook', 'knight', 'bishop', 'queen', 'king'];
const colors = ['white', 'black'];

colors.forEach(color => {
    pieces.forEach(piece => {
        const fileName = `${color}-${piece}.svg`;
        const filePath = path.join(__dirname, 'assets', 'images', 'pieces', fileName);
        
        // Simple SVG placeholder
        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">
            <circle cx="22.5" cy="22.5" r="20" fill="${color === 'white' ? '#fff' : '#000'}" stroke="#000" stroke-width="1.5"/>
            <text x="22.5" y="27.5" font-size="12" text-anchor="middle" fill="${color === 'white' ? '#000' : '#fff'}">${piece.charAt(0).toUpperCase()}</text>
        </svg>`;
        
        fs.writeFileSync(filePath, svgContent);
        console.log(`Created placeholder SVG: ${filePath}`);
    });
});

console.log('Asset creation complete. Replace the placeholder SVGs with proper chess piece designs.');