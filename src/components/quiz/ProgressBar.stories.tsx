import type { Meta, StoryObj } from "@storybook/react-vite"
import ProgressBar from "./ProgressBar"

const meta: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    total: {
      control: "number",
      description: "Total number of questions in the quiz. The bar fills proportionally as segments are added.",
    },
    segments: {
      description: "One entry per answered question. Each has { correct: true/false }. The bar width = segments.length / total.",
    },
    fillFraction: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Multiplier for the fill animation (0 = empty, 1 = full). Used by EndScene to animate the bar in.",
    },
  },
}
export default meta

type Story = StoryObj<typeof ProgressBar>

export const NotStarted: Story = {
  args: { segments: [], total: 5 },
}

export const Halfway_AllCorrect: Story = {
  args: {
    segments: [{ correct: true }, { correct: true }],
    total: 5,
  },
}

export const Halfway_Mixed: Story = {
  args: {
    segments: [{ correct: true }, { correct: false }],
    total: 5,
  },
}

export const Complete_AllCorrect: Story = {
  args: {
    segments: [
      { correct: true },
      { correct: true },
      { correct: true },
      { correct: true },
      { correct: true },
    ],
    total: 5,
  },
}

export const Complete_MostlyCorrect: Story = {
  args: {
    segments: [
      { correct: true },
      { correct: true },
      { correct: false },
      { correct: true },
      { correct: true },
    ],
    total: 5,
  },
}

export const Complete_AllIncorrect: Story = {
  args: {
    segments: [
      { correct: false },
      { correct: false },
      { correct: false },
      { correct: false },
      { correct: false },
    ],
    total: 5,
  },
}
