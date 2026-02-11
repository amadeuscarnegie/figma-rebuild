import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import QuizActivity from "./QuizActivity"

const meta: Meta<typeof QuizActivity> = {
  component: QuizActivity,
  args: {
    onClose: fn(),
  },
  parameters: {
    layout: "fullscreen",
  },
}
export default meta

type Story = StoryObj<typeof QuizActivity>

export const Default: Story = {}
