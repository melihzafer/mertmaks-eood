# Tailwind Utility Classes - SCSS Implementation

## Overview

All Tailwind utility classes have been manually defined in separate SCSS files and imported into the project. This gives you full control over the available classes and avoids IntelliSense issues.

## File Structure

```
src/styles/utilities/
├── index.scss          # Main import file
├── spacing.scss        # Width, Height, Margin, Padding, Gap
├── layout.scss         # Display, Position, Flexbox, Grid
├── typography.scss     # Font Size, Weight, Text Styles
├── colors.scss         # Text, Background, Border Colors
├── borders.scss        # Border Width, Radius, Style
├── effects.scss        # Shadows, Transitions, Transforms
├── responsive.scss     # Breakpoint utilities (sm, md, lg, xl, 2xl)
└── interactivity.scss  # Hover, Focus, Active states
```

## Available Classes

### Spacing (spacing.scss)

- **Width**: `w-0` to `w-100` (increments of 0.25rem), `w-full`, `w-screen`, `w-100vh`, `w-1/2`, `w-1/3`, etc.
- **Height**: `h-0` to `h-100`, `h-full`, `h-screen`, `h-100vh`, `h-svh`, `h-lvh`, `h-dvh`
- **Margin**: `m-0` to `m-100`, `mt-`, `mr-`, `mb-`, `ml-`, `mx-`, `my-`, `m-auto`
- **Padding**: `p-0` to `p-100`, `pt-`, `pr-`, `pb-`, `pl-`, `px-`, `py-`
- **Gap**: `gap-0` to `gap-32`, `gap-x-`, `gap-y-`
- **Space Between**: `space-x-0` to `space-x-32`, `space-y-0` to `space-y-32`

### Layout (layout.scss)

- **Display**: `block`, `inline-block`, `flex`, `inline-flex`, `grid`, `hidden`
- **Position**: `static`, `fixed`, `absolute`, `relative`, `sticky`
- **Inset**: `top-0` to `top-32`, `right-`, `bottom-`, `left-`, `top-full`, `top-1/2`
- **Z-index**: `z-0`, `z-10`, `z-20`, `z-30`, `z-40`, `z-50`, `-z-10`
- **Flexbox**:
  - Direction: `flex-row`, `flex-col`, `flex-row-reverse`, `flex-col-reverse`
  - Wrap: `flex-wrap`, `flex-nowrap`
  - Justify: `justify-start`, `justify-center`, `justify-between`, `justify-around`
  - Align: `items-start`, `items-center`, `items-end`, `items-stretch`
  - Flex: `flex-1`, `flex-auto`, `flex-initial`, `flex-none`
- **Grid**:
  - Columns: `grid-cols-1` to `grid-cols-12`
  - Rows: `grid-rows-1` to `grid-rows-6`
  - Span: `col-span-1` to `col-span-12`, `row-span-1` to `row-span-4`
- **Overflow**: `overflow-auto`, `overflow-hidden`, `overflow-scroll`, `overflow-x-auto`

### Typography (typography.scss)

- **Font Size**: `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl` to `text-9xl`
- **Font Weight**: `font-thin` to `font-black` (100-900)
- **Text Align**: `text-left`, `text-center`, `text-right`, `text-justify`
- **Text Transform**: `uppercase`, `lowercase`, `capitalize`
- **Text Decoration**: `underline`, `line-through`, `no-underline`
- **Text Overflow**: `truncate`, `text-ellipsis`
- **Line Clamp**: `line-clamp-1` to `line-clamp-4`
- **White Space**: `whitespace-normal`, `whitespace-nowrap`, `whitespace-pre`
- **Letter Spacing**: `tracking-tighter` to `tracking-widest`
- **Line Height**: `leading-none`, `leading-tight`, `leading-normal`, `leading-3` to `leading-10`

### Colors (colors.scss)

- **Text Colors**:
  - Basic: `text-black`, `text-white`, `text-transparent`
  - Gray: `text-gray-50` to `text-gray-900`
  - Colors: `text-red-500`, `text-blue-500`, `text-green-500`, `text-yellow-500`, `text-purple-500`, `text-pink-500`
- **Background Colors**: Same pattern as text colors (`bg-gray-100`, `bg-blue-500`, etc.)
- **Border Colors**: `border-gray-200`, `border-pink-500`, `border-blue-500`, etc.
- **Opacity**: `opacity-0` to `opacity-100` (increments of 10)

### Borders (borders.scss)

