# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pixel-perfect rebuild of a Cognito education platform account page from a Figma design. This is a static, single-page React app — no routing, no backend, no state management library. All mock data lives in `src/data/constants.ts`.

## Commands

- `npm run dev` — Start Vite dev server (localhost:5173)
- `npm run build` — Type-check with `tsc -b` then build with Vite
- `npm run test` — Run all unit tests with Vitest
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build
- `node screenshot.mjs` — Capture full-page screenshot (requires dev server running)

## Tech Stack

- **React 19** + **TypeScript 5.9** + **Vite 7**
- **Tailwind CSS v4** (uses `@import "tailwindcss"` syntax, not v3 `@tailwind` directives)
- **Lucide React** for icons
- **Vitest** + **Testing Library** for unit tests
- **Playwright** for screenshots only (not used for testing)

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
├── lib/utils.ts     # cn() helper (clsx + tailwind-merge)
├── assets/images/   # SVGs and PNGs from Figma export
└── globals.css      # Tailwind config + design tokens
```

`App.tsx` renders `AccountPage` directly — there is no router. `AccountPage` composes all feature components into the full layout at a fixed 1024px width.

## Styling Conventions

- **Font:** Nunito (400, 600, 700, 800) loaded via `<link>` preconnect in `index.html`
- **Design tokens** are defined as CSS custom properties in `globals.css` under `@theme inline` — use these (e.g., `text-text-primary`, `bg-profile-bg`, `text-blue-600`) rather than hardcoding hex values. Zero hardcoded hex values in components.
- Components use Tailwind utility classes with arbitrary values (`h-[44px]`, `px-[24px]`) to match Figma specs precisely
- Use the `cn()` utility from `@/lib/utils` for conditional class merging

## Performance Patterns

- Components use `React.memo` to prevent unnecessary re-renders (e.g., Navbar and ProfileHeader don't re-render on tab changes)
- SVG path computations are memoized with `useMemo`
- Event handlers use `useCallback` with functional state updates for stable references
- State is colocated — calendar navigation only re-renders the calendar, not sibling components

## Testing

Tests live next to their source in `__tests__/` directories. Run a single test file with:
```bash
npx vitest run src/hooks/__tests__/useClickOutside.test.tsx
```

## Path Aliases

`@/*` maps to `./src/*` — use `@/components/...`, `@/lib/utils`, `@/assets/...` for imports.
