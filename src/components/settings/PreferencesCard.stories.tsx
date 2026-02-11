import type { Meta, StoryObj } from "@storybook/react-vite"
import PreferencesCard from "./PreferencesCard"

const meta: Meta<typeof PreferencesCard> = {
  component: PreferencesCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 768 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof PreferencesCard>

export const Default: Story = {}
