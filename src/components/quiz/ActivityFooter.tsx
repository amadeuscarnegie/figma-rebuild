import { useState } from "react"
import { ThumbsUp, ThumbsDown, Flag, CircleCheck, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FeedbackType } from "./types"

interface QuestionFooterProps {
  mode: "question"
  marks: number
  canCheck: boolean
  onCheck: () => void
}

interface FeedbackFooterProps {
  mode: "feedback"
  feedbackType: FeedbackType
  onContinue: () => void
}

type ActivityFooterProps = QuestionFooterProps | FeedbackFooterProps

const correctMessages = [
  "Excellent work!",
  "Well done!",
  "Nailed it!",
  "Perfect answer!",
  "Great job!",
]

const partialMessages = [
  "Good try!",
  "Almost there!",
  "Nearly right!",
  "Close one!",
  "Getting there!",
]

const incorrectMessages = [
  "Not quite right",
  "Keep trying!",
  "Not this time",
  "Have another go!",
  "Don't give up!",
]

function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)]
}

const feedbackConfig: Record<FeedbackType, { bg: string; text: string; messages: string[]; icon: typeof CircleCheck }> = {
  correct: {
    bg: "bg-feedback-correct-bg",
    text: "text-feedback-correct-text",
    messages: correctMessages,
    icon: CircleCheck,
  },
  partial: {
    bg: "bg-feedback-partial-bg",
    text: "text-feedback-partial-text",
    messages: partialMessages,
    icon: CircleCheck,
  },
  incorrect: {
    bg: "bg-feedback-incorrect-bg",
    text: "text-feedback-incorrect-text",
    messages: incorrectMessages,
    icon: XCircle,
  },
}

export default function ActivityFooter(props: ActivityFooterProps) {
  if (props.mode === "question") {
    return (
      <div className="px-[16px] py-[20px] bg-white border-t border-[#f2f4f7]">
        <div className="flex items-center justify-between max-w-[520px] mx-auto w-full">
          <span className="font-semibold text-[14px] text-text-muted leading-normal">
            Select {props.marks} {props.marks === 1 ? "option" : "options"}
          </span>
          <button
            type="button"
            onClick={props.onCheck}
            disabled={!props.canCheck}
            className={cn(
              "h-[48px] px-[48px] rounded-[10px] font-bold text-[16px] leading-normal transition-all duration-100",
              props.canCheck
                ? "bg-grey-600 text-white shadow-[0px_4px_0px_0px_var(--color-grey-900)] cursor-pointer hover:bg-grey-800 active:translate-y-[4px] active:shadow-none"
                : "bg-grey-50 text-[#98a2b3] shadow-[0px_4px_0px_0px_var(--color-grey-200)] cursor-not-allowed",
            )}
          >
            Check
          </button>
        </div>
      </div>
    )
  }

  const config = feedbackConfig[props.feedbackType]
  const Icon = config.icon
  const [message] = useState(() => pickRandom(config.messages))

  return (
    <div className={cn("px-[16px] pt-[20px] pb-[24px] rounded-t-[16px] animate-[slide-up_300ms_ease-out]", config.bg)}>
      <div className="flex items-center justify-between mb-[20px] max-w-[520px] mx-auto w-full">
        <div className="flex items-center gap-[8px]">
          <Icon className={cn("w-[20px] h-[20px] shrink-0", config.text)} />
          <span className={cn("font-bold text-[16px] leading-normal", config.text)}>
            {message}
          </span>
        </div>
        <div className="flex items-center gap-[8px]">
          <ThumbsUp className="w-[20px] h-[20px] text-[#667085]" aria-hidden="true" />
          <ThumbsDown className="w-[20px] h-[20px] text-[#667085]" aria-hidden="true" />
          <Flag className="w-[20px] h-[20px] text-[#667085]" aria-hidden="true" />
        </div>
      </div>
      <button
        type="button"
        onClick={props.onContinue}
        className="w-full max-w-[520px] mx-auto block h-[48px] rounded-[10px] bg-grey-600 text-white font-bold text-[16px] leading-normal shadow-[0px_4px_0px_0px_var(--color-grey-900)] cursor-pointer hover:bg-grey-800 transition-all duration-100 active:translate-y-[4px] active:shadow-none"
      >
        Continue
      </button>
    </div>
  )
}
