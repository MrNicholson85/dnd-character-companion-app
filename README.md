# D&D Character Companion 🎲⚔️

A cross-platform mobile and web application for managing Dungeons & Dragons 5th Edition characters. Built with React Native and Expo, featuring character creation, HP tracking, ability score management, and more.

![Platform Support](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue)
![Expo SDK](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?logo=react)

## ✨ Features

- **Character Management** - Create, edit, and delete D&D 5e characters
- **Ability Scores** - Track all six ability scores with automatic modifier calculation
- **Combat Stats** - Monitor HP, AC, initiative, speed, and hit dice
- **Character Images** - Upload custom character portraits
- **Skills & Proficiencies** - Select and track proficient skills
- **Persistent Storage** - All data saved locally with AsyncStorage
- **Cross-Platform** - Works seamlessly on iOS, Android, and Web

## 🚀 Quick Start

```bash
# Fast installation with Bun (recommended)
bun install

# Or use npm (slower but more stable)
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

## Available Commands

### Development
- `npm run dev` - Start development server for web on port 3000
- `npm start` - Start development server (shows QR code for mobile)
- `npm run start:web` - Start web development server
- `npm run start:ios` - Start iOS development server
- `npm run start:android` - Start Android development server

### Building
- `npm run build:web` - Build for web production
- `npm run build:ios` - Build for iOS
- `npm run build:android` - Build for Android

### Package Management (Bun - Fast)
- `bun install` - Install dependencies (fastest)
- `npm run install:fast` - Install with Bun, skip postinstall (very fast)
- `npm run add <package>` - Add package with Bun
- `npm run setup` - Run Expo install for native linking

### Package Management (npm - Stable)
- `npm install` - Install dependencies (slower but stable)
- `npm run setup` - Run Expo install for native linking

### Utilities
- `npm run doctor` - Check project setup and dependencies
- `npm run upgrade` - Upgrade Expo SDK and dependencies
- `npm run lint` - Run linting
- `npm run eject` - Eject from Expo (use with caution)

## 📁 Project Structure

```
dnd-character-companion-app/
├── app/                      # Expo Router screens (file-based routing)
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
│   ├── ui/                  # Core UI components (Button, Card)
│   ├── Card.tsx
│   └── RuleSection.tsx
├── constants/               # App constants
│   └── design.ts            # Design system (colors, spacing, typography)
├── types/                   # TypeScript type definitions
│   └── character.ts         # Character interface
├── utils/                   # Utility functions
│   ├── dnd.ts              # D&D 5e rules & calculations
│   └── storage.ts          # AsyncStorage helpers
├── assets/                  # Images and static assets
├── docs/                    # Documentation
└── public/                  # Web-specific files
```

## 🛠️ Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router (file-based routing)
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS) + StyleSheet API
- **Storage**: AsyncStorage for local persistence
- **Icons**: Lucide React Native
- **Image Handling**: Expo Image Picker

## Performance Tips

### For fastest installation:
1. Use `bun install` (2-10x faster than npm)
2. Use `npm run install:fast` to skip postinstall steps
3. Only run `npm run setup` when you need native linking

### For most stable installation:
1. Use `npm install` (slower but more compatible)
2. Run `npm run setup` after installing new native dependencies

## Future Improvements

### Features
- [ ] **Cloud Sync** - Store characters in cloud storage (Firebase/Supabase) for multi-device access
- [ ] **Party Management** - Create and manage adventuring parties with shared initiative tracker
- [ ] **Advanced Dice Roller** - Add dice roll history, custom roll macros, and advantage/disadvantage
- [ ] **Spell Slots Tracker** - Track spell slot usage by level for spellcasting classes
- [ ] **Inventory Management** - Enhanced equipment system with weight tracking and currency
- [ ] **Character Export/Import** - Export characters as JSON/PDF for sharing or backup

### Technical Enhancements
- [ ] **Testing Suite** - Add unit tests (Jest) and E2E tests (Detox/Playwright)
- [ ] **State Management** - Migrate to Zustand or Context API for complex shared state
- [ ] **Offline-First Sync** - Implement conflict resolution for multi-device scenarios
- [ ] **Performance Optimization** - Add list virtualization for large character collections
- [ ] **Accessibility** - Improve screen reader support and keyboard navigation
- [ ] **Analytics** - Add privacy-friendly analytics (Expo Analytics or Plausible)

### Content
- [ ] **More D&D Rules** - Add support for feats, multiclassing, backgrounds
- [ ] **Monster Manual Integration** - Quick reference for common monsters
- [ ] **Campaign Notes** - Track session notes, quests, and NPC relationships
- [ ] **Character Builder** - Step-by-step guided character creation wizard

## 🎨 Design System

The app uses a dark fantasy theme optimized for gaming sessions. All design tokens are centralized in `constants/design.ts`:

- **Colors**: Dark slate backgrounds with purple/gold accents
- **Typography**: Predefined text styles (h1-h3, body, caption)
- **Spacing**: Consistent spacing scale (xs to xxl)
- **D&D-specific**: HP bars, dice colors (d4-d20), stat badges

## 📚 Documentation

- [APP_OVERVIEW.md](docs/APP_OVERVIEW.md) - Detailed app architecture and features
- [API_REFERENCE.md](docs/API_REFERENCE.md) - API documentation
- [SETUP.md](docs/SETUP.md) - Setup guide
- [CONTRIBUTING.md](docs/CONTRIBUTING.md) - Contribution guidelines
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment instructions

## 🤖 Notes for AI Agents

- **Fast setup**: Use `bun install` then `npm run dev`
- **Stable setup**: Use `npm install` then `npm run dev`
- Use `npm run doctor` to diagnose issues
- Use `npm run setup` instead of `npm run install` for Expo packages
- The project uses Expo Router for navigation
- Web version runs on port 3000 by default
- Bun is 2-10x faster than npm for package installation 
