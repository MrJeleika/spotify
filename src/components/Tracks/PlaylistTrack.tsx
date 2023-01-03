import { SavedTrackSVG } from 'components/svg/SavedTrackSVG'
import React, { useEffect } from 'react'
import {
  useFetchMySavedTracksQuery,
  usePlayTrackMutation,
} from 'redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { setDeviceError } from 'redux/slices/spotifySlice'
import { Tracks } from 'types/spotifySlice'

interface Props {
  track: any
  i: number
}

export const PlaylistTrack = ({ track, i }: Props) => {
  const { playlist, savedTracks } = useAppSelector((state) => state.spotify)
  const dispatch = useAppDispatch()

  const [playTrack, { error }] = usePlayTrackMutation()
  const date = new Date(track.added_at)
  useEffect(() => {
    if (error) dispatch(setDeviceError(true))
  }, [error])
  return (
    <div key={i}>
      {track.added_at && !track.is_local && (
        <div
          onClick={() => playTrack({ uris: [`${track.track.uri}`] })}
          className="group track-item flex rounded hover:bg-[#282828] pr-5 py-2 w-full"
        >
          <div className="flex lg:w-1/2 md:w-[60%] w-[87.5%] mx-1">
            <div className="text-gray w-[40px] font-bold text-sm flex items-center justify-center">
              <p>{i + 1}</p>
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
          <div className="flex lg:w-1/2 md:w-[40%] w-[12.5%] mx-1 items-center justify-between cursor-default">
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
            <div className="flex lg:w-[12.5%] md:w-1/4 w-full justify-between">
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
          </div>
        </div>
      )}
    </div>
  )
}
