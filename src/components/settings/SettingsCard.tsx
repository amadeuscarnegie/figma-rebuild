export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border-[1.5px] border-border rounded-[12px] p-[16px] sm:p-[32px] flex flex-col gap-[24px]">
      {children}
    </div>
  )
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-bold text-[18px] text-text-primary leading-normal">
      {children}
    </h2>
  )
}

export function Divider() {
  return <div className="w-full h-px bg-border" />
}
