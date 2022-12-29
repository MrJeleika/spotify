import { Preloader } from 'components/common/Preloader/Preloader'
import { Children, SetStateAction, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  useFetchPlaybackStateQuery,
  useSetPlaybackPauseMutation,
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
import { Tooltip } from 'components/common/Preloader/Tooltip'
import { motion } from 'framer-motion'
import { PlaySVG } from 'components/svg/PlaySVG'

interface Props {}

export const Playback = ({}: Props) => {
  const [value, setValue] = useState<any>(5)
  const [pausePlayback] = useSetPlaybackPauseMutation()

  const { playbackState } = useAppSelector((state) => state.spotify)
  const { data, isFetching, isError, isSuccess } = useFetchPlaybackStateQuery(
    null,
    {
      pollingInterval: 1000,
    }
  )
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

  return (
    <>
      {playbackState.item.album && (
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
                <RandomSongSVG color="#5f5f5f" />
              </motion.div>
              <motion.div
                whileHover="hover"
                className="group relative p-2  mx-1"
              >
                <Tooltip text="Previous" />
                <PrevSongSVG color="#5f5f5f" />
              </motion.div>
              {playbackState.actions.disallows.pausing ? (
                <motion.div
                  whileHover="hover"
                  onClick={async () => await pausePlayback(null)}
                  className="bg-white p-2 relative mx-1 rounded-full active:scale-[110%] duration-75"
                >
                  <Tooltip text="Pause" />
                  <PlaySVG color="#181818" />
                </motion.div>
              ) : (
                <motion.div
                  whileHover="hover"
                  onClick={async () => await pausePlayback(null)}
                  className="bg-white p-2 relative mx-1 rounded-full active:scale-[110%] duration-75"
                >
                  <Tooltip text="Resume" />
                  <PauseSVG color="#181818" />
                </motion.div>
              )}

              <motion.div
                whileHover="hover"
                className="group relative p-2 mx-1"
              >
                <Tooltip text="Next" />
                <NextSongSVG color="#5f5f5f" />
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
                onChange={(value) => setValue(value)}
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
              <motion.div
                whileHover="hover"
                className="group relative p-2 mx-1"
              >
                <Tooltip text="Lyrics" />
                <LyricsSVG color="#5f5f5f" />
              </motion.div>
              <motion.div
                whileHover="hover"
                className="group relative p-2 mx-1"
              >
                <Tooltip text="Queue" />
                <QueueSVG color="#5f5f5f" />
              </motion.div>
              <Slider
                min={0}
                max={playbackState.item.duration_ms}
                value={value}
                onChange={(value) => setValue(value)}
                className=" "
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
