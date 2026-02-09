import { useRef, useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

const TABS = ["Overview", "Leaderboard", "Achievements", "Settings"] as const
export type TabName = (typeof TABS)[number]

interface TabGroupProps {
  activeTab: TabName
  onTabChange: (tab: TabName) => void
}

export default function TabGroup({ activeTab, onTabChange }: TabGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  const updateIndicator = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    const activeButton = container.querySelector<HTMLButtonElement>(`[data-tab="${activeTab}"]`)
    if (!activeButton) return
    const containerRect = container.getBoundingClientRect()
    const buttonRect = activeButton.getBoundingClientRect()
    setIndicator({
      left: buttonRect.left - containerRect.left,
      width: buttonRect.width,
    })
  }, [activeTab])

  useEffect(() => {
    updateIndicator()
    window.addEventListener("resize", updateIndicator)
    return () => window.removeEventListener("resize", updateIndicator)
  }, [updateIndicator])

  return (
    <div ref={containerRef} className="relative flex items-start border-b border-[#eaecf0] px-[24px] sm:px-[128px]" role="tablist">
      {TABS.map((tab) => (
        <button
          key={tab}
          data-tab={tab}
          role="tab"
          aria-selected={activeTab === tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "flex items-center justify-center h-[44px] px-[24px] pb-[8px] font-semibold text-[16px] leading-normal cursor-pointer transition-colors duration-200",
            activeTab === tab
              ? "text-[#105a92]"
              : "text-[#667085] hover:text-[#344054]"
          )}
        >
          {tab}
        </button>
      ))}
      {/* Sliding indicator */}
      <div
        className="absolute bottom-0 h-[3px] bg-[#1578c3] rounded-t-full transition-all duration-300 ease-in-out"
        style={{ left: indicator.left, width: indicator.width }}
      />
    </div>
  )
}
