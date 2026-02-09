import { memo } from "react"
import { Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { LEADERBOARD_DATA, LEADERBOARD_RESET_TIME, type LeaderboardEntry } from "@/data/constants"

function StarBadge({ rank, variant }: { rank: number; variant: "gold" | "silver" }) {
  const isGold = variant === "gold"
  const fillColor = isGold ? "#F59E0B" : "#B8BCC4"
  const textColor = isGold ? "#7C2D12" : "#374151"

  return (
    <div className="relative w-[36px] h-[36px] flex items-center justify-center shrink-0">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M18 3L21.9 11.7L31.5 13.1L24.7 19.7L26.5 29.2L18 24.7L9.5 29.2L11.3 19.7L4.5 13.1L14.1 11.7L18 3Z"
          fill={fillColor}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-extrabold text-[13px] leading-none"
        style={{ color: textColor, paddingTop: "1px" }}
      >
        {rank}
      </span>
    </div>
  )
}

function Avatar({ name, color, size = 50 }: { name: string; color: string; size?: number }) {
  const initial = name.charAt(0).toUpperCase()
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0"
      style={{ width: size, height: size, backgroundColor: color }}
    >
      <span
        className="font-bold text-white leading-none"
        style={{ fontSize: size * 0.38 }}
      >
        {initial}
      </span>
    </div>
  )
}

function AwardZoneEntry({ entry }: { entry: LeaderboardEntry }) {
  const isFirst = entry.rank === 1

  return (
    <div
      className={cn(
        "flex items-center gap-[12px] px-[20px] py-[12px]",
        isFirst && "border-b border-border"
      )}
    >
      <StarBadge rank={entry.rank} variant={isFirst ? "gold" : "silver"} />
      <Avatar name={entry.name} color={entry.avatarColor} size={56} />
      <span className="font-bold text-[14px] text-text-primary flex-1 leading-normal">
        {entry.name}
      </span>
      <span className="font-bold text-[14px] text-text-primary leading-normal">
        {entry.xp}
      </span>
    </div>
  )
}

function RegularEntry({ entry, isFirst, isLast }: { entry: LeaderboardEntry; isFirst: boolean; isLast: boolean }) {
  const isFaded = isFirst || isLast

  return (
    <div
      className={cn(
        "flex items-center gap-[12px] px-[16px] py-[6px]",
        isFaded && "opacity-50",
        isLast && "border-t border-grey-100 pt-[10px]",
        entry.isYou && "bg-[#edf7fe] rounded-[12px] opacity-100 py-[8px]"
      )}
    >
      <span
        className={cn(
          "w-[24px] text-center font-bold text-[14px] leading-normal shrink-0",
          entry.isYou ? "text-heading" : "text-text-secondary"
        )}
      >
        {entry.rank}
      </span>
      <Avatar name={entry.name} color={entry.avatarColor} size={50} />
      <div className="flex items-center gap-[8px] flex-1 min-w-0">
        <span
          className={cn(
            "font-bold text-[14px] leading-normal",
            entry.isYou ? "text-[#224f70]" : "text-text-secondary"
          )}
        >
          {entry.name}
        </span>
        {entry.isYou && (
          <span className="bg-[#ecf7ff] rounded-full px-[12px] h-[28px] flex items-center text-blue-600 font-semibold text-[14px] leading-normal shrink-0">
            You
          </span>
        )}
      </div>
      <span
        className={cn(
          "text-[14px] leading-normal shrink-0",
          entry.isYou ? "font-bold text-blue-600" : "font-normal text-text-primary"
        )}
      >
        {entry.xp}
      </span>
    </div>
  )
}

export default memo(function Leaderboard() {
  const awardEntries = LEADERBOARD_DATA.filter((e) => e.isAwardZone)
  const regularEntries = LEADERBOARD_DATA.filter((e) => !e.isAwardZone)

  return (
    <div className="max-w-[768px] w-full mx-auto px-[16px] sm:px-[24px] lg:px-0 pt-[16px] sm:pt-[24px] pb-[48px]">
      {/* Card container */}
      <div className="bg-white border-[1.5px] border-border rounded-[12px] p-[32px] flex flex-col gap-[32px]">
        {/* Header row */}
        <div className="flex items-center">
          <h2 className="font-bold text-[18px] text-text-primary leading-normal">
            Weekly leaderboard
          </h2>
          <span className="flex-1 text-right font-normal text-[14px] text-text-muted leading-normal">
            Resets in {LEADERBOARD_RESET_TIME}
          </span>
        </div>

        {/* Award zone section */}
        <div className="relative border-[1.5px] border-[#fedfa7] rounded-[12px] bg-white">
          {/* Award zone badge - centered on top edge */}
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ecf7ff] rounded-full px-[12px] h-[28px] flex items-center gap-[6px] z-10">
            <Trophy className="w-[14px] h-[14px] text-blue-600" />
            <span className="text-[14px] font-semibold text-blue-600 leading-normal whitespace-nowrap">
              Award zone
            </span>
          </div>

          {/* Award entries */}
          <div className="pt-[10px]">
            {awardEntries.map((entry) => (
              <AwardZoneEntry key={entry.rank} entry={entry} />
            ))}
          </div>
        </div>

        {/* Regular entries */}
        <div className="flex flex-col gap-[2px]">
          {regularEntries.map((entry, idx) => (
            <RegularEntry
              key={entry.rank}
              entry={entry}
              isFirst={idx === 0}
              isLast={idx === regularEntries.length - 1}
            />
          ))}
        </div>

        {/* View all button */}
        <div className="flex justify-center">
          <button className="bg-grey-600 hover:bg-grey-800 text-white font-bold text-[16px] rounded-[10px] h-[48px] px-[20px] leading-normal shadow-[0px_4px_0px_0px_var(--color-grey-900)] cursor-pointer transition-all duration-100 active:translate-y-[4px] active:shadow-none">
            View all
          </button>
        </div>
      </div>
    </div>
  )
})
