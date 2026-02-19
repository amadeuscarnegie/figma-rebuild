import { useState } from "react"
import { cn } from "@/lib/utils"
import ActionButton from "@/components/ui/ActionButton"
import type { SignupStepProps } from "@/components/signup/SignupFlow"

type Plan = "monthly" | "annual"

export default function PlanSelectionStep({ onNext }: SignupStepProps) {
  const [plan, setPlan] = useState<Plan>("annual")

  return (
    <div className="w-full max-w-[480px] mx-auto px-[24px]">
      {/* Heading */}
      <h1 className="font-bold text-[24px] text-heading text-center mb-[8px]">
        Start your free trial
      </h1>
      <p className="text-[16px] text-text-muted text-center mb-[24px]">
        Try Cognito Pro free for 14 days
      </p>

      {/* Monthly / Annual toggle */}
      <div className="bg-grey-100 rounded-full p-[4px] flex w-fit mx-auto mb-[24px]">
        <button
          type="button"
          onClick={() => setPlan("monthly")}
          className={cn(
            "px-[20px] py-[8px] text-[14px] rounded-full cursor-pointer transition-all",
            plan === "monthly"
              ? "bg-white shadow-sm font-bold text-text-primary"
              : "bg-transparent font-semibold text-text-muted"
          )}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setPlan("annual")}
          className={cn(
            "px-[20px] py-[8px] text-[14px] rounded-full cursor-pointer transition-all",
            plan === "annual"
              ? "bg-white shadow-sm font-bold text-text-primary"
              : "bg-transparent font-semibold text-text-muted"
          )}
        >
          Annual
        </button>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mb-[24px]">
        {/* Monthly card */}
        <div
          onClick={() => setPlan("monthly")}
          className={cn(
            "border rounded-[12px] p-[20px] sm:p-[24px] cursor-pointer transition-colors",
            plan === "monthly"
              ? "border-blue-600 bg-blue-50"
              : "border-grey-300 bg-white"
          )}
        >
          <p className="font-bold text-[18px] text-heading">Monthly</p>
          <p className="mt-[8px]">
            <span className="font-bold text-[32px] text-text-primary">
              £9.99
            </span>
            <span className="text-[16px] text-text-muted font-normal">
              /month
            </span>
          </p>
          <p className="text-[14px] text-text-muted mt-[4px]">
            After 14-day free trial
          </p>
        </div>

        {/* Annual card */}
        <div
          onClick={() => setPlan("annual")}
          className={cn(
            "border rounded-[12px] p-[20px] sm:p-[24px] cursor-pointer transition-colors",
            plan === "annual"
              ? "border-blue-600 bg-blue-50"
              : "border-grey-300 bg-white"
          )}
        >
          <div className="flex items-center gap-[8px]">
            <p className="font-bold text-[18px] text-heading">Annual</p>
            <span className="bg-success text-white text-[12px] font-bold px-[8px] py-[2px] rounded-full">
              Save 30%
            </span>
          </div>
          <p className="mt-[8px]">
            <span className="font-bold text-[32px] text-text-primary">
              £6.99
            </span>
            <span className="text-[16px] text-text-muted font-normal">
              /month
            </span>
          </p>
          <p className="text-[14px] text-text-muted mt-[2px]">
            £83.88 billed yearly
          </p>
          <p className="text-[14px] text-text-muted mt-[4px]">
            After 14-day free trial
          </p>
        </div>
      </div>

      {/* Start free trial button */}
      <div className="w-full [&>button]:w-full">
        <ActionButton disabled={false} onClick={onNext}>
          Start free trial
        </ActionButton>
      </div>

      {/* Maybe later link */}
      <p
        onClick={onNext}
        className="mt-[16px] text-center text-[14px] text-text-muted cursor-pointer hover:text-text-secondary transition-colors"
      >
        Maybe later — start with Free
      </p>
    </div>
  )
}
