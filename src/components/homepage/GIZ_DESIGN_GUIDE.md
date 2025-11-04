# GIZ Dashboard Design Guide

## Visual Layout

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                              [GIZ Logo] [Initiative Name] │
├───────────────────────────────┬──────────────────────────────────────────┤
│                               │                                          │
│  LEFT COLUMN                  │  RIGHT COLUMN                            │
│  ┌─────────────────────────┐  │  ┌────────────────────────────────────┐ │
│  │ 👋 Welcome back, Samir! │  │  │   October 2025      [◀] [▶]       │ │
│  │ Continue your learning  │  │  │                                    │ │
│  │ journey.                │  │  │  Su Mo Tu We Th Fr Sa              │ │
│  └─────────────────────────┘  │  │   1  2  3  4  5  6  7              │ │
│                               │  │   8  9 10 11 12 13 [14] ← Today    │ │
│  ┌──────────┐ ┌──────────┐   │  │  15 16 17 18 19 20 21              │ │
│  │    12    │ │    8     │   │  │  22 23 24 25 26 27 28              │ │
│  │ Courses  │ │  Certs   │   │  │  29 30 31                          │ │
│  │    🎓    │ │   🏅     │   │  └────────────────────────────────────┘ │
│  └──────────┘ └──────────┘   │                                          │
│                               │  ┌────────────────────────────────────┐ │
│  ┌──────────┐ ┌──────────┐   │  │ 📅 Upcoming Events                 │ │
│  │   156    │ │    5     │   │  ├────────────────────────────────────┤ │
│  │  Hours   │ │  Groups  │   │  │ 🏫 Digital Skills Workshop         │ │
│  │    ⏱     │ │   👥     │   │  │ Oct 15 • 10:00 AM                  │ │
│  └──────────┘ └──────────┘   │  │ [Add to My Schedule]               │ │
│                               │  ├────────────────────────────────────┤ │
│                               │  │ 🎥 Labour Rights Webinar           │ │
│                               │  │ Oct 16 • 2:00 PM                   │ │
│                               │  │ [Join Now]                         │ │
│                               │  └────────────────────────────────────┘ │
└───────────────────────────────┴──────────────────────────────────────────┘
```

## Color Usage Guide

### Primary Colors
| Color | Hex | Usage |
|-------|-----|-------|
| **GIZ Blue** | `#004E9A` | Primary buttons, calendar today, brand elements |
| **GIZ Blue Dark** | `#003d7a` | Hover states, active elements |
| **GIZ Yellow** | `#F5C518` | Accents, highlights, achievements |
| **White** | `#FFFFFF` | Card backgrounds, text on dark |
| **Light Grey** | `#F5F5F5` | Subtle backgrounds, borders |

### Color Applications

