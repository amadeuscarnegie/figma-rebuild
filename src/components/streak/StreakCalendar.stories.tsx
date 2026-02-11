import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import StreakCalendar from "./StreakCalendar"

const meta: Meta<typeof StreakCalendar> = {
  component: StreakCalendar,
  args: {
    onStartActivity: fn(),
  },
}
export default meta

type Story = StoryObj<typeof StreakCalendar>

export const Default: Story = {}
