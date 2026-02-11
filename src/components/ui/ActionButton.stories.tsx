import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn, expect, userEvent } from "storybook/test"
import { within } from "storybook/test"
import ActionButton from "./ActionButton"

const meta: Meta<typeof ActionButton> = {
  component: ActionButton,
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: { control: "radio", options: ["primary", "danger"] },
    disabled: { control: "boolean" },
  },
}
export default meta

type Story = StoryObj<typeof ActionButton>

export const Primary: Story = {
  args: { children: "Save changes", disabled: false, variant: "primary" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Save changes" })
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const Danger: Story = {
  args: { children: "Delete account", disabled: false, variant: "danger" },
}

export const Disabled: Story = {
  args: { children: "Save changes", disabled: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Save changes" })
    await expect(button).toBeDisabled()
    await userEvent.click(button)
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}
