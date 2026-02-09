import { useState, useEffect, useRef } from "react"
import avatarImg from "@/assets/images/real images/Avatars.svg"
import { Pencil, X } from "lucide-react"

export default function ProfileHeader() {
  const [modalOpen, setModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Focus trap for modal
  useEffect(() => {
    if (!modalOpen) return
    const modal = modalRef.current
    if (!modal) return

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    first?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setModalOpen(false)
        return
      }
      if (e.key !== "Tab") return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [modalOpen])

  return (
    <>
      <div className="bg-[#fcfbf8] w-full py-[32px] px-[24px] sm:px-[32px]">
        <div className="max-w-[768px] mx-auto flex items-center gap-[32px]">
          {/* Avatar with edit button */}
          <div className="relative shrink-0">
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
              <img src={avatarImg} alt="User avatar" className="w-full h-full object-cover" />
            </div>
            <button
              onClick={() => setModalOpen(true)}
              aria-label="Edit profile picture"
              className="absolute bottom-[12px] right-[12px] w-[36px] h-[36px] rounded-full bg-[#1d2939] flex items-center justify-center cursor-pointer hover:bg-[#344054] shadow-sm"
            >
              <Pencil className="w-[16px] h-[16px] text-white" />
            </button>
          </div>

          {/* Name and info */}
          <div className="border-l border-[#eaecf0] pl-[32px]">
            <div className="flex flex-col gap-[4px]">
              <div className="flex items-center gap-[16px] flex-wrap">
                <h1 className="font-bold text-[24px] text-[#0b3c61] leading-normal">
                  Amadeus Carnegie
                </h1>
                <span className="bg-[#ecf7ff] text-[#1578c3] font-semibold text-[14px] px-[12px] h-[28px] rounded-full flex items-center">
                  Free account
                </span>
              </div>
              <p className="text-[16px] text-[#667085] leading-normal">
                amadeus@cognitoedu.org
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Edit Profile">
          <div className="absolute inset-0 bg-black/40" onClick={() => setModalOpen(false)} />
          <div ref={modalRef} className="relative bg-white rounded-[12px] w-[480px] max-w-[calc(100%-48px)] p-[32px] shadow-xl">
            <div className="flex items-center justify-between mb-[24px]">
              <h2 className="font-bold text-[20px] text-[#0b3c61]">Edit Profile</h2>
              <button onClick={() => setModalOpen(false)} aria-label="Close dialog" className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[#f2f4f7] cursor-pointer">
                <X className="w-[20px] h-[20px] text-[#667085]" />
              </button>
            </div>
            <p className="text-[16px] text-[#667085]">Profile editing coming soon.</p>
          </div>
        </div>
      )}
    </>
  )
}
