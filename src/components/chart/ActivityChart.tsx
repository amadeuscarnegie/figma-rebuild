import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

const TIME_PERIODS = ["All time", "Annual", "Monthly", "Weekly"] as const
type TimePeriod = (typeof TIME_PERIODS)[number]

const CHART_DATA: Record<TimePeriod, { labels: string[]; points: { x: number; y: number }[] }> = {
  "All time": {
    labels: ["2023", "Q2", "Q3", "Q4", "2024", "Q2", "Q3", "Q4", "2025", "Q2", "Q3", "Q4", "2026"],
    points: [
      { x: 0, y: 50 },
      { x: 1, y: 80 },
      { x: 2, y: 120 },
      { x: 3, y: 150 },
      { x: 4, y: 200 },
      { x: 5, y: 250 },
      { x: 6, y: 300 },
      { x: 7, y: 350 },
      { x: 8, y: 380 },
      { x: 9, y: 450 },
      { x: 10, y: 520 },
      { x: 11, y: 580 },
      { x: 12, y: 620 },
    ],
  },
  Annual: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    points: [
      { x: 0, y: 150 },
      { x: 1, y: 200 },
      { x: 2, y: 280 },
      { x: 3, y: 320 },
      { x: 4, y: 350 },
      { x: 5, y: 400 },
      { x: 6, y: 450 },
      { x: 7, y: 500 },
      { x: 8, y: 480 },
      { x: 9, y: 550 },
      { x: 10, y: 620 },
      { x: 11, y: 580 },
    ],
  },
  Monthly: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    points: [
      { x: 0, y: 200 },
      { x: 1, y: 450 },
      { x: 2, y: 380 },
      { x: 3, y: 550 },
    ],
  },
  Weekly: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    points: [
      { x: 0, y: 120 },
      { x: 1, y: 80 },
      { x: 2, y: 200 },
      { x: 3, y: 150 },
      { x: 4, y: 300 },
      { x: 5, y: 250 },
      { x: 6, y: 180 },
    ],
  },
}

const Y_LABELS = ["1,000", "800", "600", "400", "200", "0"]

export default function ActivityChart() {
  const [period, setPeriod] = useState<TimePeriod>("All time")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const data = CHART_DATA[period]
  const chartWidth = 684
  const chartHeight = 184
  const paddingLeft = 40
  const paddingRight = 10

  const xScale = (i: number) =>
    paddingLeft + (i / (data.points.length - 1)) * (chartWidth - paddingLeft - paddingRight)
  const yScale = (v: number) => chartHeight - (v / 1000) * chartHeight

  // Build smooth curve using cubic bezier
  const points = data.points.map((p) => ({ x: xScale(p.x), y: yScale(p.y) }))
  const linePath = points.reduce((path, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`
    const prev = points[i - 1]
    const tension = 0.3
    const dx = point.x - prev.x
    const cp1x = prev.x + dx * tension
    const cp2x = point.x - dx * tension
    return `${path} C ${cp1x} ${prev.y}, ${cp2x} ${point.y}, ${point.x} ${point.y}`
  }, "")

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`

  return (
    <div className="bg-white border border-[#eaecf0] rounded-[8px] w-full p-[24px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-[32px]">
        <h3 className="font-bold text-[18px] text-[#101828] leading-normal">Activity XP history</h3>
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-[8px] border border-[#d0d5dd] rounded-[8px] px-[14px] h-[40px] cursor-pointer"
          >
            <span className="text-[14px] font-semibold text-[#344054] leading-normal">{period}</span>
            <ChevronDown className="w-[20px] h-[20px] text-[#667085]" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 top-[44px] bg-white border border-[#eaecf0] rounded-[8px] shadow-lg z-10 min-w-[140px]">
              {TIME_PERIODS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setPeriod(opt)
                    setDropdownOpen(false)
                  }}
                  className={`w-full text-left px-[14px] py-[10px] text-[14px] font-semibold cursor-pointer first:rounded-t-[8px] last:rounded-b-[8px] ${
                    opt === period
                      ? "text-[#105a92] bg-[#f0f7ff]"
                      : "text-[#344054] hover:bg-[#f9fafb]"
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
        <svg width="100%" viewBox={`0 0 ${chartWidth} ${chartHeight + 30}`} className="overflow-visible">
          {/* Y-axis grid lines */}
          {Y_LABELS.map((label, i) => {
            const y = (i / (Y_LABELS.length - 1)) * chartHeight
            return (
              <g key={label}>
                <text
                  x={30}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-[#667085] text-[11px]"
                  fontFamily="Nunito"
                  fontSize="11"
                >
                  {label}
                </text>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke="#eaecf0"
                  strokeWidth="1"
                />
              </g>
            )
          })}

          {/* Area fill */}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1578c3" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#1578c3" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#areaGradient)" />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#1578c3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X-axis labels */}
          {data.labels.map((label, i) => (
            <text
              key={i}
              x={xScale(i)}
              y={chartHeight + 20}
              textAnchor="middle"
              className="fill-[#667085] text-[11px]"
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
}
