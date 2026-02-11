import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn, expect, userEvent, within } from "storybook/test"
import ActionsCard from "./ActionsCard"

const meta: Meta<typeof ActionsCard> = {
  component: ActionsCard,
  args: {
    onRestart: fn(),
    onRedoMistakes: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    mistakeCount: { control: "number" },
  },
}
export default meta

type Story = StoryObj<typeof ActionsCard>

export const WithMistakes: Story = {
  args: { mistakeCount: 3 },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByText("Restart quiz"))
    await expect(args.onRestart).toHaveBeenCalledTimes(1)
    await userEvent.click(canvas.getByText("Redo mistakes"))
    await expect(args.onRedoMistakes).toHaveBeenCalledTimes(1)
  },
}

export const NoMistakes: Story = {
  args: { mistakeCount: 0 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Restart quiz")).toBeInTheDocument()
    await expect(canvas.queryByText("Redo mistakes")).not.toBeInTheDocument()
  },
}
