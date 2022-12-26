import { FunctionComponent } from 'react'

interface Props {
  children: React.ReactNode
}

const colors: any = {
  1: 'from-[#90444466] to-[#904444]',
  2: 'from-[#0B3B9D66] to-[#0B3B9D]',
  3: 'from-[#5F6C6866] to-[#5F6C68]',
  4: 'from-[#E6AF2E66] to-[#E6AF2E]',
  5: 'from-[#334E5866] to-[#334E58]',
  6: 'from-[#005C6966] to-[#005C69]',
  7: 'from-[#F5853F66] to-[#F5853F]',
  8: 'from-[#77201466] to-[#772014]',
  9: 'from-[#2E2E3A66] to-[#2E2E3A]',
  10: 'from-[#B0A3D466] to-[#B0A3D4]',
  11: 'from-[#D2A1B866] to-[#D2A1B8]',
  12: 'from-[#70925566] to-[#709255]',
  13: 'from-[#EA9E8D66] to-[#EA9E8D]',
  14: 'from-[#03717166] to-[#037171]',
  15: 'from-[#9A275A66] to-[#9A275A]',
}
const random = Math.floor(Math.random() * Object.keys(colors).length + 1)

export const MainGradientBackground = ({ children }: Props) => {
  const mainRandomColor = colors[random]
  return (
    <div className={`bg-gradient-to-b pt-[80px] ${mainRandomColor} w-full`}>
      {children}
    </div>
  )
}
