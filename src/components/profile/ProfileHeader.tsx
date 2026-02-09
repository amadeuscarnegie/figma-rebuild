import { memo, useState } from "react"
import avatarImg from "@/assets/images/icons/Avatars.svg"
import { Pencil } from "lucide-react"
import Modal from "@/components/ui/Modal"
import { USER } from "@/data/constants"

export default memo(function ProfileHeader() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div className="bg-profile-bg w-full py-[24px] sm:py-[32px] px-[16px] sm:px-[32px]">
        <div className="max-w-[768px] mx-auto flex items-center gap-[16px] sm:gap-[32px]">
          {/* Avatar with edit button */}
          <div className="relative shrink-0">
            <div className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] rounded-full overflow-hidden">
              <img src={avatarImg} alt="User avatar" className="w-full h-full object-cover" />
            </div>
            <button
              onClick={() => setModalOpen(true)}
              aria-label="Edit profile picture"
              className="absolute bottom-[6px] right-[6px] sm:bottom-[12px] sm:right-[12px] w-[28px] h-[28px] sm:w-[36px] sm:h-[36px] rounded-full bg-grey-900 flex items-center justify-center cursor-pointer hover:bg-grey-600 shadow-sm"
            >
              <Pencil className="w-[12px] h-[12px] sm:w-[16px] sm:h-[16px] text-white" />
            </button>
          </div>

          {/* Name and info */}
          <div className="sm:border-l sm:border-border sm:pl-[32px]">
            <div className="flex flex-col gap-[4px]">
              <div className="flex items-center gap-[8px] sm:gap-[16px] flex-wrap">
                <h1 className="font-bold text-[18px] sm:text-[24px] text-heading leading-normal">
                  {USER.name}
                </h1>
                <span className="bg-card-blue-bg text-blue-600 font-semibold text-[12px] sm:text-[14px] px-[10px] sm:px-[12px] h-[24px] sm:h-[28px] rounded-full flex items-center">
                  {USER.accountType}
                </span>
              </div>
              <p className="text-[14px] sm:text-[16px] text-text-muted leading-normal">
                {USER.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} label="Edit Profile">
        <div className="flex items-center justify-between mb-[24px]">
          <h2 className="font-bold text-[20px] text-heading">Edit Profile</h2>
        </div>
        <p className="text-[16px] text-text-muted">Profile editing coming soon.</p>
      </Modal>
    </>
  )
})
