# D&D Character Companion - App Overview

## 📖 Introduction

D&D Character Companion (Hero's Ledger) is a cross-platform mobile and web application for managing Dungeons & Dragons 5th Edition characters. Built with React Native and Expo, it provides an intuitive interface for creating, tracking, and managing your D&D characters on the go.

## 🎯 Purpose

This app simplifies character management for D&D players by providing:
- Quick character creation with all core stats
- Real-time HP tracking
- Ability score calculations with modifiers
- Character image support
- Persistent local storage
- Cross-platform compatibility (iOS, Android, Web)

## ✨ Key Features

### Character Management
- **Create Characters**: Build characters with race, class, level, and background
- **Ability Scores**: Track STR, DEX, CON, INT, WIS, CHA with automatic modifier calculation
- **Combat Stats**: Manage HP, AC, initiative, speed, and hit dice
- **Character Images**: Upload custom images for your characters
- **Skills**: Select proficient skills for your character
- **Equipment**: Track your character's gear and items

### Character Tracking
- **HP Management**: Quick +/- buttons for health tracking during combat
- **Character Details**: View comprehensive character information at a glance
- **Persistent Storage**: All characters saved locally using AsyncStorage

### Additional Tools
- **Dice Roller**: Built-in dice roller for common D&D rolls (coming soon)
- **Spell List**: Quick reference for spells (coming soon)
- **Character List**: View and manage all your characters

## 🏗️ Architecture

### Technology Stack
- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router (file-based routing)
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Storage**: AsyncStorage for local data persistence
- **Icons**: Lucide React Native
- **Image Handling**: Expo Image Picker

### Project Structure
```
dnd-character-companion-app/
├── app/                      # App screens (file-based routing)
│   ├── (tabs)/              # Tab navigation screens
│   │   ├── index.tsx        # Characters list
│   │   ├── dice.tsx         # Dice roller
│   │   ├── spells.tsx       # Spell reference
│   │   └── tools.tsx        # Tools & utilities
│   ├── character/           # Character-related screens
│   │   ├── [id].tsx         # Character detail view
│   │   └── create.tsx       # Character creation
│   └── _layout.tsx          # Root layout
├── components/              # Reusable UI components
│   ├── ui/                  # Core UI components
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── Card.tsx
│   └── RuleSection.tsx
├── constants/               # App constants
│   └── design.ts            # Design system (colors, spacing, typography)
├── data/                    # Static data
│   └── spells.ts            # D&D spell data
├── hooks/                   # Custom React hooks
│   └── useFrameworkReady.ts
├── types/                   # TypeScript type definitions
│   └── character.ts         # Character interface
├── utils/                   # Utility functions
│   ├── dnd.ts              # D&D rules calculations
│   └── storage.ts          # AsyncStorage helpers
├── assets/                  # Images and static assets
├── docs/                    # Documentation
└── public/                  # Web-specific files
```

## 🎨 Design System

The app uses a consistent design system defined in `constants/design.ts`:

### Color Palette
- **Background**: Dark slate theme (#0f172a, #1e293b)
- **Text**: White primary, slate-400 secondary
- **Accent**: Blue (#3b82f6)
- **Success**: Green (#22c55e)
- **Error**: Red (#ef4444)
- **Warning**: Yellow (#eab308)

### Typography
- **Headings**: Various sizes (h1: 32px, h2: 24px, h3: 20px)
- **Body**: 16px for main text, 14px for small text
- **Captions**: 12px for labels

### Spacing
- Consistent spacing scale (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px)

## 📱 Screens

### 1. Characters List (`app/(tabs)/index.tsx`)
- Displays all created characters
- Shows character name, level, race, and class
- Quick access to character details
- "Create Character" button

### 2. Character Creation (`app/character/create.tsx`)
- Step-by-step character creation form
- Image upload capability
- All core D&D 5e attributes
- Input validation
- Save to local storage

### 3. Character Details (`app/character/[id].tsx`)
- Comprehensive character sheet view
- HP tracking with +/- buttons
- All ability scores with modifiers
- Combat information
- Personality traits
- Equipment list
- Edit and delete options

### 4. Dice Roller (`app/(tabs)/dice.tsx`)
- Quick dice rolling interface
- Common D&D dice (d4, d6, d8, d10, d12, d20, d100)

### 5. Spells (`app/(tabs)/spells.tsx`)
- Spell reference database
- Searchable spell list
- Spell details (level, school, components)

### 6. Tools (`app/(tabs)/tools.tsx`)
- Additional utilities and references
- Quick links to resources

## 🔄 Data Flow

1. **Character Creation**: User inputs → Validation → Storage (AsyncStorage) → Redirect to list
2. **Character Viewing**: Fetch from storage → Display in UI
3. **Character Editing**: Fetch → Modify → Save → Update UI
4. **HP Tracking**: Current state → Calculate new value → Update storage → Reflect in UI

## 🌐 Platform Support

### Web
- Hosted on Vercel
- Full feature parity with mobile
- File picker for image uploads
- Responsive design

### iOS
- Native iOS app via Expo
- Camera and photo library access
- Optimized for iPhone and iPad

### Android
- Native Android app via Expo
- Material Design principles
- Optimized for various screen sizes

## 🔐 Data Privacy

- All data stored locally on device
- No server-side storage or cloud sync
- No user accounts required
- No data collection or tracking

## 🎮 D&D 5e Rules Implementation

The app implements core D&D 5th Edition rules:
- **Ability Modifiers**: `(score - 10) / 2` (rounded down)
- **Proficiency Bonus**: Based on character level (level 1-4: +2, 5-8: +3, etc.)
- **Skill Checks**: Ability modifier + proficiency bonus (if proficient)
- **Standard Array**: Support for point buy and standard array ability scores

## 🚀 Future Enhancements

Potential features for future releases:
- Cloud sync across devices
- Character sharing
- Dice roll history
- Combat tracker
- Condition tracking
- Spell slot management
- Class-specific features
- Party management
- Campaign notes
- PDF character sheet export
