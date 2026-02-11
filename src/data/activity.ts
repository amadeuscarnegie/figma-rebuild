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
