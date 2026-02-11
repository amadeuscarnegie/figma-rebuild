import { X } from "lucide-react"
import ProgressBar from "./ProgressBar"
import StreakBadge from "./StreakBadge"
import type { QuestionResult } from "./types"

interface ActivityNavbarProps {
  results: QuestionResult[]
  totalQuestions: number
  streakCount: number
  streakActive: boolean
  onClose: () => void
}

export default function ActivityNavbar({
  results,
  totalQuestions,
  streakCount,
  streakActive,
  onClose,
}: ActivityNavbarProps) {
  const segments = results.map((r) => ({ correct: r.correct }))

  return (
    <nav className="px-[16px] py-[20px] bg-white border-b border-[#f2f4f7]">
      <div className="flex items-center gap-[16px] max-w-[520px] mx-auto w-full">
        <button
          type="button"
          onClick={onClose}
          className="w-[32px] h-[32px] flex items-center justify-center shrink-0 cursor-pointer rounded-[6px] hover:bg-grey-100 transition-colors"
          aria-label="Close quiz"
        >
          <X className="w-[20px] h-[20px] text-grey-500" />
        </button>

        <ProgressBar segments={segments} total={totalQuestions} className="flex-1" />

        <StreakBadge count={streakCount} active={streakActive} />
      </div>
    </nav>
  )
}
