# Roomi - Cross-Platform Calendar & Scheduling App

A modern, production-ready calendar and scheduling application built with React Native and Expo. Originally developed in SwiftUI for iOS, now refactored for cross-platform compatibility across iOS, Android, and Web.

## 🎯 App Goal & Vision

Roomi provides a clean, intuitive interface for managing calendar events and appointments with a focus on:
- **Visual Timeline**: 7-day week view with hourly agenda from 8 AM to 10 PM
- **Event Management**: Rich event cards with attendee avatars, locations, and time ranges
- **Modern UX**: Smooth interactions, accessibility support, and dark mode compatibility
- **Cross-Platform**: Single codebase serving iOS, Android, and Web users

## 🛠️ Tech Stack

### **Core Framework**
- **React Native** `0.76.9` - Cross-platform mobile development framework
- **Expo SDK** `52.0.0` - Development platform and tools
- **TypeScript** `5.3.3` - Type-safe JavaScript with enhanced developer experience

### **Navigation & Routing**
- **Expo Router** `4.0.0` - File-based routing system for React Native
- **React Navigation** - Navigation library (included with Expo Router)

### **UI & Styling**
- **React Native Screens** `4.4.0` - Native screen management
- **Expo Vector Icons** `14.0.4` - Icon library with 10,000+ icons
- **React Native Safe Area Context** `4.12.0` - Handle safe areas across devices

### **Development Tools**
- **Metro Bundler** - JavaScript bundler optimized for React Native
- **Babel** - JavaScript compiler with React Native presets
- **npm** - Package manager

### **Platform Support**
- **iOS** - Native iOS app through Expo
- **Android** - Native Android app through Expo  
- **Web** - Progressive Web App through React Native Web

## 📱 Features

### **Home Tab - Timeline View**
- Interactive 7-day week selector with smooth navigation
- Hourly timeline grid (8:00 AM - 10:00 PM)
- Event blocks with custom colors and attendee avatars
- Floating Action Button for quick event creation
- Previous/Next week navigation

### **Calendar Tab - Detail View**
- Interactive mini calendar with month/year selection
- Featured appointment cards in horizontal scroll
- Daily event list with progress indicators
- Event icons based on content (meetings, lunch, etc.)

## 🏗️ Project Structure

```
roomi/
├── app/                          # Expo Router navigation structure
│   ├── _layout.tsx              # Root layout component
│   └── (tabs)/                  # Tab navigation group
│       ├── _layout.tsx          # Tab bar configuration
│       ├── index.tsx            # Home tab (timeline view)
│       ├── calendar.tsx         # Calendar tab (detail view)
│       ├── map.tsx              # Map tab (placeholder)
│       └── reminders.tsx        # Reminders tab (placeholder)
│
├── src/                         # Main source code
│   ├── components/              # Reusable UI components
│   │   ├── AgendaRow.tsx        # Hourly timeline row
│   │   ├── AppointmentCard.tsx  # Event card component
│   │   ├── AvatarCircle.tsx     # User avatar display
│   │   ├── DayStrip.tsx         # Week navigation component
│   │   ├── FAB.tsx              # Floating Action Button
│   │   ├── MiniMonthPicker.tsx  # Calendar picker widget
│   │   └── SectionHeader.tsx    # Reusable section headers
│   │
│   ├── screens/                 # Screen components
│   │   ├── home/
│   │   │   └── HomeScreen.tsx   # Main timeline view
│   │   └── calendar/
│   │       └── CalendarScreen.tsx # Calendar detail view
│   │
│   ├── models/                  # TypeScript data models
│   │   ├── User.ts              # User interface and factory
│   │   └── Event.ts             # Event interface and factory
│   │
│   ├── theme/                   # Design system
│   │   └── Theme.ts             # Colors, spacing, shadows
│   │
│   └── shared/                  # Utilities and data
│       ├── DateFormats.ts       # Date formatting utilities
│       └── SampleData.ts        # Mock data for development
│
├── assets/                      # App assets (icons, splash screen)
├── swift-backup/               # Original SwiftUI codebase (preserved)
├── package.json                # Dependencies and scripts
├── app.json                    # Expo app configuration
├── tsconfig.json               # TypeScript configuration
├── babel.config.js             # Babel configuration
└── metro.config.js             # Metro bundler configuration
```

## 📈 Development Roadmap

### **Phase 1: Core Features** ✅
- [x] Cross-platform app setup with Expo
- [x] Tab navigation structure
- [x] Timeline view with week navigation
- [x] Calendar view with month picker
- [x] Event cards with rich information
- [x] Design system and theming

### **Phase 2: Data Integration** 🚧
- [ ] Calendar API integration (Google Calendar, Apple Calendar)
- [ ] Real-time event synchronization
- [ ] User authentication system
- [ ] Cloud data persistence

### **Phase 3: Enhanced Features** 📋
- [ ] Event creation and editing
- [ ] Push notifications for reminders
- [ ] Map integration for event locations
- [ ] Reminders and todo functionality
- [ ] Event sharing and collaboration

### **Phase 4: Production** 🎯
- [ ] App store deployment (iOS/Android)
- [ ] Performance optimization
- [ ] Analytics integration
- [ ] User feedback system

## 🔄 Migration History

This app was originally developed in **SwiftUI** for iOS-only deployment. The complete codebase was migrated to **React Native + Expo** to achieve:

- **Cross-platform compatibility** (iOS, Android, Web)
- **Faster development cycles** with hot reload
- **Larger developer ecosystem** and community support
- **Easier deployment and distribution**

