import { describe, it, expect, vi } from "vitest"
import { render, fireEvent } from "@testing-library/react"
import { useRef } from "react"
import { useClickOutside } from "@/hooks/useClickOutside"

function TestComponent({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, onClose)

  return (
    <div>
      <div ref={ref} data-testid="inside">
        Inside content
      </div>
      <div data-testid="outside">Outside content</div>
    </div>
  )
}

describe("useClickOutside", () => {
  it("calls onClose when clicking outside the ref element", () => {
    const onClose = vi.fn()
    render(<TestComponent onClose={onClose} />)

    fireEvent.mouseDown(document.body)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does NOT call onClose when clicking inside the ref element", () => {
    const onClose = vi.fn()
    const { getByTestId } = render(<TestComponent onClose={onClose} />)

    fireEvent.mouseDown(getByTestId("inside"))

    expect(onClose).not.toHaveBeenCalled()
  })

  it("does NOT call onClose when clicking a child of the ref element", () => {
    const onClose = vi.fn()
    const { getByText } = render(<TestComponent onClose={onClose} />)

    fireEvent.mouseDown(getByText("Inside content"))

    expect(onClose).not.toHaveBeenCalled()
  })

  it("calls onClose when clicking the outside sibling element", () => {
    const onClose = vi.fn()
    const { getByTestId } = render(<TestComponent onClose={onClose} />)

    fireEvent.mouseDown(getByTestId("outside"))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("cleans up the event listener on unmount", () => {
    const onClose = vi.fn()
    const { unmount } = render(<TestComponent onClose={onClose} />)

    unmount()

    fireEvent.mouseDown(document.body)

    expect(onClose).not.toHaveBeenCalled()
  })
})
