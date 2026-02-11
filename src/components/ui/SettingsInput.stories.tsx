import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import SettingsInput from "./SettingsInput"

const meta: Meta<typeof SettingsInput> = {
  component: SettingsInput,
  args: {
    onChange: fn(),
  },
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    type: { control: "radio", options: ["text", "password"] },
  },
}
export default meta

type Story = StoryObj<typeof SettingsInput>

export const Text: Story = {
  args: { label: "First name", value: "Alex", type: "text" },
}

export const Password: Story = {
  args: { label: "Current password", value: "secret123", type: "password" },
}

export const Empty: Story = {
  args: { label: "Email", value: "", type: "text" },
}

export const Interactive: Story = {
  render() {
    const [value, setValue] = useState("Hello")
    return <SettingsInput label="Editable field" value={value} onChange={setValue} />
  },
}
