import { X } from "lucide-react"
import SummaryCard from "./SummaryCard"
import ActionsCard from "./ActionsCard"
import type { QuestionResult } from "./types"
import mascotJetpack from "@/assets/images/mascot-jetpack.svg"

interface EndSceneProps {
  results: QuestionResult[]
  totalMarks: number
  elapsedSeconds: number
  xpEarned: number
  nextLabel: string
  onRestart: () => void
  onRedoMistakes: () => void
  onContinue: () => void
  onClose: () => void
}

export default function EndScene({
  results,
  totalMarks,
  elapsedSeconds,
  xpEarned,
  nextLabel,
  onRestart,
  onRedoMistakes,
  onContinue,
  onClose,
}: EndSceneProps) {
  const mistakeCount = results.filter((r) => !r.correct).length
  const marksEarned = results.reduce((sum, r) => sum + r.marksEarned, 0)
  const isGood = marksEarned > 0

  return (
    <div className="flex-1 flex flex-col relative">
      {/* Close button - top right */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-[24px] right-[24px] w-[32px] h-[32px] flex items-center justify-center rounded-full cursor-pointer hover:bg-grey-100 transition-colors z-10"
        aria-label="Close"
      >
        <X className="w-[24px] h-[24px] text-grey-500" />
      </button>

      {/* Scrollable content */}
      <div className="flex-1 flex flex-col items-center px-[24px] pt-[24px] pb-[24px] overflow-y-auto">
        {/* Mascot + heading */}
        <div className="flex flex-col items-center mb-[24px]">
          <img
            src={mascotJetpack}
            alt="Mascot"
            className="w-[130px] h-[130px] mb-[16px]"
          />
          <h2 className="font-bold text-[24px] text-text-primary leading-normal text-center">
            {isGood ? "Well done!" : "Keep practising!"}
          </h2>
          <p className="text-[14px] text-text-muted leading-normal mt-[4px] text-center">
            {isGood
              ? "You completed the activity"
              : "You'll get it next time"}
          </p>
        </div>

        {/* Summary card */}
        <div className="w-full max-w-[400px] mb-[16px]">
          <SummaryCard
            results={results}
            totalMarks={totalMarks}
            elapsedSeconds={elapsedSeconds}
            xpEarned={xpEarned}
          />
        </div>

        {/* Actions card */}
        <div className="w-full max-w-[400px] mb-[24px]">
          <ActionsCard
            mistakeCount={mistakeCount}
            onRestart={onRestart}
            onRedoMistakes={onRedoMistakes}
          />
        </div>

        {/* Next label */}
        <span className="text-[14px] text-text-muted font-semibold leading-normal mb-[8px]">
          Next: {nextLabel}
        </span>
      </div>

      {/* Footer with Continue button */}
      <div className="border-t border-[#f2f4f7] pt-[20px] pb-[24px] px-[16px] flex justify-center">
        <button
          type="button"
          onClick={onContinue}
          className="max-w-[400px] w-full h-[48px] rounded-[10px] bg-grey-600 text-white font-bold text-[16px] leading-normal shadow-[0px_4px_0px_0px_var(--color-grey-900)] cursor-pointer hover:bg-grey-800 transition-all duration-100 active:translate-y-[4px] active:shadow-none"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
