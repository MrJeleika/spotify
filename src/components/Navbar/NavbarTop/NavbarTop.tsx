// Components
import { ProfileListSVG } from 'components/svg/ProfileListSVG'
import { ProfileDropdown } from './ProfileDropdown'
// Hooks
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
// Misc
import { motion } from 'framer-motion'
import { useFetchProfileQuery } from 'redux/api/spotifyAPI'
import { setProfile } from 'redux/slices/spotifySlice'

interface Props {}

export const NavbarTop = ({}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [scrollPos, setScrollPos] = useState<number>(2)
  const profileRef = useRef<HTMLDivElement>(null)
  const { profile } = useAppSelector((state) => state.spotify)
  const { data, isSuccess } = useFetchProfileQuery()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setProfile(data))
    }
  }, [data])
  return (
    <motion.div className="w-full relative">
      <div className="bg-inherit w-[80%] z-[100] fixed top-0 px-7 py-4 flex justify-between">
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
