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

## 2. Web Deployment

### Option A: Render (Recommended for Node.js hosting)

#### Step 1: Install serve package
```powershell
npm install serve
```

#### Step 2: Create Render service
1. Go to https://render.com and create a new Web Service
2. Connect your GitHub repository
3. Configure the service:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node

#### Step 3: The app will automatically deploy!
- Render will build your web app and serve it
- Your app will be available at `https://your-app.onrender.com`
- Every push to your main branch triggers a new deployment

**Note**: The `render.yaml` file in the project root pre-configures these settings.

### Option B: Vercel (Alternative - Static hosting)

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
