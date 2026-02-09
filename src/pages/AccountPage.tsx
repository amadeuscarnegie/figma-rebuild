import { useState } from "react"
import Navbar from "@/components/navbar/Navbar"
import ProfileHeader from "@/components/profile/ProfileHeader"
import TabGroup, { type TabName } from "@/components/tabs/TabGroup"
import StreakCalendar from "@/components/streak/StreakCalendar"
import LevelCard from "@/components/stats/LevelCard"
import StatCard from "@/components/stats/StatCard"
import ActivityChart from "@/components/chart/ActivityChart"

function EmptyTabContent({ tab }: { tab: TabName }) {
  return (
    <div className="max-w-[768px] w-full mx-auto px-[24px] lg:px-0 pt-[64px] pb-[48px] flex flex-col items-center justify-center text-center">
      <h2 className="font-bold text-[20px] text-[#0b3c61] mb-[8px]">{tab}</h2>
      <p className="text-[16px] text-[#667085]">Coming soon</p>
    </div>
  )
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabName>("Overview")

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
        {activeTab === "Overview" ? (
          <div className="max-w-[768px] w-full mx-auto px-[24px] lg:px-0 pt-[32px] pb-[48px]">
            {/* Top row: Streak Calendar + Level/Stats */}
            <div className="flex flex-col lg:flex-row gap-[32px]">
              {/* Left: Streak Calendar */}
              <StreakCalendar />

              {/* Right: Level card + Stat cards */}
              <div className="flex flex-col gap-[16px] flex-1 min-w-0">
                <LevelCard />

                {/* Stats grid - 2x2 */}
                <div className="grid grid-cols-2 gap-[14px]">
                  <StatCard value="2h 35m" label="Time spent learning" />
                  <StatCard value="4,800 XP" label="Total XP earned" />
                  <StatCard value="3 days" label="Best streak" />
                  <StatCard value="12,460" label="Questions answered" />
                </div>
              </div>
            </div>

            {/* Activity chart */}
            <div className="mt-[32px]">
              <ActivityChart />
            </div>
          </div>
        ) : (
          <EmptyTabContent tab={activeTab} />
        )}
      </div>
    </div>
  )
}
