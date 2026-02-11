import { memo, useState, useRef } from "react"
import cognitoLogo from "@/assets/images/icons/Cognito Logo.png"
import flameIcon from "@/assets/images/icons/Cognito icons.svg"
import { ChevronDown, Search, Zap } from "lucide-react"
import { useClickOutside } from "@/hooks/useClickOutside"
import Modal from "@/components/ui/Modal"
import { USER, COURSES, ACCOUNT_MENU_ITEMS } from "@/data/user"
import { CURRENT_STREAK_DAYS } from "@/data/gamification"

export default memo(function Navbar() {
  const [coursesOpen, setCoursesOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [proModalOpen, setProModalOpen] = useState(false)

  const coursesRef = useRef<HTMLDivElement>(null)
  const accountRef = useRef<HTMLDivElement>(null)

  useClickOutside(coursesRef, () => setCoursesOpen(false))
  useClickOutside(accountRef, () => setAccountOpen(false))

  function handleDropdownKeyDown(
    e: React.KeyboardEvent,
    setOpen: (open: boolean) => void
  ) {
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  return (
    <>
      <nav className="flex items-center justify-between px-[16px] sm:px-[32px] py-[20px] bg-white border-b border-border w-full h-[64px] sm:h-[80px]" role="navigation" aria-label="Main navigation">
        {/* Left section */}
        <div className="flex items-center gap-[12px] sm:gap-[24px] flex-1 min-w-0">
          <img src={cognitoLogo} alt="Cognito home" className="w-[35px] h-[34px] shrink-0" />
          <div
            ref={coursesRef}
            className="relative"
            onKeyDown={(e) => handleDropdownKeyDown(e, setCoursesOpen)}
          >
            <button
              onClick={() => setCoursesOpen(!coursesOpen)}
              aria-expanded={coursesOpen}
              aria-haspopup="true"
              className="flex items-center gap-[8px] cursor-pointer"
            >
              <span className="hidden sm:inline font-bold text-[16px] text-text-primary leading-normal">Courses</span>
              <ChevronDown className={`w-[20px] h-[20px] text-text-primary transition-transform duration-200 ${coursesOpen ? "rotate-180" : ""}`} />
            </button>
            {coursesOpen && (
              <div className="absolute left-0 top-[36px] bg-white border border-border rounded-[8px] shadow-lg z-20 min-w-[200px]" role="menu">
                {COURSES.map((course) => (
                  <button key={course} role="menuitem" className="w-full text-left px-[16px] py-[12px] text-[14px] font-semibold text-text-secondary hover:bg-grey-150 cursor-pointer first:rounded-t-[8px] last:rounded-b-[8px]">
                    {course}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="w-[1px] h-[34px] bg-border shrink-0 hidden sm:block" />
          <button onClick={() => setSearchOpen(true)} aria-label="Search" className="cursor-pointer">
            <Search className="w-[20px] h-[20px] text-text-muted" />
          </button>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-[12px] sm:gap-[24px]">
          <div className="flex items-center gap-[2px] bg-amber-50 rounded-full pl-[4px] pr-[4px] sm:pr-[10px] py-[3px] cursor-pointer" role="status" aria-label={`Current streak: ${CURRENT_STREAK_DAYS} days`}>
            <img src={flameIcon} alt="" className="w-[28px] h-[28px]" />
            <span className="hidden sm:inline font-bold text-[16px] text-amber-600">{CURRENT_STREAK_DAYS} days</span>
          </div>
          <button onClick={() => setProModalOpen(true)} className="flex items-center gap-[8px] cursor-pointer" aria-label="Get Pro">
            <Zap className="w-[16px] h-[16px] text-purple-primary fill-purple-primary" />
            <span className="hidden sm:inline font-bold text-[16px] text-purple-primary">Get Pro</span>
          </button>
          <div className="w-[1px] h-[34px] bg-border shrink-0 hidden sm:block" />
          <div
            ref={accountRef}
            className="relative"
            onKeyDown={(e) => handleDropdownKeyDown(e, setAccountOpen)}
          >
            <button
              onClick={() => setAccountOpen(!accountOpen)}
              aria-expanded={accountOpen}
              aria-haspopup="true"
              aria-label="Account menu"
              className="flex items-center gap-[8px] cursor-pointer"
            >
              <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-full bg-blue-100 flex items-center justify-center">
                <span className="font-bold text-[14px] sm:text-[16px] text-blue-700">{USER.initials}</span>
              </div>
              <ChevronDown className={`w-[20px] h-[20px] text-text-muted transition-transform duration-200 hidden sm:block ${accountOpen ? "rotate-180" : ""}`} />
            </button>
            {accountOpen && (
              <div className="absolute right-0 top-[52px] bg-white border border-border rounded-[8px] shadow-lg z-20 min-w-[180px]" role="menu">
                {ACCOUNT_MENU_ITEMS.map((item) => (
                  <button key={item} role="menuitem" className={`w-full text-left px-[16px] py-[12px] text-[14px] font-semibold cursor-pointer first:rounded-t-[8px] last:rounded-b-[8px] ${item === "Sign out" ? "text-destructive hover:bg-destructive-bg" : "text-text-secondary hover:bg-grey-150"}`}>
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <Modal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        label="Search"
        align="top"
        className="w-[560px] p-[24px]"
        showClose={false}
      >
        <div className="flex items-center gap-[12px] border border-grey-300 rounded-[8px] px-[14px] h-[48px]">
          <Search className="w-[20px] h-[20px] text-text-muted shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search courses, topics..."
            className="flex-1 text-[16px] text-text-primary outline-none bg-transparent placeholder:text-text-muted"
          />
        </div>
        <p className="text-[14px] text-text-muted mt-[16px] text-center">Start typing to search</p>
      </Modal>

      {/* Get Pro Modal */}
      <Modal open={proModalOpen} onClose={() => setProModalOpen(false)} label="Get Pro">
        <div className="flex items-center justify-between mb-[24px]">
          <div className="flex items-center gap-[8px]">
            <Zap className="w-[20px] h-[20px] text-purple-primary fill-purple-primary" />
            <h2 className="font-bold text-[20px] text-heading">Get Cognito Pro</h2>
          </div>
        </div>
        <p className="text-[16px] text-text-muted">Upgrade to Pro for unlimited access to all courses, ad-free learning, and more.</p>
      </Modal>
    </>
  )
})
