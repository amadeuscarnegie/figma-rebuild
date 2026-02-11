import badgeIcon from "@/assets/images/icons/Notification Icon.svg"
import { LEVEL } from "@/data/gamification"

const progressPct = Math.round((LEVEL.xp / LEVEL.xpRequired) * 100)

export default function LevelCard() {
  return (
    <div className="bg-card-blue-bg border-[1.5px] border-[rgba(0,0,0,0.05)] rounded-[8px] w-full p-[24px] flex flex-col">
      {/* Level info */}
      <div className="flex items-center gap-[12px] mb-[24px]">
        <img src={badgeIcon} alt="" className="w-[44px] h-[44px]" />
        <div className="flex flex-col">
          <span className="font-bold text-[20px] text-heading leading-normal">{LEVEL.title}</span>
          <span className="text-[14px] text-text-muted leading-normal">Level {LEVEL.current}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-progress-bg rounded-[8px] p-[16px]">
        <div className="flex items-center gap-[12px]">
          <span className="font-bold text-[14px] text-blue-600 whitespace-nowrap leading-normal">Lv. {LEVEL.next}</span>
          <div className="flex-1 h-[14px] bg-border rounded-full relative overflow-hidden" role="progressbar" aria-valuenow={LEVEL.xp} aria-valuemin={0} aria-valuemax={LEVEL.xpRequired} aria-label={`Level ${LEVEL.next} progress: ${LEVEL.xp} of ${LEVEL.xpRequired} XP`}>
            <div className="h-full bg-progress-fill rounded-full" style={{ width: `${progressPct}%` }} />
            <div className="absolute top-[4px] left-[8px] w-[17px] h-[4px] bg-white/30 rounded-full" />
          </div>
          <span className="font-semibold text-[12px] text-text-muted whitespace-nowrap leading-normal">{LEVEL.xp} / {LEVEL.xpRequired} XP</span>
        </div>
      </div>
    </div>
  )
}
