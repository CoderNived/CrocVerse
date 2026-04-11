# 🐊 CrocoVerse — Phase 1, Step 1: Project Setup

Love the project scope. Let's build this the right way. Before touching any code, let's make two foundational decisions.

---

## ⚡ Vite vs CRA — The Decision

**Use Vite. Always, for new projects in 2025+.**

Here's why this matters practically:

| Factor | Vite | CRA |
|---|---|---|
| Dev server startup | ~300ms | 5–15s |
| Hot Module Reload | Instant | Slow |
| Maintenance | Actively developed | Effectively abandoned |
| Bundle size | Smaller (Rollup) | Larger (Webpack) |
| Config flexibility | High | Low |

CRA is legacy. Vite is what real teams use today.

---

## 📁 Folder Structure — The Architecture Decision

A "college project" dumps everything in `/src`. A production app thinks in domains and responsibilities.

Here's the structure you'll be building toward:

```
crocoverse/
├── public/
└── src/
    ├── assets/           # Images, icons, fonts
    ├── components/       # Reusable UI building blocks
    │   ├── common/       # Button, Card, Badge, Loader...
    │   ├── layout/       # Navbar, Footer, PageWrapper...
    │   └── ui/           # Shadcn/Tailwind primitives
    ├── pages/            # Route-level components
    │   ├── Home/
    │   ├── SpeciesDetail/
    │   └── MLTools/
    ├── hooks/            # Custom React hooks
    ├── services/         # API call functions (later)
    ├── store/            # State management (later)
    ├── utils/            # Helper functions
    ├── constants/        # App-wide constants
    ├── styles/           # Global CSS / Tailwind config
    ├── App.jsx
    └── main.jsx
```

**Why this matters:** When your backend and ML layers come online in Phase 2 & 3, you won't need to restructure. Each folder has a single job, and a new team member can navigate it instantly.

---

## ✅ Task Checklist

Work through these in order:

### 1.1 — Scaffold the project with Vite

> 🔑 **Hint:** `npm create vite@latest` → choose **React** → choose **JavaScript** (not TypeScript for now, keep friction low)

```bash
npm create vite@latest crocoverse
cd crocoverse
npm install
```

---

### 1.2 — Install your UI library

> 🔑 **Recommendation:** Tailwind CSS — it's the industry standard, gives you full control, and pairs perfectly with the Wikipedia-but-modern look you want. Run the Tailwind + Vite setup (check Tailwind's official Vite guide, it's 4 commands).

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.js`:
```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

Add to `index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 1.3 — Install React Router

> 🔑 **Hint:** `react-router-dom` v6+ — you'll need this for page navigation

```bash
npm install react-router-dom
```

---

### 1.4 — Delete all Vite boilerplate

Clear out `App.jsx`, `App.css`, `index.css` (keep the files, empty the content)

---

### 1.5 — Create the folder structure

Just the folders for now, no files inside them yet:

```bash
mkdir -p src/assets
mkdir -p src/components/common src/components/layout src/components/ui
mkdir -p src/pages/Home src/pages/SpeciesDetail src/pages/MLTools
mkdir -p src/hooks src/services src/store src/utils src/constants src/styles
```

---

### 1.6 — Verify Tailwind is working

Add one Tailwind class to `App.jsx` and confirm it renders in the browser:

```jsx
function App() {
  return (
    <div className="text-green-500 text-2xl">
      🐊 CrocoVerse is alive
    </div>
  );
}

export default App;
```

Run `npm run dev` and confirm you see green text.

---

## 🧠 Things to Keep in Mind

- Keep your Node version at **18+** (check with `node -v`)
- Use **npm** consistently — don't mix with yarn mid-project
- **Commit after this step** before moving on. Get in the habit of atomic commits:

```bash
git init
git add .
git commit -m "feat: initialize vite project with tailwind and router"
```

---

*Phase 1, Step 1 complete. Next up: routing setup and first page shells.*