interface Props {
  children: React.ReactNode
}

export const SecondaryGradientBackground = ({ children }: Props) => {
  return (
    <div className="h-full">
      <div className="bg-gradient-to-b from-[#1212124d] to-background h-[250px]"></div>
      <div className="bg-background w-full p-5 lg:p-10">
        <div className="bg-zinc-900/0 translate-y-[-250px] relative">
          {/* Element will be translated to -250px and have this space down */}
          {children}
          <div className="w-full border-b-[1px] border-gray rounded-full absolute bottom-[-100px]"></div>
        </div>
      </div>
    </div>
  )
}
