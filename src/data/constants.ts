// Barrel re-export — import from domain files directly for new code
export { USER, COURSES, ACCOUNT_MENU_ITEMS } from "./user"
export { STREAK_DATES, CURRENT_STREAK_DAYS, LEVEL, STATS, LEADERBOARD_DATA, LEADERBOARD_RESET_TIME, ACHIEVEMENTS_DATA } from "./gamification"
export type { AvatarKey, LeaderboardEntry, Achievement } from "./gamification"
export { TIME_PERIODS, CHART_DATA } from "./activity"
export type { TimePeriod } from "./activity"
