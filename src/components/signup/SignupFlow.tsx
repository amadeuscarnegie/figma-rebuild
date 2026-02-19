import { useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import AuthMethodStep from "@/components/signup/AuthMethodStep"
import EmailSignupStep from "@/components/signup/EmailSignupStep"
import VerifyEmailStep from "@/components/signup/VerifyEmailStep"
import RoleSelectionStep from "@/components/signup/RoleSelectionStep"
import ProfileSetupStep from "@/components/signup/ProfileSetupStep"
import FreeTrialStep from "@/components/signup/FreeTrialStep"

type SignupStep = "auth" | "email" | "verify" | "role" | "profile" | "trial"

const STEPS: SignupStep[] = ["auth", "email", "verify", "role", "profile", "trial"]

// The onboarding phase starts at "role" — progress bar tracks from here
const ONBOARDING_START = 3
const ONBOARDING_STEPS = STEPS.length - ONBOARDING_START

interface SignupFlowProps {
  onClose: () => void
}

export interface SignupStepProps {
  onNext: () => void
  onBack: () => void
}

export default function SignupFlow({ onClose }: SignupFlowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const isFirst = currentIndex === 0
  const isLast = currentIndex === STEPS.length - 1
  const inOnboarding = currentIndex >= ONBOARDING_START

  function goToNextStep() {
    if (isLast) {
      onClose()
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  function goToPrevStep() {
    if (!isFirst) {
      setCurrentIndex((i) => i - 1)
    }
  }

  const stepProps: SignupStepProps = { onNext: goToNextStep, onBack: goToPrevStep }

  function renderStep() {
    switch (STEPS[currentIndex]) {
      case "auth":
        return <AuthMethodStep {...stepProps} />
      case "email":
        return <EmailSignupStep {...stepProps} />
      case "verify":
        return <VerifyEmailStep {...stepProps} />
      case "role":
        return <RoleSelectionStep {...stepProps} />
      case "profile":
        return <ProfileSetupStep {...stepProps} />
      case "trial":
        return <FreeTrialStep {...stepProps} />
    }
  }

  // Progress bar: tracks onboarding steps only (role, profile, trial)
  const onboardingIndex = currentIndex - ONBOARDING_START
  const progressPct = inOnboarding
    ? `${((onboardingIndex + 1) / ONBOARDING_STEPS) * 100}%`
    : "0%"

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <nav className="px-[16px] py-[20px] bg-white border-b border-[#f2f4f7]">
        <div className="flex items-center gap-[16px] max-w-[520px] mx-auto w-full">
          {/* Close / back button */}
          <button
            type="button"
            onClick={isFirst ? onClose : goToPrevStep}
            className="w-[32px] h-[32px] flex items-center justify-center shrink-0 cursor-pointer rounded-[6px] hover:bg-grey-100 transition-colors"
            aria-label={isFirst ? "Close" : "Back"}
          >
            <X className="w-[20px] h-[20px] text-grey-500" />
          </button>

          {/* Progress bar — visible during onboarding, dots during auth phase */}
          {inOnboarding ? (
            <div
              className="flex-1 relative h-[14px] rounded-full bg-progress-track overflow-hidden"
              role="progressbar"
              aria-valuenow={onboardingIndex + 1}
              aria-valuemin={0}
              aria-valuemax={ONBOARDING_STEPS}
              aria-label={`Step ${onboardingIndex + 1} of ${ONBOARDING_STEPS}`}
            >
              <div
                className="absolute inset-y-0 left-0 bg-progress-fill rounded-full transition-[width] duration-300 ease-out overflow-hidden"
                style={{ width: progressPct }}
              >
                <div className="absolute top-[4px] left-[8px] right-[8px] h-[4px] bg-white/30 rounded-full" />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex justify-center gap-[8px]">
              {STEPS.slice(0, ONBOARDING_START).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-[8px] h-[8px] rounded-full transition-colors",
                    i === currentIndex
                      ? "bg-progress-fill"
                      : i < currentIndex
                        ? "bg-blue-100"
                        : "bg-grey-200"
                  )}
                />
              ))}
            </div>
          )}

          {/* Spacer to balance the X button */}
          <div className="w-[32px] h-[32px] shrink-0" />
        </div>
      </nav>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center py-[24px]">
        {renderStep()}
      </div>
    </div>
  )
}
