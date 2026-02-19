import { useState } from "react"
import {
  GraduationCap,
  BookOpen,
  Users,
  UserCheck,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import ActionButton from "@/components/ui/ActionButton"
import type { SignupStepProps } from "@/components/signup/SignupFlow"

const ROLES = [
  { id: "student", label: "Student", icon: GraduationCap },
  { id: "teacher", label: "Teacher", icon: BookOpen },
  { id: "parent", label: "Parent/Guardian", icon: Users },
  { id: "tutor", label: "Tutor", icon: UserCheck },
  { id: "other", label: "Other", icon: HelpCircle },
] as const

export default function RoleSelectionStep({ onNext }: SignupStepProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  return (
    <div className="w-full max-w-[480px] mx-auto px-[24px]">
      <h1 className="font-bold text-[24px] text-heading text-center mb-[24px]">
        I am a...
      </h1>

      <div className="grid grid-cols-2 gap-[12px]">
        {ROLES.map(({ id, label, icon: Icon }) => {
          const isSelected = selectedRole === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedRole(id)}
              className={cn(
                "border rounded-[12px] p-[16px] sm:p-[20px] flex flex-col items-center gap-[8px] transition-colors cursor-pointer",
                isSelected
                  ? "border-blue-600 bg-blue-50"
                  : "border-grey-300 bg-white hover:bg-grey-50"
              )}
            >
              <Icon
                className={cn(
                  "w-[32px] h-[32px]",
                  isSelected ? "text-blue-600" : "text-text-primary"
                )}
              />
              <span
                className={cn(
                  "font-semibold text-[16px]",
                  isSelected ? "text-blue-600" : "text-text-primary"
                )}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-[24px] w-full [&>button]:w-full">
        <ActionButton disabled={selectedRole === null} onClick={onNext}>
          Continue
        </ActionButton>
      </div>
    </div>
  )
}
