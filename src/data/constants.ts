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
  avatarKey: "scuba" | "headphones" | "sherlock" | "villain"
  isYou?: boolean
  isAwardZone?: boolean
}

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank: 1, name: "Calm Llama", xp: "1,370 XP", avatarKey: "sherlock", isAwardZone: true },
  { rank: 2, name: "Silly Goose", xp: "1,240 XP", avatarKey: "villain", isAwardZone: true },
  { rank: 3, name: "Witty Walrus", xp: "1,180 XP", avatarKey: "scuba" },
  { rank: 4, name: "Clever Coyote", xp: "1,050 XP", avatarKey: "headphones" },
  { rank: 5, name: "Jolly Jellyfish", xp: "940 XP", avatarKey: "sherlock" },
  { rank: 6, name: "Happy Heron", xp: "860 XP", avatarKey: "headphones" },
  { rank: 7, name: "Hairy duck", xp: "860 XP", avatarKey: "villain" },
  { rank: 8, name: "Sleepy Wombat", xp: "750 XP", avatarKey: "scuba", isYou: true },
  { rank: 9, name: "Sly fox", xp: "720 XP", avatarKey: "sherlock" },
  { rank: 10, name: "Brave lion", xp: "690 XP", avatarKey: "headphones" },
  { rank: 11, name: "Quirky Quail", xp: "650 XP", avatarKey: "villain" },
  { rank: 12, name: "Dapper Dolphin", xp: "620 XP", avatarKey: "scuba" },
  { rank: 13, name: "Mighty Moose", xp: "590 XP", avatarKey: "sherlock" },
  { rank: 14, name: "Gentle Gazelle", xp: "570 XP", avatarKey: "headphones" },
  { rank: 15, name: "Funky Flamingo", xp: "540 XP", avatarKey: "villain" },
  { rank: 16, name: "Curious Cat", xp: "510 XP", avatarKey: "scuba" },
  { rank: 17, name: "Rapid Rabbit", xp: "480 XP", avatarKey: "sherlock" },
  { rank: 18, name: "Dizzy Donkey", xp: "460 XP", avatarKey: "headphones" },
  { rank: 19, name: "Snappy Snail", xp: "430 XP", avatarKey: "villain" },
  { rank: 20, name: "Wiggly Worm", xp: "400 XP", avatarKey: "scuba" },
  { rank: 21, name: "Peppy Penguin", xp: "380 XP", avatarKey: "sherlock" },
  { rank: 22, name: "Lucky Lemur", xp: "350 XP", avatarKey: "headphones" },
  { rank: 23, name: "Rowdy Raccoon", xp: "320 XP", avatarKey: "villain" },
  { rank: 24, name: "Tiny Turtle", xp: "290 XP", avatarKey: "scuba" },
  { rank: 25, name: "Zippy Zebra", xp: "260 XP", avatarKey: "sherlock" },
  { rank: 26, name: "Bouncy Bear", xp: "230 XP", avatarKey: "headphones" },
  { rank: 27, name: "Grumpy Goat", xp: "200 XP", avatarKey: "villain" },
  { rank: 28, name: "Fluffy Ferret", xp: "170 XP", avatarKey: "scuba" },
  { rank: 29, name: "Cheeky Chimp", xp: "140 XP", avatarKey: "sherlock" },
  { rank: 30, name: "Lazy Lynx", xp: "110 XP", avatarKey: "headphones" },
]

export const LEADERBOARD_RESET_TIME = "3d 5h"

// ── Achievements ──────────────────────────────────────────────────────
export interface Achievement {
  name: string
  description: string
  xp: string
  avatarKey: "scuba" | "headphones" | "sherlock" | "villain"
  unlocked: boolean
}

export const ACHIEVEMENTS_DATA: Achievement[] = [
  { name: "Quiz Master", description: "Get 5 correct answers in a row in a quiz", xp: "500 XP", avatarKey: "sherlock", unlocked: true },
  { name: "Flashcard Streak", description: "Get 100% in a flashcard deck", xp: "300 XP", avatarKey: "headphones", unlocked: true },
  { name: "Early Bird", description: "Complete a lesson before 8 AM", xp: "150 XP", avatarKey: "villain", unlocked: false },
  { name: "Night Owl", description: "Complete a lesson after 10 PM", xp: "150 XP", avatarKey: "sherlock", unlocked: false },
  { name: "Social Butterfly", description: "Post 5 comments in the community forum", xp: "200 XP", avatarKey: "headphones", unlocked: false },
  { name: "Bookworm", description: "Read 10 course articles", xp: "400 XP", avatarKey: "villain", unlocked: true },
  { name: "Treasure Hunter", description: "Find a hidden easter egg in the dashboard", xp: "1000 XP", avatarKey: "scuba", unlocked: false },
  { name: "Speed Racer", description: "Complete a quiz in under 30 seconds", xp: "350 XP", avatarKey: "headphones", unlocked: false },
  { name: "Legend", description: "Reach level 50", xp: "5000 XP", avatarKey: "scuba", unlocked: false },
  { name: "Perfect Week", description: "Complete at least one lesson every day for 7 days", xp: "600 XP", avatarKey: "villain", unlocked: false },
  { name: "Revision Pro", description: "Revisit and complete 5 previously finished topics", xp: "250 XP", avatarKey: "sherlock", unlocked: true },
  { name: "Subject Explorer", description: "Start a lesson in 4 different subjects", xp: "300 XP", avatarKey: "scuba", unlocked: false },
  { name: "Helping Hand", description: "Answer 3 questions from other students in the forum", xp: "200 XP", avatarKey: "headphones", unlocked: false },
  { name: "Marathon Learner", description: "Study for a total of 10 hours", xp: "750 XP", avatarKey: "villain", unlocked: false },
  { name: "Top of the Class", description: "Finish 1st on the weekly leaderboard", xp: "1500 XP", avatarKey: "sherlock", unlocked: false },
]

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
