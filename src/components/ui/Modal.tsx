import { useRef } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFocusTrap } from "@/hooks/useFocusTrap"

interface ModalProps {
  open: boolean
  onClose: () => void
  label: string
  children: React.ReactNode
  /** Tailwind classes for the panel (width, padding, text-center, etc.) */
  className?: string
  /** Vertical alignment: "center" (default) or "top" for search-style modals */
  align?: "center" | "top"
  /** Whether to show the default close (X) button. Default: true */
  showClose?: boolean
}

export default function Modal({
  open,
  onClose,
  label,
  children,
  className,
  align = "center",
  showClose = true,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useFocusTrap(panelRef, open, onClose)

  if (!open) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex justify-center",
        align === "top" ? "items-start pt-[120px]" : "items-center"
      )}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div className="absolute inset-0 bg-overlay/50" onClick={onClose} />
      <div
        ref={panelRef}
        className={cn(
          "relative bg-white rounded-[12px] max-w-[calc(100%-48px)] shadow-xl",
          className ?? "w-[480px] p-[32px]"
        )}
      >
        {showClose && (
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-[16px] right-[16px] w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-grey-100 cursor-pointer"
          >
            <X className="w-[20px] h-[20px] text-text-muted" />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}
