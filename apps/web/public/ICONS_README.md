# PWA Icon Placeholders

This directory should contain the following PWA icons:

## Required Icons
- **icon-192x192.png**: 192x192px app icon (for home screen, app list)
- **icon-512x512.png**: 512x512px app icon (for splash screen, high-res displays)

## Optional (for better PWA experience)
- **screenshot-mobile.png**: 390x844px screenshot showcasing the mobile app
- **screenshot-desktop.png**: 1920x1080px screenshot showcasing the desktop experience

## Design Guidelines
- Use the Мертмакс brand colors (grocery red #E53E3E, industrial magenta #D53F8C, construction blue #3182CE)
- Icons should be simple, recognizable at small sizes
- Include the company logo or stylized "M" mark
- Background should be solid color or simple gradient
- Ensure icons work well on both light and dark backgrounds (use "maskable" format)

## How to Generate
1. Create designs in Figma/Illustrator at 512x512px
2. Export at required sizes with proper padding (10% safe zone for maskable icons)
3. Optimize with tools like ImageOptim or Squoosh
4. Place files in `/public/` directory

## Current Status
✅ **Branded icons generated** - Branded icons generated dynamically from `mmaks-short.svg` using Playwright rendering and Pillow packaging.
- `/public/favicon.ico`: Multi-resolution favicon (16x16, 32x32, 48x48)
- `/public/icons/mmaks-short.svg`: Theme-aware SVG favicon supporting light (#E53E3E) and dark (#F7F5F2) modes
- `/public/icons/icon-192x192.png`: 192x192px app icon
- `/public/icons/icon-512x512.png`: 512x512px app icon
