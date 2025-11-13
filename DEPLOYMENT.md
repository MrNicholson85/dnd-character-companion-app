# D&D Character Companion - Deployment Guide

## Prerequisites

Before deploying, make sure you have:
- An Expo account (sign up at https://expo.dev)
- For iOS: Apple Developer Account ($99/year)
- For Android: Google Play Console Account ($25 one-time)

## 1. iOS Deployment

### Step 1: Install EAS CLI
```powershell
npm install -g eas-cli
```

### Step 2: Login to Expo
```powershell
eas login
```

### Step 3: Configure your project
```powershell
eas build:configure
```
This will update your `app.json` with a project ID.

### Step 4: Build for iOS
```powershell
# For iOS Simulator (testing)
eas build --platform ios --profile development

# For TestFlight/App Store
eas build --platform ios --profile production
```

### Step 5: Submit to App Store
```powershell
eas submit --platform ios
```

You'll need:
- Apple ID
- App-specific password
- Bundle identifier matches Apple Developer Portal

---

## 2. Web Deployment (Vercel)

### Step 1: Build for web
```powershell
npm run build:web
```
This creates a `dist` folder with your web app.

### Step 2: Install Vercel CLI
```powershell
npm install -g vercel
```

### Step 3: Deploy to Vercel
```powershell
cd dist
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments:
1. Go to https://vercel.com
2. Import your GitHub repository
3. Vercel will auto-detect settings
4. Deploy!

---

## 3. Android Deployment

### Step 1: Build for Android
```powershell
# For testing
eas build --platform android --profile development

# For Google Play Store
eas build --platform android --profile production
```

### Step 2: Submit to Google Play
```powershell
eas submit --platform android
```

You'll need:
- Google Play Console account
- Service account JSON key

---

## Quick Commands Reference

```powershell
# iOS
eas build --platform ios --profile production
eas submit --platform ios

# Web
npm run build:web
vercel

# Android
eas build --platform android --profile production
eas submit --platform android
```

---

## Notes

- **iOS builds** require a Mac for local builds, but EAS builds in the cloud
- **Web builds** can be hosted on Vercel, Netlify, or GitHub Pages
- **Android builds** generate APK or AAB files
- First-time builds take 15-30 minutes
- Use `--profile preview` for internal testing before production
