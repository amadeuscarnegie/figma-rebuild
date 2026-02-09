# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pixel-perfect rebuild of a Cognito education platform account page from a Figma design. This is a static, single-page React app — no routing, no backend, no state management library. All data is currently hardcoded in components.

## Commands

- `npm run dev` — Start Vite dev server (localhost:5173)
- `npm run build` — Type-check with `tsc -b` then build with Vite
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build
- `node screenshot.mjs` — Capture full-page screenshot (requires dev server running)
- `npx shadcn add <component>` — Add a shadcn/ui component

## Tech Stack

- **React 19** + **TypeScript 5.9** + **Vite 7**
- **Tailwind CSS v4** (uses `@import "tailwindcss"` syntax, not v3 `@tailwind` directives)
- **shadcn/ui** (new-york style, configured but few components installed yet) with Radix UI primitives
- **Lucide React** for icons
- **Playwright** for screenshots only (not used for testing)

## Architecture

```
src/
├── pages/           # Page-level components (currently just AccountPage)
├── components/
│   ├── chart/       # ActivityChart — custom SVG line chart
│   ├── navbar/      # Top navigation bar
│   ├── profile/     # User profile header section
│   ├── stats/       # LevelCard and StatCard components
│   ├── streak/      # StreakCalendar with flame icons
│   ├── tabs/        # TabGroup navigation
│   └── ui/          # shadcn/ui components
├── lib/utils.ts     # cn() helper (clsx + tailwind-merge)
├── assets/images/   # SVGs and PNGs from Figma export
└── globals.css      # Tailwind imports + design tokens
```

`App.tsx` renders `AccountPage` directly — there is no router. `AccountPage` composes all feature components into the full layout at a fixed 1024px width.

## Styling Conventions

- **Font:** Nunito (400, 600, 700, 800) loaded via Google Fonts in `globals.css`
- **Design tokens** are defined as CSS custom properties in `globals.css` under `@theme inline` — use these (e.g., `text-text-primary`, `bg-profile-bg`, `text-blue-600`) rather than hardcoding hex values
- Components use Tailwind utility classes with arbitrary values (`h-[44px]`, `px-[24px]`) to match Figma specs precisely
- Use the `cn()` utility from `@/lib/utils` for conditional class merging
- Dark mode variant is configured (`@custom-variant dark`) but not implemented

## Path Aliases

`@/*` maps to `./src/*` — use `@/components/...`, `@/lib/utils`, `@/assets/...` for imports.
