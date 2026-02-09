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

  function handleKeyDown(e: React.KeyboardEvent) {
    const currentIndex = TABS.indexOf(activeTab)
    let newIndex = -1

    if (e.key === "ArrowRight") {
      newIndex = (currentIndex + 1) % TABS.length
    } else if (e.key === "ArrowLeft") {
      newIndex = (currentIndex - 1 + TABS.length) % TABS.length
    } else if (e.key === "Home") {
      newIndex = 0
    } else if (e.key === "End") {
      newIndex = TABS.length - 1
    }

    if (newIndex >= 0) {
      e.preventDefault()
      onTabChange(TABS[newIndex])
      const container = containerRef.current
      if (container) {
        const btn = container.querySelector<HTMLButtonElement>(`[data-tab="${TABS[newIndex]}"]`)
        btn?.focus()
      }
    }
  }

  return (
    <div className="px-[8px] sm:px-[128px] py-[6px]">
      <div ref={containerRef} className="relative inline-flex items-center bg-grey-100 rounded-[10px] p-[4px]" role="tablist" onKeyDown={handleKeyDown}>
        {/* Sliding active indicator */}
        <div
          className="absolute h-[calc(100%-8px)] bg-white rounded-[8px] shadow-sm transition-all duration-300 ease-in-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
        {TABS.map((tab) => (
          <button
            key={tab}
            id={`tab-${tab}`}
            data-tab={tab}
            role="tab"
            tabIndex={activeTab === tab ? 0 : -1}
            aria-selected={activeTab === tab}
            aria-controls={`tabpanel-${tab}`}
            onClick={() => onTabChange(tab)}
            className={cn(
              "relative z-10 flex items-center justify-center h-[36px] px-[16px] sm:px-[24px] font-semibold text-[14px] sm:text-[16px] leading-normal cursor-pointer transition-colors duration-200 whitespace-nowrap shrink-0 rounded-[8px]",
              activeTab === tab
                ? "text-blue-700"
                : "text-text-muted hover:text-text-secondary"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}
