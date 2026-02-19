import { Mail } from "lucide-react"
import ActionButton from "@/components/ui/ActionButton"
import type { SignupStepProps } from "@/components/signup/SignupFlow"

export default function VerifyEmailStep({ onNext }: SignupStepProps) {
  return (
    <div className="w-full max-w-[400px] mx-auto px-[24px] text-center">
      {/* Mail icon in blue circle */}
      <div className="w-[80px] h-[80px] rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-[24px]">
        <Mail className="w-[36px] h-[36px] text-blue-600" />
      </div>

      <h1 className="font-bold text-[24px] text-heading mb-[12px]">
        Check your inbox
      </h1>

      <p className="text-[16px] text-text-muted mb-[32px]">
        We've sent a verification link to your email
      </p>

      <div className="[&>button]:w-full">
        <ActionButton disabled={false} onClick={onNext}>
          Open email app
        </ActionButton>
      </div>

      <p className="mt-[16px] text-[14px] text-blue-600 font-semibold cursor-pointer">
        Resend email
      </p>
    </div>
  )
}
