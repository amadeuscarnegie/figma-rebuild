import type { Meta, StoryObj } from "@storybook/react-vite"
import ProfileHeader from "./ProfileHeader"

const meta: Meta<typeof ProfileHeader> = {
  component: ProfileHeader,
}
export default meta

type Story = StoryObj<typeof ProfileHeader>

export const Default: Story = {}
