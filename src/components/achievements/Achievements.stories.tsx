import type { Meta, StoryObj } from "@storybook/react-vite"
import Achievements from "./Achievements"

const meta: Meta<typeof Achievements> = {
  component: Achievements,
  parameters: {
    layout: "fullscreen",
  },
}
export default meta

type Story = StoryObj<typeof Achievements>

export const Default: Story = {}
