interface Props {
  children: React.ReactNode
}

export const BlackBackground = ({ children }: Props) => {
  return (
    <div className="bg-background w-full p-5 min-h-[100vh] lg:p-10 ">
      <div className="pb-20 pt-16">{children}</div>
    </div>
  )
}
