// ── User ────────────────────────────────────────────────────────────────
export const USER = {
  name: "Amadeus Carnegie",
  email: "amadeus@cognitoedu.org",
  initials: "A",
  accountType: "Free account",
} as const

// ── Navigation ──────────────────────────────────────────────────────────
export const COURSES = [
  "GCSE Maths",
  "GCSE Science",
  "A-Level Maths",
  "A-Level Physics",
] as const

export const ACCOUNT_MENU_ITEMS = [
  "My Account",
  "Settings",
  "Help",
  "Sign out",
] as const

// ── Streak ──────────────────────────────────────────────────────────────
export const STREAK_DATES = new Set([
  "2026-01-12",
  "2026-01-13",
  "2026-01-20",
  "2026-01-21",
  "2026-01-22",
])

export const CURRENT_STREAK_DAYS = 3

// ── Level & Stats ───────────────────────────────────────────────────────
export const LEVEL = {
  title: "Explorer",
  current: 2,
  next: 3,
  xp: 50,
  xpRequired: 200,
} as const

export const STATS = [
  { value: "2h 35m", label: "Time spent learning" },
  { value: "4,800 XP", label: "Total XP earned" },
  { value: "3 days", label: "Best streak" },
  { value: "12,460", label: "Questions answered" },
] as const

// ── Leaderboard ────────────────────────────────────────────────────────
export interface LeaderboardEntry {
  rank: number
  name: string
  xp: string
  avatarColor: string
  isYou?: boolean
  isAwardZone?: boolean
}

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank: 1, name: "Calm Llama", xp: "1,370 XP", avatarColor: "#FFB347", isAwardZone: true },
  { rank: 2, name: "Silly Goose", xp: "1,240 XP", avatarColor: "#87CEEB", isAwardZone: true },
  { rank: 6, name: "Happy Heron", xp: "860 XP", avatarColor: "#98D8C8" },
  { rank: 7, name: "Hairy Duck", xp: "860 XP", avatarColor: "#F7DC6F" },
  { rank: 8, name: "Sleepy Wombat", xp: "750 XP", avatarColor: "#BB8FCE", isYou: true },
  { rank: 9, name: "Sly Fox", xp: "720 XP", avatarColor: "#85C1E9" },
  { rank: 10, name: "Brave Lion", xp: "690 XP", avatarColor: "#82E0AA" },
]

export const LEADERBOARD_RESET_TIME = "3d 5h"

// ── Activity Chart ──────────────────────────────────────────────────────
export const TIME_PERIODS = ["All time", "Annual", "Monthly", "Weekly"] as const
export type TimePeriod = (typeof TIME_PERIODS)[number]

export const CHART_DATA: Record<TimePeriod, { labels: string[]; points: { x: number; y: number }[] }> = {
  "All time": {
    labels: ["2023", "Q2", "Q3", "Q4", "2024", "Q2", "Q3", "Q4", "2025", "Q2", "Q3", "Q4", "2026"],
    points: [
      { x: 0, y: 50 }, { x: 1, y: 80 }, { x: 2, y: 120 }, { x: 3, y: 150 },
      { x: 4, y: 200 }, { x: 5, y: 250 }, { x: 6, y: 300 }, { x: 7, y: 350 },
      { x: 8, y: 380 }, { x: 9, y: 450 }, { x: 10, y: 520 }, { x: 11, y: 580 },
      { x: 12, y: 620 },
    ],
  },
  Annual: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    points: [
      { x: 0, y: 150 }, { x: 1, y: 200 }, { x: 2, y: 280 }, { x: 3, y: 320 },
      { x: 4, y: 350 }, { x: 5, y: 400 }, { x: 6, y: 450 }, { x: 7, y: 500 },
      { x: 8, y: 480 }, { x: 9, y: 550 }, { x: 10, y: 620 }, { x: 11, y: 580 },
    ],
  },
  Monthly: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    points: [
      { x: 0, y: 200 }, { x: 1, y: 450 }, { x: 2, y: 380 }, { x: 3, y: 550 },
    ],
  },
  Weekly: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    points: [
      { x: 0, y: 120 }, { x: 1, y: 80 }, { x: 2, y: 200 }, { x: 3, y: 150 },
      { x: 4, y: 300 }, { x: 5, y: 250 }, { x: 6, y: 180 },
    ],
  },
}
