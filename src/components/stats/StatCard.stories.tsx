import type { Meta, StoryObj } from "@storybook/react-vite"
import StatCard from "./StatCard"

const meta: Meta<typeof StatCard> = {
  component: StatCard,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 220 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof StatCard>

export const XP: Story = {
  args: { value: "5,240", label: "Total XP" },
}

export const QuestionsAnswered: Story = {
  args: { value: "342", label: "Questions answered" },
}

export const TopPercent: Story = {
  args: { value: "Top 5%", label: "Global ranking" },
}
