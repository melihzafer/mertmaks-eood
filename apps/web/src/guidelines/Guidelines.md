MERTMAX EOOD: The Digital Flagship Blueprint

Mission: To create an "Intelligence Amplifier" for the brand—a site that is predictive, inspiring, and technically elite.

Phase 0: Foundation & Core Identity

This phase establishes the non-negotiable rules for the project's aesthetic and technical foundation.

1. The Vibe

"Premium Local": It should feel as high-quality as a global brand, but be deeply rooted in the local Samuil community.

"Dynamic & Fluid": The site should feel alive. Motion is not an afterthought; it is a core part of the user experience.

"Trusted Hub": Clean, clear, and professional. The design must inspire trust.

2. The Tech Stack (as per your expertise)

Framework: Next.js (for performance, SSR, and API routes).

Styling: TailwindCSS (for rapid, utility-first development).

Animation: Framer Motion (This is critical for achieving the "cool UI/UX" you want. It integrates perfectly with React/Next.js).

Maps: react-leaflet or mapbox-gl-js (More customizable and modern than a simple Google Maps embed).

Backend (for Contact): Next.js API Routes or Firebase Functions (to process contact form submissions).

3. Core Visuals

Typography: Inter or Manrope. A clean, geometric, and highly-readable sans-serif.

Global Palette (The "Suit"):

Background: Off-white (#F9F9F9) or Light Gray (#F4F4F5).

Text/Primary: Near-black/Deep Charcoal (#1A1A1A).

Borders: Soft Gray (#E5E5E5).

Accent Palettes (The "Ties"):

Grocery: Vibrant Red (#E53E3E)

Industrial: Bright Pink/Magenta (#D53F8C)

Construction: Deep Blue (#3182CE) & Safety Yellow (#D69E2E)

Phase 1: The "Wow" Factor (The Homepage)

The goal is to capture attention in under 3 seconds. This is where we use "wallpapers" and "animations."

1. The Hero: "The Living Wallpaper"

Concept: A full-screen, high-quality, subtle video background. Not a fast-moving ad, but a slow, professional shot (e.g., a slow-motion shot of fresh produce, a close-up of building materials, a smooth pan over industrial goods).

Fallback: A high-resolution, professionally graded photograph for mobile or slow connections.

Text: A single, powerful headline: "MERTMAX: The Heart of Samuil." Fades in gracefully.

2. The "Prism Cards" (The Core Navigation)

Concept: Three large, interactive cards side-by-side representing the three stores. This is the primary "card" element.

Resting State: A beautiful, high-contrast image of the store/products. The store's name and its accent color are visible.

Animation (On Hover):

Lift & Shift: The card scales up (scale: 1.03) and gains a deeper shadow.

Color Bleed: A radial gradient of the card's accent color (Red, Pink, or Blue) "bleeds" out from the card, tinting the background of the hero section.

Text: An "Explore" link appears with a subtle motion.

Tech: framer-motion's whileHover prop with layoutId for smooth transitions.

Phase 2: The "Flow" (Division Pages & Transitions)

The transition from the hub (Homepage) to the spokes (Division Pages) must be seamless and reinforce the brand.

1. The "Color Wipe" Page Transition

Concept: When a user clicks a "Prism Card," the entire page transitions with an animation.

Animation: A full-screen "wipe" of the accent color (e.g., the Red) sweeps across the screen, revealing the new page (the Grocery Supermarket page).

Tech: framer-motion's <AnimatePresence> on the Next.js \_app.js component. This is the single coolest effect you can add.

2. Division Page Design

Hero: The accent color is now the primary theme. The navigation bar might have a solid background of this color.

Content:

A gallery of high-quality photos.

Key product categories (e.g., "Dairy," "Tools," "Home Goods") in smaller, animated cards.

Promotional banners (if any).

Phase 3: The "Utility" (Functions, Maps, Contact)

Making functional elements beautiful.

1. The Interactive Map

Concept: Don't just embed a static map. Use a custom-styled, interactive map.

UI: Use react-leaflet to display a clean, dark-themed or light-themed map.

Function:

Place three custom, color-coded pins on the map (Red, Pink, Blue/Yellow).

Clicking a pin opens a clean, custom pop-up (not the default Google Maps one) with the store's name, address, and a "Get Directions" button.

2. The Contact Form

Concept: A simple, elegant form that feels good to use.

UI:

Clean, full-width input fields with floating labels.

The "Submit" button should use the primary MERTMAX neutral color but have an animated hover state.

Function (The UX):

On submit, the button should disable and show a loading spinner.

On success, the button itself should transform into a "Success!" message with a checkmark.

Tech: Use a Next.js API route to send the form data (e.g., using Nodemailer) or save it to a /contacts collection in your Firebase Firestore database.

Phase 4: The "Polish" (Micro-interactions)

These are the tiny details that make the site feel "elite."

Scroll Animations: As the user scrolls down any page, elements (like text blocks, images) should fade in and slide up from the bottom. (Use framer-motion's useInView hook).

Button Hovers: All buttons should have a subtle, non-default hover effect (e.g., gradient shift, shadow increase, or icon movement).

Animated Links: Menu links should have an animated underline that "grows" from the center on hover.

Custom Loader: Use the MERTMAX logo (if one exists) or a simple, three-color pulsing animation (Red, Pink, Blue) as the page loader.