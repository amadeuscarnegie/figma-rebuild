import { memo } from "react"
import { CircleCheck, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { ACHIEVEMENTS_DATA, type Achievement } from "@/data/constants"
import avatarScuba from "@/assets/images/icons/Avatar_Scuba_V2_SVG.svg"
import avatarHeadphones from "@/assets/images/icons/Avatar_Headphones_V2_SVG.svg"
import avatarSherlock from "@/assets/images/icons/Avatar_Sherlock_V2_SVG.svg"
import avatarVillain from "@/assets/images/icons/Avatar_Villain_V2_SVG.svg"

const AVATAR_MAP: Record<Achievement["avatarKey"], string> = {
  scuba: avatarScuba,
  headphones: avatarHeadphones,
  sherlock: avatarSherlock,
  villain: avatarVillain,
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const { name, description, xp, avatarKey, unlocked } = achievement

  return (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-[12px] border-[1.5px] p-[17px] pt-[17px] pb-[25px] transition-transform duration-200 ease-out cursor-pointer hover:scale-[1.03] hover:shadow-md",
        unlocked
          ? "border-[#fedfa7] bg-white"
          : "border-border bg-grey-50"
      )}
    >
      {/* Status icon - top left */}
      <div className="absolute top-[17px] left-[17px]">
        {unlocked ? (
          <div className="w-[28px] h-[28px] rounded-full bg-[#ecfdf3] flex items-center justify-center">
            <CircleCheck className="w-[16px] h-[16px] text-success" />
          </div>
        ) : (
          <div className="w-[28px] h-[28px] rounded-full bg-grey-200 flex items-center justify-center">
            <Lock className="w-[16px] h-[16px] text-grey-300" />
          </div>
        )}
      </div>

      {/* XP badge - top right */}
      <div className="absolute top-[17px] right-[17px]">
        <span
          className={cn(
            "inline-flex items-center h-[24px] px-[12px] rounded-full font-bold text-[12px] leading-normal",
            unlocked
              ? "bg-card-blue-bg text-blue-600"
              : "bg-grey-200 text-grey-300"
          )}
        >
          {xp}
        </span>
      </div>

      {/* Avatar */}
      <div className="w-[100px] h-[100px] rounded-full overflow-hidden mt-[2px] mb-[16px]">
        <img
          src={AVATAR_MAP[avatarKey]}
          alt=""
          className={cn(
            "w-full h-full object-cover transition-transform duration-300",
            unlocked ? "hover:scale-110" : "opacity-50 grayscale-[40%]"
          )}
        />
      </div>

      {/* Title */}
      <h3
        className={cn(
          "font-bold text-[16px] leading-normal text-center mb-[8px]",
          unlocked ? "text-text-primary" : "text-grey-300"
        )}
      >
        {name}
      </h3>

      {/* Description */}
      <p
        className={cn(
          "font-normal text-[14px] leading-[1.3] text-center px-[8px] mb-[16px]",
          unlocked ? "text-text-muted" : "text-grey-300"
        )}
      >
        {description}
      </p>

      {/* Progress bar - pushed to bottom */}
      <div className="w-full mt-auto">
        <div className={cn("h-[6px] rounded-full overflow-hidden", unlocked ? "bg-grey-100" : "bg-grey-200")}>
          {unlocked && (
            <div className="h-full w-full bg-success rounded-full" />
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(function Achievements() {
  const unlockedCount = ACHIEVEMENTS_DATA.filter((a) => a.unlocked).length
  const totalCount = ACHIEVEMENTS_DATA.length

  return (
    <div className="max-w-[768px] w-full mx-auto px-[16px] sm:px-[24px] lg:px-0 pt-[16px] sm:pt-[24px] pb-[48px]">
      <div className="bg-white border-[1.5px] border-border rounded-[12px] p-[16px] sm:p-[32px]">
        {/* Header */}
        <div className="flex items-baseline justify-between mb-[24px] sm:mb-[32px]">
          <h2 className="font-bold text-[18px] text-text-primary leading-normal">
            Your Achievements
          </h2>
          <span className="font-normal text-[14px] text-text-muted leading-normal">
            {unlockedCount} of {totalCount} Unlocked
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
          {ACHIEVEMENTS_DATA.map((achievement) => (
            <AchievementCard key={achievement.name} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  )
})
