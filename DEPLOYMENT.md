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

## 2. Web Deployment (Firebase Hosting)

### Step 1: Install Firebase CLI
```powershell
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```powershell
firebase login
```

### Step 3: Initialize Firebase in your project
```powershell
firebase init
```
Select:
- **Hosting**: Configure files for Firebase Hosting
- **Firestore**: (Optional) If using Firestore for character storage
- **Authentication**: (Optional) If adding user accounts

Configuration:
- **Public directory**: `dist`
- **Single-page app**: Yes
- **Automatic builds**: Optional (GitHub integration)

### Step 4: Build your web app
```powershell
npm run build:web
```

### Step 5: Deploy to Firebase
```powershell
firebase deploy
```

Your app will be live at `https://your-project-id.web.app`

### Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Get your Firebase config from Project Settings
4. Update `utils/firebase.ts` with your config values

**Optional: Set up Firestore**
- Enable Firestore Database in Firebase Console
- Update security rules for character data
- Migrate from AsyncStorage to Firestore using `utils/firestore.ts`

---

## 3. Alternative: Vercel (Static hosting)

#### Step 1: Build for web
```powershell
npm run build:web
```
This creates a `dist` folder with your web app.

#### Step 2: Install Vercel CLI
```powershell
npm install -g vercel
```

#### Step 3: Deploy to Vercel
```powershell
cd dist
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments:
1. Go to https://vercel.com
2. Import your GitHub repository
3. Configure build settings:
   - **Build Command**: `npm run build:web`
   - **Output Directory**: `dist`
4. Deploy!

**Note**: The `vercel.json` file in the project root handles routing for single-page apps.

---

## 4. Android Deployment

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
