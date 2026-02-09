import badgeIcon from "@/assets/images/real images/Notification Icon.svg"

export default function LevelCard() {
  return (
    <div className="bg-[#ecf7ff] border-[1.5px] border-[rgba(0,0,0,0.05)] rounded-[8px] w-full p-[24px] flex flex-col">
      {/* Level info */}
      <div className="flex items-center gap-[12px] mb-[24px]">
        <img src={badgeIcon} alt="" className="w-[44px] h-[44px]" />
        <div className="flex flex-col">
          <span className="font-bold text-[20px] text-[#0b3c61] leading-normal">Explorer</span>
          <span className="text-[14px] text-[#667085] leading-normal">Level 2</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-[#d6eeff] rounded-[8px] p-[16px]">
        <div className="flex items-center gap-[12px]">
          <span className="font-bold text-[14px] text-[#1378c4] whitespace-nowrap leading-normal">Lv. 3</span>
          <div className="flex-1 h-[14px] bg-[#eaecf0] rounded-full relative overflow-hidden">
            <div className="h-full w-[25%] bg-[#1890eb] rounded-full" />
            <div className="absolute top-[4px] left-[8px] w-[17px] h-[4px] bg-white/30 rounded-full" />
          </div>
          <span className="font-semibold text-[12px] text-[#667085] whitespace-nowrap leading-normal">50 / 200 XP</span>
        </div>
      </div>
    </div>
  )
}
