import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import SettingsSelect from "./SettingsSelect"

const meta: Meta<typeof SettingsSelect> = {
  component: SettingsSelect,
  args: {
    onChange: fn(),
  },
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
  },
}
export default meta

type Story = StoryObj<typeof SettingsSelect>

export const Default: Story = {
  args: {
    label: "Role",
    value: "Student",
    options: ["Student", "Teacher", "Parent"],
  },
}

export const Year: Story = {
  args: {
    label: "Year",
    value: "11",
    options: ["7", "8", "9", "10", "11", "12", "13"],
  },
}
