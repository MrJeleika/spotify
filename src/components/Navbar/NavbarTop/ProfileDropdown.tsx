// Hooks
import { RefObject, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
// Misc
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
// Redux
import { setToken } from 'redux/slices/authSlice'

interface Props {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  profileRef: RefObject<HTMLDivElement>
}

export const ProfileDropdown = ({ isOpen, setIsOpen, profileRef }: Props) => {
  const profile = useAppSelector((state) => state.spotify.profile)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  // Close dropdown on outside click
  useEffect(() => {
    let handler = (e: any) => {
      if (
        !dropdownRef.current?.contains(e.target) &&
        !profileRef.current?.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  })

  const logout = () => {
    window.location.hash = ''
    window.localStorage.removeItem('token')
    dispatch(setToken(null))
  }

  const variants = {
    open: { opacity: 1, y: 0, display: 'block' },
    closed: { opacity: 0, y: '-10%', transitionEnd: { display: 'none' } },
  }

  return (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      transition={{ duration: 0.3 }}
      ref={dropdownRef}
      className={`absolute shadow-xl hidden rounded top-10 right-0 w-[200px] text-zinc-50/80 p-1 bg-zinc-800`}
    >
      <ul>
        <NavLink to={`user/${profile.id}`}>
          <li className="w-full p-3 hover:bg-zinc-500 ">Profile </li>
        </NavLink>
        <NavLink to={`/`}>
          <li
            onClick={logout}
            className="w-full p-3 hover:bg-zinc-500 border-t-[1px] border-zinc-50/30"
          >
            Logout
          </li>
        </NavLink>
      </ul>
    </motion.div>
  )
}
