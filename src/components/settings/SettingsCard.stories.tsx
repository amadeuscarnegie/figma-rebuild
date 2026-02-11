import type { Meta, StoryObj } from "@storybook/react-vite"
import { Card, CardTitle, Divider } from "./SettingsCard"

const meta: Meta<typeof Card> = {
  component: Card,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 768 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render() {
    return (
      <Card>
        <CardTitle>Section Title</CardTitle>
        <p className="text-[16px] text-text-muted">Some content goes here.</p>
        <Divider />
        <p className="text-[16px] text-text-muted">Content below the divider.</p>
      </Card>
    )
  },
}
