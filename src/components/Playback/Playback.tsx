import { useEffect, useState, useRef } from 'react'
import {
  useFetchPlaybackStateQuery,
  useSeekPlaybackMutation,
  usePlayPlaybackMutation,
  usePausePlaybackMutation,
  useSkipToNextSongMutation,
  useSkipToPrevSongMutation,
  useSetVolumeMutation,
} from 'redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { setPlaybackState } from 'redux/slices/spotifySlice'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { PauseSVG } from 'components/svg/PauseSVG'
import { PrevSongSVG } from 'components/svg/PrevSongSVG'
import { NextSongSVG } from 'components/svg/NextSongSVG'
import { RandomSongSVG } from 'components/svg/RandomSongSVG'
import { RepeatSongSVG } from 'components/svg/RepeatSongSVG'
import { LyricsSVG } from 'components/svg/LyricsSVG'
import { QueueSVG } from 'components/svg/QueueSVG'
import { Tooltip } from 'components/common/Tooltip/Tooltip'
import { motion } from 'framer-motion'
import { PlaySVG } from 'components/svg/PlaySVG'
import {
  usePlaybackState,
  useSpotifyPlayer,
} from 'react-spotify-web-playback-sdk'
import { DevicesSVG } from 'components/svg/DevicesSVG'
import { DevicesModal } from './DevicesModal/DevicesModal'

interface Props {}

export const Playback = ({}: Props) => {
  const player = useSpotifyPlayer()
  const playback = usePlaybackState()

  const initialVolume = player?.getVolume() ? player?.getVolume() : 0.5

  const [stateVolume, setStateVolume] = useState<number | number[]>(
    +initialVolume
  )

  const devicesRef = useRef<HTMLDivElement>(null)
  const [devicesIsOpen, setDevicesIsOpen] = useState<boolean>(false)

  const [value, setValue] = useState<any>(0)
  const [pausePlayback] = usePausePlaybackMutation()
  const [setVolume, { error: volumeError }] = useSetVolumeMutation()
  const [resumePlayback] = usePlayPlaybackMutation()
  const [skipToNextSong] = useSkipToNextSongMutation()
  const [skipToPrevSong] = useSkipToPrevSongMutation()
  const [seekPosition, { error }] = useSeekPlaybackMutation()

  const { playbackState } = useAppSelector((state) => state.spotify)
  const { data, isError } = useFetchPlaybackStateQuery(null, {
    pollingInterval: 1000,
  })

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (data) {
      dispatch(setPlaybackState(data))
      setValue(playbackState.progress_ms)
    }
    if (isError) {
      console.log(isError)
    }
  }, [data])

  useEffect(() => {
    if (playback) setVolume(Math.floor(+stateVolume * 100))
  }, [stateVolume])

  return (
    <>
      {playbackState.timestamp > 0 && (
        <div className="w-full h-[100px] flex items-center justify-between fixed bottom-0 p-3 bg-[#181818] z-[999] border-t-2 border-[#282828]">
          <div className="flex w-1/3 items-center">
            <div className="w-[60px] mr-3">
              <img src={playbackState.item.album.images[0].url} alt="" />
            </div>
            <div>
              <p className="text-[white] my-1 leading-none cursor-default">
                {playbackState.item.name}
              </p>
              <div className="flex">
                {playbackState.item.artists.map((artist: any, i: number) => (
                  <p
                    key={i}
                    className="text-gray text-[11px] font-bold leading-none"
                  >
                    {artist.name}
                    {playbackState.item.artists.length > 1 ? ',' : null}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="w-1/3">
            <div className="flex justify-center items-center mb-2">
              <motion.div
                whileHover="hover"
                className="group relative p-2 mx-1"
              >
                <Tooltip text="Enable shuffle" />
                <div className="group">
                  <RandomSongSVG color="#5f5f5f" />
                </div>
              </motion.div>
              <motion.div
                whileHover="hover"
                className=" relative p-2  mx-1"
                onClick={async () => await skipToPrevSong(null)}
              >
                <Tooltip text="Previous" />
                <div className="group">
                  <PrevSongSVG color="#5f5f5f" />
                </div>
              </motion.div>
              {playbackState.actions.disallows.pausing ? (
                <motion.div
                  whileHover="hover"
                  onClick={async () => await resumePlayback(null)}
                  className="bg-white p-2 relative mx-1 rounded-full active:scale-[110%] duration-75"
                >
                  <Tooltip text="Resume" />
                  <PlaySVG color="#181818" />
                </motion.div>
              ) : (
                <motion.div
                  whileHover="hover"
                  onClick={async () => await pausePlayback(null)}
                  className="bg-white p-2 relative mx-1 rounded-full active:scale-[110%] duration-75"
                >
                  <PauseSVG color="#181818" />
                  <Tooltip text="Pause" />
                </motion.div>
              )}

              <motion.div
                whileHover="hover"
                className="relative p-2 mx-1"
                onClick={async () => await skipToNextSong(null)}
              >
                <Tooltip text="Next" />
                <div className="group">
                  <NextSongSVG color="#5f5f5f" />
                </div>
              </motion.div>

              <div className="group p-2  mx-1">
                <RepeatSongSVG color="#5f5f5f" />
              </div>
            </div>
            <div className="flex w-full">
              <p className="text-gray text-[11px] font-bold leading-none">
                {' '}
                {`${Math.floor(playbackState.progress_ms / 60000)}:${
                  +Math.floor((playbackState.progress_ms % 60000) / 1000) < 10
                    ? '0'
                    : ''
                }${Math.floor((playbackState.progress_ms % 60000) / 1000)}`}
              </p>
              <Slider
                min={0}
                max={playbackState.item.duration_ms}
                value={value}
                onChange={(value) => seekPosition(value)}
                className="mx-2"
              />
              <p className="text-gray text-[11px] font-bold leading-none">
                {' '}
                {`${Math.floor(playbackState.item.duration_ms / 60000)}:${
                  +Math.floor((playbackState.item.duration_ms % 60000) / 1000) <
                  10
                    ? '0'
                    : ''
                }${Math.floor(
                  (playbackState.item.duration_ms % 60000) / 1000
                )}`}
              </p>
            </div>
          </div>

          <div className="flex w-1/3 justify-end">
            <div className="flex w-1/2 items-center">
              <motion.div whileHover="hover" className=" relative p-1 mx-1">
                <Tooltip text="Lyrics" />
                <div className="group">
                  <LyricsSVG color="#5f5f5f" />
                </div>
              </motion.div>

              <motion.div whileHover="hover" className=" relative p-1 mx-1">
                <Tooltip text="Queue" />
                <div className="group">
                  <QueueSVG color="#5f5f5f" />
                </div>
              </motion.div>
              <motion.div
                ref={devicesRef}
                whileHover="hover"
                className="relative p-1 mx-1"
                onClick={() => setDevicesIsOpen(!devicesIsOpen)}
              >
                <DevicesModal
                  devicesRef={devicesRef}
                  devicesIsOpen={devicesIsOpen}
                  setDevicesIsOpen={setDevicesIsOpen}
                />
                <div className="group">
                  <DevicesSVG color="#5f5f5f" />
                </div>
              </motion.div>
              <Slider
                min={0}
                max={1}
                step={0.05}
                value={stateVolume}
                onChange={(value) => setStateVolume(value)}
                className=" "
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
