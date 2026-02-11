import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import EndScene from "./EndScene"
import type { QuestionResult } from "./types"

const meta: Meta<typeof EndScene> = {
  component: EndScene,
  args: {
    onRestart: fn(),
    onRedoMistakes: fn(),
    onContinue: fn(),
    onClose: fn(),
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    totalMarks: { control: "number" },
    elapsedSeconds: { control: "number" },
    xpEarned: { control: "number" },
    nextLabel: { control: "text" },
  },
}
export default meta

type Story = StoryObj<typeof EndScene>

const goodResults: QuestionResult[] = [
  { questionId: 1, selectedIndices: [1], correct: true, marksEarned: 1, maxMarks: 1 },
  { questionId: 2, selectedIndices: [0, 2], correct: true, marksEarned: 2, maxMarks: 2 },
  { questionId: 3, selectedIndices: [2], correct: true, marksEarned: 1, maxMarks: 1 },
  { questionId: 4, selectedIndices: [0, 1], correct: false, marksEarned: 0, maxMarks: 2 },
  { questionId: 5, selectedIndices: [1], correct: true, marksEarned: 1, maxMarks: 1 },
]

const allWrongResults: QuestionResult[] = [
  { questionId: 1, selectedIndices: [0], correct: false, marksEarned: 0, maxMarks: 1 },
  { questionId: 2, selectedIndices: [1, 3], correct: false, marksEarned: 0, maxMarks: 2 },
  { questionId: 3, selectedIndices: [0], correct: false, marksEarned: 0, maxMarks: 1 },
]

export const GoodScore: Story = {
  args: {
    results: goodResults,
    totalMarks: 7,
    elapsedSeconds: 47,
    xpEarned: 50,
    nextLabel: "Biology",
  },
}

export const PoorScore: Story = {
  args: {
    results: allWrongResults,
    totalMarks: 4,
    elapsedSeconds: 120,
    xpEarned: 10,
    nextLabel: "Biology",
  },
}
