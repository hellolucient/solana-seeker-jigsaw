# Jigsaw Puzzle Game - Quick Start Guide

## 🎮 Getting Started

### Option 1: Open Directly in Browser
Simply open `index.html` in your web browser to start playing immediately.

### Option 2: Use Local Server (Recommended)
For the best experience, serve the files using a local web server:

**Using Python:**
```bash
python3 -m http.server 8000
```
Then open: http://localhost:8000/

**Using Node.js:**
```bash
npx serve
```

## 📋 Game Controls

### Main Interface
- **Settings (⚙️)** - Adjust difficulty, background, and rotation
- **Preview (🖼️)** - View the complete image
- **Shuffle (🔀)** - Randomize piece positions
- **Help (❓)** - Show help information
- **New Game** - Start with a different image
- **Show Solution** - Auto-solve the puzzle

### Difficulty Levels
- **42 pieces** - Easy
- **56 pieces** - Medium (default)
- **63 pieces** - Hard

### Playing
1. **Click** on the settings button to choose difficulty
2. **Select** an image from the image selection screen
3. **Drag** pieces from anywhere on the canvas
4. **Drop** pieces near their correct position to snap them in place
5. Complete the puzzle to see the celebration screen!

## 🖼️ Using Your Own Images

### Replace Placeholder Images
The game includes placeholder images. To use your own:

1. Save your images as:
   - `images/casino.jpg` (for the crypto casino scene)
   - `images/graveyard.jpg` (for the crypto graveyard scene)

2. Image recommendations:
   - Format: JPG or PNG
   - Size: 1920x1080 or higher
   - Aspect ratio: 16:9 works best
   - File size: Under 5MB for fast loading

### Generate New Placeholder Images
If you need to recreate the placeholder images:

```bash
python3 generate_placeholders.py
```

## ⚙️ Settings Options

### Size Tab
Choose between 42, 56, or 63 puzzle pieces

### Background Tab
- **Light** - White background (default)
- **Dark** - Dark gray background
- **Grid** - Grid pattern background

### Rotation Tab
Enable piece rotation for extra challenge (pieces will be randomly rotated)

## 📱 Mobile Support

The game is fully touch-enabled:
- **Tap and drag** to move pieces
- **Pinch to zoom** on the canvas (browser feature)
- Responsive layout adapts to screen size

## 🎯 Tips for Playing

1. **Start with corners and edges** - Traditional puzzle strategy works here too
2. **Use the preview button** - See the complete image anytime
3. **Try different backgrounds** - Find what works best for your eyes
4. **Snap distance is 20px** - Get pieces close to their correct position
5. **Enable rotation** for maximum challenge

## 🔧 Troubleshooting

### Images not loading?
- Make sure you're using a local server (not just opening the file)
- Check that images exist in the `images/` folder
- Verify image file names match: `casino.jpg` and `graveyard.jpg`

### Pieces not snapping?
- Get the piece within 20 pixels of the correct position
- If rotation is enabled, rotate the piece to 0° (use right-click or keyboard)
- Make sure the piece isn't already marked as "placed"

### Performance issues?
- Try a lower difficulty (fewer pieces)
- Use smaller images (under 2000px width)
- Close other browser tabs
- Update your browser to the latest version

## 🛠️ Customization

### Adding More Images
Edit `index.html` in the `#imageSelectModal` section:

```html
<div class="image-option" data-image="myimage">
    <img src="images/myimage.jpg" alt="My Image">
    <div class="image-label">My Custom Image</div>
</div>
```

Then add the corresponding image as `images/myimage.jpg`.

### Changing Difficulty Levels
Edit the `difficulty-option` divs in `index.html`:

```html
<div class="difficulty-option" data-pieces="100">
    <div class="piece-count">100</div>
    <div class="piece-label">pieces</div>
</div>
```

### Adjusting Snap Distance
Edit `script.js`:

```javascript
this.snapDistance = 20; // Change this value (in pixels)
```

## 🎨 Features Implemented

✅ Drag and drop puzzle pieces  
✅ Smart snapping when pieces are near correct position  
✅ Multiple difficulty levels  
✅ Piece rotation (optional)  
✅ Background customization  
✅ Image preview  
✅ Puzzle completion detection  
✅ Mobile touch support  
✅ Responsive design  
✅ Celebration screen on completion  

## 📝 File Structure

```
.
├── index.html                    # Main game interface
├── start.html                    # Welcome/landing page
├── setup.html                    # Setup guide
├── styles.css                    # All styles and animations
├── script.js                     # Game logic
├── package.json                  # Node.js dependencies (optional)
├── generate_placeholders.py      # Python image generator
├── generate-placeholders.js      # Node.js image generator
├── README.md                     # Project documentation
├── QUICKSTART.md                 # This file
└── images/
    ├── casino.jpg               # Placeholder casino image
    └── graveyard.jpg            # Placeholder graveyard image
```

## 🚀 Next Steps

1. Replace the placeholder images with your actual images
2. Open `index.html` or `start.html` in a browser
3. Start playing!

Enjoy your jigsaw puzzle game! 🧩
