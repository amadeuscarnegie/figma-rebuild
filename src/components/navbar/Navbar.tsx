import { useState, useRef, useEffect } from "react"
import cognitoLogo from "@/assets/images/real images/Cognito Logo.png"
import flameIcon from "@/assets/images/real images/Cognito icons.svg"
import { ChevronDown, Search, Zap, X } from "lucide-react"

function useClickOutside(ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [ref, onClose])
}

export default function Navbar() {
  const [coursesOpen, setCoursesOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [proModalOpen, setProModalOpen] = useState(false)

  const coursesRef = useRef<HTMLDivElement>(null)
  const accountRef = useRef<HTMLDivElement>(null)

  useClickOutside(coursesRef, () => setCoursesOpen(false))
  useClickOutside(accountRef, () => setAccountOpen(false))

  return (
    <>
      <nav className="flex items-center justify-between px-[24px] sm:px-[32px] py-[20px] bg-white border-b border-[#eaecf0] w-full h-[80px]" role="navigation" aria-label="Main navigation">
        {/* Left section */}
        <div className="flex items-center gap-[24px] flex-1 min-w-0">
          <img src={cognitoLogo} alt="Cognito home" className="w-[35px] h-[34px] shrink-0" />
          <div ref={coursesRef} className="relative">
            <button
              onClick={() => setCoursesOpen(!coursesOpen)}
              aria-expanded={coursesOpen}
              aria-haspopup="true"
              className="flex items-center gap-[8px] cursor-pointer"
            >
              <span className="font-bold text-[16px] text-[#101828] leading-normal">Courses</span>
              <ChevronDown className={`w-[20px] h-[20px] text-[#101828] transition-transform duration-200 ${coursesOpen ? "rotate-180" : ""}`} />
            </button>
            {coursesOpen && (
              <div className="absolute left-0 top-[36px] bg-white border border-[#eaecf0] rounded-[8px] shadow-lg z-20 min-w-[200px]">
                {["GCSE Maths", "GCSE Science", "A-Level Maths", "A-Level Physics"].map((course) => (
                  <button key={course} className="w-full text-left px-[16px] py-[12px] text-[14px] font-semibold text-[#344054] hover:bg-[#f9fafb] cursor-pointer first:rounded-t-[8px] last:rounded-b-[8px]">
                    {course}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="w-[1px] h-[34px] bg-[#eaecf0] shrink-0" />
          <button onClick={() => setSearchOpen(true)} aria-label="Search" className="cursor-pointer">
            <Search className="w-[20px] h-[20px] text-[#667085]" />
          </button>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-[16px] sm:gap-[24px]">
          <div className="flex items-center gap-[2px] bg-[#fff7e9] rounded-full pl-[4px] pr-[10px] py-[3px] cursor-pointer" role="status" aria-label="Current streak: 3 days">
            <img src={flameIcon} alt="" className="w-[28px] h-[28px]" />
            <span className="font-bold text-[16px] text-[#ca8d1b]">3 days</span>
          </div>
          <button onClick={() => setProModalOpen(true)} className="flex items-center gap-[8px] cursor-pointer">
            <Zap className="w-[16px] h-[16px] text-[#8d22cc] fill-[#8d22cc]" />
            <span className="font-bold text-[16px] text-[#8d22cc]">Get Pro</span>
          </button>
          <div className="w-[1px] h-[34px] bg-[#eaecf0] shrink-0" />
          <div ref={accountRef} className="relative">
            <button
              onClick={() => setAccountOpen(!accountOpen)}
              aria-expanded={accountOpen}
              aria-haspopup="true"
              aria-label="Account menu"
              className="flex items-center gap-[8px] cursor-pointer"
            >
              <div className="w-[40px] h-[40px] rounded-full bg-[#d1eafd] flex items-center justify-center">
                <span className="font-bold text-[16px] text-[#105a92]">A</span>
              </div>
              <ChevronDown className={`w-[20px] h-[20px] text-[#667085] transition-transform duration-200 ${accountOpen ? "rotate-180" : ""}`} />
            </button>
            {accountOpen && (
              <div className="absolute right-0 top-[52px] bg-white border border-[#eaecf0] rounded-[8px] shadow-lg z-20 min-w-[180px]">
                {["My Account", "Settings", "Help", "Sign out"].map((item) => (
                  <button key={item} className={`w-full text-left px-[16px] py-[12px] text-[14px] font-semibold cursor-pointer first:rounded-t-[8px] last:rounded-b-[8px] ${item === "Sign out" ? "text-[#d92d20] hover:bg-[#fef3f2]" : "text-[#344054] hover:bg-[#f9fafb]"}`}>
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[120px]" role="dialog" aria-modal="true" aria-label="Search">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSearchOpen(false)} />
          <div className="relative bg-white rounded-[12px] w-[560px] max-w-[calc(100%-48px)] p-[24px] shadow-xl">
            <div className="flex items-center gap-[12px] border border-[#d0d5dd] rounded-[8px] px-[14px] h-[48px]">
              <Search className="w-[20px] h-[20px] text-[#667085] shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search courses, topics..."
                className="flex-1 text-[16px] text-[#101828] outline-none bg-transparent placeholder:text-[#667085]"
              />
            </div>
            <p className="text-[14px] text-[#667085] mt-[16px] text-center">Start typing to search</p>
            <button onClick={() => setSearchOpen(false)} aria-label="Close search" className="absolute top-[16px] right-[16px] w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[#f2f4f7] cursor-pointer">
              <X className="w-[18px] h-[18px] text-[#667085]" />
            </button>
          </div>
        </div>
      )}

      {/* Get Pro Modal */}
      {proModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Get Pro">
          <div className="absolute inset-0 bg-black/40" onClick={() => setProModalOpen(false)} />
          <div className="relative bg-white rounded-[12px] w-[480px] max-w-[calc(100%-48px)] p-[32px] shadow-xl">
            <div className="flex items-center justify-between mb-[24px]">
              <div className="flex items-center gap-[8px]">
                <Zap className="w-[20px] h-[20px] text-[#8d22cc] fill-[#8d22cc]" />
                <h2 className="font-bold text-[20px] text-[#0b3c61]">Get Cognito Pro</h2>
              </div>
              <button onClick={() => setProModalOpen(false)} aria-label="Close dialog" className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[#f2f4f7] cursor-pointer">
                <X className="w-[20px] h-[20px] text-[#667085]" />
              </button>
            </div>
            <p className="text-[16px] text-[#667085]">Upgrade to Pro for unlimited access to all courses, ad-free learning, and more.</p>
          </div>
        </div>
      )}
    </>
  )
}
