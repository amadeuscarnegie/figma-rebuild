# Storybook Setup

## Overview

Storybook v10.2.8 is set up as a component workshop for the figma-rebuild project. It renders each component in isolation with configurable props, so you can browse every state without navigating through the full app.

## Quick Start

```bash
# Start the dev server (opens in browser)
npx storybook dev

# Build a static, shareable version
npx storybook build
```

The dev server runs on a random port (shown in terminal output). The static build outputs to `storybook-static/`.

## What's Configured

### Files

| File | Purpose |
|------|---------|
| `.storybook/main.ts` | Storybook config — framework, addons, story file patterns |
| `.storybook/preview.ts` | Global preview settings — imports `globals.css` for Tailwind tokens |
| `.storybook/preview-head.html` | Loads Nunito font (Google Fonts) into Storybook's HTML |
| `.storybook/vitest.setup.ts` | Vitest integration for running story tests |
| `src/**/*.stories.tsx` | Story files (one per component, co-located next to the component) |

### Addons Installed

- **@storybook/addon-docs** — Auto-generated documentation pages with props tables
- **@storybook/addon-a11y** — Accessibility checks on every story
- **@storybook/addon-vitest** — Run stories as Vitest tests
- **@storybook/addon-onboarding** — First-run tutorial (can be removed)
- **@chromatic-com/storybook** — Chromatic integration for cloud visual testing (optional)

## Component Stories

### UI Primitives

| Component | Stories | Play Functions |
|-----------|---------|----------------|
| **ActionButton** | Primary, Danger, Disabled | Primary: clicks button, verifies onClick fires. Disabled: verifies button is disabled and click is ignored. |
| **Toggle** | On, Off | On: verifies aria-checked="true". Off: clicks switch, verifies onToggle fires. |
| **Modal** | Default, TopAligned, NoCloseButton | Default: clicks X button, verifies onClose fires. |
| **SettingsInput** | Text, Password, Empty, Interactive | Interactive story uses internal useState for live editing. |
| **SettingsSelect** | Default, Year | Controls for label, value. |

### Display Components

| Component | Stories | Notes |
|-----------|---------|-------|
| **StatCard** | XP, QuestionsAnswered, TopPercent | Simple display, controls for value/label. |
| **LevelCard** | Default | Pulls from mock data, no props. |
| **ProfileHeader** | Default | Pulls from mock data, includes edit modal. |
| **StreakBadge** | Active, Inactive, HighStreak | Controls for count and active state. |
| **ProgressBar** | NotStarted, Halfway_AllCorrect, Halfway_Mixed, Complete_AllCorrect, Complete_MostlyCorrect, Complete_AllIncorrect | `total` = question count, `segments` = answers so far. Bar fills to segments.length/total. Green = correct, red = incorrect. |
| **MCQOption** | Default, Selected, Correct, Incorrect, Answer, Disabled | Default: clicks option, verifies onClick. Selected: verifies aria-pressed. Incorrect/Disabled: verifies button is disabled. |
| **Navbar** | Default | Full navbar with dropdowns and modals. |
| **TabGroup** | Overview, Leaderboard, Interactive | Interactive story uses useState for live tab switching. |

### Feature Components

| Component | Stories | Notes |
|-----------|---------|-------|
| **MCQOptionGroup** | QuestionPhase, WithSelection, FeedbackCorrect, FeedbackIncorrect, FeedbackMultiSelect | Shows all option states in context. Phase control switches between question/feedback. |
| **StreakCalendar** | Default | Full calendar with navigation. |
| **ActivityChart** | Default | SVG chart with time period dropdown. |
| **SummaryCard** | GoodScore, PoorScore | Green card for good scores, red for poor. |
| **ActionsCard** | WithMistakes, NoMistakes | WithMistakes: clicks Restart and Redo, verifies callbacks. NoMistakes: verifies Redo is hidden. |
| **ActivityNavbar** | InProgress, NoStreak, Fresh | Quiz progress bar with streak badge. |
| **ActivityFooter** | QuestionDisabled, QuestionReady, QuestionMultiSelect, FeedbackCorrect, FeedbackPartial, FeedbackIncorrect | QuestionDisabled: verifies Check is disabled. QuestionReady: clicks Check. QuestionMultiSelect: verifies "Select 2 options" text. FeedbackCorrect: clicks Continue. |
| **QuestionPanel** | NoSelection, WithSelection, FeedbackPhase | Full question with MCQ options. |

