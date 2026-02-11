import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import MCQOptionGroup from "./MCQOptionGroup"

const meta: Meta<typeof MCQOptionGroup> = {
  component: MCQOptionGroup,
  args: {
    onSelect: fn(),
    onDeselect: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 520 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    phase: { control: "radio", options: ["question", "feedback"] },
  },
}
export default meta

type Story = StoryObj<typeof MCQOptionGroup>

const options = ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic reticulum"]

export const QuestionPhase: Story = {
  args: {
    options,
    selectedIndices: [],
    correctIndices: [1],
    phase: "question",
  },
}

export const WithSelection: Story = {
  args: {
    options,
    selectedIndices: [1],
    correctIndices: [1],
    phase: "question",
  },
}

export const FeedbackCorrect: Story = {
  args: {
    options,
    selectedIndices: [1],
    correctIndices: [1],
    phase: "feedback",
  },
}

export const FeedbackIncorrect: Story = {
  args: {
    options,
    selectedIndices: [0],
    correctIndices: [1],
    phase: "feedback",
  },
}

export const FeedbackMultiSelect: Story = {
  args: {
    options: ["Ribosomes", "Golgi apparatus", "Rough endoplasmic reticulum", "Lysosomes"],
    selectedIndices: [0, 1],
    correctIndices: [0, 2],
    phase: "feedback",
  },
}
