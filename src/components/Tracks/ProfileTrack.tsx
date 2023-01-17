import { PlaySVG } from 'components/svg/PlaySVG'
import { SavedTrackSVG } from 'components/svg/SavedTrackSVG'
import React, { useEffect, useRef } from 'react'
import { usePlayTrackMutation } from 'redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { ITrack } from 'types/spotifySlice'
import { TrackOptions } from './TrackOptions/TrackOptions'
import { NavLink } from 'react-router-dom'

interface Props {
  track: ITrack
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
  const { playbackState } = useAppSelector((state) => state.spotify)
  const [playTrack, { error }] = usePlayTrackMutation()

  const optionsRef = useRef<HTMLDivElement>(null)
  const artistRef = useRef<HTMLAnchorElement>(null)

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

  const { savedTracks } = useAppSelector((state) => state.spotify)
  return (
    <div
      onClick={(e) => handlePlayTrack(e)}
      className="group track-item flex rounded hover:bg-[#282828] pr-3 lg:pr-5 py-2 w-full"
    >
      <div className="flex lg:w-1/2 md:w-[60%] w-[80%] mx-1">
        <div className="text-gray w-[40px] font-bold text-sm flex items-center justify-center">
          {isPlayingTrack && isPaused ? (
            <img
              src="https://open.spotifycdn.com/cdn/images/device-picker-equaliser-animation.946e7243.webp"
              alt="img"
              className="w-[20px] "
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
              playbackState.item.id === track.id ? 'text-green' : 'text-white'
            }  break-normal overflow-hidden my-1 leading-none cursor-default`}
          >
            {track.name}
          </p>
          <div className="flex">
            {track.artists.map((artist, i: number) => (
              <NavLink
                to={`/artist/${artist.id}`}
                key={i}
                ref={artistRef}
                className="text-gray group-hover:text-[white] border-b-[1px] border-[#00000000] hover:border-gray text-sm leading-none"
              >
                {artist.name}
                {track.artists.length > 1 ? ', ' : null}
              </NavLink>
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
              ) : (
                <div className="w-[16px]"></div>
              )
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