### Container Components

| Component | Stories | Notes |
|-----------|---------|-------|
| **Leaderboard** | Default | Full leaderboard with expand/collapse. Uses mock data. |
| **Achievements** | Default | Achievement grid with show more/less. Uses mock data. |
| **Settings** | Default | All four settings cards composed together. |
| **SettingsCard** | Default | Card/CardTitle/Divider primitives. |
| **ProfileDetailsCard** | Default | Editable form with save. |
| **PreferencesCard** | Default | Toggle preferences. |
| **ChangePasswordCard** | Default | Password validation flow. |
| **DeleteAccountCard** | Default | Delete with confirmation modal. |
| **EndScene** | GoodScore, PoorScore | Quiz completion with Lottie animation and animated stats. |
| **QuizActivity** | Default | Full interactive quiz flow. |

## Play Functions (Interaction Tests)

Play functions automate user interactions and run assertions when you view a story. Results appear in the **Interactions** tab in the addons panel.

Stories with play functions:
- **ActionButton > Primary** — clicks button, asserts onClick called
- **ActionButton > Disabled** — asserts disabled, asserts click ignored
- **Toggle > On** — asserts aria-checked is true
- **Toggle > Off** — clicks switch, asserts onToggle called
- **MCQOption > Default** — clicks option, asserts onClick called
- **MCQOption > Selected** — asserts aria-pressed is true
- **MCQOption > Incorrect** — asserts disabled, asserts click ignored
- **MCQOption > Disabled** — asserts disabled
- **Modal > Default** — clicks close button, asserts onClose called
- **ActivityFooter > QuestionDisabled** — asserts Check button disabled
- **ActivityFooter > QuestionReady** — clicks Check, asserts onCheck called
- **ActivityFooter > QuestionMultiSelect** — asserts "Select 2 options" text
- **ActivityFooter > FeedbackCorrect** — clicks Continue, asserts onContinue called
- **ActionsCard > WithMistakes** — clicks Restart and Redo, asserts both callbacks
- **ActionsCard > NoMistakes** — asserts Redo mistakes button is hidden

## Sharing Storybook

### Option 1: Static Build (simplest)

```bash
npx storybook build
```

This generates `storybook-static/` — a fully static site (HTML/CSS/JS). Deploy it to any static host:

- **Netlify**: drag and drop the folder, or connect your repo
- **Vercel**: `npx vercel storybook-static/`
- **GitHub Pages**: push `storybook-static/` to a `gh-pages` branch

Anyone with the URL can browse all components — no code or setup needed.

### Option 2: Share the Repo

Anyone who clones the project can run:

```bash
npm install
npx storybook dev
```

### Option 3: Chromatic (cloud service)

Chromatic hosts your Storybook automatically and adds visual regression testing. The `@chromatic-com/storybook` addon is already installed.

To set up:
1. Sign up at [chromatic.com](https://www.chromatic.com)
2. Create a project (link to your repo)
3. Run: `npx chromatic --project-token=<your-token>`

Free tier: 5,000 snapshots/month (~70 stories = ~70 builds/month).

## Key Concepts

- **Story** = one specific state of a component, defined with props via `args`
- **Controls** = the panel that lets you edit props live (text, boolean, select, number)
- **Actions** = logged callback events (click the Actions tab after interacting)
- **Play function** = automated interaction script that runs when you view a story
- **Interactions tab** = shows play function steps with pass/fail results
- **Docs tab** = auto-generated component documentation with props table and descriptions
- **Visual testing** = screenshot comparison against a baseline to catch regressions
