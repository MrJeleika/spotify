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
import { Pause } from 'components/svg/Pause'

interface Props {}

export const Playback = ({}: Props) => {
  const [value, setValue] = useState<any>(5)
  const [pausePlayback, error] = useSetPlaybackPauseMutation()
  console.log(error)

  const { playbackState } = useAppSelector((state) => state.spotify)
  const { data, isFetching, isSuccess } = useFetchPlaybackStateQuery(null, {
    pollingInterval: 1000,
  })
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (data) {
      dispatch(setPlaybackState(data))
      setValue(playbackState.progress_ms)
    }
  }, [data])
  console.log(data)
  return (
    <>
      {playbackState.item.album && (
        <div className="w-full h-[9vh] flex items-center justify-between fixed bottom-0 p-3 bg-[#181818] z-50 border-t-2 border-[#282828]">
          <div className="flex items-center">
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
            <div className="flex justify-center mb-2">
              <div
                onClick={async () => await pausePlayback(null)}
                className="bg-white p-2 rounded-full active:scale-[110%] duration-75"
              >
                <Pause color="#181818" />
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
          <div></div>
        </div>
      )}
    </>
  )
}
