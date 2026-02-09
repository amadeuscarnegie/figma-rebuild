import { describe, it, expect, vi } from "vitest"
import { render, fireEvent } from "@testing-library/react"
import { useRef, useState } from "react"
import { useFocusTrap } from "@/hooks/useFocusTrap"

function TestModal({
  initialOpen,
  onClose,
}: {
  initialOpen: boolean
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(initialOpen)

  useFocusTrap(ref, open, () => {
    setOpen(false)
    onClose()
  })

  return (
    <div>
      <button data-testid="trigger">Trigger</button>
      {open && (
        <div ref={ref} data-testid="modal">
          <button data-testid="first-btn">First</button>
          <input data-testid="middle-input" />
          <button data-testid="last-btn">Last</button>
        </div>
      )}
    </div>
  )
}

describe("useFocusTrap", () => {
  it("moves focus to the first focusable element when open=true", () => {
    render(<TestModal initialOpen={true} onClose={vi.fn()} />)

    const firstBtn = document.querySelector(
      '[data-testid="first-btn"]'
    ) as HTMLElement
    expect(document.activeElement).toBe(firstBtn)
  })

  it("does not trap focus when open=false", () => {
    render(
      <TestModal initialOpen={false} onClose={vi.fn()} />
    )

    // Modal should not be rendered at all
    expect(document.querySelector('[data-testid="modal"]')).toBeNull()
    // Focus should remain on body or wherever it naturally is
    expect(document.activeElement).not.toBe(
      document.querySelector('[data-testid="first-btn"]')
    )
  })

  it("calls onClose when the Escape key is pressed", () => {
    const onClose = vi.fn()
    render(<TestModal initialOpen={true} onClose={onClose} />)

    fireEvent.keyDown(document, { key: "Escape" })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("restores focus to the previously focused element when the modal closes", () => {
    const onClose = vi.fn()

    // Create a trigger button that will have focus before the modal opens
    function Wrapper() {
      const modalRef = useRef<HTMLDivElement>(null)
      const [open, setOpen] = useState(false)

      useFocusTrap(modalRef, open, () => {
        setOpen(false)
        onClose()
      })

      return (
        <div>
          <button data-testid="trigger" onClick={() => setOpen(true)}>
            Open Modal
          </button>
          {open && (
            <div ref={modalRef} data-testid="modal">
              <button data-testid="modal-btn">Modal Button</button>
            </div>
          )}
        </div>
      )
    }

    const { getByTestId } = render(<Wrapper />)

    // Focus the trigger button first
    const trigger = getByTestId("trigger")
    trigger.focus()
    expect(document.activeElement).toBe(trigger)

    // Open the modal — focus should move inside
    fireEvent.click(trigger)
    const modalBtn = getByTestId("modal-btn")
    expect(document.activeElement).toBe(modalBtn)

    // Press Escape to close the modal
    fireEvent.keyDown(document, { key: "Escape" })

    // Focus should be restored to the trigger
    expect(document.activeElement).toBe(trigger)
  })

  it("wraps focus from last to first element on Tab", () => {
    render(<TestModal initialOpen={true} onClose={vi.fn()} />)

    const firstBtn = document.querySelector(
      '[data-testid="first-btn"]'
    ) as HTMLElement
    const lastBtn = document.querySelector(
      '[data-testid="last-btn"]'
    ) as HTMLElement

    // Move focus to the last button
    lastBtn.focus()
    expect(document.activeElement).toBe(lastBtn)

    // Press Tab — should wrap to first
    fireEvent.keyDown(document, { key: "Tab" })
    expect(document.activeElement).toBe(firstBtn)
  })

  it("wraps focus from first to last element on Shift+Tab", () => {
    render(<TestModal initialOpen={true} onClose={vi.fn()} />)

    const firstBtn = document.querySelector(
      '[data-testid="first-btn"]'
    ) as HTMLElement
    const lastBtn = document.querySelector(
      '[data-testid="last-btn"]'
    ) as HTMLElement

    // Focus should already be on first button
    expect(document.activeElement).toBe(firstBtn)

    // Press Shift+Tab — should wrap to last
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true })
    expect(document.activeElement).toBe(lastBtn)
  })
})