#### Welcome Card
- Background: White to light blue gradient (`from-white to-blue-50`)
- Left border: GIZ Blue 4px accent
- Text: Dark grey (#374151)

#### Statistics Cards
- **Courses Enrolled**: Blue gradient (`from-blue-50 to-blue-100/50`)
- **Certificates Earned**: Yellow gradient (`from-yellow-50 to-yellow-100/50`)
- **Total Hours**: Green gradient (`from-green-50 to-green-100/50`)
- **Active Groups**: Purple gradient (`from-purple-50 to-purple-100/50`)

#### Calendar
- Background: Pure white
- Today's date: GIZ Blue (#004E9A) with white text
- Other dates: Grey (#374151) on hover grey-100
- Border: Subtle grey

#### Event Cards
- Background: White
- Border: Light grey
- Icons background:
  - 🎥 Live: Red-50 background with red-600 icon
  - 🏫 Workshop: Blue-50 background with GIZ Blue icon
  - 📅 Default: Grey-50 background with grey-600 icon
- Button: GIZ Blue background

## Typography Hierarchy

### Fonts
```css
Primary: 'Inter'
Fallback: 'Nunito'
System fallback: sans-serif
```

### Font Sizes & Weights

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| Welcome Header | 2xl (24px) | Bold (700) | Main greeting |
| Section Titles | lg (18px) | Bold (700) | Calendar, Events headers |
| Stat Values | 3xl (30px) | Bold (700) | Large numbers |
| Stat Labels | sm (14px) | Medium (500) | Descriptive text |
| Event Titles | sm (14px) | Semibold (600) | Event names |
| Event Details | xs (12px) | Regular (400) | Date, time |
| Body Text | base (16px) | Regular (400) | Descriptions |
| Button Text | sm (14px) | Medium (500) | CTAs |

## Spacing & Layout

### Grid System
```css
/* Desktop (>1024px) */
.grid-cols-2  /* Two equal columns */
gap-6         /* 24px between columns */

/* Mobile (<1024px) */
.grid-cols-1  /* Stack vertically */
gap-6         /* 24px between sections */
```

### Component Spacing
```css
/* Card padding */
p-6  /* 24px internal padding */

/* Section spacing */
space-y-6  /* 24px vertical gaps */
space-y-4  /* 16px vertical gaps (right column) */

/* Button padding */
px-4 py-2  /* 16px horizontal, 8px vertical */
```

## Interactive States

### Hover Effects

#### Stat Cards
```css
/* Default state */
shadow-md

/* Hover state */
shadow-lg
transform: translateY(-4px)
transition: all 300ms
```

#### Event Cards
```css
/* Default state */
shadow-sm

/* Hover state */
shadow-md
transform: translateY(-2px)
transition: all 200ms
```

#### Buttons
```css
/* Default */
bg-[#004E9A]

/* Hover */
bg-[#003d7a]
transition: all 200ms
```

### Focus States
- Ring color: Blue-400 with 50% opacity
- Ring width: 4px
- Ring offset: 2px

## Animations

### Counter Animation
```javascript
// Duration: 2000ms
// Easing: Linear
// Effect: Count from 0 to target value
```

### Card Entrance
```css
/* Fade in with slide up */
opacity: 0 → 1
translateY: 10px → 0
duration: 500ms
```

### Calendar Navigation
```css
/* Instant month change with number update */
/* No animation on date grid for performance */
```

## Icons Usage

### Stat Cards
- 🎓 Courses: `<GraduationCap />` from lucide-react
- 🏅 Certificates: `<Award />` from lucide-react
- ⏱ Hours: `<Clock />` from lucide-react
- 👥 Groups: `<Users />` from lucide-react

### Event Types
- 📅 Default/Date: `<Calendar />` from lucide-react
- 🎥 Live Events: `<Video />` from lucide-react
- 🏫 Workshops: `<School />` from lucide-react

### Navigation
- ◀ Previous: `<ChevronLeft />` from lucide-react
- ▶ Next: `<ChevronRight />` from lucide-react

## Responsive Breakpoints

```css
/* Mobile First Approach */
base: 0-640px      /* Stack everything, full width */
sm: 640px-768px    /* 2-column stats grid */
md: 768px-1024px   /* Still stacked main layout */
lg: 1024px+        /* Two-column main layout */
xl: 1280px+        /* Max width container (1280px) */
```

## Accessibility Checklist

✅ Color contrast ratio > 4.5:1 for all text  
✅ Focus indicators on all interactive elements  
✅ Keyboard navigation support  
✅ Semantic HTML structure  
✅ ARIA labels where needed  
✅ Screen reader friendly  
✅ Touch target size > 44x44px  

## Component Props

### WelcomeStatsSection
```jsx
// Future API integration
const stats = [
  {
    icon: IconComponent,
    label: string,
    value: number,
    suffix: string,
    color: 'blue' | 'yellow' | 'green' | 'purple'
  }
]
```

### CalendarEventsSection
```jsx
const upcomingEvents = [
  {
    id: string | number,
    title: string,
    date: string,  // Format: "Oct 15, 2025"
    time: string,  // Format: "10:00 AM"
    type: 'live' | 'workshop' | 'default'
  }
]
```

## Browser Testing Checklist

- [ ] Chrome (Windows/Mac)
- [ ] Firefox (Windows/Mac)
- [ ] Safari (Mac/iOS)
- [ ] Edge (Windows)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

## Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

---

**Design System Version**: 1.0  
**Last Updated**: October 2025  
**Maintained by**: GIZ Digital Learning Team

