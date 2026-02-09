import { memo, useState, useRef, useMemo, useCallback } from "react"
import { ChevronDown } from "lucide-react"
import { useClickOutside } from "@/hooks/useClickOutside"
import { TIME_PERIODS, CHART_DATA, type TimePeriod } from "@/data/constants"

const Y_LABELS = ["1,000", "800", "600", "400", "200", "0"]
const CHART_WIDTH = 684
const CHART_HEIGHT = 184
const PADDING_LEFT = 40
const PADDING_RIGHT = 10

export default memo(function ActivityChart() {
  const [period, setPeriod] = useState<TimePeriod>("All time")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useClickOutside(dropdownRef, () => setDropdownOpen(false))

  const toggleDropdown = useCallback(() => setDropdownOpen(prev => !prev), [])

  const data = CHART_DATA[period]

  // Memoize expensive SVG path computations — only recalculate when period changes
  const { linePath, areaPath } = useMemo(() => {
    const xScale = (i: number) =>
      PADDING_LEFT + (i / (data.points.length - 1)) * (CHART_WIDTH - PADDING_LEFT - PADDING_RIGHT)
    const yScale = (v: number) => CHART_HEIGHT - (v / 1000) * CHART_HEIGHT

    const points = data.points.map((p) => ({ x: xScale(p.x), y: yScale(p.y) }))
    const line = points.reduce((path, point, i) => {
      if (i === 0) return `M ${point.x} ${point.y}`
      const prev = points[i - 1]
      const tension = 0.3
      const dx = point.x - prev.x
      const cp1x = prev.x + dx * tension
      const cp2x = point.x - dx * tension
      return `${path} C ${cp1x} ${prev.y}, ${cp2x} ${point.y}, ${point.x} ${point.y}`
    }, "")
    const area = `${line} L ${points[points.length - 1].x} ${CHART_HEIGHT} L ${points[0].x} ${CHART_HEIGHT} Z`

    return { linePath: line, areaPath: area }
  }, [data])

  const xScale = (i: number) =>
    PADDING_LEFT + (i / (data.points.length - 1)) * (CHART_WIDTH - PADDING_LEFT - PADDING_RIGHT)

  function handleDropdownKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setDropdownOpen(false)
    }
  }

  return (
    <div className="bg-white border border-border rounded-[8px] w-full p-[24px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-[32px]">
        <h3 className="font-bold text-[18px] text-text-primary leading-normal">Activity XP history</h3>
        <div ref={dropdownRef} className="relative" onKeyDown={handleDropdownKeyDown}>
          <button
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            className="flex items-center gap-[8px] border border-grey-300 rounded-[8px] px-[14px] h-[40px] cursor-pointer"
          >
            <span className="text-[14px] font-semibold text-text-secondary leading-normal">{period}</span>
            <ChevronDown className={`w-[20px] h-[20px] text-text-muted transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-[44px] bg-white border border-border rounded-[8px] shadow-lg z-10 min-w-[140px]" role="menu">
              {TIME_PERIODS.map((opt) => (
                <button
                  key={opt}
                  role="menuitem"
                  onClick={() => {
                    setPeriod(opt)
                    setDropdownOpen(false)
                  }}
                  className={`w-full text-left px-[14px] py-[10px] text-[14px] font-semibold cursor-pointer first:rounded-t-[8px] last:rounded-b-[8px] ${
                    opt === period
                      ? "text-blue-700 bg-blue-50"
                      : "text-text-secondary hover:bg-grey-150"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <svg width="100%" viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT + 30}`} className="overflow-visible" role="img" aria-label={`Activity XP history chart showing ${period} data`}>
          <title>Activity XP history - {period}</title>
          {/* Y-axis grid lines */}
          {Y_LABELS.map((label, i) => {
            const y = (i / (Y_LABELS.length - 1)) * CHART_HEIGHT
            return (
              <g key={label}>
                <text
                  x={30}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-text-muted text-[11px]"
                  fontFamily="Nunito"
                  fontSize="11"
                >
                  {label}
                </text>
                <line
                  x1={PADDING_LEFT}
                  y1={y}
                  x2={CHART_WIDTH}
                  y2={y}
                  stroke="var(--color-border)"
                  strokeWidth="1"
                />
              </g>
            )
          })}

          {/* Area fill */}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-blue-600)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--color-blue-600)" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#areaGradient)" />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="var(--color-blue-600)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X-axis labels */}
          {data.labels.map((label, i) => (
            <text
              key={i}
              x={xScale(i)}
              y={CHART_HEIGHT + 20}
              textAnchor="middle"
              className="fill-text-muted text-[11px]"
              fontFamily="Nunito"
              fontSize="11"
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  )
})
