import { memo } from "react"
import ProfileDetailsCard from "./ProfileDetailsCard"
import PreferencesCard from "./PreferencesCard"
import ChangePasswordCard from "./ChangePasswordCard"
import DeleteAccountCard from "./DeleteAccountCard"

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
