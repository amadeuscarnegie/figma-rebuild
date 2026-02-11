import MCQOption from "./MCQOption"
import { OptionState } from "./types"
import type { QuizPhase } from "./types"

interface MCQOptionGroupProps {
  options: string[]
  selectedIndices: number[]
  correctIndices: number[]
  phase: QuizPhase
  onSelect: (index: number) => void
  onDeselect: (index: number) => void
}

function getOptionState(
  index: number,
  selectedIndices: number[],
  correctIndices: number[],
  phase: QuizPhase,
): OptionState {
  const isSelected = selectedIndices.includes(index)
  const isCorrect = correctIndices.includes(index)

  if (phase === "question") {
    return isSelected ? OptionState.Selected : OptionState.Default
  }

  // feedback phase
  if (isSelected && isCorrect) return OptionState.Correct
  if (isSelected && !isCorrect) return OptionState.Incorrect
  if (!isSelected && isCorrect) return OptionState.Answer
  return OptionState.Disabled
}

export default function MCQOptionGroup({
  options,
  selectedIndices,
  correctIndices,
  phase,
  onSelect,
  onDeselect,
}: MCQOptionGroupProps) {
  function handleClick(index: number) {
    if (phase !== "question") return
    if (selectedIndices.includes(index)) {
      onDeselect(index)
    } else {
      onSelect(index)
    }
  }

  return (
    <div className="flex flex-col gap-[8px]" role="group" aria-label="Answer options">
      {options.map((option, i) => (
        <MCQOption
          key={i}
          label={option}
          index={i}
          state={getOptionState(i, selectedIndices, correctIndices, phase)}
          onClick={handleClick}
        />
      ))}
    </div>
  )
}
