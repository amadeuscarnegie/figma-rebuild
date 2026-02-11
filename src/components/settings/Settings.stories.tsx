import type { Meta, StoryObj } from "@storybook/react-vite"
import Settings from "./Settings"

const meta: Meta<typeof Settings> = {
  component: Settings,
  parameters: {
    layout: "fullscreen",
  },
}
export default meta

type Story = StoryObj<typeof Settings>

export const Default: Story = {}
