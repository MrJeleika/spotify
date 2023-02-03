// Hooks
import { useEffect } from 'react'
import { useAppDispatch } from 'redux/app/hooks'
// Misc
import { setRandomColorNum } from 'redux/slices/spotifySlice'
import { gradientColors } from 'utils/colors'
interface Props {
  children: React.ReactNode
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
