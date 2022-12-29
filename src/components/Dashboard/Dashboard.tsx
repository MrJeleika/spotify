import { NavLink, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Components
import { Navbar } from 'components/Navbar/Navbar'
import { NavbarTop } from 'components/Navbar/NavbarTop/NavbarTop'
import { Profile } from 'components/Profile/Profile'
// Hooks
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { Playback } from 'components/Playback/Playback'
import { Playlist } from 'components/Playlist/Playlist'
import { useFetchMySavedTracksQuery } from 'redux/api/spotifyAPI'
import { setIsloading, setSavedTracks } from 'redux/slices/spotifySlice'
import { MyAllTopTracks } from 'components/Playlist/MyAllTopTracks/MyAllTopTracks'
import { Preloader } from 'components/common/Preloader/Preloader'

interface Props {}

export const Dashboard = (props: Props) => {
  const { profile, savedTracks, isLoading } = useAppSelector(
    (state) => state.spotify
  )
  //Fetch offset
  const [offset, setOffset] = useState<number>(0)

  const { data: savedTracksData } = useFetchMySavedTracksQuery(offset)

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (savedTracksData) {
      dispatch(setSavedTracks(savedTracksData))
      if (savedTracksData.next) {
        setOffset(savedTracksData.next.match(/offset=(\d+)/)[1])
      }
    }
  }, [savedTracksData])

  return (
    <div className="flex relative ">
      <div className="">
        <Playback />
      </div>

      <div className="w-[20%]">
        <Navbar />
      </div>
      <div className="w-[80%] relative">
        <NavbarTop />
        {isLoading ? <Preloader /> : null}
        <Routes>
          <Route path="playlist/:playlistId" element={<Playlist />} />
          <Route path="/" element={<Profile />} />
          <Route path="user/:userId" element={<Profile />} />
          <Route path="user/:userId/top/tracks" element={<MyAllTopTracks />} />
        </Routes>
      </div>
    </div>
  )
}
