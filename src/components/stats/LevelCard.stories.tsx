import type { Meta, StoryObj } from "@storybook/react-vite"
import LevelCard from "./LevelCard"

const meta: Meta<typeof LevelCard> = {
  component: LevelCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof LevelCard>

export const Default: Story = {}
