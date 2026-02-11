import type { Meta, StoryObj } from "@storybook/react-vite"
import SummaryCard from "./SummaryCard"
import type { QuestionResult } from "./types"

const meta: Meta<typeof SummaryCard> = {
  component: SummaryCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof SummaryCard>

const goodResults: QuestionResult[] = [
  { questionId: 1, selectedIndices: [1], correct: true, marksEarned: 1, maxMarks: 1 },
  { questionId: 2, selectedIndices: [0, 2], correct: true, marksEarned: 2, maxMarks: 2 },
  { questionId: 3, selectedIndices: [2], correct: true, marksEarned: 1, maxMarks: 1 },
  { questionId: 4, selectedIndices: [0, 1], correct: false, marksEarned: 0, maxMarks: 2 },
  { questionId: 5, selectedIndices: [1], correct: true, marksEarned: 1, maxMarks: 1 },
]

const poorResults: QuestionResult[] = [
  { questionId: 1, selectedIndices: [0], correct: false, marksEarned: 0, maxMarks: 1 },
  { questionId: 2, selectedIndices: [1, 3], correct: false, marksEarned: 0, maxMarks: 2 },
  { questionId: 3, selectedIndices: [0], correct: false, marksEarned: 0, maxMarks: 1 },
  { questionId: 4, selectedIndices: [1, 3], correct: false, marksEarned: 0, maxMarks: 2 },
  { questionId: 5, selectedIndices: [0], correct: false, marksEarned: 0, maxMarks: 1 },
]

export const GoodScore: Story = {
  args: {
    results: goodResults,
    totalMarks: 7,
    elapsedSeconds: 47,
    xpEarned: 50,
  },
}

export const PoorScore: Story = {
  args: {
    results: poorResults,
    totalMarks: 7,
    elapsedSeconds: 120,
    xpEarned: 10,
  },
}
