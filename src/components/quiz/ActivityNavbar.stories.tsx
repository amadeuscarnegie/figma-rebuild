import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import ActivityNavbar from "./ActivityNavbar"
import type { QuestionResult } from "./types"

const meta: Meta<typeof ActivityNavbar> = {
  component: ActivityNavbar,
  args: {
    onClose: fn(),
  },
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    totalQuestions: { control: "number" },
    streakCount: { control: "number" },
    streakActive: { control: "boolean" },
  },
}
export default meta

type Story = StoryObj<typeof ActivityNavbar>

const sampleResults: QuestionResult[] = [
  { questionId: 1, selectedIndices: [1], correct: true, marksEarned: 1, maxMarks: 1 },
  { questionId: 2, selectedIndices: [0, 2], correct: true, marksEarned: 2, maxMarks: 2 },
  { questionId: 3, selectedIndices: [0], correct: false, marksEarned: 0, maxMarks: 1 },
]

export const InProgress: Story = {
  args: {
    results: sampleResults,
    totalQuestions: 5,
    streakCount: 2,
    streakActive: true,
  },
}

export const NoStreak: Story = {
  args: {
    results: [
      { questionId: 1, selectedIndices: [0], correct: false, marksEarned: 0, maxMarks: 1 },
    ],
    totalQuestions: 5,
    streakCount: 0,
    streakActive: false,
  },
}

export const Fresh: Story = {
  args: {
    results: [],
    totalQuestions: 5,
    streakCount: 0,
    streakActive: false,
  },
}
