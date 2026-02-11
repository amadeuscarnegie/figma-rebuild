import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import QuestionPanel from "./QuestionPanel"

const meta: Meta<typeof QuestionPanel> = {
  component: QuestionPanel,
  args: {
    onSelect: fn(),
    onDeselect: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 600, minHeight: 400 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    questionText: { control: "text" },
    phase: { control: "radio", options: ["question", "feedback"] },
  },
}
export default meta

type Story = StoryObj<typeof QuestionPanel>

const options = ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic reticulum"]

export const NoSelection: Story = {
  args: {
    questionText: "Which of the following is the powerhouse of the cell?",
    options,
    selectedIndices: [],
    correctIndices: [1],
    phase: "question",
  },
}

export const WithSelection: Story = {
  args: {
    questionText: "Which of the following is the powerhouse of the cell?",
    options,
    selectedIndices: [1],
    correctIndices: [1],
    phase: "question",
  },
}

export const FeedbackPhase: Story = {
  args: {
    questionText: "Which of the following is the powerhouse of the cell?",
    options,
    selectedIndices: [0],
    correctIndices: [1],
    phase: "feedback",
  },
}
