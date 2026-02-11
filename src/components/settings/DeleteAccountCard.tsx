import { useState } from "react"
import { cn } from "@/lib/utils"
import Modal from "@/components/ui/Modal"
import SettingsInput from "@/components/ui/SettingsInput"
import ActionButton from "@/components/ui/ActionButton"
import { Card, CardTitle, Divider } from "./SettingsCard"

function DeleteConfirmModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [confirmText, setConfirmText] = useState("")
  const canDelete = confirmText.toLowerCase() === "delete"

  function handleClose() {
    setConfirmText("")
    onClose()
  }

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
            <p className="font-normal text-[16px] text-destructive-text leading-normal">
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
                ? "bg-destructive-text text-white cursor-pointer hover:bg-destructive-hover"
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

export default function DeleteAccountCard() {
  const [password, setPassword] = useState("")
  const [showModal, setShowModal] = useState(false)

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
        <ActionButton disabled={password.length === 0} variant="danger" onClick={() => setShowModal(true)}>
          Delete account
        </ActionButton>
      </div>

      <DeleteConfirmModal open={showModal} onClose={() => setShowModal(false)} />
    </Card>
  )
}
