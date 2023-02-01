import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
// Components
import { Navbar } from 'components/Navbar/Navbar'
import { Preloader } from 'components/common/Preloader/Preloader'
import { NavbarTop } from 'components/Navbar/NavbarTop/NavbarTop'
import { Playback } from 'components/Playback/Playback'
import { Error } from 'components/common/Error/Error'
import { SearchField } from 'components/Search/SearchField'
import { DashboardRoutes } from './DashboardRoutes'
// Hooks
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
// Redux
import { useFetchMySavedTracksQuery } from 'redux/api/spotifyAPI'
import { setSavedTracks } from 'redux/slices/spotifySlice'
// Misc
import { Errors } from 'types/Errors'
import { Home } from 'components/Home/Home'

export const Dashboard = () => {
  const location = useLocation()

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
        <Home />
      </div>

      <div className="sm:w-[20%] w-0 w-full">
        <Navbar />
      </div>
      <div className="sm:w-[80%] w-full relative">
        <NavbarTop
          modifier={
            location.pathname.includes('search') ? <SearchField /> : null
          }
        />
        {isLoading ? <Preloader /> : null}

        <DashboardRoutes />
      </div>
    </div>
  )
}
