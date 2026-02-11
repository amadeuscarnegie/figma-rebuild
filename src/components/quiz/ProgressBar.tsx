import { cn } from "@/lib/utils"

interface Segment {
  correct: boolean
}

interface ProgressBarProps {
  segments: Segment[]
  total: number
  className?: string
}

export default function ProgressBar({ segments, total, className }: ProgressBarProps) {
  const correctCount = segments.filter((s) => s.correct).length
  const incorrectCount = segments.length - correctCount
  const answered = segments.length

  // Red covers 0 → answered (z-1), green covers 0 → correctCount (z-2)
  // This naturally creates the overlap effect
  const answeredPct = total > 0 ? `${(answered / total) * 100}%` : "0%"
  const correctPct = total > 0 ? `${(correctCount / total) * 100}%` : "0%"

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
          className="absolute inset-y-0 left-0 bg-progress-incorrect rounded-full z-[1] overflow-hidden"
          style={{ width: answeredPct }}
        >
          <div className="absolute top-[4px] left-[8px] right-[8px] h-[4px] bg-white/30 rounded-full" />
        </div>
      )}

      {/* Green (correct) segment — covers 0 to correct count, overlaps red */}
      {correctCount > 0 && (
        <div
          className="absolute inset-y-0 left-0 bg-progress-correct rounded-full z-[2] overflow-hidden"
          style={{ width: incorrectCount > 0 ? correctPct : answeredPct }}
        >
          <div className="absolute top-[4px] left-[8px] right-[8px] h-[4px] bg-white/30 rounded-full" />
        </div>
      )}
    </div>
  )
}
