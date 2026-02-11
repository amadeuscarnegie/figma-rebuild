import type { Meta, StoryObj } from "@storybook/react-vite"
import StreakBadge from "./StreakBadge"

const meta: Meta<typeof StreakBadge> = {
  component: StreakBadge,
  argTypes: {
    count: { control: "number" },
    active: { control: "boolean" },
  },
}
export default meta

type Story = StoryObj<typeof StreakBadge>

export const Active: Story = {
  args: { count: 5, active: true },
}

export const Inactive: Story = {
  args: { count: 0, active: false },
}

export const HighStreak: Story = {
  args: { count: 12, active: true },
}
