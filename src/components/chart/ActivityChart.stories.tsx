import type { Meta, StoryObj } from "@storybook/react-vite"
import ActivityChart from "./ActivityChart"

const meta: Meta<typeof ActivityChart> = {
  component: ActivityChart,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 768 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof ActivityChart>

export const Default: Story = {}
