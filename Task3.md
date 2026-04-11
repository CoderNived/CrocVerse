# 🐊 CrocoVerse — Phase 1, Step 3: Homepage UI

The Homepage is your first impression. It needs to communicate what CrocoVerse is, make users want to explore, and feel like a real product — not a tutorial project. Let's design it with intent.

---

## 🧠 Think Like a Product Designer First

Before writing a single line, answer these questions mentally:

> **"What does a user need to understand within 5 seconds of landing here?"**

- What *is* CrocoVerse?
- What can I *do* here?
- Where do I *go* next?

Every section you build should serve one of those three answers.

---

## 📐 Homepage Section Architecture

Break the Homepage into 5 distinct sections, each its own component:

```
src/pages/Home/
├── index.jsx               ← assembles all sections
└── components/
    ├── HeroSection.jsx
    ├── StatsBar.jsx
    ├── FeaturedSpecies.jsx
    ├── MLToolsTeaser.jsx
    └── CallToAction.jsx
```

**Why break it into sub-components?** Because `index.jsx` should read like a table of contents, not a wall of JSX. Each section is independently maintainable.

---

## 🗂️ Section-by-Section Blueprint

### 1. `HeroSection.jsx`

**Goal:** Instantly communicate the product's identity.

Contains:
- A bold headline — something like *"The World's Most Complete Crocodile Intelligence Platform"*
- A short subheading (1–2 lines max)
- Two CTA buttons: `"Explore Species"` → `/species` and `"Try ML Tools"` → `/ml-tools`
- A background — dark overlay with a high-quality crocodile image or a subtle pattern

> **Design hint:** Large text, high contrast, minimal clutter. Think Stripe's or Linear's hero section energy.

---

### 2. `StatsBar.jsx`

**Goal:** Build instant credibility with numbers.

A horizontal bar with 3–4 stats, like:

| Stat | Value |
|---|---|
| 🐊 Species Documented | 27 |
| 🌍 Continents Covered | 6 |
| 🤖 ML Models Available | 2 |
| 📊 Data Points | 500+ |

> **Design hint:** Dark background, light text, evenly spaced. This is a common SaaS trust-builder pattern.

---

### 3. `FeaturedSpecies.jsx`

**Goal:** Pull users into the knowledge platform.

A grid of Species Cards — 3 or 4 cards showing:
- Species image (use placeholder images for now)
- Common name + scientific name
- A short one-liner
- A `"Learn More →"` link to `/species/:id`

> **Design hint:** Use a `grid-cols-1 md:grid-cols-3` Tailwind layout. Cards should have hover effects — slight shadow lift or border highlight. This signals interactivity.

> 🔑 Create a `FEATURED_SPECIES` constant array in `src/constants/species.js` with mock data — don't hardcode data inside the component. This is a clean code habit that will matter when you wire up the real API later.

---

### 4. `MLToolsTeaser.jsx`

**Goal:** Introduce the ML layer — make it feel powerful.

A two-column layout:
- **Left:** Text explaining the ML tools (Weight Predictor + Age Classifier)
- **Right:** A visual — could be a simple icon-based illustration, a mock chart, or a styled "preview card" of the tool UI

> **Design hint:** This is a classic SaaS "feature spotlight" section. Think of how Notion or Vercel highlights features mid-page.

---

### 5. `CallToAction.jsx`

**Goal:** End the page with a clear next action.

Simple, centered section:
- Headline: *"Ready to dive deep into crocodile science?"*
- One button: `"Start Exploring"` → `/species`

> **Design hint:** High contrast background (different from the rest of the page to create a visual break). Short and punchy — don't overwhelm.

---

## ✅ Task Checklist

### 3.1 — Create the folder structure

```bash
mkdir -p src/pages/Home/components
touch src/pages/Home/index.jsx
touch src/pages/Home/components/HeroSection.jsx
touch src/pages/Home/components/StatsBar.jsx
touch src/pages/Home/components/FeaturedSpecies.jsx
touch src/pages/Home/components/MLToolsTeaser.jsx
touch src/pages/Home/components/CallToAction.jsx
```

