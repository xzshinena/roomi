# Roomi - iOS Calendar & Scheduling App

A production-quality SwiftUI app that provides a clean, modern interface for managing calendar events and appointments. Built with iOS 16+ support, accessibility features, and dark mode compatibility.

## Features

### Home Tab (Timeline View)
- **7-day week selector** with horizontal scrolling pills
- **Hourly agenda timeline** from 8:00 AM to 10:00 PM
- **Event blocks** with pastel colors, attendee avatars, and time ranges
- **Floating Action Button** for creating new events
- **Week navigation** with previous/next buttons

### Calendar Tab (Day Details)
- **Mini month picker** with dropdown selection
- **Featured appointment cards** in horizontal scroll
- **Daily events list** with icons and overflow menus
- **Progress indicators** for appointment tracking

## Architecture

### File Structure
```
Roomi/
├── App/
│   ├── AppEntry.swift          # Main app entry point
│   └── RootTabView.swift       # Tab navigation container
├── Models/
│   ├── User.swift              # User data model
│   └── Event.swift             # Event data model
├── Design/
│   └── Theme.swift             # Design system (colors, spacing, shadows)
├── Shared/
│   ├── DateFormats.swift       # Date formatting utilities
│   └── SampleData.swift        # Sample data for development
├── Components/
│   ├── AvatarCircle.swift      # User avatar components
│   ├── SectionHeader.swift     # Reusable section headers
│   └── FAB.swift               # Floating Action Button
├── Home/
│   ├── HomeView.swift          # Timeline view
│   ├── HomeViewModel.swift     # Home tab business logic
│   ├── AgendaRow.swift         # Hourly timeline rows
│   └── DayStrip.swift          # Week day selector
└── Calendar/
    ├── CalendarView.swift      # Day details view
    ├── CalendarViewModel.swift # Calendar tab business logic
    ├── AppointmentCard.swift   # Featured appointment cards
    └── MiniMonthPicker.swift   # Month selection component
```

### Key Components

**Data Models**
- `User`: Identifiable user with name and avatar emoji
- `Event`: Calendar event with title, time, location, attendees, and color

**Design System**
- Consistent spacing (8, 12, 16, 20, 24pt)
- Rounded corners (8, 12, 16, 24pt radius)
- Soft shadows with configurable opacity
- Pastel event colors with matching borders

**Accessibility**
- VoiceOver labels for all interactive elements
- Minimum 44×44pt tap targets
- Semantic grouping for screen readers
- Dynamic Type support

## Technical Requirements

- **iOS 16.0+**
- **Swift 5.9+**
- **SwiftUI**
- **No third-party dependencies**

## Getting Started

1. Open `Roomi.xcodeproj` in Xcode
2. Select your target device or simulator
3. Build and run (⌘+R)

## Sample Data

The app includes sample data with:
- 5 sample users with different avatar emojis
- 7+ events across the current week
- Varied event types (meetings, lunch, coffee breaks, etc.)
- Different time slots and durations

## Customization

### Adding New Event Types
1. Update the `iconForEvent()` method in `AppointmentCard.swift` and `CalendarView.swift`
2. Add new colors to `Theme.eventColors` array
3. Update sample data in `SampleData.swift`

### Styling Changes
- Modify `Theme.swift` for global design changes
- Update component-specific styling in individual view files
- Colors automatically adapt to light/dark mode

## Future Enhancements

- [ ] Real data persistence (Core Data/CloudKit)
- [ ] Event creation and editing
- [ ] Push notifications
- [ ] Calendar integration
- [ ] Map and Reminders tab implementation
- [ ] User authentication
- [ ] Event sharing and collaboration

## License

This project is created as a demonstration of SwiftUI best practices and is available for educational purposes.