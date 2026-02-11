import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn, expect, userEvent, within } from "storybook/test"
import Modal from "./Modal"

const meta: Meta<typeof Modal> = {
  component: Modal,
  args: {
    onClose: fn(),
  },
  argTypes: {
    open: { control: "boolean" },
    align: { control: "radio", options: ["center", "top"] },
    showClose: { control: "boolean" },
    label: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 400 }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  args: {
    open: true,
    label: "Example Modal",
    children: (
      <div>
        <h2 className="font-bold text-[20px] text-heading mb-[16px]">Modal Title</h2>
        <p className="text-[16px] text-text-muted">This is some modal content.</p>
      </div>
    ),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const closeButton = canvas.getByRole("button", { name: "Close dialog" })
    await userEvent.click(closeButton)
    await expect(args.onClose).toHaveBeenCalledTimes(1)
  },
}

export const TopAligned: Story = {
  args: {
    open: true,
    label: "Search",
    align: "top",
    showClose: false,
    className: "w-[560px] p-[24px]",
    children: (
      <p className="text-[16px] text-text-muted text-center">Search-style top-aligned modal</p>
    ),
  },
}

export const NoCloseButton: Story = {
  args: {
    open: true,
    label: "No close",
    showClose: false,
    children: (
      <p className="text-[16px] text-text-muted">Modal without close button.</p>
    ),
  },
}
