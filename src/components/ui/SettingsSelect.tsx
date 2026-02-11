import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SettingsSelect({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-[6px]", className)}>
      <label className="font-semibold text-[14px] text-text-primary leading-normal">
        {label}
      </label>
      <div className="relative flex items-center h-[48px] bg-white border border-grey-300 rounded-[4px] focus-within:border-blue-600 transition-colors">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full px-[16px] pr-[40px] font-semibold text-[16px] text-text-primary leading-normal bg-transparent outline-none appearance-none cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-[16px] w-[20px] h-[20px] text-text-muted pointer-events-none" />
      </div>
    </div>
  )
}
