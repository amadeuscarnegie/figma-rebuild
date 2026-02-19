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

const onCheckFn = fn()
const onContinueFn = fn()

export const QuestionDisabled: Story = {
  args: {
    mode: "question",
    marks: 1,
    canCheck: false,
    onCheck: onCheckFn,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Check" })
    await expect(button).toBeDisabled()
    await userEvent.click(button)
    await expect(onCheckFn).not.toHaveBeenCalled()
  },
}

export const QuestionReady: Story = {
  args: {
    mode: "question",
    marks: 1,
    canCheck: true,
    onCheck: onCheckFn,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Check" })
    await expect(button).toBeEnabled()
    await userEvent.click(button)
    await expect(onCheckFn).toHaveBeenCalledTimes(1)
  },
}

export const QuestionMultiSelect: Story = {
  args: {
    mode: "question",
    marks: 2,
    canCheck: false,
    onCheck: onCheckFn,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Select 2 options")).toBeInTheDocument()
  },
}

export const FeedbackCorrect: Story = {
  args: {
    mode: "feedback",
    feedbackType: "correct",
    onContinue: onContinueFn,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Continue" })
    await userEvent.click(button)
    await expect(onContinueFn).toHaveBeenCalledTimes(1)
  },
}

export const FeedbackPartial: Story = {
  args: {
    mode: "feedback",
    feedbackType: "partial",
    onContinue: onContinueFn,
  },
}

export const FeedbackIncorrect: Story = {
  args: {
    mode: "feedback",
    feedbackType: "incorrect",
    onContinue: onContinueFn,
  },
}
