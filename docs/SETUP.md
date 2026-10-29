# Setup Guide

## System Requirements

- **Node.js**: 24.x (matches CI; 22.x also works)
- **npm**: 10.x or higher
- **Operating System**: Windows, macOS, or Linux
- **Browser**: Modern browser with ES2022 support (Chrome, Firefox, Safari, Edge)

## Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F.git
cd MARSA-Yacht-KSA-F
```

### 2. Install Dependencies
```bash
cd marsa
npm ci
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at [http://localhost:4200](http://localhost:4200)

### 4. Verify Setup
- Open browser to `http://localhost:4200`
- Check browser console for any errors
- Run `npm run test` and `npm run typecheck` — both should pass

## IDE Setup

### Visual Studio Code
Recommended extensions:
- **Angular Language Service**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**

### WebStorm / IntelliJ IDEA
- Angular support is built-in

## Build & Deployment

### Development Build
```bash
npm run build -- --configuration development
```
Output: `marsa/dist/public`

### Production Build
```bash
npm run build
```

## Deployment

The application is deployed on Vercel. Configuration lives in
`marsa/vercel.json`: the build produces `dist/public/browser`, and all routes
rewrite to `/index.html` so Angular Router handles deep links.

## Need Help?

Check the [DEVELOPMENT.md](./DEVELOPMENT.md) guidelines or open an issue.
