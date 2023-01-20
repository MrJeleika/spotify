import { FunctionComponent, useEffect } from 'react'
import { useAppDispatch } from 'redux/app/hooks'
import { setRandomColorNum } from 'redux/slices/spotifySlice'

interface Props {
  children: React.ReactNode
}

export const gradientColors: any = {
  1: 'from-[#90444466] to-[#904444]',
  2: 'from-[#0B3B9D66] to-[#0B3B9D]',
  3: 'from-[#5F6C6866] to-[#5F6C68]',
  4: 'from-[#332B3BBF] to-[#332B3B]',
  5: 'from-[#334E5866] to-[#334E58]',
  6: 'from-[#005C6966] to-[#005C69]',
  7: 'from-[#F5853F66] to-[#F5853F]',
  8: 'from-[#77201466] to-[#772014]',
  9: 'from-[#2E2E3A66] to-[#2E2E3A]',
  10: 'from-[#B0A3D466] to-[#B0A3D4]',
  11: 'from-[#D2A1B866] to-[#D2A1B8]',
  12: 'from-[#70925566] to-[#709255]',
  13: 'from-[#160E4466] to-[#160E44]',
  14: 'from-[#03717166] to-[#037171]',
  15: 'from-[#9A275A66] to-[#9A275A]',
  16: 'from-[#253B43BF] to-[#253B43]',
}
export const bgColors: any = {
  1: '#000000',
  2: '#0B3B9D',
  3: '#5F6C68',
  4: '#E6AF2E',
  5: '#334E58',
  6: '#005C69',
  7: '#F5853F',
  8: '#772014',
  9: '#2E2E3A',
  10: '#B0A3D4',
  11: '#D2A1B8',
  12: '#709255',
  13: '#EA9E8D',
  14: '#037171',
  15: '#9A275A',
  16: '#904444',
}

let random: number

export const MainGradientBackground = ({ children }: Props) => {
  const dispatch = useAppDispatch()

  // Set random color on every render
  useEffect(() => {
    random = Math.floor(Math.random() * Object.keys(gradientColors).length + 1)
    dispatch(setRandomColorNum(random))
    return () => {
      dispatch(setRandomColorNum(1))
    }
  }, [])
  const mainRandomColor = gradientColors[random]
  return (
    <div className={`bg-gradient-to-b pt-[80px] ${mainRandomColor} w-full `}>
      {children}
    </div>
  )
}
