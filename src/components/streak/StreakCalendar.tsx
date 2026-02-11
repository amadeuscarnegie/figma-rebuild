import { memo, useState } from "react"
import flameIcon from "@/assets/images/icons/Cognito icons.svg"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { STREAK_DATES, CURRENT_STREAK_DAYS } from "@/data/gamification"

const DAYS_OF_WEEK = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

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

const WeekRow = memo(function WeekRow({ days, startDate, weekOffset }: WeekRowProps) {
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
      const spanCount = j - i
      cells.push(
        <div
          key={`streak-${i}`}
          className="flex items-center bg-amber-100 rounded-full h-[34px] sm:h-[40px]"
          style={{ gridColumn: `span ${spanCount}` }}
        >
          {streakDays.map((sd, si) => (
            <div key={si} className="flex-1 flex items-center justify-center">
              <img src={flameIcon} alt={`Streak day ${sd.day}`} className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]" />
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
          className="flex items-center justify-center"
        >
          <div className={`w-[34px] h-[34px] sm:w-[40px] sm:h-[40px] flex items-center justify-center rounded-full ${
            info.isToday
              ? "bg-card-blue-bg ring-2 ring-blue-600"
              : "bg-grey-50"
          }`}>
            <span className={`text-[12px] sm:text-[14px] font-semibold leading-normal ${
              info.isToday ? "text-blue-600" : "text-text-secondary"
            }`}>{info.day}</span>
          </div>
        </div>
      )
      i++
    }
  }

  return <div className="grid grid-cols-7">{cells}</div>
})

interface StreakCalendarProps {
  onStartActivity?: () => void
}

export default memo(function StreakCalendar({ onStartActivity }: StreakCalendarProps) {
  const [startDate, setStartDate] = useState(() => getStartOfWeek(new Date(2026, 0, 12)))

  const weeks = getWeeksForRange(startDate)

  function goBack() {
    setStartDate(prev => {
      const d = new Date(prev)
      d.setDate(d.getDate() - 14)
      return d
    })
  }

  function goForward() {
    setStartDate(prev => {
      const d = new Date(prev)
      d.setDate(d.getDate() + 14)
      return d
    })
  }

  return (
    <>
      <div className="bg-profile-bg border border-border rounded-[8px] w-full sm:w-[356px] shrink-0 pt-[24px] px-[16px] sm:px-[24px] pb-[20px] flex flex-col">
        {/* Header - streak info */}
        <div className="flex items-center gap-[10px] mb-[24px]">
          <img src={flameIcon} alt="" className="w-[50px] h-[50px]" />
          <div className="flex flex-col">
            <span className="font-bold text-[20px] text-heading leading-normal">{CURRENT_STREAK_DAYS} days</span>
            <span className="text-[14px] text-text-muted leading-normal">Current streak</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-border mb-[24px]" aria-hidden="true" />

        {/* Date navigation */}
        <div className="flex items-center justify-between mb-[20px]">
          <div className="flex items-center gap-[8px]">
            <Calendar className="w-[16px] h-[16px] text-text-muted" aria-hidden="true" />
            <span className="text-[12px] sm:text-[14px] font-semibold text-text-secondary leading-normal">
              {formatDateRange(startDate)}
            </span>
          </div>
          <div className="flex items-center gap-[16px]">
            <button onClick={goBack} aria-label="Previous two weeks" className="w-[20px] h-[20px] flex items-center justify-center cursor-pointer">
              <ChevronLeft className="w-[20px] h-[20px] text-text-muted" />
            </button>
            <button onClick={goForward} aria-label="Next two weeks" className="w-[20px] h-[20px] flex items-center justify-center cursor-pointer">
              <ChevronRight className="w-[20px] h-[20px] text-text-muted" />
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-[16px]" aria-hidden="true">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="text-center text-[12px] sm:text-[14px] font-semibold text-text-muted leading-normal">
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
          type="button"
          onClick={onStartActivity}
          className="bg-grey-600 hover:bg-grey-800 text-white font-bold text-[16px] rounded-[10px] h-[48px] px-[20px] w-full leading-normal shadow-[0px_4px_0px_0px_var(--color-grey-900)] cursor-pointer transition-all duration-100 active:translate-y-[4px] active:shadow-none"
        >
          Continue streak
        </button>
      </div>
    </>
  )
})
