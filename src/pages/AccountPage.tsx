import { useState } from "react"
import Navbar from "@/components/navbar/Navbar"
import ProfileHeader from "@/components/profile/ProfileHeader"
import TabGroup, { type TabName } from "@/components/tabs/TabGroup"
import StreakCalendar from "@/components/streak/StreakCalendar"
import LevelCard from "@/components/stats/LevelCard"
import StatCard from "@/components/stats/StatCard"
import ActivityChart from "@/components/chart/ActivityChart"
import Leaderboard from "@/components/leaderboard/Leaderboard"
import Settings from "@/components/settings/Settings"
import Achievements from "@/components/achievements/Achievements"
import QuizActivity from "@/components/quiz/QuizActivity"
import { STATS } from "@/data/gamification"

function EmptyTabContent({ tab }: { tab: TabName }) {
  return (
    <div className="max-w-[768px] w-full mx-auto px-[24px] lg:px-0 pt-[64px] pb-[48px] flex flex-col items-center justify-center text-center">
      <h2 className="font-bold text-[20px] text-heading mb-[8px]">{tab}</h2>
      <p className="text-[16px] text-text-muted">Coming soon</p>
    </div>
  )
}

type View = "account" | "activity"

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabName>("Overview")
  const [view, setView] = useState<View>("account")

  if (view === "activity") {
    return <QuizActivity onClose={() => setView("account")} />
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Full-width sections */}
      <Navbar />
      <ProfileHeader />

      {/* Constrained content area */}
      <div className="max-w-[1024px] w-full mx-auto">
        {/* White spacing above tab bar */}
        <div className="h-[16px]" />

        <TabGroup activeTab={activeTab} onTabChange={setActiveTab} />
        <div
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
        >
          {activeTab === "Overview" ? (
            <div className="max-w-[768px] w-full mx-auto px-[16px] sm:px-[24px] lg:px-0 pt-[16px] sm:pt-[24px] pb-[48px]">
              {/* Top row: Streak Calendar + Level/Stats */}
              <div className="flex flex-col lg:flex-row gap-[16px] sm:gap-[24px]">
                {/* Left: Streak Calendar */}
                <StreakCalendar onStartActivity={() => setView("activity")} />

                {/* Right: Level card + Stat cards */}
                <div className="flex flex-col gap-[12px] sm:gap-[16px] flex-1 min-w-0">
                  <LevelCard />

                  {/* Stats grid - 2x2 */}
                  <div className="grid grid-cols-2 gap-[12px] sm:gap-[14px]">
                    {STATS.map((stat) => (
                      <StatCard key={stat.label} value={stat.value} label={stat.label} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Activity chart */}
              <div className="mt-[16px] sm:mt-[24px]">
                <ActivityChart />
              </div>
            </div>
          ) : activeTab === "Leaderboard" ? (
            <Leaderboard />
          ) : activeTab === "Achievements" ? (
            <Achievements />
          ) : activeTab === "Settings" ? (
            <Settings />
          ) : (
            <EmptyTabContent tab={activeTab} />
          )}
        </div>
      </div>
    </div>
  )
}
