import { Check, Zap } from "lucide-react"
import ActionButton from "@/components/ui/ActionButton"
import type { SignupStepProps } from "@/components/signup/SignupFlow"

const TRIAL_FEATURES = [
  "Unlimited access to all courses",
  "Ad-free learning experience",
  "Detailed progress tracking",
  "Personalised study recommendations",
]

export default function FreeTrialStep({ onNext }: SignupStepProps) {
  return (
    <div className="w-full max-w-[400px] mx-auto px-[24px] text-center">
      {/* Icon */}
      <div className="w-[80px] h-[80px] rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-[24px]">
        <Zap className="w-[36px] h-[36px] text-blue-600" />
      </div>

      <h1 className="font-bold text-[24px] text-heading mb-[8px]">
        Try Cognito Pro free for 7 days
      </h1>
      <p className="text-[16px] text-text-muted mb-[24px]">
        No payment required. You'll choose a plan later.
      </p>

      {/* Feature list */}
      <div className="bg-grey-50 rounded-[12px] p-[20px] mb-[24px] text-left">
        <p className="font-bold text-[14px] text-heading mb-[12px]">
          What you get with Pro
        </p>
        <ul className="flex flex-col gap-[10px]">
          {TRIAL_FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-[10px]">
              <div className="w-[20px] h-[20px] rounded-full bg-success flex items-center justify-center shrink-0">
                <Check className="w-[12px] h-[12px] text-white" />
              </div>
              <span className="text-[14px] text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Reassurance */}
      <div className="flex flex-col gap-[4px] mb-[24px]">
        <p className="text-[14px] text-text-muted">
          No credit card needed
        </p>
        <p className="text-[14px] text-text-muted">
          You won't be charged after the trial ends
        </p>
      </div>

      <div className="[&>button]:w-full">
        <ActionButton disabled={false} onClick={onNext}>
          Start 7-day free trial
        </ActionButton>
      </div>
    </div>
  )
}
