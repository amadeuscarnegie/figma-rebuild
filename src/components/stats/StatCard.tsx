interface StatCardProps {
  value: string
  label: string
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-white border border-[#eaecf0] rounded-[8px] h-[96px] p-[24px] flex flex-col justify-center transition-all duration-200 hover:border-[#d0d5dd] hover:shadow-sm hover:-translate-y-[1px]">
      <span className="font-bold text-[20px] text-[#0b3c61] leading-normal">{value}</span>
      <span className="text-[14px] text-[#667085] leading-normal">{label}</span>
    </div>
  )
}
