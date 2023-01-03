// Components
import { ProfileListSVG } from 'components/svg/ProfileListSVG'
import { ProfileDropdown } from './ProfileDropdown'
// Hooks
import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
// Misc
import { motion } from 'framer-motion'
import { useFetchProfileQuery } from 'redux/api/spotifyAPI'
import { setProfile } from 'redux/slices/spotifySlice'
import { bgColors } from 'components/common/MainGradientBackground/MainGradientBackground'

interface Props {}

export const NavbarTop = ({}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const { profile, randomColorNum } = useAppSelector((state) => state.spotify)
  const { data, isSuccess } = useFetchProfileQuery()
  const dispatch = useAppDispatch()

  const navbarRef = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState<string>('00')

  useEffect(() => {
    if (data) {
      dispatch(setProfile(data))
    }
  }, [data])

  useEffect(() => {
    const scroll = () => {
      const temp = window.scrollY / 400
      if (temp < 1) {
        setOpacity(numberToHexOpacity(temp))
      } else {
        setOpacity(numberToHexOpacity(1))
      }
    }

    window.addEventListener('scroll', scroll)
    return () => {
      window.removeEventListener('scroll', scroll)
    }
  }, [])

  const numberToHexOpacity = (opacity: number): string => {
    // First, multiply the opacity value by 255 to get the 8-bit value
    const opacity8bit = Math.round(opacity * 255)
    // Convert the 8-bit value to a hexadecimal string
    const opacityHex = opacity8bit.toString(16).padStart(2, '0')
    return `${opacityHex}`
  }
  const backgroundColor = bgColors[randomColorNum]

  return (
    <motion.div className="w-full relative">
      <div
        style={{ background: `${backgroundColor}${opacity}` }}
        ref={navbarRef}
        className={` w-[80%] z-[550] fixed top-0 px-7 py-4 flex justify-between`}
      >
        <div></div>
        <div
          ref={profileRef}
          onClick={() => setIsOpen(!isOpen)}
          className="flex cursor-pointer relative bg-black/90 rounded-full p-[2px] items-center"
        >
          <div className="overflow-hidden rounded-full mr-2 w-8 h-8">
            <img src={profile.images[0].url} alt="Ava" className=" " />
          </div>
          <div className="text-white font-bold text-sm mr-2">
            {profile.display_name}
          </div>
          <div className="mr-2">
            <div className={`${isOpen ? 'rotate-180' : null} duration-300`}>
              <ProfileListSVG color="white" />
            </div>
          </div>
          <ProfileDropdown
            profileRef={profileRef}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        </div>
      </div>
    </motion.div>
  )
}
