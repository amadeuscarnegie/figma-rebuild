# Cognito — Account Page

A pixel-perfect rebuild of the Cognito education platform's account page, originally designed in Figma.

**Live demo:** [figma-rebuild-eight.vercel.app](https://figma-rebuild-eight.vercel.app)

## Tech Stack

- **React 19** + **TypeScript 5.9** + **Vite 7**
- **Tailwind CSS v4** with a custom design token system
- **Lucide React** for icons
- **Vitest** + **Testing Library** for unit tests

## Getting Started

```bash
npm install
npm run dev       # Start dev server at localhost:5173
npm run build     # Type-check + production build
npm run test      # Run unit tests
npm run lint      # Run ESLint
```

## Architecture

```
src/
├── pages/           # Page-level layout (AccountPage)
├── components/
│   ├── chart/       # Custom SVG line chart with bezier curves
│   ├── navbar/      # Top navigation with dropdowns and modals
│   ├── profile/     # User profile header
│   ├── stats/       # LevelCard + StatCard components
│   ├── streak/      # Streak calendar with flame icons
│   ├── tabs/        # Tab navigation with sliding indicator
│   └── ui/          # Shared primitives (Modal)
├── hooks/           # useClickOutside, useFocusTrap
├── data/            # Centralized mock data constants
├── lib/             # Utility functions (cn)
├── assets/images/   # SVGs and PNGs from Figma
└── globals.css      # Tailwind config + design tokens
```

## Design Decisions

**Design tokens over hardcoded values.** All colors are defined as CSS custom properties in `globals.css` under `@theme inline` and used via Tailwind classes (e.g., `text-heading`, `bg-profile-bg`). Zero hardcoded hex values in any component.

**Custom SVG chart.** The activity chart uses hand-rolled cubic bezier curves rather than a charting library — appropriate for a static visualization and keeps the bundle lean.

**Shared Modal primitive.** A reusable `<Modal>` component handles backdrop, focus trapping, focus restoration, and close-on-Escape for all 4 modals in the app.

**Performance-conscious rendering.** Components use `React.memo` to prevent unnecessary re-renders (e.g., Navbar and ProfileHeader don't re-render on tab changes). SVG path computations are memoized with `useMemo`. State is colocated — calendar navigation only re-renders the calendar, not sibling components.

**Accessibility-first.** WAI-ARIA tabs pattern with roving tabindex and keyboard navigation. Focus trapping in modals with focus restoration on close. Proper `role="menu"`/`role="menuitem"` on dropdowns. Semantic HTML throughout.

**Data separated from UI.** All mock data lives in `src/data/constants.ts`, making it trivial to swap in real API data later.
