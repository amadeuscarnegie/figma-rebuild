import type { Meta, StoryObj } from "@storybook/react-vite"
import ChangePasswordCard from "./ChangePasswordCard"

const meta: Meta<typeof ChangePasswordCard> = {
  component: ChangePasswordCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 768 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof ChangePasswordCard>

export const Default: Story = {}
