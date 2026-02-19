import { useState } from "react"
import { Mail, RefreshCw, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import ActionButton from "@/components/ui/ActionButton"
import type { SignupStepProps } from "@/components/signup/SignupFlow"

export default function VerifyEmailStep({ onNext, onBack }: SignupStepProps) {
  const [resent, setResent] = useState(false)

  function handleResend() {
    setResent(true)
    setTimeout(() => setResent(false), 3000)
  }

  return (
    <div className="w-full max-w-[400px] mx-auto px-[24px] text-center">
      {/* Mail icon in blue circle */}
      <div className="w-[80px] h-[80px] rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-[24px]">
        <Mail className="w-[36px] h-[36px] text-blue-600" />
      </div>

      <h1 className="font-bold text-[24px] text-heading mb-[8px]">
        Check your inbox
      </h1>

      <p className="text-[16px] text-text-muted mb-[24px]">
        We've sent a verification link to your email address.
        Click the link to verify your account.
      </p>

      {/* Help tips */}
      <div className="bg-grey-50 rounded-[12px] p-[16px] mb-[24px] text-left">
        <p className="font-semibold text-[14px] text-text-primary mb-[8px]">
          Can't find the email?
        </p>
        <ul className="flex flex-col gap-[6px] text-[14px] text-text-muted">
          <li className="flex items-start gap-[8px]">
            <span className="text-text-muted mt-[2px]">•</span>
            Check your spam or junk folder
          </li>
          <li className="flex items-start gap-[8px]">
            <span className="text-text-muted mt-[2px]">•</span>
            Make sure you entered the correct email
          </li>
          <li className="flex items-start gap-[8px]">
            <span className="text-text-muted mt-[2px]">•</span>
            The email may take a few minutes to arrive
          </li>
        </ul>
      </div>

      <div className="[&>button]:w-full">
        <ActionButton disabled={false} onClick={onNext}>
          I've verified my email
        </ActionButton>
      </div>

      {/* Action links */}
      <div className="mt-[16px] flex flex-col gap-[8px]">
        <button
          type="button"
          onClick={handleResend}
          className={cn(
            "text-[14px] font-semibold cursor-pointer mx-auto flex items-center gap-[6px] transition-colors",
            resent ? "text-success" : "text-blue-600 hover:text-blue-700"
          )}
        >
          <RefreshCw className={cn("w-[14px] h-[14px]", resent && "animate-spin")} />
          {resent ? "Email sent!" : "Resend verification email"}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="text-[14px] text-text-muted hover:text-text-secondary cursor-pointer mx-auto flex items-center gap-[6px] transition-colors"
        >
          <ArrowLeft className="w-[14px] h-[14px]" />
          Use a different email
        </button>
      </div>
    </div>
  )
}
