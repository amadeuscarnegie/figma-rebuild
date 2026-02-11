import { CircleCheck, XCircle } from "lucide-react"
import { OptionState } from "./types"
import { cn } from "@/lib/utils"

interface MCQOptionProps {
  label: string
  index: number
  state: OptionState
  onClick: (index: number) => void
}

const stateStyles: Record<OptionState, string> = {
  [OptionState.Default]:
    "bg-mcq-default-bg border-mcq-default-border text-mcq-default-text hover:bg-mcq-hover-bg hover:border-mcq-hover-border cursor-pointer",
  [OptionState.Hover]:
    "bg-mcq-hover-bg border-mcq-hover-border text-mcq-default-text cursor-pointer",
  [OptionState.Selected]:
    "bg-mcq-selected-bg border-mcq-selected-border text-mcq-selected-text cursor-pointer",
  [OptionState.Correct]:
    "bg-mcq-correct-bg border-mcq-correct-border text-mcq-correct-text",
  [OptionState.Incorrect]:
    "bg-mcq-incorrect-bg border-mcq-incorrect-border text-mcq-incorrect-text",
  [OptionState.Answer]:
    "bg-mcq-answer-bg border-mcq-answer-border text-mcq-answer-text",
  [OptionState.Disabled]:
    "bg-mcq-default-bg border-mcq-default-border text-mcq-disabled-text",
}

export default function MCQOption({ label, index, state, onClick }: MCQOptionProps) {
  const isInteractive =
    state === OptionState.Default ||
    state === OptionState.Hover ||
    state === OptionState.Selected

  return (
    <button
      type="button"
      onClick={() => isInteractive && onClick(index)}
      disabled={!isInteractive}
      className={cn(
        "flex items-center gap-[16px] w-full h-[52px] px-[16px] rounded-[8px] border-[1.5px] text-left transition-colors duration-150",
        stateStyles[state],
      )}
      aria-pressed={state === OptionState.Selected}
      aria-label={`Option ${index + 1}: ${label}`}
    >
      <span className="font-semibold text-[16px] leading-normal flex-1 truncate">
        {label}
      </span>

      {state === OptionState.Correct && (
        <CircleCheck className="w-[24px] h-[24px] text-mcq-correct-text shrink-0" />
      )}
      {state === OptionState.Answer && (
        <CircleCheck className="w-[24px] h-[24px] text-mcq-answer-text shrink-0" />
      )}
      {state === OptionState.Incorrect && (
        <XCircle className="w-[24px] h-[24px] text-mcq-incorrect-text shrink-0" />
      )}
    </button>
  )
}
