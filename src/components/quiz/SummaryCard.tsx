import ProgressBar from "./ProgressBar"
import { cn } from "@/lib/utils"
import type { QuestionResult } from "./types"

interface SummaryCardProps {
  results: QuestionResult[]
  totalMarks: number
  elapsedSeconds: number
  xpEarned: number
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, "0")}`
}

export default function SummaryCard({
  results,
  totalMarks,
  elapsedSeconds,
  xpEarned,
}: SummaryCardProps) {
  const marksEarned = results.reduce((sum, r) => sum + r.marksEarned, 0)
  const isGood = marksEarned > 0

  const segments = results.map((r) => ({ correct: r.correct }))

  return (
    <div
      className={cn(
        "w-full rounded-[12px] border-[2px] py-[24px] overflow-hidden",
        isGood
          ? "bg-summary-correct-bg border-summary-correct-border"
          : "bg-summary-incorrect-bg border-summary-incorrect-border",
      )}
    >
      {/* Stats row */}
      <div className="flex items-center justify-between px-[12px] mb-[24px]">
        <div className="flex flex-col items-center gap-[2px] flex-1">
          <span
            className={cn(
              "font-bold text-[18px] leading-normal",
              isGood ? "text-summary-correct-value" : "text-summary-incorrect-value",
            )}
          >
            {marksEarned}/{totalMarks}
          </span>
          <span className="text-[12px] text-text-muted leading-normal">
            Marks
          </span>
        </div>
        <div className="w-[1px] h-[31px] bg-border" />
        <div className="flex flex-col items-center gap-[2px] flex-1">
          <span className="font-bold text-[18px] text-text-secondary leading-normal">
            {formatTime(elapsedSeconds)}
          </span>
          <span className="text-[12px] text-text-muted leading-normal">
            Time
          </span>
        </div>
        <div className="w-[1px] h-[31px] bg-border" />
        <div className="flex flex-col items-center gap-[2px] flex-1">
          <span className="font-bold text-[18px] text-text-secondary leading-normal">
            +{xpEarned}
          </span>
          <span className="text-[12px] text-text-muted leading-normal">
            Total XP
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-[24px]">
        <ProgressBar segments={segments} total={results.length} />
      </div>
    </div>
  )
}
