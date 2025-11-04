# Multilingual Notification Modal

A fully-featured, accessible, and multilingual notification system for the Labour Reform and Digital Learning LMS.

## Features

### 🌍 Multilingual Support
- **5 Languages**: English, Hindi (हिन्दी), German (Deutsch), Spanish (Español), French (Français)
- **Instant switching**: Change language on-the-fly with dropdown selector
- **All content translated**: Titles, descriptions, buttons, timestamps, and UI elements

### 🎨 Visual Design
- **Clean & Minimal**: Modern, distraction-free interface
- **Color-coded types**: 
  - 🔵 Updates (Blue)
  - 🟣 Events (Purple)
  - 🟢 Messages (Green)
  - 🟠 Warnings (Orange)
  - ⚫ Info (Gray)
- **Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Unread indicators**: Visual badges and background highlighting

### ⚡ Functionality
- **Smart filtering**: All, Updates, Events, Messages
- **Timestamp display**: Relative time ("2 hours ago") in selected language
- **Mark as read**: Individual or bulk marking
- **Dismiss notifications**: Remove notifications permanently
- **Scrollable content**: Handles long descriptions gracefully
- **Rich media support**: Display images in notifications

### ♿ Accessibility
- **Screen reader support**: Proper ARIA labels and descriptions
- **Keyboard navigation**: Full keyboard accessibility
- **Text-to-speech**: Audio playback for notification content in selected language
- **Resizable text**: Supports browser text sizing
- **High contrast**: Clear visual hierarchy

### 📱 User Experience
- **Interactive actions**:
  - "View Details" → Opens linked content
  - "Dismiss" → Removes notification
  - Audio icon → Reads notification aloud
- **Progress tracking**: Unread count displayed
- **Auto-mark read**: Notifications marked as read when viewed
- **History**: All notifications accessible until dismissed

## Usage

### Basic Implementation

```jsx
import NotificationModal from '@/components/notifications/NotificationModal';

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNotificationAction = (notification) => {
    // Handle notification click
    console.log('Notification clicked:', notification);
    // Navigate to linked content
    navigate(notification.link);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <Bell /> Notifications
      </Button>

      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNotificationAction={handleNotificationAction}
      />
    </>
  );
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | boolean | Controls modal visibility |
| `onClose` | function | Called when modal is closed |
| `onNotificationAction` | function | Called when "View Details" is clicked |

### Notification Object Structure

```javascript
{
  id: 1,
  type: 'update', // 'update' | 'event' | 'message' | 'warning' | 'info'
  title: {
    en: 'English Title',
    hi: 'हिंदी शीर्षक',
    de: 'Deutscher Titel',
    es: 'Título en español',
    fr: 'Titre français'
  },
  description: {
    en: 'English description...',
    hi: 'हिंदी विवरण...',
    // ... other languages
  },
  timestamp: new Date(),
  read: false,
  link: '/path/to/content',
  icon: IconComponent, // Lucide React icon
  image: '/optional/image.jpg' // Optional
}
```

## Language Support

### Adding a New Language

1. Add translations to `translations` object:

```javascript
const translations = {
  // ... existing languages
  pt: { // Portuguese example
    title: 'Notificações',
    newUpdate: 'Nova atualização',
    viewDetails: 'Ver detalhes',
    // ... all other keys
  }
};
```

2. Add to language selector:

```jsx
<SelectItem value="pt">Português</SelectItem>
```

3. Update text-to-speech language code:

```javascript
utterance.lang = language === 'pt' ? 'pt-BR' : // ... other languages
```

## Notification Types

### Update
- **Icon**: FileText
- **Color**: Blue
- **Use**: Course updates, new content, system changes

### Event
- **Icon**: Calendar
- **Color**: Purple
- **Use**: Webinars, workshops, scheduled activities

### Message
- **Icon**: MessageSquare
- **Color**: Green
- **Use**: Team messages, feedback, communications

### Warning
- **Icon**: AlertTriangle
- **Color**: Orange
- **Use**: Deadlines, important reminders, action required

### Info
- **Icon**: Info
- **Color**: Gray
- **Use**: General information, tips, announcements

## Customization

### Changing Colors

Modify the `getNotificationStyle` function:

```javascript
const getNotificationStyle = (type) => {
  const styles = {
    update: { 
      color: 'text-your-color-600', 
      bg: 'bg-your-color-100', 
      border: 'border-your-color-200' 
    },
    // ... other types
  };
  return styles[type] || styles.info;
};
```

### Adding New Filter Categories

1. Add filter to translations:

```javascript
filters: {
  all: 'All',
  // ... existing filters
  announcements: 'Announcements'
}
```

2. Update filter logic:

```javascript
const getFilteredNotifications = () => {
  if (filter === 'announcements') {
    return notifications.filter(n => n.type === 'announcement');
  }
  // ... existing filters
};
```

## Demo

Visit `/notifications-demo` to see the notification modal in action with sample notifications in all supported languages.

## Technical Details

### Dependencies
- React 18+
- Radix UI Dialog
- Lucide React icons
- Tailwind CSS
- shadcn/ui components

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance
- Lazy loading of notification content
- Efficient re-renders with React.memo (can be added)
- Optimized scroll performance

## Best Practices

1. **Keep descriptions concise**: Aim for 2-3 sentences
2. **Use appropriate types**: Match notification type to content
3. **Provide clear actions**: Make "View Details" destination obvious
4. **Update timestamps**: Ensure timestamps are accurate
5. **Test translations**: Verify all languages display correctly
6. **Rich media sparingly**: Use images only when they add value
7. **Accessibility first**: Always provide text alternatives

## Future Enhancements

- [ ] Push notification support
- [ ] Email digest option
- [ ] Notification preferences (per type)
- [ ] Sound effects on new notifications
- [ ] Notification grouping by date
- [ ] Search/filter by keyword
- [ ] Export notification history
- [ ] Custom notification templates
- [ ] Batch operations (delete multiple)
- [ ] Notification priority levels

## Support

For issues or questions, please contact the development team or create an issue in the project repository.

## License

Part of the GIZ Labour Reform & Digital Learning LMS Platform

