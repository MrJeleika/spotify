interface Props {
  children: React.ReactNode
}

export const SecondaryGradientBackground = ({ children }: Props) => {
  return (
    <div>
      <div className="bg-gradient-to-b from-[#1212124d] to-[#121212] h-[250px]"></div>
      <div className="bg-[#121212] w-full p-5 lg:p-10">
        <div className="bg-zinc-900/0 translate-y-[-250px]">{children}</div>
      </div>
    </div>
  )
}
