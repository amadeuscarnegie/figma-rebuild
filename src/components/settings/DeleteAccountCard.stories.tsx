import type { Meta, StoryObj } from "@storybook/react-vite"
import DeleteAccountCard from "./DeleteAccountCard"

const meta: Meta<typeof DeleteAccountCard> = {
  component: DeleteAccountCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 768 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof DeleteAccountCard>

export const Default: Story = {}
