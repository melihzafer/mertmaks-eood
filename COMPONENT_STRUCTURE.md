# Component Structure

This document describes the organized component structure of the Mertmaks EOOD website.

## Organization Principle

Components are organized into logical folders based on their primary function and usage pattern, rather than having a flat structure. This improves code maintainability, readability, and developer experience.

## Directory Structure

```
src/components/
├── layout/          # Layout and navigation components
├── pages/           # Page-specific components (rarely used - most pages use app/page.tsx)
├── features/        # Feature-specific components (forms, maps, etc.)
├── interactive/     # Interactive UI elements (cards, buttons, gestures)
├── three-d/         # 3D visualization components
├── ui/              # shadcn/ui base components (40+ files)
└── figma/           # Figma-related utilities
```

## Detailed Breakdown

### Layout Components (`/layout`)

**Purpose:** Core layout and navigation components used across all pages

- `Header.tsx` - Main navigation header with search functionality
- `Footer.tsx` - Site-wide footer
- `PageTransition.tsx` - Page transition animations
- `MobileNavIndicator.tsx` - Mobile navigation indicator

**Import pattern:**

```typescript
import { Header } from "@/components/layout/Header";
```

### Feature Components (`/features`)

**Purpose:** Self-contained feature implementations

- `ContactForm.tsx` - Contact form with validation
- `SmartSearch.tsx` - Smart search functionality
- `PromotionsSection.tsx` - Promotions display section
- `LeafletMap.tsx` - Leaflet map integration
- `StoreMap.tsx` - Store location map
- `StoreInfo.tsx` - Store information display

**Import pattern:**

```typescript
import { ContactForm } from "@/components/features/ContactForm";
```

### Interactive Components (`/interactive`)

**Purpose:** Interactive UI elements and animations

- `AnimatedIcon.tsx` - Animated icon component
- `AudioFeedback.tsx` - Audio feedback component
- `GestureHint.tsx` - Gesture hint display
- `GestureWrapper.tsx` - Gesture interaction wrapper
- `DivisionCard.tsx` - Division card component
- `PrismCard.tsx` - Prism-styled card component
- `WebARButton.tsx` - Web AR activation button

**Import pattern:**

```typescript
import { DivisionCard } from "@/components/interactive/DivisionCard";
```

### 3D Components (`/three-d`)

**Purpose:** Three.js and 3D visualization components

- `ThreeDShowcase.tsx` - Main 3D showcase component
- `ThreeDShowcaseWrapper.tsx` - 3D showcase wrapper
- `PerformanceDetector.tsx` - Performance detection for 3D

**Import pattern:**

```typescript
import { ThreeDShowcase } from "@/components/three-d/ThreeDShowcase";
```

### Page Components (`/pages`)

**Purpose:** Full page components (note: most pages use app directory structure)

- `HomePage.tsx` - Home page component
- `ContactPage.tsx` - Contact page component
- `ConstructionPage.tsx` - Construction store page
- `GroceryPage.tsx` - Grocery store page
- `IndustrialPage.tsx` - Industrial store page
- `SamuilHubPage.tsx` - Samuil Hub page

**Note:** These components exist but are rarely imported directly since the app uses Next.js 15 App Router with page.tsx files in the app directory.

### UI Components (`/ui`)

**Purpose:** shadcn/ui base components (pre-existing, not reorganized)

40+ base UI components including Button, Card, Dialog, Input, etc.

**Import pattern:**

```typescript
import { Button } from "@/components/ui/button";
```

### Figma Components (`/figma`)

**Purpose:** Figma-related utilities (pre-existing, not reorganized)

- `ImageWithFallback.tsx` - Image component with fallback

## Migration Notes

### Updated Imports

All imports were updated from the flat structure to the new organized structure:

**Before:**

```typescript
import { DivisionCard } from "@/components/DivisionCard";
import { WebARButton } from "@/components/WebARButton";
```

**After:**

```typescript
import { DivisionCard } from "@/components/interactive/DivisionCard";
import { WebARButton } from "@/components/interactive/WebARButton";
```

### Relative Imports

Components within each folder use relative imports to access shared UI components:

```typescript
// In features/ContactForm.tsx
import { Button } from "../ui/button";
import { Input } from "../ui/input";
```

## Benefits

1. **Better Code Organization** - Components are grouped by function, making them easier to find
2. **Improved Maintainability** - Related components are co-located
3. **Clearer Intent** - Folder names indicate component purpose
4. **Easier Onboarding** - New developers can understand the structure quickly
5. **Scalability** - Easy to add new components to appropriate categories

## Future Considerations

### Optional: Barrel Exports

Consider adding `index.ts` files to each folder for cleaner imports:

```typescript
// src/components/layout/index.ts
export { Header } from "./Header";
export { Footer } from "./Footer";
export { PageTransition } from "./PageTransition";
export { MobileNavIndicator } from "./MobileNavIndicator";
```

This would enable:

```typescript
import { Header, Footer } from "@/components/layout";
```

### Optional: Component Documentation

Add JSDoc comments to each component for better IDE support and documentation generation.

---

**Last Updated:** January 2025
**Next.js Version:** 15.5.6
**Total Components Organized:** 26 files
