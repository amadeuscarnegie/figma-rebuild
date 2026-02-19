import { useState } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import ActionButton from "@/components/ui/ActionButton"
import SettingsInput from "@/components/ui/SettingsInput"
import type { SignupStepProps } from "@/components/signup/SignupFlow"

const PASSWORD_REQUIREMENTS = [
  { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
  { label: "One uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
  { label: "One number", test: (pw: string) => /[0-9]/.test(pw) },
]

export default function EmailSignupStep({ onNext }: SignupStepProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const allRequirementsMet = PASSWORD_REQUIREMENTS.every((req) =>
    req.test(password)
  )
  const isValid = name.trim() !== "" && email.trim() !== "" && allRequirementsMet

  return (
    <div className="w-full max-w-[400px] mx-auto px-[24px]">
      <h1 className="font-bold text-[24px] text-heading text-center mb-[32px]">
        Create your account
      </h1>

      <div className="flex flex-col gap-[16px]">
        <SettingsInput label="Full Name" value={name} onChange={setName} />
        <SettingsInput label="Email" value={email} onChange={setEmail} />
        <SettingsInput
          label="Password"
          value={password}
          onChange={setPassword}
          type="password"
        />
      </div>

      {/* Password requirements */}
      <div className="mt-[12px] flex flex-col gap-[6px]">
        {PASSWORD_REQUIREMENTS.map((req) => {
          const met = req.test(password)
          return (
            <div key={req.label} className="flex items-center gap-[8px]">
              <Check
                className={cn(
                  "w-[16px] h-[16px]",
                  met ? "text-success" : "text-grey-300"
                )}
              />
              <span
                className={cn(
                  "text-[14px]",
                  met ? "text-success" : "text-text-muted"
                )}
              >
                {req.label}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-[24px] w-full [&>button]:w-full">
        <ActionButton disabled={!isValid} onClick={onNext}>
          Create Account
        </ActionButton>
      </div>
    </div>
  )
}
