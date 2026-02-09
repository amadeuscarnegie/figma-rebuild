import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import TabGroup from "@/components/tabs/TabGroup"
import type { TabName } from "@/components/tabs/TabGroup"

describe("TabGroup", () => {
  const defaultProps = {
    activeTab: "Overview" as TabName,
    onTabChange: vi.fn(),
  }

  it("renders all 4 tabs", () => {
    render(<TabGroup {...defaultProps} />)

    expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument()
    expect(
      screen.getByRole("tab", { name: "Leaderboard" })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("tab", { name: "Achievements" })
    ).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Settings" })).toBeInTheDocument()
  })

  it("sets aria-selected=true on the active tab", () => {
    render(<TabGroup {...defaultProps} activeTab="Leaderboard" />)

    expect(screen.getByRole("tab", { name: "Leaderboard" })).toHaveAttribute(
      "aria-selected",
      "true"
    )
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute(
      "aria-selected",
      "false"
    )
    expect(screen.getByRole("tab", { name: "Achievements" })).toHaveAttribute(
      "aria-selected",
      "false"
    )
    expect(screen.getByRole("tab", { name: "Settings" })).toHaveAttribute(
      "aria-selected",
      "false"
    )
  })

  it("calls onTabChange when a tab is clicked", () => {
    const onTabChange = vi.fn()
    render(<TabGroup activeTab="Overview" onTabChange={onTabChange} />)

    fireEvent.click(screen.getByRole("tab", { name: "Settings" }))

    expect(onTabChange).toHaveBeenCalledTimes(1)
    expect(onTabChange).toHaveBeenCalledWith("Settings")
  })

  it("calls onTabChange with the next tab on ArrowRight", () => {
    const onTabChange = vi.fn()
    render(<TabGroup activeTab="Overview" onTabChange={onTabChange} />)

    const tablist = screen.getByRole("tablist")
    fireEvent.keyDown(tablist, { key: "ArrowRight" })

    expect(onTabChange).toHaveBeenCalledWith("Leaderboard")
  })

  it("wraps around from the last tab to the first on ArrowRight", () => {
    const onTabChange = vi.fn()
    render(<TabGroup activeTab="Settings" onTabChange={onTabChange} />)

    const tablist = screen.getByRole("tablist")
    fireEvent.keyDown(tablist, { key: "ArrowRight" })

    expect(onTabChange).toHaveBeenCalledWith("Overview")
  })

  it("calls onTabChange with the previous tab on ArrowLeft", () => {
    const onTabChange = vi.fn()
    render(<TabGroup activeTab="Leaderboard" onTabChange={onTabChange} />)

    const tablist = screen.getByRole("tablist")
    fireEvent.keyDown(tablist, { key: "ArrowLeft" })

    expect(onTabChange).toHaveBeenCalledWith("Overview")
  })

  it("wraps around from the first tab to the last on ArrowLeft", () => {
    const onTabChange = vi.fn()
    render(<TabGroup activeTab="Overview" onTabChange={onTabChange} />)

    const tablist = screen.getByRole("tablist")
    fireEvent.keyDown(tablist, { key: "ArrowLeft" })

    expect(onTabChange).toHaveBeenCalledWith("Settings")
  })

  it("sets tabIndex=0 only on the active tab", () => {
    render(<TabGroup {...defaultProps} activeTab="Achievements" />)

    expect(screen.getByRole("tab", { name: "Achievements" })).toHaveAttribute(
      "tabindex",
      "0"
    )
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute(
      "tabindex",
      "-1"
    )
    expect(screen.getByRole("tab", { name: "Leaderboard" })).toHaveAttribute(
      "tabindex",
      "-1"
    )
    expect(screen.getByRole("tab", { name: "Settings" })).toHaveAttribute(
      "tabindex",
      "-1"
    )
  })

  it("navigates to the first tab on Home key", () => {
    const onTabChange = vi.fn()
    render(<TabGroup activeTab="Settings" onTabChange={onTabChange} />)

    const tablist = screen.getByRole("tablist")
    fireEvent.keyDown(tablist, { key: "Home" })

    expect(onTabChange).toHaveBeenCalledWith("Overview")
  })

  it("navigates to the last tab on End key", () => {
    const onTabChange = vi.fn()
    render(<TabGroup activeTab="Overview" onTabChange={onTabChange} />)

    const tablist = screen.getByRole("tablist")
    fireEvent.keyDown(tablist, { key: "End" })

    expect(onTabChange).toHaveBeenCalledWith("Settings")
  })

  it("sets correct aria-controls on each tab", () => {
    render(<TabGroup {...defaultProps} />)

    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute(
      "aria-controls",
      "tabpanel-Overview"
    )
    expect(screen.getByRole("tab", { name: "Settings" })).toHaveAttribute(
      "aria-controls",
      "tabpanel-Settings"
    )
  })
})
