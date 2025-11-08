# Data Architecture Overview

```
src/data/
├── company-data.ts          # Company info & branding
│   ├── companyInfo          # Name, legal form, tagline, description
│   └── contactInfo          # Phone, address, hours
│
├── navigation-data.ts       # Navigation & routing
│   ├── mainNavLinks         # Header navigation menu
│   └── footerQuickLinks     # Footer links with colors
│
├── timeline-data.ts         # Company history
│   └── timelineEvents[]     # 7 milestones (2005-2025)
│
├── home-content.ts          # Homepage content
│   ├── heroContent          # Hero section (title, subtitle, CTA)
│   ├── divisions[]          # 3 division cards
│   ├── promotions[]         # Product promotions
│   └── ctaContent           # Call-to-action section
│
├── store-contacts.ts        # Store-specific data
│   └── storeContacts[]      # 3 stores with full details
│
├── ui-texts.ts              # UI labels & messages
│   ├── search               # Search placeholders
│   ├── navigation           # Nav labels
│   ├── storeStatus          # Status messages
│   ├── location             # Distance/location texts
│   ├── contactForm          # Form labels
│   ├── actions              # Button texts
│   ├── sections             # Section headings
│   └── a11y                 # Accessibility labels
│
└── [existing]
    ├── promotions.jsonl     # JSONL format promotions
    ├── search-data.ts       # Search index
    └── stores.json          # Store coordinates
```

## Component → Data Mapping

### Header.tsx

```typescript
import { mainNavLinks } from '@/data/navigation-data'
import { companyInfo } from '@/data/company-data'
import { uiTexts } from '@/data/ui-texts'

// Usage:
{companyInfo.name.cyrillic}     // "МЕРТМАКС"
{companyInfo.legalForm}          // "ЕООД"
{mainNavLinks.map(...)}          // Navigation items
{uiTexts.search.placeholder}     // "Търсете продукти..."
{uiTexts.a11y.menuButton}        // "Отвори меню"
```

### Footer.tsx

```typescript
import { footerQuickLinks } from '@/data/navigation-data'
import { companyInfo, contactInfo } from '@/data/company-data'
import { uiTexts } from '@/data/ui-texts'

// Usage:
{companyInfo.description}         // Company description
{footerQuickLinks.map(...)}       // Footer links
{contactInfo.address.full}        // "с. Самуил, обл. Разград..."
{contactInfo.phone.display}       // "+359 XXX XXX XXX"
{contactInfo.hours.display}       // "Пон-Нед: 8:00 - 20:00"
{uiTexts.sections.contactInfo}    // "Контакти"
```

### HomePage.tsx

```typescript
import { heroContent, divisions, promotions, ctaContent } from '@/data/home-content'
import { uiTexts } from '@/data/ui-texts'

// Usage:
{heroContent.title}               // "MERTMAX: Сърцето на Самуил"
{heroContent.subtitle}            // "Вашият доверен партньор..."
{divisions.map(...)}              // 3 division cards
{promotions.map(...)}             // Promotional items
{ctaContent.buttonText}           // "Свържете се с нас"
{uiTexts.sections.ourStores}      // "Нашите Магазини"
{uiTexts.sections.promotions}     // "Текущи промоции"
```

### About Page

```typescript
import { timelineEvents } from '@/data/timeline-data'
import { uiTexts } from '@/data/ui-texts'

// Usage:
{timelineEvents.map(...)}         // Timeline items
{uiTexts.sections.history}        // "Нашата история"
```

### ContactPage.tsx

```typescript
import { storeContacts } from '@/data/store-contacts'
import { uiTexts } from '@/data/ui-texts'

// Usage:
{storeContacts.map(...)}          // Store cards
{uiTexts.contactForm.title}       // "Изпратете ни съобщение"
{uiTexts.contactForm.name.label}  // "Име"
{uiTexts.contactForm.submit}      // "Изпрати"
{uiTexts.location.checkDistance}  // "Проверете разстоянието ми"
```

## Type Safety Examples

```typescript
// All data is fully typed
interface NavLink {
  href: string;
  label: string;
}

interface CompanyInfo {
  name: {
    cyrillic: string;
    latin: string;
  };
  legalForm: string;
  tagline: string;
  description: string;
  foundedYear: number;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}
```

## Benefits

✨ **Single Source of Truth**: Update once, changes everywhere  
🌍 **i18n Ready**: Structured for multi-language support  
🔒 **Type Safe**: Full TypeScript coverage  
📝 **Easy Maintenance**: Clear data structure  
🎨 **Design Consistency**: Centralized theming  
♿ **Accessibility**: Dedicated a11y labels

## Migration Pattern

### Before

```tsx
<h1>MERTMAX: Сърцето на Самуил</h1>
<p>Вашият доверен партньор в Самуил и Разград</p>
```

### After

```tsx
<h1>{heroContent.title}</h1>
<p>{heroContent.subtitle}</p>
```

---

**All components now use centralized data files** ✅
