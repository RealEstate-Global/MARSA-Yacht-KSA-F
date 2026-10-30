# Setup Guide — Al Marsa

Instructions for setting up the local development environment, testing, and deploying the Al Marsa lookbook application.

---

## 1. System Requirements

| Tool | Version | Notes |
| :--- | :--- | :--- |
| **Node.js** | `24.x` (LTS recommended) | `22.x` minimum supported |
| **npm** | `10.x` or higher | Shipped with Node.js |
| **OS** | Windows, macOS, or Linux | Cross-platform compatible |

---

## 2. Local Environment Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/RealEstate-Global/MARSA-Yacht-KSA-F.git
cd MARSA-Yacht-KSA-F
```

### Step 2: Install Dependencies
```bash
cd marsa
npm ci
```

### Step 3: Launch Local Development Server
```bash
npm run dev
```
Open [http://localhost:4200](http://localhost:4200) in your browser. The application supports hot module replacement (HMR).

---

## 3. Available NPM Scripts

All commands must be executed within the `marsa/` directory:

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm run dev` | `ng serve` | Runs local dev server on `http://localhost:4200` |
| `npm run build` | `ng build` | Compiles optimized production bundle in `dist/public/browser` |
| `npm run test` | `ng test` | Executes unit tests via Vitest in jsdom |
| `npm run typecheck` | `tsc --noEmit` | Validates TypeScript and template type safety |
| `npm run serve` | `npx serve dist/public/browser` | Previews production build locally |

---

## 4. IDE Recommendations

### Visual Studio Code
Recommended extensions:
- **Angular Language Service** (`Angular.ng-template`)
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
- **Prettier - Code Formatter** (`esbenp.prettier-vscode`)
- **EditorConfig for VS Code** (`EditorConfig.EditorConfig`)

---

## 5. Deployment Setup (Vercel)

The application is deployed on Vercel from the `main` branch.

- **Root Directory**: `marsa`
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public/browser`
- **Routing Rules**: Configured in `marsa/vercel.json` to rewrite all route paths to `/index.html` for Angular Router client-side routing.

For questions or assistance, please open an issue or refer to [DEVELOPMENT.md](./DEVELOPMENT.md).
