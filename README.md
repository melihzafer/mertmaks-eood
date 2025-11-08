# MERTMAX ЕООД - Modern Digital Flagship

A production-lean, modern web platform for MERTMAX ЕООД's three retail divisions in Samuil, Bulgaria: Grocery (Хранителен), Industrial (Индустриален), and Construction (Строителен).

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.6 (App Router + Turbopack)
- **React**: 19.0.0 (Server Components by default)
- **TypeScript**: 5.8.3 (Strict mode)
- **Styling**: Tailwind CSS 4.1.3 + SCSS Modules 1.83.4
- **3D & Motion**: React Three Fiber 9.4.0 + Drei 10.7.6 + Framer Motion 11.15.0
- **Maps**: Leaflet 1.9.4 + react-leaflet 5.0.0
- **Search**: Fuse.js 7.0.0 (Fuzzy search)
- **Forms**: Zod 3.24.1 (Validation)
- **UI Components**: shadcn/ui (Radix UI primitives)

## 📋 Prerequisites

- **Node.js**: 18.x or 20.x recommended
- **npm**: 8.x or higher (or pnpm/yarn)
- **Git**: For version control

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mertmaks-eood
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your email configuration (see [Environment Variables](#-environment-variables) below).

## 🏃 Development

Start the development server with Turbopack:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server (Turbopack)
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier (if configured)

## 🌍 Environment Variables

Create a `.env.local` file in the root directory. See `.env.example` for reference.

### Email Configuration (Contact Form)

**Option 1: Resend (Recommended)**
```env
RESEND_API_KEY=re_your_api_key_here
TO_EMAIL=info@mertmax.bg
```

**Option 2: SMTP (Gmail, SendGrid, etc.)**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
TO_EMAIL=info@mertmax.bg
```

### Other Variables
```env
NODE_ENV=development
```

## 📂 Project Structure

```
mertmaks-eood/
├── app/
│   ├── (stores)/              # Route group for store pages
│   │   ├── construction/      # Construction division
│   │   ├── industrial/        # Industrial division
│   │   └── supermarket/       # Grocery division
│   ├── api/
│   │   └── contact/           # Contact form API route
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components
│   │   └── *.tsx              # Feature components
│   ├── contact/               # Contact page
│   ├── data/                  # Static data (search index)
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage
│   └── globals.css            # Global styles
├── data/
│   ├── stores.json            # Store data (hours, locations, coordinates)
│   └── promotions.jsonl       # Promotions data
├── lib/
│   ├── stores.ts              # Store utility functions
│   └── promotions.ts          # Promotions utility functions
├── public/                    # Static assets
└── next.config.ts             # Next.js configuration
```

## 🎨 Architecture Decisions

### Server Components First
- All components are Server Components by default
- Client Components (`'use client'`) only when necessary (interactivity, hooks)
- Reduces JavaScript bundle size and improves performance

### Route Groups
- `(stores)` route group for division pages (doesn't affect URL structure)
- Clean URLs: `/supermarket`, `/industrial`, `/construction`

### Static Data Approach
- `data/stores.json` - Store information with GPS coordinates
- `data/promotions.jsonl` - JSONL format for easy appending
- Utility functions in `lib/` for data access
- Server-side only (uses `fs.readFileSync`)

### Dynamic Imports (SSR-safe)
- Leaflet map: Dynamically imported with `{ ssr: false }`
- 3D showcase: Wrapper component prevents SSR issues
- Ensures clean builds without Node.js API errors

### Styling Strategy
- Tailwind CSS: Primary styling system (utility-first)
- SCSS Modules: For complex effects (holographic cards, gradients)
- CSS Custom Properties: Theme colors (`--color-grocery`, `--color-industrial`, `--color-construction`)

### API Routes
- `/api/contact` - Contact form submission
- Zod validation for type-safe input
- Rate limiting (in-memory, 5 requests/minute per IP)
- TODO: Email integration (Resend or Nodemailer)

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Configure environment variables in Vercel dashboard:
   - `RESEND_API_KEY` (or SMTP credentials)
   - `TO_EMAIL`
4. Deploy automatically on push to `main` branch

### Other Platforms (Docker, VPS)

Build the production app:
```bash
npm run build
```

Start the production server:
```bash
npm run start
```

Or use Docker:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Configuration

### Tailwind CSS
Custom colors defined in `tailwind.config.ts`:
- Grocery: Red (`#e53e3e`)
- Industrial: Magenta/Pink (`#d53f8c`)
- Construction: Blue (`#3182ce`)

### Next.js
- Turbopack enabled in dev mode (faster builds)
- Image optimization configured
- Path aliases: `@/*` → `./` (root directory)

## 🎯 Features

### Core Features
- ✅ **3 Division Pages**: Grocery, Industrial, Construction
- ✅ **Global Search**: Cmd+K fuzzy search (Fuse.js)
- ✅ **Interactive Map**: Leaflet with 3 store markers + directions
- ✅ **Contact Form**: Zod validation + rate limiting + email sending
- ✅ **3D Showcase**: React Three Fiber with floating shapes
- ✅ **Prism Cards**: 3D tilt effect with holographic gradients
- ✅ **Page Transitions**: Color wipe animations (store-specific colors)
- ✅ **Promotions**: Featured promotions grid on homepage
- ✅ **Store Hours**: Live status display (open/closed)
- ✅ **Responsive**: Mobile-first design, hamburger menu
- ✅ **Accessibility**: Keyboard navigation, prefers-reduced-motion support

### UX Enhancements
- Smooth page transitions with Framer Motion
- Store-specific color coding throughout UI
- Loading states and error boundaries
- Form validation with helpful error messages
- Rate limiting to prevent spam

## 🧪 Testing

### Manual Testing Checklist
- [ ] Homepage loads with 3D showcase
- [ ] Navigation between all pages works
- [ ] Search modal opens (Cmd+K / Ctrl+K)
- [ ] Map displays 3 store markers correctly
- [ ] Contact form submission works
- [ ] Responsive design on mobile (375px+)
- [ ] Page transitions are smooth
- [ ] All store pages render correctly

### Accessibility Testing
- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] Focus visible states
- [ ] ARIA labels present
- [ ] prefers-reduced-motion respected
- [ ] Color contrast WCAG AA compliant

## 📝 Known Limitations

1. **Email Sending**: Contact form currently logs to console. Requires email service integration (Resend/Nodemailer).
2. **Rate Limiting**: In-memory implementation. Use Redis/database for production.
3. **Static Data**: Stores and promotions are static JSON. Consider CMS integration for non-technical updates.
4. **3D Performance**: React Three Fiber may be heavy on low-end devices. Consider fallback.
5. **Map Tiles**: Using free OpenStreetMap tiles. Consider Mapbox for production.

## 🗺️ Roadmap / Next Steps

### Phase 2 Enhancements
- [ ] Implement actual email sending (Resend API)
- [ ] Add product catalog with search/filtering
- [ ] Admin dashboard for content management
- [ ] User accounts and order history
- [ ] Online ordering/reservations
- [ ] Blog/news section
- [ ] SEO optimization (structured data, meta tags)
- [ ] Analytics integration (Vercel Analytics or Google Analytics)
- [ ] PWA support (service worker, offline mode)
- [ ] Performance optimization (bundle analysis, lazy loading)

### Technical Debt
- [ ] Add comprehensive TypeScript types for all data
- [ ] Set up Playwright/Cypress E2E tests
- [ ] Configure Prettier + ESLint rules
- [ ] Add Storybook for component development
- [ ] Set up CI/CD pipeline (GitHub Actions)

## 📜 License

Proprietary - MERTMAX ЕООД. All rights reserved.

## 👥 Contact

- **Website**: [mertmax.bg](https://mertmax.bg)
- **Email**: info@mertmax.bg
- **Location**: Samuil, Bulgaria

---

**Built with ❤️ using Next.js 15 + React 19**
