const fs = require('fs');
const path = require('path');

const canvas = require('canvas');
const { createCanvas } = canvas;

function generatePlaceholderImage(filename, title, color1, color2) {
    const width = 1920;
    const height = 1080;
    const canvasImg = createCanvas(width, height);
    const ctx = canvasImg.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 100 + 20;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, height - 200, width, 200);
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 120px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(title, width / 2, height / 2);
    
    ctx.font = '48px Arial';
    ctx.fillText('Placeholder - Replace with actual image', width / 2, height / 2 + 100);
    
    const buffer = canvasImg.toBuffer('image/jpeg', { quality: 0.9 });
    fs.writeFileSync(path.join(__dirname, 'images', filename), buffer);
    console.log(`Generated ${filename}`);
}

if (!fs.existsSync('images')) {
    fs.mkdirSync('images');
}

generatePlaceholderImage('casino.jpg', '🎰 CASINO', '#667eea', '#764ba2');
generatePlaceholderImage('graveyard.jpg', '🪦 GRAVEYARD', '#434343', '#000000');

console.log('Placeholder images generated successfully!');
console.log('Replace these with your actual images for the best experience.');
