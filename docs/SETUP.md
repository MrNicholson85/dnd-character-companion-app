# D&D Character Companion - Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or later) - [Download](https://nodejs.org/)
- **npm** or **bun** package manager
- **Git** - [Download](https://git-scm.com/)
- **Expo CLI** - Will be installed with project dependencies

### Platform-Specific Requirements

#### For iOS Development
- **macOS** (required for iOS simulator)
- **Xcode** (latest version)
- **iOS Simulator** (included with Xcode)
- **Apple Developer Account** ($99/year for App Store deployment)

#### For Android Development
- **Android Studio** with Android SDK
- **Android Emulator** or physical Android device
- **Google Play Console Account** ($25 one-time fee for Play Store deployment)

#### For Web Development
- Any modern web browser
- **Vercel Account** (free) - [Sign up](https://vercel.com)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/MrNicholson85/dnd-character-companion-app.git
cd dnd-character-companion-app
```

### 2. Install Dependencies

```bash
npm install
```

Or if using Bun:

```bash
bun install
```

### 3. Verify Installation

Check that all dependencies are installed correctly:

```bash
npm run doctor
```

---

## Development

### Running the App Locally

#### Start Development Server

```bash
npm start
```

This will start the Expo development server and display a QR code.

#### Run on Specific Platforms

**iOS Simulator** (macOS only):
```bash
npm run start:ios
```

**Android Emulator**:
```bash
npm run start:android
```

**Web Browser**:
```bash
npm run start:web
# or
npm run dev
```

### Using Expo Go

1. Install **Expo Go** on your mobile device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Run `npm start` on your computer

3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

---

## Project Configuration

### Environment Setup

The project uses environment variables for configuration. Create a `.env` file in the root directory if needed:

```env
# Example environment variables
EXPO_NO_TELEMETRY=1
```

### App Configuration

Main configuration is in `app.json`:

```json
{
  "expo": {
    "name": "D&D Character Companion",
    "slug": "dnd-character-companion",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.mrnicholson85.dndcharactercompanion"
    },
    "android": {
      "package": "com.mrnicholson85.dndcharactercompanion"
    }
  }
}
```

### Tailwind CSS Configuration

Tailwind is configured via `tailwind.config.js`. The configuration includes:

```javascript
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## Building for Production

### Web Build

```bash
npm run build:web
```

Output: `dist/` folder

### iOS Build

```bash
eas build --platform ios --profile production
```

### Android Build

```bash
eas build --platform android --profile production
```

---

## Deployment

### Deploy to Web (Vercel)

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Build and Deploy**:
```bash
npm run build:web
cd dist
vercel --prod
```

### Deploy to iOS App Store

1. Ensure you have an Apple Developer account
2. Build with EAS:
```bash
eas build --platform ios --profile production
```
3. Submit to App Store:
```bash
eas submit --platform ios
```

### Deploy to Google Play Store

1. Ensure you have a Google Play Console account
2. Build with EAS:
```bash
eas build --platform android --profile production
```
3. Submit to Play Store:
```bash
eas submit --platform android
```

---

## Development Workflow

### Recommended IDE Setup

**Visual Studio Code** with extensions:
- ESLint
- Prettier
- React Native Tools
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

### Code Style

The project uses:
- **TypeScript** for type safety
- **Prettier** for code formatting (`.prettierrc`)
- **ESLint** for code linting

Format code:
```bash
npm run lint
```

### File Structure Guidelines

- **Components**: Place in `components/` directory
- **Screens**: Use file-based routing in `app/` directory
- **Utilities**: Place helper functions in `utils/`
- **Types**: Define TypeScript types in `types/`
- **Constants**: Store constants in `constants/`

---

## Troubleshooting

### Common Issues

#### Metro Bundler Won't Start
```bash
# Clear Metro cache
npx expo start -c
```

#### Dependency Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

#### iOS Build Issues
```bash
# Clear iOS build folder
cd ios
rm -rf Pods Podfile.lock
pod install
```

#### Android Build Issues
```bash
# Clean Android build
cd android
./gradlew clean
```

### Expo Doctor

Run diagnostics:
```bash
npx expo doctor
```

### Clear All Caches

```bash
# Clear all caches and reinstall
rm -rf node_modules .expo dist web-build
npm install
npx expo start -c
```

---

## Testing

### Running on Physical Devices

#### iOS
1. Connect iPhone via USB
2. Trust the computer on your device
3. Run: `npm run start:ios`

#### Android
1. Enable Developer Mode on your Android device
2. Enable USB Debugging
3. Connect via USB
4. Run: `npm run start:android`

---

## Resources

### Documentation
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)

### Support
- [Expo Discord](https://chat.expo.dev/)
- [React Native Community](https://reactnative.dev/community/overview)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)

### Project Repository
- GitHub: [MrNicholson85/dnd-character-companion-app](https://github.com/MrNicholson85/dnd-character-companion-app)

---

## Quick Reference

### Useful Commands

```bash
# Development
npm start              # Start development server
npm run dev           # Start web development server
npm run start:ios     # Run on iOS simulator
npm run start:android # Run on Android emulator
npm run start:web     # Run in web browser

# Building
npm run build:web     # Build for web
eas build --platform ios      # Build for iOS
eas build --platform android  # Build for Android

# Maintenance
npm run doctor        # Check project health
npm run upgrade       # Upgrade Expo SDK
npm run lint          # Lint code

# Deployment
vercel --prod         # Deploy web to Vercel
eas submit --platform ios     # Submit to App Store
eas submit --platform android # Submit to Play Store
```

---

## Next Steps

After setup, you can:

1. ✅ Run the app locally: `npm start`
2. ✅ Create your first character
3. ✅ Explore the codebase
4. ✅ Make modifications
5. ✅ Deploy to production

For detailed deployment instructions, see [DEPLOYMENT.md](../DEPLOYMENT.md)
