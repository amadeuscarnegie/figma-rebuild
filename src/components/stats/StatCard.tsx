import { memo } from "react"

interface StatCardProps {
  value: string
  label: string
}

export default memo(function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="bg-white border border-border rounded-[8px] h-[96px] p-[24px] flex flex-col justify-center transition-all duration-200 hover:border-grey-300 hover:shadow-sm hover:-translate-y-[1px]">
      <span className="font-bold text-[20px] text-heading leading-normal">{value}</span>
      <span className="text-[14px] text-text-muted leading-normal">{label}</span>
    </div>
  )
})
