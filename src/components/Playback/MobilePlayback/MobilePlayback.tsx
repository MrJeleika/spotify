import { motion } from 'framer-motion'
import { useAppSelector } from 'redux/app/hooks'
import { gradientColors } from 'components/common/MainGradientBackground/MainGradientBackground'
import { getTrackDuration } from 'utils'
import Slider from 'rc-slider'
import {
  usePausePlaybackMutation,
  usePlayPlaybackMutation,
  useSeekPlaybackMutation,
  useSkipToNextSongMutation,
  useSkipToPrevSongMutation,
} from 'redux/api/spotifyAPI'
import { useEffect, useState } from 'react'
import { PlaySVG } from 'components/svg/PlaySVG'
import { PauseSVG } from 'components/svg/PauseSVG'
import { NextSongSVG } from 'components/svg/NextSongSVG'
import { PrevSongSVG } from 'components/svg/PrevSongSVG'

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

  const { randomColorNum, playbackState } = useAppSelector(
    (state) => state.spotify
  )

  const mainRandomColor = gradientColors[randomColorNum]

  const trackDuration = getTrackDuration(playbackState.item.duration_ms)
  const trackProgress = getTrackDuration(playbackState.progress_ms)

  useEffect(() => {
    setValue(playbackState.progress_ms)
  }, [playbackState])

  const variants = {
    open: { opacity: 1, y: '0', display: 'block' },
    closed: { opacity: 0, y: '100%', transitionEnd: { display: 'none' } },
  }
  return (
    <div className="sm:hidden">
      <motion.div
        animate={isOpen ? 'open' : 'closed'}
        variants={variants}
        transition={{ duration: 0.4 }}
        className="bg-background  fixed w-full h-[100vh] left-0 top-0"
      >
        <div
          className={`w-full h-full bg-gradient-to-t ${mainRandomColor}`}
          pt-8
          px-1
        >
          <div className="flex items-center justify-between text-white mb-10">
            <div></div>
            <div></div>
          </div>
          <div className="px-5">
            <div className="mb-12">
              <img
                src={playbackState.item.album.images[0].url}
                alt="Album"
                className="w-full"
              />
            </div>
            <div className="mb-6">
              <h1 className="title leading-none">{playbackState.item.name}</h1>
              <h3 className="subtitle">{playbackState.item.artists[0].name}</h3>
            </div>
            <div className="mb-6">
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
            <div className="flex justify-between items-center">
              <div></div>
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
              <div></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
