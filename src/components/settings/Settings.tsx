import { memo, useState, useCallback } from "react"
import { Mail, Trophy, Sparkles, EyeOff, ChevronDown, CircleCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { USER } from "@/data/constants"

function SettingsInput({
  label,
  value,
  type = "text",
  className,
}: {
  label: string
  value?: string
  type?: "text" | "password"
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-[6px]", className)}>
      <label className="font-semibold text-[14px] text-text-primary leading-normal">
        {label}
      </label>
      <div className="flex items-center h-[48px] px-[16px] bg-white border border-grey-300 rounded-[4px] gap-[12px]">
        <input
          type={type}
          defaultValue={value}
          className="flex-1 font-semibold text-[16px] text-text-primary leading-normal bg-transparent outline-none min-w-0"
          readOnly
        />
        {type === "password" && (
          <EyeOff className="w-[20px] h-[20px] text-text-muted shrink-0" />
        )}
      </div>
    </div>
  )
}

function SettingsSelect({
  label,
  value,
  className,
}: {
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-[6px]", className)}>
      <label className="font-semibold text-[14px] text-text-primary leading-normal">
        {label}
      </label>
      <div className="flex items-center h-[48px] px-[16px] bg-white border border-grey-300 rounded-[4px] gap-[12px] cursor-pointer">
        <span className="flex-1 font-semibold text-[16px] text-text-primary leading-normal">
          {value}
        </span>
        <ChevronDown className="w-[20px] h-[20px] text-text-muted shrink-0" />
      </div>
    </div>
  )
}

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className={cn(
        "relative w-[36px] h-[22px] rounded-full p-[2px] transition-colors duration-200 cursor-pointer shrink-0",
        enabled ? "bg-[#1a96f3]" : "bg-grey-300"
      )}
    >
      <div
        className={cn(
          "w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-200",
          enabled ? "translate-x-[14px]" : "translate-x-0"
        )}
      />
    </button>
  )
}

function PreferenceRow({
  icon: Icon,
  title,
  description,
  extra,
  enabled,
  onToggle,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  extra?: React.ReactNode
  enabled: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-start justify-between gap-[16px]">
      <div className="flex gap-[12px] items-start flex-1 min-w-0">
        <Icon className="w-[20px] h-[20px] text-text-primary shrink-0 mt-[2px]" />
        <div className="flex flex-col gap-[4px] leading-normal">
          <p className="font-semibold text-[16px] text-text-primary">{title}</p>
          <p className="font-normal text-[14px] text-text-muted">{description}</p>
          {extra}
        </div>
      </div>
      <Toggle enabled={enabled} onToggle={onToggle} />
    </div>
  )
}

function Divider() {
  return <div className="w-full h-px bg-border" />
}

function DisabledButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      disabled
      className="h-[48px] px-[20px] rounded-[10px] bg-grey-50 text-text-muted font-bold text-[16px] leading-normal shadow-[0px_4px_0px_0px_var(--color-grey-200)] cursor-not-allowed"
    >
      {children}
    </button>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border-[1.5px] border-border rounded-[12px] p-[16px] sm:p-[32px] flex flex-col gap-[24px]">
      {children}
    </div>
  )
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-bold text-[18px] text-text-primary leading-normal">
      {children}
    </h2>
  )
}

function ProfileDetailsCard() {
  const [firstName] = useState(USER.name.split(" ")[0])
  const [lastName] = useState(USER.name.split(" ").slice(1).join(" "))

  return (
    <Card>
      <CardTitle>Profile details</CardTitle>

      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col sm:flex-row gap-[16px]">
          <SettingsInput label="First name" value={firstName} className="flex-1" />
          <SettingsInput label="Last name" value={lastName} className="flex-1" />
        </div>

        <SettingsInput label="Email" value={USER.email} />

        <div className="flex flex-col sm:flex-row gap-[16px]">
          <SettingsSelect label="Role" value="Student" className="flex-1" />
          <SettingsSelect label="Year" value="11" className="flex-1" />
        </div>
      </div>

      <Divider />

      <div>
        <DisabledButton>Save changes</DisabledButton>
      </div>
    </Card>
  )
}

function PreferencesCard() {
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [publicLeaderboards, setPublicLeaderboards] = useState(true)
  const [aiMarking, setAiMarking] = useState(true)

  const toggleEmail = useCallback(() => setEmailNotifs((v) => !v), [])
  const toggleLeaderboards = useCallback(() => setPublicLeaderboards((v) => !v), [])
  const toggleAi = useCallback(() => setAiMarking((v) => !v), [])

  return (
    <Card>
      <CardTitle>Preferences</CardTitle>

      <Divider />

      <PreferenceRow
        icon={Mail}
        title="Email notifications"
        description="Receive weekly summaries and achievement alerts."
        enabled={emailNotifs}
        onToggle={toggleEmail}
      />

      <Divider />

      <PreferenceRow
        icon={Trophy}
        title="Public leaderboards"
        description="Show your profile and stats on public league standings."
        enabled={publicLeaderboards}
        onToggle={toggleLeaderboards}
      />

      <Divider />

      <PreferenceRow
        icon={Sparkles}
        title="AI marking"
        description="Allow AI to automatically grade your subjective answers."
        extra={
          <p className="font-normal text-[14px] text-text-muted underline mt-[8px] cursor-pointer">
            Learn more
          </p>
        }
        enabled={aiMarking}
        onToggle={toggleAi}
      />
    </Card>
  )
}

function ChangePasswordCard() {
  return (
    <Card>
      <CardTitle>Change password</CardTitle>

      <div className="flex flex-col gap-[28px]">
        <SettingsInput label="Current password" type="password" />

        <Divider />

        <div className="flex flex-col gap-[16px]">
          <SettingsInput label="New password" type="password" />
          <SettingsInput label="Confirm new password" type="password" />
        </div>

        <div className="flex items-center gap-[8px]">
          <CircleCheck className="w-[20px] h-[20px] text-text-muted shrink-0" />
          <p className="font-semibold text-[14px] text-text-primary leading-normal">
            Password must be 8-16 characters long
          </p>
        </div>
      </div>

      <Divider />

      <div className="flex gap-[8px]">
        <DisabledButton>Save changes</DisabledButton>
        <DisabledButton>Cancel</DisabledButton>
      </div>
    </Card>
  )
}

function DeleteAccountCard() {
  return (
    <Card>
      <div className="flex flex-col gap-[8px]">
        <CardTitle>Delete account</CardTitle>
        <p className="font-normal text-[14px] text-text-muted leading-normal">
          Are you sure you want to delete your account? This action is permanent and cannot be undone. All your data, including progress, XP, and course access, will be lost.
        </p>
      </div>

      <SettingsInput label="Current password" type="password" />

      <Divider />

      <div>
        <DisabledButton>Delete account</DisabledButton>
      </div>
    </Card>
  )
}

export default memo(function Settings() {
  return (
    <div className="max-w-[768px] w-full mx-auto px-[16px] sm:px-[24px] lg:px-0 pt-[16px] sm:pt-[24px] pb-[48px]">
      <div className="flex flex-col gap-[24px]">
        <ProfileDetailsCard />
        <PreferencesCard />
        <ChangePasswordCard />
        <DeleteAccountCard />
      </div>
    </div>
  )
})
