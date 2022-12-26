import { NavLink, Route, Routes } from 'react-router-dom'
// Components
import { Navbar } from 'components/Navbar/Navbar'
import { NavbarTop } from 'components/Navbar/NavbarTop/NavbarTop'
import { Profile } from 'components/Profile/Profile'
// Hooks
import { useAppSelector } from 'redux/app/hooks'
import { Playback } from 'components/Playback/Playback'

interface Props {}

export const Dashboard = (props: Props) => {
  const profile = useAppSelector((state) => state.spotify.profile)
  return (
    <div className="flex relative ">
      <div className="">
        <Playback />
      </div>

      <div className="w-[20%]">
        <Navbar />
      </div>
      <div className="w-[80%]">
        <NavbarTop />
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="user/:userId" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}
