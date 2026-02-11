import { cn } from "@/lib/utils"

export default function ActionButton({
  children,
  disabled,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode
  disabled: boolean
  variant?: "primary" | "danger"
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "h-[48px] px-[20px] rounded-[10px] font-bold text-[16px] leading-normal transition-all duration-100",
        disabled
          ? "bg-grey-50 text-text-muted shadow-[0px_4px_0px_0px_var(--color-grey-200)] cursor-not-allowed"
          : variant === "danger"
            ? "bg-destructive text-white shadow-[0px_4px_0px_0px_var(--color-destructive-dark)] cursor-pointer active:translate-y-[4px] active:shadow-none"
            : "bg-grey-600 text-white shadow-[0px_4px_0px_0px_var(--color-grey-900)] cursor-pointer active:translate-y-[4px] active:shadow-none hover:bg-grey-800"
      )}
    >
      {children}
    </button>
  )
}
