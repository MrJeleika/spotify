// Hooks
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
// Components
import { PauseSVG } from 'components/svg/PauseSVG'
import { PrevSongSVG } from 'components/svg/PrevSongSVG'
import { NextSongSVG } from 'components/svg/NextSongSVG'
import { RandomSongSVG } from 'components/svg/RandomSongSVG'
import { RepeatSongSVG } from 'components/svg/RepeatSongSVG'
import { Tooltip } from 'components/common/Tooltip/Tooltip'
import { PlaySVG } from 'components/svg/PlaySVG'
import { PlaybackTrackInfo } from './Elements/PlaybackTrackInfo'
import { PlaybackDeviceControl } from './Elements/PlaybackDeviceControl'
import { MobilePlayback } from './MobilePlayback/MobilePlayback'
// Misc
import { getTrackDuration } from 'utils'
import { RemoveScroll } from 'react-remove-scroll'
import Slider from 'rc-slider'
import { setPlaybackState, setPlayerError } from 'redux/slices/spotifySlice'
import {
  useFetchPlaybackStateQuery,
  useSeekPlaybackMutation,
  usePlayPlaybackMutation,
  usePausePlaybackMutation,
  useSkipToNextSongMutation,
  useSkipToPrevSongMutation,
  useTogglePlaybackShuffleMutation,
} from 'redux/api/spotifyAPI'
// Styles
import 'rc-slider/assets/index.css'

export const Playback = () => {
  const [value, setValue] = useState<any>(0)
  const [pausePlayback] = usePausePlaybackMutation()
  const [toggleShaffle] = useTogglePlaybackShuffleMutation()
  const [resumePlayback] = usePlayPlaybackMutation()
  const [skipToNextSong] = useSkipToNextSongMutation()
  const [skipToPrevSong] = useSkipToPrevSongMutation()
  const [seekPosition] = useSeekPlaybackMutation()

  const { playbackState } = useAppSelector((state) => state.spotify)

  const { data, error } = useFetchPlaybackStateQuery(null, {
    pollingInterval: 1000,
  })

  const trackDuration = getTrackDuration(playbackState.item.duration_ms)
  const trackProgress = getTrackDuration(playbackState.progress_ms)

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (data) {
      dispatch(setPlaybackState(data))
      setValue(playbackState.progress_ms)
    }
    if (
      error &&
      'data' in error &&
      typeof error.data === 'object' &&
      error.data &&
      'error' in error.data &&
      typeof error.data.error === 'object' &&
      error.data.error &&
      'reason' in error.data.error &&
      typeof error.data.error.reason === 'string'
    )
      dispatch(
        setPlayerError({ isError: true, message: error.data.error.reason })
      )
  }, [data])

  useEffect(() => {
    if (
      error &&
      'data' in error &&
      typeof error.data === 'object' &&
      error.data &&
      'error' in error.data &&
      typeof error.data.error === 'object' &&
      error.data.error &&
      'reason' in error.data.error &&
      typeof error.data.error.reason === 'string'
    )
      dispatch(
        setPlayerError({ isError: true, message: error.data.error.reason })
      )
  }, [error])

  // mobile
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const mobileRef = useRef<HTMLDivElement>(null)

  const handleOpenMobile = (e: any) => {
    if (!mobileRef.current?.contains(e.target) && window.innerWidth < 640) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div onClick={(e) => handleOpenMobile(e)}>
      {playbackState.timestamp > 0 && (
        <div className="w-full sm:h-[100px] h-[60px] flex items-center justify-between fixed sm:bottom-0 bottom-[60px] p-4 bg-[#181818] z-[900] border-t-2 border-[#282828]">
          <PlaybackTrackInfo playbackState={playbackState} />

          <div className="w-1/3 sm:block hidden">
            <div className="flex justify-center items-center mb-2">
              {playbackState.shuffle_state ? (
                <div id="shuffle" className="group relative p-2 mx-1">
                  <Tooltip text="Disable shuffle" id="shuffle" place="top" />
                  <div className="group" onClick={() => toggleShaffle(false)}>
                    <RandomSongSVG color="green" />
                  </div>
                </div>
              ) : (
                <div id="shuffle" className="group relative p-2 mx-1">
                  <Tooltip text="Enable shuffle" id="shuffle" place="top" />
                  <div className="group" onClick={() => toggleShaffle(true)}>
                    <RandomSongSVG color="#5f5f5f" />
                  </div>
                </div>
              )}

              <div
                id="previous"
                className="relative p-2  mx-1"
                onClick={async () => await skipToPrevSong(null)}
              >
                <Tooltip text="Previous" id="previous" place="top" />
                <div className="group">
                  <PrevSongSVG color="#5f5f5f" />
                </div>
              </div>
              {playbackState.actions.disallows.pausing ? (
                <div
                  id="resume"
                  onClick={async () => await resumePlayback(null)}
                  className="bg-white p-2 relative mx-1 rounded-full active:scale-[110%] duration-75"
                >
                  <Tooltip text="Resume" id="resume" place="top" />
                  <PlaySVG color="#181818" />
                </div>
              ) : (
                <div
                  id="pause"
                  onClick={async () => await pausePlayback(null)}
                  className="bg-white p-2 relative mx-1 rounded-full active:scale-[110%] duration-75"
                >
                  <PauseSVG color="#181818" />
                  <Tooltip text="Pause" id="pause" place="top" />
                </div>
              )}

              <div
                id="next"
                className="relative p-2 mx-1"
                onClick={async () => await skipToNextSong(null)}
              >
                <Tooltip text="Next" id="next" place="top" />
                <div className="group">
                  <NextSongSVG color="#5f5f5f" />
                </div>
              </div>

              <div className="group p-2  mx-1">
                <RepeatSongSVG color="#5f5f5f" />
              </div>
            </div>
            <div className="flex w-full">
              <p className="text-gray text-[11px] font-bold leading-none">
                {trackProgress}
              </p>
              <Slider
                min={0}
                max={playbackState.item.duration_ms}
                value={value}
                onChange={(value) => seekPosition(value)}
                className="mx-2"
              />
              <p className="text-gray text-[11px] font-bold leading-none">
                {trackDuration}
              </p>
            </div>
          </div>

          <PlaybackDeviceControl />

          {/*mobile*/}
          <div ref={mobileRef}>
            <div className="sm:hidden">
              {playbackState.actions.disallows.pausing ? (
                <div
                  className="active:scale-[110%]"
                  onClick={async () => await resumePlayback(null)}
                >
                  <PlaySVG color="white" />
                </div>
              ) : (
                <div
                  className="active:scale-[110%]"
                  onClick={async () => await pausePlayback(null)}
                >
                  <PauseSVG color="white" />
                </div>
              )}
            </div>

            {/* mobile playback modal */}
            <RemoveScroll enabled={isOpen}>
              <MobilePlayback isOpen={isOpen} setIsOpen={setIsOpen} />
            </RemoveScroll>
            {/*--------------------- */}
          </div>
        </div>
      )}
    </div>
  )
}
