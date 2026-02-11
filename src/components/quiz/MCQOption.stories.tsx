import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn, expect, userEvent, within } from "storybook/test"
import MCQOption from "./MCQOption"
import { OptionState } from "./types"

const meta: Meta<typeof MCQOption> = {
  component: MCQOption,
  args: {
    onClick: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 520 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    state: {
      control: "select",
      options: Object.values(OptionState),
    },
    label: { control: "text" },
    index: { control: "number" },
  },
}
export default meta

type Story = StoryObj<typeof MCQOption>

export const Default: Story = {
  args: { label: "Mitochondria", index: 0, state: OptionState.Default },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const option = canvas.getByRole("button", { name: /Mitochondria/ })
    await expect(option).toBeEnabled()
    await userEvent.click(option)
    await expect(args.onClick).toHaveBeenCalledTimes(1)
  },
}

export const Selected: Story = {
  args: { label: "Mitochondria", index: 0, state: OptionState.Selected },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const option = canvas.getByRole("button", { name: /Mitochondria/ })
    await expect(option).toHaveAttribute("aria-pressed", "true")
  },
}

export const Correct: Story = {
  args: { label: "Mitochondria", index: 0, state: OptionState.Correct },
}

export const Incorrect: Story = {
  args: { label: "Nucleus", index: 1, state: OptionState.Incorrect },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const option = canvas.getByRole("button", { name: /Nucleus/ })
    await expect(option).toBeDisabled()
    await userEvent.click(option)
    await expect(args.onClick).not.toHaveBeenCalled()
  },
}

export const Answer: Story = {
  args: { label: "Mitochondria", index: 0, state: OptionState.Answer },
}

export const Disabled: Story = {
  args: { label: "Ribosome", index: 2, state: OptionState.Disabled },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const option = canvas.getByRole("button", { name: /Ribosome/ })
    await expect(option).toBeDisabled()
  },
}
