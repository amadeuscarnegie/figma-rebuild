import { useState } from "react"
import ActionButton from "@/components/ui/ActionButton"
import SettingsSelect from "@/components/ui/SettingsSelect"
import type { SignupStepProps } from "@/components/signup/SignupFlow"

export default function ProfileSetupStep({ onNext }: SignupStepProps) {
  const [country, setCountry] = useState("United Kingdom")
  const [yearGrade, setYearGrade] = useState("Year 10")
  const [school, setSchool] = useState("Select school...")

  return (
    <div className="w-full max-w-[400px] mx-auto px-[24px]">
      <h1 className="font-bold text-[24px] text-heading text-center mb-[8px]">
        Tell us about yourself
      </h1>
      <p className="text-[16px] text-text-muted text-center mb-[24px]">
        This helps us personalize your experience
      </p>

      <div className="flex flex-col gap-[16px]">
        <SettingsSelect
          label="Country"
          value={country}
          onChange={setCountry}
          options={[
            "United Kingdom",
            "United States",
            "Canada",
            "Australia",
            "India",
            "Other",
          ]}
        />
        <SettingsSelect
          label="Year/Grade"
          value={yearGrade}
          onChange={setYearGrade}
          options={[
            "Year 7",
            "Year 8",
            "Year 9",
            "Year 10",
            "Year 11",
            "Year 12",
            "Year 13",
            "Other",
          ]}
        />
        <SettingsSelect
          label="School (optional)"
          value={school}
          onChange={setSchool}
          options={["Select school...", "Search not available in demo"]}
        />
      </div>

      <div className="mt-[24px] w-full [&>button]:w-full">
        <ActionButton disabled={false} onClick={onNext}>
          Continue
        </ActionButton>
      </div>
    </div>
  )
}
