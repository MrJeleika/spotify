// Components
import { ProfileList } from 'components/svg/ProfileList'
import { ProfileDropdown } from './ProfileDropdown'
// Hooks
import { useRef, useState } from 'react'
import { useAppSelector } from 'redux/app/hooks'
// Misc
import { motion } from 'framer-motion'

interface Props {}

export const NavbarTop = ({}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const profile = useAppSelector((state) => state.spotify.profile)

  return (
    <div className="w-full relative">
      <div className="bg-inherit w-[80%] fixed top-0 px-7 py-4 flex justify-between">
        <div></div>
        <motion.div
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
            <ProfileList color="white" />
          </div>
          <ProfileDropdown
            profileRef={profileRef}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        </motion.div>
      </div>
    </div>
  )
}
