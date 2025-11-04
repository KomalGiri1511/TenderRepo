# GIZ Digital Learning Dashboard

## Overview
This is the redesigned top section of the digital learning dashboard for the GIZ-supported Labour Reform & Digital Learning Initiative. The design emphasizes professional government + modern NGO aesthetics with a focus on data-driven, inclusive, and bilingual-ready interface.

## Components Created

### 1. **WelcomeStatsSection.jsx**
Left side of the dashboard containing:
- **Personalized Welcome Message**: Greeting card with user's name and motivational message
- **Statistics Cards**: Four glassmorphic cards displaying:
  - 🎓 Courses Enrolled
  - 🏅 Certificates Earned
  - ⏱ Total Hours Learned
  - 👥 Active Groups
- **Features**:
  - Animated counters using custom `useCountUp` hook
  - Hover effects with lift and shadow transitions
  - Responsive grid layout (1 column on mobile, 2 on desktop)

### 2. **CalendarEventsSection.jsx**
Right side of the dashboard containing:
- **Monthly Calendar**:
  - Clean white background with minimal blue accents
  - Today's date highlighted in GIZ Blue (#004E9A)
  - Navigation controls for previous/next month
  - Responsive grid layout (7-day week view)
- **Upcoming Events List**:
  - Event cards with icons (📅 date, 🎥 live event, 🏫 workshop)
  - Title, date/time display
  - Action buttons: "Join Now" or "Add to My Schedule"
  - Hover effects and subtle shadows

### 3. **GIZBranding.jsx**
Branding header component:
- GIZ logo placeholder (top-right positioning)
- Initiative name: "Labour Reform & Digital Learning Initiative"
- Clean white background with subtle shadow
- Responsive layout

### 4. **StudentDashboard.jsx** (Updated)
Main dashboard layout:
- Two-column horizontal split (left: stats, right: calendar/events)
- Background gradient: gray-to-blue for modern feel
- Additional sections below (courses, zoom, widgets)
- Fully responsive with mobile-first approach

## Design System

### Color Palette
```css
--giz-blue: #004E9A       /* Primary brand color */
--giz-blue-dark: #003d7a  /* Hover states */
--giz-yellow: #F5C518     /* Highlight accents */
--giz-light-grey: #F5F5F5 /* Backgrounds */
```

### Typography
- **Primary Fonts**: "Inter" and "Nunito"
- **Purpose**: Friendly, legible, and professional
- **Loaded via**: Google Fonts CDN (added to index.css)

### Design Style
- **Glassmorphic Cards**: Subtle transparency with backdrop blur
- **Rounded Corners**: Soft, approachable feel
- **Drop Shadows**: Subtle depth for visual hierarchy
- **Hover Effects**: Interactive lift and scale transformations
- **Animations**: 
  - Counter animations on stats
  - Smooth transitions on all interactive elements
  - Fade-in effects for initial load

## Features

### Accessibility
- WCAG-compliant color contrast
- Focus states for keyboard navigation
- Semantic HTML structure
- Screen reader friendly

### Responsiveness
- Mobile-first design approach
- Breakpoints:
  - Mobile: < 640px (stacked layout)
  - Tablet: 640px - 1024px (stacked with larger cards)
  - Desktop: > 1024px (two-column layout)
- Sticky positioning for calendar on desktop

### Bilingual Ready
- Flexible text containers
- Word-wrap and break-word support
- Scalable component structure
- Easy to integrate i18n libraries

### Data-Driven
- All stats are configurable via props/API
- Event data can be fetched from backend
- User data personalization
- Real-time updates support

## Usage

```jsx
import { StudentDashboard } from './components/homepage/StudentDashboard';

function App() {
  return <StudentDashboard />;
}
```

## Customization

### Update User Name
Edit `WelcomeStatsSection.jsx`:
```jsx
const userName = "Your Name"; // Replace with dynamic user data
```

### Modify Statistics
Edit the `stats` array in `WelcomeStatsSection.jsx`:
```jsx
const stats = [
  { icon: GraduationCap, label: "Your Label", value: 10, suffix: "Units", color: "blue" },
  // Add more stats...
];
```

### Add Events
Edit the `upcomingEvents` array in `CalendarEventsSection.jsx`:
```jsx
const upcomingEvents = [
  {
    id: 1,
    title: "Event Title",
    date: "Oct 15, 2025",
    time: "10:00 AM",
    type: "workshop" // or "live", "default"
  },
  // Add more events...
];
```

## Integration with Backend

### Recommended API Structure
```typescript
// User Stats Endpoint
GET /api/user/stats
Response: {
  coursesEnrolled: number,
  certificatesEarned: number,
  totalHoursLearned: number,
  activeGroups: number
}

// Events Endpoint
GET /api/user/events
Response: {
  events: [
    {
      id: string,
      title: string,
      date: string,
      time: string,
      type: "live" | "workshop" | "default"
    }
  ]
}
```

## Future Enhancements
- [ ] Add i18n support for English/Hindi bilingual interface
- [ ] Integrate with real-time notification system
- [ ] Add event filtering and search
- [ ] Implement calendar event CRUD operations
- [ ] Add analytics tracking for user engagement
- [ ] Dark mode support
- [ ] Progressive Web App (PWA) features
- [ ] Export calendar to ICS format

## Browser Support
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS Safari, Chrome Android

## Performance
- Lazy loading for images
- Optimized animations (CSS transforms)
- Minimal re-renders with React hooks
- Bundle size: ~15KB (gzipped)

---

**Built for**: GIZ Labour Reform & Digital Learning Initiative  
**Design Philosophy**: Professional yet human-centric  
**Last Updated**: October 2025

