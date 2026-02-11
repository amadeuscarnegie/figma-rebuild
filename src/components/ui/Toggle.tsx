import { cn } from "@/lib/utils"

export default function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className={cn(
        "relative w-[36px] h-[22px] rounded-full p-[2px] transition-colors duration-200 cursor-pointer shrink-0",
        enabled ? "bg-progress-fill" : "bg-grey-300"
      )}
    >
      <div
        className={cn(
          "w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-200",
          enabled ? "translate-x-[14px]" : "translate-x-0"
        )}
      />
    </button>
  )
}
