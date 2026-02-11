import { cn } from "@/lib/utils"

interface Segment {
  correct: boolean
}

interface ProgressBarProps {
  segments: Segment[]
  total: number
  className?: string
  fillFraction?: number
}

export default function ProgressBar({
  segments,
  total,
  className,
  fillFraction,
}: ProgressBarProps) {
  const correctCount = segments.filter((s) => s.correct).length
  const incorrectCount = segments.length - correctCount
  const answered = segments.length

  const answeredRaw = total > 0 ? (answered / total) * 100 : 0
  const correctRaw = total > 0 ? (correctCount / total) * 100 : 0

  // Apply fill fraction multiplier when animating
  const fraction = fillFraction ?? 1
  const answeredPct = `${answeredRaw * fraction}%`
  const correctPct = `${correctRaw * fraction}%`

  const isAnimating = fillFraction !== undefined

  return (
    <div
      className={cn(
        "relative h-[14px] rounded-full bg-progress-track overflow-hidden",
        className,
      )}
      role="progressbar"
      aria-valuenow={answered}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`${answered} of ${total} questions answered`}
    >
      {/* Red (incorrect) segment — covers 0 to total answered */}
      {incorrectCount > 0 && (
        <div
          className={cn(
            "absolute inset-y-0 left-0 bg-progress-incorrect rounded-full z-[1] overflow-hidden transition-[width]",
            isAnimating ? "duration-[1100ms] ease-linear" : "duration-300 ease-out",
          )}
          style={{ width: answeredPct }}
        >
          <div className="absolute top-[4px] left-[8px] right-[8px] h-[4px] bg-white/30 rounded-full" />
        </div>
      )}

      {/* Green (correct) segment — covers 0 to correct count, overlaps red */}
      {correctCount > 0 && (
        <div
          className={cn(
            "absolute inset-y-0 left-0 bg-progress-correct rounded-full z-[2] overflow-hidden transition-[width]",
            isAnimating ? "duration-[1100ms] ease-linear" : "duration-300 ease-out",
          )}
          style={{ width: incorrectCount > 0 ? correctPct : answeredPct }}
        >
          <div className="absolute top-[4px] left-[8px] right-[8px] h-[4px] bg-white/30 rounded-full" />
        </div>
      )}
    </div>
  )
}
