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
import { TrackOptions } from './TrackOptions/TrackOptions'

interface Props {
  track: any
  i: number
}

export const PlaylistTrack = ({ track, i }: Props) => {
  const { playlist, savedTracks } = useAppSelector((state) => state.spotify)
  const dispatch = useAppDispatch()
  const optionsRef = useRef<HTMLDivElement>(null)
  const [playTrack, { error }] = usePlayTrackMutation()
  const date = new Date(track.added_at)
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

  const handlePlayTrack = (e: any) => {
    if (!optionsRef.current?.contains(e.target)) {
      playTrack({ uris: [`${track.uri}`] })
    }
  }
  return (
    <div key={i}>
      {track.added_at && !track.is_local && (
        <div
          onClick={(e) => handlePlayTrack(e)}
          className="group track-item flex rounded hover:bg-[#282828] pr-3 lg:pr-5  py-2 w-full"
        >
          <div className="flex lg:w-1/2 md:w-[60%] w-[80%] mx-1">
            <div className="text-gray w-[40px] font-bold text-sm flex items-center justify-center">
              <p className="group-hover:hidden">{i + 1}</p>
              <div className="group-hover:block hidden">
                <PlaySVG color="white" size={12} />
              </div>
            </div>

            <div className="h-[40px] w-[40px] mr-4 ">
              <img src={track.track.album.images[0].url} alt="" />
            </div>

            <div>
              <p className="text-[white] break-normal	 overflow-hidden my-1 leading-none cursor-default">
                {track.track.name}
              </p>
              <div className="flex">
                {track.track.artists.map((artist: any, i: number) => (
                  <p
                    key={i}
                    className="text-gray group-hover:text-[white] break-keep text-sm leading-none"
                  >
                    {artist.name}
                    {track.track.artists.length > 1 ? ',' : null}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex lg:w-1/2 md:w-[40%] w-[20%] mx-1 items-center justify-between cursor-default">
            <p className="text-gray lg:w-1/2 md:w-3/4 md:block hidden group-hover:text-[white] text-sm leading-none">
              {track.track.album.name}
            </p>
            <p className="text-gray w-1/4 lg:block hidden group-hover:text-[white] text-left text-sm leading-none">
              {`${date.getDate()} ${date
                .toLocaleString('en', {
                  month: 'short',
                })
                .toLowerCase()}. ${date.getFullYear()}`}
            </p>
            <div className="flex lg:w-[12.5%] md:w-1/4 w-full mr-1 justify-between">
              <div>
                {savedTracks.items.map((savedTrack: any, i: number) =>
                  savedTrack.track.id === track.track.id ? (
                    <SavedTrackSVG color="#1EDC62" key={i} />
                  ) : null
                )}
              </div>
              <p className="text-gray text-sm leading-none">
                {`${Math.floor(track.track.duration_ms / 60000)}:${
                  +Math.floor((track.track.duration_ms % 60000) / 1000) < 10
                    ? '0'
                    : ''
                }${Math.floor((track.track.duration_ms % 60000) / 1000)}`}
              </p>
            </div>
            <div ref={optionsRef} className="relative">
              <TrackOptions optionsRef={optionsRef} track={track.track} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
