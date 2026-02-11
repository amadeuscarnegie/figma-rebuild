import { cn } from "@/lib/utils"
import streakColoured from "@/assets/images/streak-icon-coloured.svg"
import streakGrey from "@/assets/images/streak-icon-grey.svg"

interface StreakBadgeProps {
  count: number
  active: boolean
}

export default function StreakBadge({ count, active }: StreakBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-[4px] rounded-full px-[10px] py-[4px] text-[14px] font-bold leading-normal",
        active
          ? "bg-amber-50 text-amber-700"
          : "bg-grey-50 text-grey-300",
      )}
    >
      <img
        src={active ? streakColoured : streakGrey}
        alt="Streak"
        className="w-[22px] h-[22px]"
      />
      {count}
    </div>
  )
}
