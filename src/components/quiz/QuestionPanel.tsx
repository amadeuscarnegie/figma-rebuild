import MCQOptionGroup from "./MCQOptionGroup"
import type { QuizPhase } from "./types"

interface QuestionPanelProps {
  questionText: string
  options: string[]
  selectedIndices: number[]
  correctIndices: number[]
  phase: QuizPhase
  onSelect: (index: number) => void
  onDeselect: (index: number) => void
}

export default function QuestionPanel({
  questionText,
  options,
  selectedIndices,
  correctIndices,
  phase,
  onSelect,
  onDeselect,
}: QuestionPanelProps) {
  return (
    <div className="flex-1 flex flex-col px-[16px] pb-[24px] overflow-y-auto max-w-[520px] w-full mx-auto">
      <h2 className="font-semibold text-[18px] text-text-primary leading-[32px] text-left md:text-center pt-[48px] mb-[28px]">
        {questionText}
      </h2>
      <MCQOptionGroup
        options={options}
        selectedIndices={selectedIndices}
        correctIndices={correctIndices}
        phase={phase}
        onSelect={onSelect}
        onDeselect={onDeselect}
      />
    </div>
  )
}
