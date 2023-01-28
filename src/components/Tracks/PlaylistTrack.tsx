import { PlaySVG } from 'components/svg/PlaySVG'
import { SavedTrackSVG } from 'components/svg/SavedTrackSVG'
import React, { useEffect, useRef } from 'react'
import { usePlayTrackMutation } from 'redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { setPlayerError } from 'redux/slices/spotifySlice'
import { TrackOptions } from './TrackOptions/TrackOptions'
import { ITrack } from 'types/spotifySlice'
import { NavLink } from 'react-router-dom'
import { getTrackDuration } from 'utils'

interface Props {
  added_at: string
  track: ITrack
  i: number
  is_local: boolean
}

export const PlaylistTrack = ({ track, added_at, is_local, i }: Props) => {
  const { playbackState, savedTracks } = useAppSelector(
    (state) => state.spotify
  )
  const dispatch = useAppDispatch()
  const optionsRef = useRef<HTMLDivElement>(null)
  const artistRef = useRef<HTMLAnchorElement>(null)
  const [playTrack, { error }] = usePlayTrackMutation()

  const trackDuration = getTrackDuration(track.duration_ms)

  const date = new Date(added_at)
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

  // Don't play if click on artist or options
  const handlePlayTrack = (e: any) => {
    if (
      !optionsRef.current?.contains(e.target) &&
      !artistRef.current?.contains(e.target)
    ) {
      playTrack({ uris: [`${track.uri}`] })
    }
  }

  let isPlayingTrack = false
  let isPaused = true
  if (playbackState.item) {
    isPlayingTrack = playbackState.item.id === track.id
    isPaused = playbackState.is_playing
  }

  return (
    <div key={i}>
      {added_at && !is_local && (
        <div
          onClick={(e) => handlePlayTrack(e)}
          className="group track-item flex rounded hover:bg-[#282828] pr-3 lg:pr-5  py-2 w-full"
        >
          <div className="flex lg:w-1/2 md:w-[60%] w-[80%] mx-1">
            <div className="text-gray w-[40px] font-bold text-sm flex items-center justify-center">
              {isPlayingTrack && isPaused ? (
                <img
                  src="https://open.spotifycdn.com/cdn/images/device-picker-equaliser-animation.946e7243.webp"
                  alt="img"
                  className="w-[20px]"
                />
              ) : (
                <>
                  <p className="group-hover:hidden">{i + 1}</p>
                  <div className="group-hover:block hidden">
                    <PlaySVG color="white" size={12} />
                  </div>
                </>
              )}
            </div>

            <div className="h-[40px] w-[40px] mr-4 ">
              <img src={track.album.images[0].url} alt="" />
            </div>

            <div>
              <p
                className={`${
                  isPlayingTrack ? 'text-green' : 'text-white'
                }  break-normal overflow-hidden my-1 leading-none cursor-default`}
              >
                {track.name.length > 25
                  ? track.name.substring(0, 25)
                  : track.name}
              </p>
              <div className="flex">
                {track.artists.map((artist, i: number) => (
                  <NavLink
                    to={`/artist/${artist.id}`}
                    ref={artistRef}
                    key={i}
                    className="text-gray group-hover:text-[white] border-b-[1px] border-[#00000000] hover:border-gray break-keep text-sm leading-none"
                  >
                    {artist.name}
                    {track.artists.length > 1 ? ', ' : null}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="flex lg:w-1/2 md:w-[40%] w-[20%] mx-1 items-center justify-between cursor-default">
            <p className="text-gray lg:w-1/2 md:w-3/4 md:block hidden group-hover:text-[white] text-sm leading-none">
              {track.album.name}
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
                  savedTrack.track.id === track.id ? (
                    <SavedTrackSVG color="#1EDC62" key={i} />
                  ) : null
                )}
              </div>
              <p className="text-gray text-sm leading-none">{trackDuration}</p>
            </div>
            <div ref={optionsRef} className="relative">
              <TrackOptions optionsRef={optionsRef} track={track} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
