import { DotsSVG } from 'components/svg/DotsSVG'
import { PlaySVG } from 'components/svg/PlaySVG'
import { SavedTrackSVG } from 'components/svg/SavedTrackSVG'
import React, { useEffect, useRef } from 'react'
import {
  useFetchMySavedTracksQuery,
  usePlayTrackMutation,
} from 'redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { setPlayerError } from 'redux/slices/spotifySlice'
import { Tracks } from 'types/spotifySlice'
import { TrackOptions } from './TrackOptions/TrackOptions'

interface Props {
  track: Tracks
  i: number
}
interface Error {
  status: number
  data: {
    error: {
      status: number
      reason: string
      message: string
    }
  }
}

export const ProfileTrack = ({ track, i }: Props) => {
  const dispatch = useAppDispatch()
  const [playTrack, { error }] = usePlayTrackMutation()

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

  const optionsRef = useRef<HTMLDivElement>(null)

  const handlePlayTrack = (e: any) => {
    if (!optionsRef.current?.contains(e.target)) {
      playTrack({ uris: [`${track.uri}`] })
    }
  }

  const { savedTracks } = useAppSelector((state) => state.spotify)
  return (
    <div
      onClick={(e) => handlePlayTrack(e)}
      className="group track-item flex rounded hover:bg-[#282828] pr-3 lg:pr-5 py-2 w-full"
    >
      <div className="flex lg:w-1/2 md:w-[60%] w-[80%] mx-1">
        <div className="text-gray w-[40px] font-bold text-sm flex items-center justify-center">
          <p className="group-hover:hidden">{i + 1}</p>
          <div className="group-hover:block hidden">
            <PlaySVG color="white" size={12} />
          </div>
        </div>
        <div className="h-[40px] w-[40px] mr-4 ">
          <img src={track.album.images[0].url} alt="" />
        </div>
        <div>
          <p className="text-[white] my-1 leading-none cursor-default">
            {track.name}
          </p>
          <div className="flex">
            {track.artists.map((artist: any, i: number) => (
              <p
                key={i}
                className="text-gray group-hover:text-[white] text-sm leading-none"
              >
                {artist.name}
                {track.artists.length > 1 ? ',' : null}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex lg:w-1/2 md:w-[40%] w-[20%] mx-1 items-center justify-between cursor-default">
        <p className="text-gray px-1 lg:w-1/2 md:w-2/3 md:block hidden group-hover:text-[white] text-sm leading-none">
          {track.album.name}
        </p>
        <div className="flex lg:w-[20%] md:w-1/3 w-full items-center justify-between">
          <div>
            {savedTracks.items.map((savedTrack: any, i: number) =>
              savedTrack.track.id === track.id ? (
                <SavedTrackSVG color="#1EDC62" key={i} />
              ) : null
            )}
          </div>
          <p className="text-gray text-sm leading-none">
            {`${Math.floor(track.duration_ms / 60000)}:${
              +Math.floor((track.duration_ms % 60000) / 1000) < 10 ? '0' : ''
            }${Math.floor((track.duration_ms % 60000) / 1000)}`}
          </p>
          <div ref={optionsRef} className="relative">
            <TrackOptions optionsRef={optionsRef} track={track} />
          </div>
        </div>
      </div>
    </div>
  )
}
