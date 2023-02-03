// Misc
import { motion } from 'framer-motion'
import { gradientColors } from 'utils/colors'
import { getTrackDuration } from 'utils'
import Slider from 'rc-slider'
import {
  usePausePlaybackMutation,
  usePlayPlaybackMutation,
  useSeekPlaybackMutation,
  useSkipToNextSongMutation,
  useSkipToPrevSongMutation,
  useTogglePlaybackShuffleMutation,
} from 'redux/api/spotifyAPI'
// Hooks
import { useAppSelector } from 'redux/app/hooks'
import { useEffect, useRef, useState } from 'react'
// Components
import { PlaySVG } from 'components/svg/PlaySVG'
import { PauseSVG } from 'components/svg/PauseSVG'
import { NextSongSVG } from 'components/svg/NextSongSVG'
import { PrevSongSVG } from 'components/svg/PrevSongSVG'
import { NavLink } from 'react-router-dom'
import { CloseModalSVG } from 'components/svg/CloseModalSVG'
import { QueueSVG } from 'components/svg/QueueSVG'
import { RandomSongSVG } from 'components/svg/RandomSongSVG'
import { RepeatSongSVG } from 'components/svg/RepeatSongSVG'

interface Props {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const MobilePlayback = ({ isOpen, setIsOpen }: Props) => {
  const [value, setValue] = useState<any>(0)
  const [seekPosition] = useSeekPlaybackMutation()
  const [skipToNextSong] = useSkipToNextSongMutation()
  const [pausePlayback] = usePausePlaybackMutation()
  const [resumePlayback] = usePlayPlaybackMutation()
  const [skipToPrevSong] = useSkipToPrevSongMutation()
  const [toggleShaffle] = useTogglePlaybackShuffleMutation()

  const { randomColorNum, playbackState } = useAppSelector(
    (state) => state.spotify
  )

  const mainRandomColor = gradientColors[randomColorNum]

  const trackDuration = getTrackDuration(playbackState.item.duration_ms)
  const trackProgress = getTrackDuration(playbackState.progress_ms)

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setValue(playbackState.progress_ms)
  }, [playbackState])

  const variants = {
    // -0.0000001% to smooth transition
    open: { opacity: 1, y: '-0.0000001%', display: 'block' },
    closed: { opacity: 0, y: '100%', transitionEnd: { display: 'none' } },
  }
  return (
    <div ref={modalRef} className="sm:hidden">
      <motion.div
        animate={isOpen ? 'open' : 'closed'}
        variants={variants}
        transition={{ duration: 0.3 }}
        className="bg-background fixed w-full h-[100vh] left-0 top-0"
      >
        <div
          className={`w-full h-full bg-gradient-to-t ${mainRandomColor} px-6 pt-8`}
        >
          <div className="flex items-center justify-between text-white mb-5">
            <div
              className="w-5 h-5 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <CloseModalSVG color="white" />
            </div>
            <div></div>
          </div>
          <div className="">
            <div className="mb-5">
              <img
                src={playbackState.item.album.images[0].url}
                alt="Album"
                className="w-full"
              />
            </div>
            <div className="mb-5">
              <h1 className="title leading-none">{playbackState.item.name}</h1>
              <NavLink
                to={`artist/${playbackState.item.artists[0].id}`}
                className="subtitle"
                onClick={() => setIsOpen(false)}
              >
                {playbackState.item.artists[0].name}
              </NavLink>
            </div>
            <div className="mb-5">
              <Slider
                min={0}
                max={playbackState.item.duration_ms}
                value={value}
                onChange={(value) => seekPosition(value)}
                className=""
              />
              <div className="flex justify-between">
                <p className="text-gray text-[11px] font-bold leading-none">
                  {trackProgress}
                </p>
                <p className="text-gray text-[11px] font-bold leading-none">
                  {trackDuration}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-5">
              {playbackState.shuffle_state ? (
                <div className="group relative p-2 mx-1">
                  <div className="group" onClick={() => toggleShaffle(false)}>
                    <RandomSongSVG color="green" size={20} />
                  </div>
                </div>
              ) : (
                <div className="group relative p-2 mx-1">
                  <div className="group" onClick={() => toggleShaffle(true)}>
                    <RandomSongSVG color="white" size={20} />
                  </div>
                </div>
              )}
              <div
                className="relative p-2  mx-1"
                onClick={async () => await skipToPrevSong(null)}
              >
                <PrevSongSVG color="white" size={24} />
              </div>
              {playbackState.actions.disallows.pausing ? (
                <div
                  onClick={async () => await resumePlayback(null)}
                  className="bg-white p-5 relative mx-1 rounded-full active:scale-[110%] duration-75"
                >
                  <PlaySVG color="#181818" size={24} />
                </div>
              ) : (
                <div
                  onClick={async () => await pausePlayback(null)}
                  className="bg-white p-5 relative mx-1 rounded-full active:scale-[110%] duration-75"
                >
                  <PauseSVG color="#181818" size={24} />
                </div>
              )}
              <div
                className="relative p-2 mx-1"
                onClick={async () => await skipToNextSong(null)}
              >
                <NextSongSVG color="white" size={24} />
              </div>
              <div>
                <RepeatSongSVG color="white" size={20} />
              </div>
            </div>
            <div className="flex justify-end">
              <NavLink to={`/queue`} onClick={() => setIsOpen(false)}>
                <QueueSVG color="white" size={20} />
              </NavLink>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
