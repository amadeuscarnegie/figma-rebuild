import { useState, useRef } from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import ActionButton from "@/components/ui/ActionButton"
import SettingsSelect from "@/components/ui/SettingsSelect"
import type { SignupStepProps } from "@/components/signup/SignupFlow"

const MOCK_SCHOOLS = [
  "Hogwarts School of Witchcraft and Wizardry",
  "Hogsworth Academy",
  "Holly Lodge High School",
  "Hollyfield School",
  "Homerton College",
  "King's College London",
  "King Edward VI School",
  "Kingston Grammar School",
  "Manchester Grammar School",
  "Manchester High School for Girls",
  "Oakwood Academy",
  "Oxford Brookes University",
  "Oxford High School",
  "St Paul's School",
  "Westminster School",
]

export default function ProfileSetupStep({ onNext }: SignupStepProps) {
  const [country, setCountry] = useState("United Kingdom")
  const [yearGrade, setYearGrade] = useState("Year 10")
  const [schoolQuery, setSchoolQuery] = useState("")
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null)
  const [cantFind, setCantFind] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredSchools = schoolQuery.length >= 2
    ? MOCK_SCHOOLS.filter((s) =>
        s.toLowerCase().includes(schoolQuery.toLowerCase())
      ).slice(0, 5)
    : []

  const hasSchool = selectedSchool !== null || (cantFind && schoolQuery.trim().length > 0)

  function handleSelectSchool(school: string) {
    setSelectedSchool(school)
    setSchoolQuery(school)
    setShowDropdown(false)
    setCantFind(false)
  }

  function handleCantFind() {
    setCantFind(true)
    setSelectedSchool(null)
    setShowDropdown(false)
    // Keep their typed query so they can submit it as a free-text school name
  }

  function handleClearSchool() {
    setSelectedSchool(null)
    setSchoolQuery("")
    setCantFind(false)
    setShowDropdown(false)
    inputRef.current?.focus()
  }

  return (
    <div className="w-full max-w-[400px] mx-auto px-[24px]">
      <h1 className="font-bold text-[24px] text-heading text-center mb-[8px]">
        Tell us about yourself
      </h1>
      <p className="text-[16px] text-text-muted text-center mb-[24px]">
        This helps us personalise your experience
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

        {/* School search field */}
        <div className="flex flex-col gap-[6px]">
          <label className="font-semibold text-[14px] text-text-primary leading-normal">
            School
          </label>
          <div className="relative">
            <div className={cn(
              "flex items-center h-[48px] px-[16px] bg-white border rounded-[4px] gap-[12px] transition-colors",
              showDropdown ? "border-blue-600" : "border-grey-300",
              cantFind && "border-grey-300 bg-grey-50"
            )}>
              <Search className="w-[18px] h-[18px] text-text-muted shrink-0" />
              {cantFind ? (
                <div className="flex-1 flex items-center justify-between min-w-0 gap-[8px]">
                  <input
                    ref={inputRef}
                    type="text"
                    value={schoolQuery}
                    onChange={(e) => setSchoolQuery(e.target.value)}
                    placeholder="Type your school name..."
                    className="flex-1 font-semibold text-[16px] text-text-primary leading-normal bg-transparent outline-none min-w-0 placeholder:text-text-muted placeholder:font-normal"
                  />
                  <button
                    type="button"
                    onClick={handleClearSchool}
                    className="shrink-0 cursor-pointer"
                  >
                    <X className="w-[18px] h-[18px] text-text-muted hover:text-text-primary" />
                  </button>
                </div>
              ) : (
                <>
                  <input
                    ref={inputRef}
                    type="text"
                    value={schoolQuery}
                    onChange={(e) => {
                      setSchoolQuery(e.target.value)
                      setSelectedSchool(null)
                      setShowDropdown(true)
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    placeholder="Search for your school..."
                    className="flex-1 font-semibold text-[16px] text-text-primary leading-normal bg-transparent outline-none min-w-0 placeholder:text-text-muted placeholder:font-normal"
                  />
                  {selectedSchool && (
                    <button
                      type="button"
                      onClick={handleClearSchool}
                      className="shrink-0 cursor-pointer"
                    >
                      <X className="w-[18px] h-[18px] text-text-muted hover:text-text-primary" />
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Dropdown results */}
            {showDropdown && schoolQuery.length >= 2 && !selectedSchool && (
              <div className="absolute left-0 right-0 top-[52px] bg-white border border-grey-300 rounded-[8px] shadow-lg z-20 overflow-hidden">
                {filteredSchools.length > 0 ? (
                  filteredSchools.map((school) => (
                    <button
                      key={school}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelectSchool(school)}
                      className="w-full text-left px-[16px] py-[12px] text-[14px] font-semibold text-text-secondary hover:bg-grey-50 cursor-pointer first:rounded-t-[8px] last:rounded-b-[8px]"
                    >
                      {school}
                    </button>
                  ))
                ) : (
                  <div className="px-[16px] py-[12px] text-[14px] text-text-muted">
                    No schools found
                  </div>
                )}
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleCantFind}
                  className="w-full text-left px-[16px] py-[12px] text-[14px] font-semibold text-blue-600 hover:bg-blue-50 cursor-pointer border-t border-grey-200"
                >
                  I can't find my school
                </button>
              </div>
            )}
          </div>
          {cantFind ? (
            <p className="text-[13px] text-text-muted">
              Just type your school name and we'll match it up
            </p>
          ) : !hasSchool && (
            <p className="text-[13px] text-text-muted">
              Start typing to search for your school
            </p>
          )}
        </div>
      </div>

      <div className="mt-[24px] w-full [&>button]:w-full">
        <ActionButton disabled={!hasSchool} onClick={onNext}>
          Continue
        </ActionButton>
      </div>
    </div>
  )
}
