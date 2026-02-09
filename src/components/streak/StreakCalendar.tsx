import { useState, useEffect, useRef } from "react"
import flameIcon from "@/assets/images/real images/Cognito icons.svg"
import { Calendar, ChevronLeft, ChevronRight, X, CheckCircle } from "lucide-react"

const DAYS_OF_WEEK = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

// Streak data: dates that have streaks
const STREAK_DATES = new Set([
  "2026-01-12", "2026-01-13",
  "2026-01-20", "2026-01-21", "2026-01-22",
])

const TODAY = new Date()
const TODAY_KEY = formatDateKey(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate())

function getWeeksForRange(startDate: Date): number[][] {
  const weeks: number[][] = []
  const current = new Date(startDate)
  for (let w = 0; w < 2; w++) {
    const week: number[] = []
    for (let d = 0; d < 7; d++) {
      week.push(current.getDate())
      current.setDate(current.getDate() + 1)
    }
    weeks.push(week)
  }
  return weeks
}

function formatDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function getStartOfWeek(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? 6 : day - 1
  d.setDate(d.getDate() - diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function formatDateRange(start: Date): string {
  const end = new Date(start)
  end.setDate(end.getDate() + 13)

  const ordinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"]
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${ordinal(start.getDate())} ${months[start.getMonth()]} - ${ordinal(end.getDate())} ${months[end.getMonth()]} ${end.getFullYear()}`
}

interface WeekRowProps {
  days: number[]
  startDate: Date
  weekOffset: number
}

function WeekRow({ days, startDate, weekOffset }: WeekRowProps) {
  const baseDate = new Date(startDate)
  baseDate.setDate(baseDate.getDate() + weekOffset * 7)

  const dayInfos = days.map((day, i) => {
    const d = new Date(baseDate)
    d.setDate(d.getDate() + i)
    const key = formatDateKey(d.getFullYear(), d.getMonth(), d.getDate())
    return { day, hasStreak: STREAK_DATES.has(key), isToday: key === TODAY_KEY }
  })

  const cells: React.ReactNode[] = []
  let i = 0
  while (i < dayInfos.length) {
    if (dayInfos[i].hasStreak) {
      let j = i
      while (j < dayInfos.length && dayInfos[j].hasStreak) j++
      const streakDays = dayInfos.slice(i, j)
      cells.push(
        <div
          key={`streak-${i}`}
          className="flex items-center bg-[#ffefd3] rounded-full h-[40px]"
        >
          {streakDays.map((sd, si) => (
            <div key={si} className="w-[40px] h-[40px] flex items-center justify-center">
              <img src={flameIcon} alt={`Streak day ${sd.day}`} className="w-[24px] h-[24px]" />
            </div>
          ))}
        </div>
      )
      i = j
    } else {
      const info = dayInfos[i]
      cells.push(
        <div
          key={`day-${i}`}
          className={`w-[40px] h-[40px] flex items-center justify-center rounded-full ${
            info.isToday
              ? "bg-[#ecf7ff] ring-2 ring-[#1578c3]"
              : "bg-[#f7f8f9]"
          }`}
        >
          <span className={`text-[14px] font-semibold leading-normal ${
            info.isToday ? "text-[#1578c3]" : "text-[#344054]"
          }`}>{info.day}</span>
        </div>
      )
      i++
    }
  }

  return <div className="flex gap-[4px]">{cells}</div>
}

export default function StreakCalendar() {
  const [startDate, setStartDate] = useState(() => getStartOfWeek(new Date(2026, 0, 12)))
  const [modalOpen, setModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!modalOpen) return
    const modal = modalRef.current
    if (!modal) return
    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    first?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { setModalOpen(false); return }
      if (e.key !== "Tab") return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [modalOpen])

  const weeks = getWeeksForRange(startDate)

  const goBack = () => {
    const d = new Date(startDate)
    d.setDate(d.getDate() - 14)
    setStartDate(d)
  }

  const goForward = () => {
    const d = new Date(startDate)
    d.setDate(d.getDate() + 14)
    setStartDate(d)
  }

  return (
    <>
      <div className="bg-[#fcfbf8] border border-[#eaecf0] rounded-[8px] w-[356px] shrink-0 pt-[24px] px-[24px] pb-[20px] flex flex-col">
        {/* Header - streak info */}
        <div className="flex items-center gap-[10px] mb-[24px]">
          <img src={flameIcon} alt="" className="w-[50px] h-[50px]" />
          <div className="flex flex-col">
            <span className="font-bold text-[20px] text-[#0b3c61] leading-normal">3 days</span>
            <span className="text-[14px] text-[#667085] leading-normal">Current streak</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-[#eaecf0] mb-[24px]" aria-hidden="true" />

        {/* Date navigation */}
        <div className="flex items-center justify-between mb-[20px]">
          <div className="flex items-center gap-[8px]">
            <Calendar className="w-[16px] h-[16px] text-[#667085]" aria-hidden="true" />
            <span className="text-[14px] font-semibold text-[#344054] leading-normal">
              {formatDateRange(startDate)}
            </span>
          </div>
          <div className="flex items-center gap-[16px]">
            <button onClick={goBack} aria-label="Previous two weeks" className="w-[20px] h-[20px] flex items-center justify-center cursor-pointer">
              <ChevronLeft className="w-[20px] h-[20px] text-[#667085]" />
            </button>
            <button onClick={goForward} aria-label="Next two weeks" className="w-[20px] h-[20px] flex items-center justify-center cursor-pointer">
              <ChevronRight className="w-[20px] h-[20px] text-[#667085]" />
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="flex gap-[4px] mb-[16px]" aria-hidden="true">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="w-[40px] text-center text-[14px] font-semibold text-[#667085] leading-normal">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="flex flex-col gap-[10px] mb-[32px]" role="grid" aria-label="Streak calendar">
          {weeks.map((week, wi) => (
            <WeekRow key={wi} days={week} startDate={startDate} weekOffset={wi} />
          ))}
        </div>

        {/* Continue streak button - full width */}
        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#344054] hover:bg-[#3e4a5e] text-white font-bold text-[16px] rounded-[10px] h-[48px] px-[20px] w-full leading-normal shadow-[0px_4px_0px_0px_#1d2939] cursor-pointer transition-all duration-100 active:translate-y-[4px] active:shadow-none"
        >
          Continue streak
        </button>
      </div>

      {/* Continue Streak Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Activity completed">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModalOpen(false)} />
          <div ref={modalRef} className="relative bg-white rounded-[12px] w-[400px] max-w-[calc(100%-48px)] p-[32px] shadow-xl text-center">
            <button onClick={() => setModalOpen(false)} aria-label="Close dialog" className="absolute top-[16px] right-[16px] w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[#f2f4f7] cursor-pointer">
              <X className="w-[20px] h-[20px] text-[#667085]" />
            </button>
            <CheckCircle className="w-[48px] h-[48px] text-[#12b76a] mx-auto mb-[16px]" />
            <h2 className="font-bold text-[20px] text-[#0b3c61] mb-[8px]">Activity Complete!</h2>
            <p className="text-[16px] text-[#667085]">Great work! You've continued your streak for today.</p>
          </div>
        </div>
      )}
    </>
  )
}
