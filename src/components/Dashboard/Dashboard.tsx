import { useEffect } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
// Components
import { Navbar } from 'components/Navbar/Navbar'
import { NavbarTop } from 'components/Navbar/NavbarTop/NavbarTop'
import { Profile } from 'components/Profile/Profile'
// Redux
import { useFetchProfileQuery } from 'redux/api/spotifyAPI'
import { setProfile } from 'redux/slices/spotifySlice'
// Hooks
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'

interface Props {}

export const Dashboard = (props: Props) => {
  const { data, isFetching } = useFetchProfileQuery()
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) => state.spotify.profile)
  useEffect(() => {
    if (data && !isFetching) {
      dispatch(setProfile(data))
    }
  }, [isFetching])
  return (
    <div className="flex h-full">
      <div className="w-[20%]">
        <Navbar />
      </div>
      <div className="w-[80%]">
        <NavbarTop />
        <Routes>
          <Route path="user/:userId" element={<Profile />} />
        </Routes>
        <NavLink to={`user/${profile.id}`}>adsasd</NavLink>
      </div>
    </div>
  )
}
