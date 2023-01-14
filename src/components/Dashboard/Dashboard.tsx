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
import { Error } from 'components/common/Error/Error'
import { MyFollowedArtists } from 'components/Artists/MyFollowedArtists/MyFollowedArtists'
import { MyTopArtists } from 'components/Artists/MyTopArtists/MyTopArtists'
import { Errors } from 'types/Errors'
import { PlaybackQueue } from 'components/Playback/PlaybackQueue/PlaybackQueue'

interface Props {}

export const Dashboard = (props: Props) => {
  const { profile, savedTracks, isLoading, playerError } = useAppSelector(
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
  const [showError, setShowError] = useState<boolean>(playerError.isError)
  useEffect(() => {
    setShowError(playerError.isError)
  }, [playerError.isError])
  console.log(playerError)

  return (
    <div className="flex relative ">
      {/* Error if device not connected */}
      <Error setShow={setShowError} show={showError}>
        {playerError.message === Errors.NO_ACTIVE_DEVICE ? (
          <h1 className="text-white text-center text-xl">
            To connect player: open{' '}
            <span className="text-green">Spotify app</span>, click available
            devices and choose <span className="text-green">My React app</span>
          </h1>
        ) : null}
      </Error>

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
          <Route path="user/:userId/top/artists" element={<MyTopArtists />} />
          <Route
            path="user/:userId/following"
            element={<MyFollowedArtists />}
          />
          <Route path="/queue" element={<PlaybackQueue />} />
        </Routes>
      </div>
    </div>
  )
}