---

### 3.2 — Create `src/constants/species.js`

> 🔑 Add an array of 3–4 mock species objects. Each object should have: `id`, `commonName`, `scientificName`, `description`, `imageUrl` (use any placeholder URL), `continent`

```js
export const FEATURED_SPECIES = [
  {
    id: "saltwater-crocodile",
    commonName: "Saltwater Crocodile",
    scientificName: "Crocodylus porosus",
    description: "The largest living reptile, found across Southeast Asia and Northern Australia.",
    imageUrl: "https://placehold.co/400x250?text=Saltwater+Croc",
    continent: "Asia / Oceania",
  },
  {
    id: "nile-crocodile",
    commonName: "Nile Crocodile",
    scientificName: "Crocodylus niloticus",
    description: "Africa's largest crocodilian and one of the most dangerous predators on the continent.",
    imageUrl: "https://placehold.co/400x250?text=Nile+Croc",
    continent: "Africa",
  },
  {
    id: "american-alligator",
    commonName: "American Alligator",
    scientificName: "Alligator mississippiensis",
    description: "A conservation success story, thriving in the wetlands of the southeastern United States.",
    imageUrl: "https://placehold.co/400x250?text=American+Gator",
    continent: "North America",
  },
];
```

---

### 3.3 — Build `HeroSection.jsx`

> 🔑 **Hint:** Use Tailwind's `bg-cover bg-center` for background image. Wrap content in a `relative z-10` div over a dark overlay (`absolute inset-0 bg-black/60`). Both CTA buttons should be visually distinct — one filled, one outlined.

---

### 3.4 — Build `StatsBar.jsx`

> 🔑 **Hint:** `flex justify-around` or `grid grid-cols-4`. Each stat is a small repeated pattern — number in large bold text, label below it.

---

### 3.5 — Build `FeaturedSpecies.jsx`

> 🔑 Import your mock data from `constants/species.js` and `.map()` over it to render cards. Don't hardcode 3 separate `<Card>` blocks.

---

### 3.6 — Build `MLToolsTeaser.jsx`

> 🔑 Use `grid grid-cols-1 md:grid-cols-2 gap-8` for the two-column layout. Mobile-first always.

---

### 3.7 — Build `CallToAction.jsx`

> 🔑 Keep it under 10 lines of JSX. Simplicity is the point.

---

### 3.8 — Assemble everything in `Home/index.jsx`

Import all 5 sections and stack them in order. The file should be clean — just imports and a return with 5 components.

```jsx
import HeroSection from './components/HeroSection';
import StatsBar from './components/StatsBar';
import FeaturedSpecies from './components/FeaturedSpecies';
import MLToolsTeaser from './components/MLToolsTeaser';
import CallToAction from './components/CallToAction';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeaturedSpecies />
      <MLToolsTeaser />
      <CallToAction />
    </>
  );
}
```

---

## ⚠️ Quality Rules for This Step

| Rule | Reason |
|---|---|
| No inline styles — Tailwind only | Consistency and maintainability |
| All mock data lives in `constants/`, not components | Separation of data from UI |
| Every card/section is its own component | Single responsibility principle |
| Use `<Link>` not `<a>` for all internal navigation | SPA behavior |
| Mobile-first Tailwind classes (`md:`, `lg:`) | Real products are responsive |

---

## 💡 Senior Engineer Thinking Prompt

When building `FeaturedSpecies.jsx`, you'll write a `.map()` over your species array. Ask yourself:

> *"What happens when this data comes from an API and is loading? What happens if the API returns an error?"*

You don't need to solve this now — but stub a loading state in your mind. Later, you'll add an `isLoading` prop that shows skeleton cards instead of real ones. **Build the component aware that this will change.**

---

*Phase 1, Step 3 complete. Next up: Species Detail page.*