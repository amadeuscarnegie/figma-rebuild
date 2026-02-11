import { useState } from "react"
import { CircleCheck, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import SettingsInput from "@/components/ui/SettingsInput"
import ActionButton from "@/components/ui/ActionButton"
import { Card, CardTitle, Divider } from "./SettingsCard"

export default function ChangePasswordCard() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [saved, setSaved] = useState(false)

  const isValidLength = newPassword.length >= 8 && newPassword.length <= 16
  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0
  const canSave = currentPassword.length > 0 && isValidLength && passwordsMatch

  function handleSave() {
    setSaved(true)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setTimeout(() => setSaved(false), 2000)
  }

  function handleCancel() {
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

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
