# Jigsaw Puzzle Game

A fully functional web-based jigsaw puzzle game with modern UI and interactive features.

## Features

- **Multiple Difficulty Levels**: Choose between 42, 56, or 63 puzzle pieces
- **Drag & Drop Interface**: Smooth piece movement with mouse and touch support
- **Smart Snapping**: Pieces automatically snap into place when positioned correctly
- **Puzzle Rotation**: Optional piece rotation for added challenge
- **Background Options**: Light, dark, or grid backgrounds
- **Image Preview**: View the complete image while solving
- **Puzzle Completion Detection**: Celebration screen when puzzle is completed
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

1. Open `index.html` in a web browser
2. Select an image from the image selection screen
3. Adjust settings (piece count, background, rotation) via the settings button (⚙️)
4. Drag and drop pieces to solve the puzzle
5. Pieces will snap into place when positioned correctly

## Controls

- **Settings (⚙️)**: Adjust difficulty, background, and rotation settings
- **Preview (🖼️)**: View the complete image
- **Shuffle (🔀)**: Randomize piece positions
- **Help (❓)**: Show help information
- **New Game**: Start a new puzzle with a different image
- **Show Solution**: Automatically solve the puzzle

## Adding Custom Images

To add your own puzzle images:

1. Place your images in the `images/` directory
2. Images should be named: `casino.jpg` and `graveyard.jpg` (or update the code to use different names)
3. Recommended image size: 1920x1080 or similar high-resolution images
4. Supported formats: JPG, PNG

## Technical Details

- Pure HTML5, CSS3, and JavaScript (no dependencies)
- Canvas-based rendering for smooth performance
- Touch-friendly for mobile devices
- Responsive design adapts to different screen sizes

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Setup Instructions

### Adding the Two Scene Images

The user mentioned two scenes for the puzzle images. To add them:

1. Save the "Crypto Casino" image as `images/casino.jpg`
2. Save the "Crypto Graveyard" image as `images/graveyard.jpg`

These images should be the actual photos you want to use for the puzzles.

## Customization

### Changing Difficulty Levels

Edit the difficulty options in `index.html`:
```html
<div class="difficulty-option" data-pieces="42">
```

### Modifying Snap Distance

Adjust the `snapDistance` property in `script.js`:
```javascript
this.snapDistance = 20; // pixels
```

### Adding More Images

1. Add images to the `images/` directory
2. Add a new image option in the `#imageSelectModal` section of `index.html`
3. Update the event listener in `script.js`

## License

Free to use and modify for personal and commercial projects.
