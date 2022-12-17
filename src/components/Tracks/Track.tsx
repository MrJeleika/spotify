import React from 'react'
import { Tracks } from 'types/spotifySlice'

interface Props {
  track: Tracks
  i: number
}

export const Track = ({ track, i }: Props) => {
  console.log(track.duration_ms)

  return (
    <div className="group track-item flex rounded hover:bg-[#282828] duration-300 pr-5 py-2 w-full">
      <div className="flex w-1/2">
        <div className="text-[#5F5F5F] w-[40px] font-bold text-sm flex items-center justify-center">
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
            {track.artists.map((artist: any) => (
              <p className="text-[#5F5F5F] group-hover:text-[white] text-sm leading-none">
                {artist.name}
                {track.artists.length > 1 ? ',' : null}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-between cursor-default">
        <p className="text-[#5f5f5f] group-hover:text-[white] text-sm leading-none">
          {track.album.name}
        </p>
        <div>
          <p className="text-[#5f5f5f] text-sm leading-none">
            {`${Math.floor(track.duration_ms / 60000)}:${
              +Math.floor((track.duration_ms % 60000) / 1000) < 10 ? '0' : ''
            }${Math.floor((track.duration_ms % 60000) / 1000)}`}
          </p>
        </div>
      </div>
    </div>
  )
}
