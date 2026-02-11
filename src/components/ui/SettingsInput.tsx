import { useState } from "react"
import { EyeOff, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SettingsInput({
  label,
  value,
  onChange,
  type = "text",
  className,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: "text" | "password"
  className?: string
}) {
  const [showPassword, setShowPassword] = useState(false)
  const inputType = type === "password" && showPassword ? "text" : type

  return (
    <div className={cn("flex flex-col gap-[6px]", className)}>
      <label className="font-semibold text-[14px] text-text-primary leading-normal">
        {label}
      </label>
      <div className="flex items-center h-[48px] px-[16px] bg-white border border-grey-300 rounded-[4px] gap-[12px] focus-within:border-blue-600 transition-colors">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 font-semibold text-[16px] text-text-primary leading-normal bg-transparent outline-none min-w-0"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="cursor-pointer shrink-0"
          >
            {showPassword ? (
              <Eye className="w-[20px] h-[20px] text-text-muted" />
            ) : (
              <EyeOff className="w-[20px] h-[20px] text-text-muted" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}
