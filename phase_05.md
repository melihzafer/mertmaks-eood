# Phase 05: Frontend-Only Features

Implement the following Frontend-Only features in the MERTMAX Showpiece:

Smart Interactive Map:

On the /contact page, implement a react-leaflet map with custom pins for the three store locations (Grocery, Industrial, Construction).

The map component must read the client's current time (new Date()).

It must compare this time against a hardcoded JavaScript object containing the weekly opening hours for each store.

Dynamically display a status badge (e.g., "Open", "Closed", "Closing Soon") for each map pin.

Live Distance Calculator:

On the /contact page (near the map), implement a function using the Geolocation API.

It must calculate and dynamically display the real-time distance (in meters/kilometers) between the user's current location and the three hardcoded MERTMAX GPS coordinates.

Include a prominent "Check My Distance" button to trigger the permission request.

True 3D Prism Cards:

Apply a subtle 3D tilt effect (roll/pitch) to the main sector cards on the Homepage.

This effect must be driven by the Device Orientation API on mobile (gyroscope data) and by mouse movement on desktop.

Use framer-motion for smooth, physics-based transitions.

Scroll-Telling History Timeline:

In the /about section, design the company history (2005, 2010, etc.) as a vertical timeline.

Use the Intersection Observer API combined with framer-motion to animate (e.g., fade-in, slide-up) and highlight each historical event only when it becomes visible during scrolling.
