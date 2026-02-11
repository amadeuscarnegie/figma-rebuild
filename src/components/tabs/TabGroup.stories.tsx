import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import TabGroup from "./TabGroup"
import type { TabName } from "./TabGroup"

const meta: Meta<typeof TabGroup> = {
  component: TabGroup,
  args: {
    onTabChange: fn(),
  },
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    activeTab: { control: "radio", options: ["Overview", "Leaderboard", "Achievements", "Settings"] },
  },
}
export default meta

type Story = StoryObj<typeof TabGroup>

export const Overview: Story = {
  args: { activeTab: "Overview" },
}

export const Leaderboard: Story = {
  args: { activeTab: "Leaderboard" },
}

export const Interactive: Story = {
  render() {
    const [tab, setTab] = useState<TabName>("Overview")
    return <TabGroup activeTab={tab} onTabChange={setTab} />
  },
}
