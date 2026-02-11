import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn, expect, userEvent, within } from "storybook/test"
import Toggle from "./Toggle"

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  args: {
    onToggle: fn(),
  },
  argTypes: {
    enabled: { control: "boolean" },
  },
}
export default meta

type Story = StoryObj<typeof Toggle>

export const On: Story = {
  args: { enabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole("switch")
    await expect(toggle).toHaveAttribute("aria-checked", "true")
  },
}

export const Off: Story = {
  args: { enabled: false },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole("switch")
    await expect(toggle).toHaveAttribute("aria-checked", "false")
    await userEvent.click(toggle)
    await expect(args.onToggle).toHaveBeenCalledTimes(1)
  },
}
