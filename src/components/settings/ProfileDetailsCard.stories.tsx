import type { Meta, StoryObj } from "@storybook/react-vite"
import ProfileDetailsCard from "./ProfileDetailsCard"

const meta: Meta<typeof ProfileDetailsCard> = {
  component: ProfileDetailsCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 768 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof ProfileDetailsCard>

export const Default: Story = {}
