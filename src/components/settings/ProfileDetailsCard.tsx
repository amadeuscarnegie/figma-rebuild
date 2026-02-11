import { useState } from "react"
import { Check } from "lucide-react"
import { USER } from "@/data/user"
import SettingsInput from "@/components/ui/SettingsInput"
import SettingsSelect from "@/components/ui/SettingsSelect"
import ActionButton from "@/components/ui/ActionButton"
import { Card, CardTitle, Divider } from "./SettingsCard"

export default function ProfileDetailsCard() {
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

  function handleSave() {
    setSavedValues({ firstName, lastName, email, role, year })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

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
