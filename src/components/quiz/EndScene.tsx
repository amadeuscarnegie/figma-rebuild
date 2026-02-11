import { useRef } from "react"
import { X } from "lucide-react"
import SummaryCard from "./SummaryCard"
import ActionsCard from "./ActionsCard"
import type { QuestionResult } from "./types"
import { useEndSceneAnimation } from "@/hooks/useEndSceneAnimation"
import { useLottie } from "@/hooks/useLottie"
import { useCountUp } from "@/hooks/useCountUp"

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

  const { stage, skip } = useEndSceneAnimation()

  const lottieRef = useRef<HTMLDivElement>(null)
  useLottie({
    path: "/lottie/celebration.json",
    containerRef: lottieRef,
  })

  const animatedMarks = useCountUp(marksEarned, { enabled: stage >= 2 })
  const animatedTime = useCountUp(elapsedSeconds, { enabled: stage >= 3 })
  const animatedXp = useCountUp(xpEarned, { enabled: stage >= 4 })

  const progressFill = stage < 2 ? 0 : 1

  const isAnimating = stage < 5

  return (
    <div
      className="flex-1 flex flex-col relative"
      onClick={isAnimating ? skip : undefined}
    >
      {/* Close button - appears at stage 1 */}
      {stage >= 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="absolute top-[24px] right-[24px] w-[32px] h-[32px] flex items-center justify-center rounded-full cursor-pointer hover:bg-grey-100 transition-colors z-10 animate-[fade-in_500ms_ease-out]"
          aria-label="Close"
        >
          <X className="w-[24px] h-[24px] text-grey-500" />
        </button>
      )}

      {/* Scrollable content */}
      <div className="flex-1 flex flex-col items-center px-[24px] pt-[24px] pb-[24px] overflow-y-auto">
        {/* Lottie animation */}
        <div
          ref={lottieRef}
          className="transition-all duration-700 ease-out mb-[16px] overflow-visible"
          style={{
            width: stage >= 1 ? 180 : 280,
            height: stage >= 1 ? 225 : 350,
          }}
        />

        {/* Summary card - appears at stage 1 */}
        {stage >= 1 && (
          <div className="w-full max-w-[400px] mb-[16px] animate-[fade-in_500ms_ease-out]">
            <SummaryCard
              results={results}
              totalMarks={totalMarks}
              elapsedSeconds={elapsedSeconds}
              xpEarned={xpEarned}
              visibleStats={{
                marks: stage >= 2,
                time: stage >= 3,
                xp: stage >= 4,
              }}
              progressFill={progressFill}
              animatedMarks={animatedMarks}
              animatedTime={animatedTime}
              animatedXp={animatedXp}
            />
          </div>
        )}

        {/* Actions card - appears at stage 1 */}
        {stage >= 1 && (
          <div className="w-full max-w-[400px] mb-[24px] animate-[fade-in_500ms_ease-out]">
            <ActionsCard
              mistakeCount={mistakeCount}
              onRestart={onRestart}
              onRedoMistakes={onRedoMistakes}
            />
          </div>
        )}

        {/* Next label - appears at stage 3 */}
        {stage >= 3 && (
          <span className="text-[14px] text-text-muted font-semibold leading-normal mb-[8px] animate-[fade-in_500ms_ease-out]">
            Next: {nextLabel}
          </span>
        )}
      </div>

      {/* Footer with Continue button - appears at stage 3 */}
      {stage >= 3 && (
        <div className="border-t border-[#f2f4f7] pt-[20px] pb-[24px] px-[16px] flex justify-center animate-[fade-in_500ms_ease-out]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onContinue()
            }}
            className="max-w-[400px] w-full h-[48px] rounded-[10px] bg-grey-600 text-white font-bold text-[16px] leading-normal shadow-[0px_4px_0px_0px_var(--color-grey-900)] cursor-pointer hover:bg-grey-800 transition-all duration-100 active:translate-y-[4px] active:shadow-none"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  )
}
