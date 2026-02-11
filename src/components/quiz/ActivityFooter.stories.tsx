import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn, expect, userEvent, within } from "storybook/test"
import ActivityFooter from "./ActivityFooter"

const meta: Meta<typeof ActivityFooter> = {
  component: ActivityFooter,
  parameters: {
    layout: "fullscreen",
  },
}
export default meta

type Story = StoryObj<typeof ActivityFooter>

export const QuestionDisabled: Story = {
  args: {
    mode: "question" as const,
    marks: 1,
    canCheck: false,
    onCheck: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Check" })
    await expect(button).toBeDisabled()
    await userEvent.click(button)
    await expect(args.onCheck).not.toHaveBeenCalled()
  },
}

export const QuestionReady: Story = {
  args: {
    mode: "question" as const,
    marks: 1,
    canCheck: true,
    onCheck: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Check" })
    await expect(button).toBeEnabled()
    await userEvent.click(button)
    await expect(args.onCheck).toHaveBeenCalledTimes(1)
  },
}

export const QuestionMultiSelect: Story = {
  args: {
    mode: "question" as const,
    marks: 2,
    canCheck: false,
    onCheck: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Select 2 options")).toBeInTheDocument()
  },
}

export const FeedbackCorrect: Story = {
  args: {
    mode: "feedback" as const,
    feedbackType: "correct" as const,
    onContinue: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Continue" })
    await userEvent.click(button)
    await expect(args.onContinue).toHaveBeenCalledTimes(1)
  },
}

export const FeedbackPartial: Story = {
  args: {
    mode: "feedback" as const,
    feedbackType: "partial" as const,
    onContinue: fn(),
  },
}

export const FeedbackIncorrect: Story = {
  args: {
    mode: "feedback" as const,
    feedbackType: "incorrect" as const,
    onContinue: fn(),
  },
}
