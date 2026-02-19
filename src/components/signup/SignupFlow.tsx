import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import AuthMethodStep from "@/components/signup/AuthMethodStep"
import EmailSignupStep from "@/components/signup/EmailSignupStep"
import VerifyEmailStep from "@/components/signup/VerifyEmailStep"
import RoleSelectionStep from "@/components/signup/RoleSelectionStep"
import ProfileSetupStep from "@/components/signup/ProfileSetupStep"
import PlanSelectionStep from "@/components/signup/PlanSelectionStep"

type SignupStep = "auth" | "email" | "verify" | "role" | "profile" | "plan"

const STEPS: SignupStep[] = ["auth", "email", "verify", "role", "profile", "plan"]

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
      case "plan":
        return <PlanSelectionStep {...stepProps} />
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header with nav arrows and progress dots */}
      <div className="relative flex items-center justify-center px-[16px] py-[20px]">
        {/* Left arrow */}
        <button
          type="button"
          onClick={goToPrevStep}
          disabled={isFirst}
          className={`absolute left-[16px] w-[40px] h-[40px] flex items-center justify-center ${
            isFirst
              ? "text-grey-300 cursor-default"
              : "text-text-primary cursor-pointer hover:text-grey-500"
          }`}
          aria-label="Previous step"
        >
          <ArrowLeft className="w-[20px] h-[20px]" />
        </button>

        {/* Progress dots */}
        <div className="flex gap-[8px]">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`w-[8px] h-[8px] rounded-full ${
                i === currentIndex
                  ? "bg-progress-fill"
                  : i < currentIndex
                    ? "bg-blue-100"
                    : "bg-grey-200"
              }`}
            />
          ))}
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={goToNextStep}
          disabled={isLast}
          className={`absolute right-[16px] w-[40px] h-[40px] flex items-center justify-center ${
            isLast
              ? "text-grey-300 cursor-default"
              : "text-text-primary cursor-pointer hover:text-grey-500"
          }`}
          aria-label="Next step"
        >
          <ArrowRight className="w-[20px] h-[20px]" />
        </button>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto flex items-center justify-center">
        {renderStep()}
      </div>
    </div>
  )
}
