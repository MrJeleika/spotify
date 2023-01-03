import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
// Components
import { Navbar } from 'components/Navbar/Navbar'
import { Preloader } from 'components/common/Preloader/Preloader'
import { NavbarTop } from 'components/Navbar/NavbarTop/NavbarTop'
import { Profile } from 'components/Profile/Profile'
import { Playlist } from 'components/Playlist/Playlist'
import { Playback } from 'components/Playback/Playback'
import { MyAllTopTracks } from 'components/Playlist/MyAllTopTracks/MyAllTopTracks'
// Hooks
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
// Redux
import {
  useFetchAvailableDevicesQuery,
  useFetchMySavedTracksQuery,
} from 'redux/api/spotifyAPI'
import { setIsloading, setSavedTracks } from 'redux/slices/spotifySlice'
import { NoDeviceError } from 'components/common/NoDeviceError/NoDeviceError'

interface Props {}

export const Dashboard = (props: Props) => {
  const { profile, savedTracks, isLoading, noDeviceError } = useAppSelector(
    (state) => state.spotify
  )
  //Fetch offset
  const [offset, setOffset] = useState<number>(0)
  const { data: savedTracksData } = useFetchMySavedTracksQuery(offset)

  const dispatch = useAppDispatch()

  // fetch & dispatch all saved tracks
  useEffect(() => {
    if (savedTracksData) {
      dispatch(setSavedTracks(savedTracksData))
      if (savedTracksData.next) {
        setOffset(savedTracksData.next.match(/offset=(\d+)/)[1])
      }
    }
  }, [savedTracksData])
  // Show Device error
  const [showError, setShowError] = useState<boolean>(noDeviceError)
  useEffect(() => {
    setShowError(noDeviceError)
    console.log(showError)
  }, [noDeviceError])

  return (
    <div className="flex relative ">
      <NoDeviceError setShow={setShowError} show={showError} />

      <div>
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