- **Border Width**: `border`, `border-0`, `border-2`, `border-4`, `border-t`, `border-b`, etc.
- **Border Radius**:
  - All sides: `rounded-none`, `rounded-sm`, `rounded`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`
  - Individual: `rounded-t`, `rounded-r`, `rounded-b`, `rounded-l` (with size variants)
- **Border Style**: `border-solid`, `border-dashed`, `border-dotted`, `border-none`
- **Outline**: `outline-none`, `outline-1`, `outline-2`, `outline-4`
- **Ring**: `ring`, `ring-0`, `ring-1`, `ring-2`, `ring-4`, `ring-inset`

### Effects (effects.scss)

- **Box Shadow**: `shadow-none`, `shadow-sm`, `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow-inner`
- **Transitions**:
  - Property: `transition`, `transition-all`, `transition-colors`, `transition-opacity`, `transition-transform`
  - Duration: `duration-75`, `duration-100`, `duration-150`, `duration-200`, `duration-300`, `duration-500`, `duration-700`, `duration-1000`
  - Timing: `ease-linear`, `ease-in`, `ease-out`, `ease-in-out`
- **Transform**:
  - Scale: `scale-0`, `scale-50`, `scale-75`, `scale-90`, `scale-95`, `scale-100`, `scale-105`, `scale-110`, `scale-125`, `scale-150`
  - Rotate: `rotate-0`, `rotate-45`, `rotate-90`, `rotate-180`, `-rotate-45`, `-rotate-90`, `-rotate-180`
  - Translate: `translate-x-0`, `translate-x-full`, `-translate-x-1/2`, `translate-y-full`, `-translate-y-1/2`
- **Cursor**: `cursor-pointer`, `cursor-default`, `cursor-not-allowed`, etc.
- **Pointer Events**: `pointer-events-none`, `pointer-events-auto`
- **User Select**: `select-none`, `select-text`, `select-all`

### Responsive (responsive.scss)

All utilities with responsive prefixes:

- **sm:** (640px+): `sm:block`, `sm:flex`, `sm:text-lg`, `sm:w-1/2`, `sm:p-6`
- **md:** (768px+): `md:grid-cols-2`, `md:text-2xl`, `md:px-8`, `md:gap-6`
- **lg:** (1024px+): `lg:grid-cols-4`, `lg:text-4xl`, `lg:px-12`, `lg:gap-8`
- **xl:** (1280px+): `xl:text-5xl`, `xl:px-16`, `xl:gap-12`
- **2xl:** (1536px+): `2xl:grid-cols-6`, `2xl:text-6xl`

### Interactivity (interactivity.scss)

- **Hover**:
  - Background: `hover:bg-gray-100`, `hover:bg-blue-600`
  - Text: `hover:text-gray-900`, `hover:text-white`
  - Scale: `hover:scale-105`, `hover:scale-110`
  - Shadow: `hover:shadow-lg`, `hover:shadow-xl`
  - Opacity: `hover:opacity-80`, `hover:opacity-90`
- **Focus**:
  - Outline: `focus:outline-none`
  - Ring: `focus:ring`, `focus:ring-2`, `focus:ring-4`
  - Border: `focus:border-blue-500`
- **Active**: `active:scale-95`, `active:bg-gray-200`
- **Disabled**: `disabled:opacity-50`, `disabled:cursor-not-allowed`
- **Group Hover**: `group-hover:opacity-100`, `group-hover:scale-105`

## Usage Example

```tsx
// Before (Tailwind IntelliSense)
<div className="w-full h-screen flex items-center justify-center bg-gray-100">
  <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
    Click Me
  </button>
</div>

// After (Same classes, now from SCSS files)
<div className="w-full h-screen flex items-center justify-center bg-gray-100">
  <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
    Click Me
  </button>
</div>
```

## How It Works

1. **SCSS Files**: Each utility category is defined in its own SCSS file using Sass loops and utilities
2. **Import Chain**: `index.scss` imports all utility files → `global.css` imports `index.scss`
3. **Compilation**: Tailwind processes these alongside its core utilities
4. **Result**: You get all utility classes without relying on IntelliSense

## Benefits

✅ **Full Control**: All classes are explicitly defined in your codebase
✅ **No IntelliSense Required**: Classes work even if IntelliSense fails
✅ **Customizable**: Easy to add/modify classes in SCSS files
✅ **Organized**: Clear separation by category
✅ **Type-Safe**: Can add TypeScript definitions if needed
✅ **Performance**: Only classes you define are included

## Adding Custom Classes

To add your own utilities, create a new SCSS file:

```scss
// src/styles/utilities/custom.scss
@layer utilities {
  .my-custom-class {
    /* your styles */
  }
}
```

Then import it in `index.scss`:

```scss
@import "./custom.scss";
```

## Next Steps

1. ✅ All utility classes created and imported
2. ✅ Dev server compiling successfully
3. 🎯 You can now use any of these classes in your components
4. 🎯 Add more custom utilities as needed

## Notes

- All classes follow standard Tailwind naming conventions
- Responsive variants are included for most utilities
- Hover/focus/active states are available for interactive elements
- SCSS loops generate numeric classes (w-0 to w-100, etc.)
