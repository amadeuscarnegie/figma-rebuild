import type { Meta, StoryObj } from "@storybook/react-vite"
import Leaderboard from "./Leaderboard"

const meta: Meta<typeof Leaderboard> = {
  component: Leaderboard,
  parameters: {
    layout: "fullscreen",
  },
}
export default meta

type Story = StoryObj<typeof Leaderboard>

export const Default: Story = {}
