import { SavedTrack } from 'components/svg/SavedTrack'
import React from 'react'
import { useFetchMySavedTracksQuery } from 'redux/api/spotifyAPI'
import { useAppSelector } from 'redux/app/hooks'
import { Tracks } from 'types/spotifySlice'

interface Props {
  track: any
  i: number
}

export const Track = ({ track, i }: Props) => {
  const { savedTracks } = useAppSelector((state) => state.spotify)
  return (
    <div className="group track-item flex rounded hover:bg-[#282828] duration- pr-5 py-2 w-full">
      <div className="flex w-1/2">
        <div className="text-gray w-[40px] font-bold text-sm flex items-center justify-center">
          <p>{i}</p>
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
      <div className="flex w-1/2 items-center justify-between cursor-default">
        <p className="text-gray group-hover:text-[white] text-sm leading-none">
          {track.album.name}
        </p>
        <div className="flex">
          <div>
            {savedTracks.items.map((savedTrack: any, i: number) =>
              savedTrack.track.id === track.id ? (
                <SavedTrack color="#1EDC62" key={i} />
              ) : null
            )}
          </div>
          <p className="text-gray text-sm leading-none">
            {`${Math.floor(track.duration_ms / 60000)}:${
              +Math.floor((track.duration_ms % 60000) / 1000) < 10 ? '0' : ''
            }${Math.floor((track.duration_ms % 60000) / 1000)}`}
          </p>
        </div>
      </div>
    </div>
  )
}
