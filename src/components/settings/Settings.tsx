import { memo, useState, useCallback } from "react"
import { Mail, Trophy, Sparkles, EyeOff, Eye, ChevronDown, CircleCheck, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { USER } from "@/data/constants"
import Modal from "@/components/ui/Modal"

function SettingsInput({
  label,
  value,
  onChange,
  type = "text",
  className,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: "text" | "password"
  className?: string
}) {
  const [showPassword, setShowPassword] = useState(false)
  const inputType = type === "password" && showPassword ? "text" : type

  return (
    <div className={cn("flex flex-col gap-[6px]", className)}>
      <label className="font-semibold text-[14px] text-text-primary leading-normal">
        {label}
      </label>
      <div className="flex items-center h-[48px] px-[16px] bg-white border border-grey-300 rounded-[4px] gap-[12px] focus-within:border-blue-600 transition-colors">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 font-semibold text-[16px] text-text-primary leading-normal bg-transparent outline-none min-w-0"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="cursor-pointer shrink-0"
          >
            {showPassword ? (
              <Eye className="w-[20px] h-[20px] text-text-muted" />
            ) : (
              <EyeOff className="w-[20px] h-[20px] text-text-muted" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

function SettingsSelect({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-[6px]", className)}>
      <label className="font-semibold text-[14px] text-text-primary leading-normal">
        {label}
      </label>
      <div className="relative flex items-center h-[48px] bg-white border border-grey-300 rounded-[4px] focus-within:border-blue-600 transition-colors">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full px-[16px] pr-[40px] font-semibold text-[16px] text-text-primary leading-normal bg-transparent outline-none appearance-none cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-[16px] w-[20px] h-[20px] text-text-muted pointer-events-none" />
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
        enabled ? "bg-progress-fill" : "bg-grey-300"
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

function ActionButton({
  children,
  disabled,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode
  disabled: boolean
  variant?: "primary" | "danger"
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "h-[48px] px-[20px] rounded-[10px] font-bold text-[16px] leading-normal transition-all duration-100",
        disabled
          ? "bg-grey-50 text-text-muted shadow-[0px_4px_0px_0px_var(--color-grey-200)] cursor-not-allowed"
          : variant === "danger"
            ? "bg-destructive text-white shadow-[0px_4px_0px_0px_#991b1b] cursor-pointer active:translate-y-[4px] active:shadow-none"
            : "bg-grey-600 text-white shadow-[0px_4px_0px_0px_var(--color-grey-900)] cursor-pointer active:translate-y-[4px] active:shadow-none hover:bg-grey-800"
      )}
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
  const [firstName, setFirstName] = useState(USER.name.split(" ")[0])
  const [lastName, setLastName] = useState(USER.name.split(" ").slice(1).join(" "))
  const [email, setEmail] = useState<string>(USER.email)
  const [role, setRole] = useState("Student")
  const [year, setYear] = useState("11")
  const [saved, setSaved] = useState(false)

  const [savedValues, setSavedValues] = useState({
    firstName: USER.name.split(" ")[0],
    lastName: USER.name.split(" ").slice(1).join(" "),
    email: USER.email as string,
    role: "Student",
    year: "11",
  })

  const hasChanges =
    firstName !== savedValues.firstName ||
    lastName !== savedValues.lastName ||
    email !== savedValues.email ||
    role !== savedValues.role ||
    year !== savedValues.year

  const handleSave = useCallback(() => {
    setSavedValues({ firstName, lastName, email, role, year })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }, [firstName, lastName, email, role, year])

  return (
    <Card>
      <CardTitle>Profile details</CardTitle>

      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col sm:flex-row gap-[16px]">
          <SettingsInput label="First name" value={firstName} onChange={setFirstName} className="flex-1" />
          <SettingsInput label="Last name" value={lastName} onChange={setLastName} className="flex-1" />
        </div>

        <SettingsInput label="Email" value={email} onChange={setEmail} />

        <div className="flex flex-col sm:flex-row gap-[16px]">
          <SettingsSelect label="Role" value={role} onChange={setRole} options={["Student", "Teacher", "Parent"]} className="flex-1" />
          <SettingsSelect label="Year" value={year} onChange={setYear} options={["7", "8", "9", "10", "11", "12", "13"]} className="flex-1" />
        </div>
      </div>

      <Divider />

      <div className="flex items-center gap-[12px]">
        <ActionButton disabled={!hasChanges && !saved} onClick={handleSave}>
          {saved ? (
            <span className="flex items-center gap-[8px]">
              <Check className="w-[18px] h-[18px]" />
              Saved
            </span>
          ) : (
            "Save changes"
          )}
        </ActionButton>
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

      <PreferenceRow
        icon={Mail}
        title="Email notifications"
        description="Receive weekly summaries and achievement alerts."
        enabled={emailNotifs}
        onToggle={toggleEmail}
      />

      <PreferenceRow
        icon={Trophy}
        title="Public leaderboards"
        description="Show your profile and stats on public league standings."
        enabled={publicLeaderboards}
        onToggle={toggleLeaderboards}
      />

      <PreferenceRow
        icon={Sparkles}
        title="AI marking"
        description="Allow AI to automatically grade your subjective answers."
        extra={
          <p className="font-normal text-[14px] text-blue-600 underline mt-[8px] cursor-pointer">
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
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [saved, setSaved] = useState(false)

  const isValidLength = newPassword.length >= 8 && newPassword.length <= 16
  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0
  const canSave = currentPassword.length > 0 && isValidLength && passwordsMatch

  const handleSave = useCallback(() => {
    setSaved(true)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setTimeout(() => setSaved(false), 2000)
  }, [])

  const handleCancel = useCallback(() => {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }, [])

  const hasInput = currentPassword.length > 0 || newPassword.length > 0 || confirmPassword.length > 0

  return (
    <Card>
      <CardTitle>Change password</CardTitle>

      <div className="flex flex-col gap-[28px]">
        <SettingsInput label="Current password" type="password" value={currentPassword} onChange={setCurrentPassword} />

        <div className="flex flex-col gap-[16px]">
          <SettingsInput label="New password" type="password" value={newPassword} onChange={setNewPassword} />
          <SettingsInput label="Confirm new password" type="password" value={confirmPassword} onChange={setConfirmPassword} />
        </div>

        <div className="flex items-center gap-[8px]">
          <CircleCheck className={cn("w-[20px] h-[20px] shrink-0", isValidLength ? "text-success" : "text-text-muted")} />
          <p className={cn("font-semibold text-[14px] leading-normal", isValidLength ? "text-success" : "text-text-primary")}>
            Password must be 8-16 characters long
          </p>
        </div>
      </div>

      <Divider />

      <div className="flex items-center gap-[8px]">
        <ActionButton disabled={!canSave && !saved} onClick={handleSave}>
          {saved ? (
            <span className="flex items-center gap-[8px]">
              <Check className="w-[18px] h-[18px]" />
              Saved
            </span>
          ) : (
            "Save changes"
          )}
        </ActionButton>
        <button
          type="button"
          disabled={!hasInput}
          onClick={handleCancel}
          className={cn(
            "font-bold text-[16px] leading-normal px-[12px] py-[8px] rounded-[6px] transition-colors",
            hasInput ? "text-text-primary cursor-pointer hover:bg-grey-100" : "text-text-muted cursor-not-allowed"
          )}
        >
          Cancel
        </button>
      </div>
    </Card>
  )
}

function DeleteConfirmModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [confirmText, setConfirmText] = useState("")
  const canDelete = confirmText.toLowerCase() === "delete"

  const handleClose = useCallback(() => {
    setConfirmText("")
    onClose()
  }, [onClose])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      label="Confirm account deletion"
      className="w-[600px] p-0 rounded-[16px]"
    >
      <div className="flex flex-col">
        {/* Body */}
        <div className="px-[28px] pt-[24px] pb-[28px] flex flex-col gap-[28px]">
          <div className="flex flex-col gap-[8px] pr-[24px]">
            <h3 className="font-semibold text-[20px] text-text-primary leading-normal">
              Are you sure?
            </h3>
            <p className="font-normal text-[16px] text-text-secondary leading-normal">
              By deleting your account, you will lose all data associated with it permanently.
            </p>
          </div>

          <div className="flex flex-col gap-[8px]">
            <p className="font-normal text-[16px] text-[#C0362D] leading-normal">
              To confirm deletion, type &quot;delete&quot; below:
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="delete"
              className="h-[48px] px-[16px] bg-white border border-grey-300 rounded-[4px] font-semibold text-[16px] text-text-primary leading-normal outline-none focus:border-blue-600 transition-colors"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-[28px] h-[88px] border-t border-border">
          <button
            type="button"
            onClick={handleClose}
            className="h-[44px] px-[20px] rounded-[4px] font-semibold text-[16px] text-text-secondary leading-normal cursor-pointer hover:bg-grey-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canDelete}
            onClick={handleClose}
            className={cn(
              "h-[44px] px-[20px] rounded-[4px] font-semibold text-[16px] leading-normal transition-colors",
              canDelete
                ? "bg-[#C0362D] text-white cursor-pointer hover:bg-[#a82e26]"
                : "bg-grey-200 text-text-muted cursor-not-allowed"
            )}
          >
            Delete account
          </button>
        </div>
      </div>
    </Modal>
  )
}

function DeleteAccountCard() {
  const [password, setPassword] = useState("")
  const [showModal, setShowModal] = useState(false)

  const openModal = useCallback(() => setShowModal(true), [])
  const closeModal = useCallback(() => setShowModal(false), [])

  return (
    <Card>
      <div className="flex flex-col gap-[8px]">
        <CardTitle>Delete account</CardTitle>
        <p className="font-normal text-[14px] text-text-muted leading-normal">
          Are you sure you want to delete your account? This action is permanent and cannot be undone. All your data, including progress, XP, and course access, will be lost.
        </p>
      </div>

      <SettingsInput label="Current password" type="password" value={password} onChange={setPassword} />

      <Divider />

      <div>
        <ActionButton disabled={password.length === 0} variant="danger" onClick={openModal}>
          Delete account
        </ActionButton>
      </div>

      <DeleteConfirmModal open={showModal} onClose={closeModal} />
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
