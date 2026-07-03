#!/usr/bin/env python3
"""
Generate placeholder images for the jigsaw puzzle game.
Replace these with your actual images for the best experience.
"""

from PIL import Image, ImageDraw, ImageFont
import os
import random

def generate_placeholder(filename, title, color1, color2):
    """Generate a placeholder image with gradient and text."""
    width, height = 1920, 1080
    
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    for y in range(height):
        ratio = y / height
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        draw.rectangle([(0, y), (width, y + 1)], fill=(r, g, b))
    
    for _ in range(50):
        x = random.randint(0, width)
        y = random.randint(0, height)
        radius = random.randint(20, 120)
        draw.ellipse(
            [(x - radius, y - radius), (x + radius, y + radius)],
            fill=(255, 255, 255, 25)
        )
    
    draw.rectangle([(0, height - 200), (width, height)], fill=(0, 0, 0, 128))
    
    try:
        font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 120)
        font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 48)
    except:
        try:
            font_large = ImageFont.truetype("arial.ttf", 120)
            font_small = ImageFont.truetype("arial.ttf", 48)
        except:
            font_large = ImageFont.load_default()
            font_small = ImageFont.load_default()
    
    text_bbox = draw.textbbox((0, 0), title, font=font_large)
    text_width = text_bbox[2] - text_bbox[0]
    text_x = (width - text_width) // 2
    text_y = height // 2 - 60
    
    draw.text((text_x, text_y), title, fill='white', font=font_large)
    
    subtitle = "Placeholder - Replace with actual image"
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=font_small)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = (width - subtitle_width) // 2
    subtitle_y = height // 2 + 60
    
    draw.text((subtitle_x, subtitle_y), subtitle, fill='white', font=font_small)
    
    os.makedirs('images', exist_ok=True)
    filepath = os.path.join('images', filename)
    img.save(filepath, 'JPEG', quality=90)
    print(f"Generated {filepath}")

if __name__ == '__main__':
    print("Generating placeholder images...")
    
    generate_placeholder('casino.jpg', 'CASINO', (102, 126, 234), (118, 75, 162))
    generate_placeholder('graveyard.jpg', 'GRAVEYARD', (67, 67, 67), (0, 0, 0))
    
    print("\nPlaceholder images generated successfully!")
    print("Replace these with your actual images in the images/ folder for the best experience.")
