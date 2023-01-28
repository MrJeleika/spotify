import { NavLink } from 'react-router-dom'
import { IArtist, IPlaybackState } from 'types/spotifySlice'

interface Props {
  playbackState: IPlaybackState
}

export const PlaybackTrackInfo = (props: Props) => {
  const { playbackState } = props
  return (
    <div className="flex sm:w-1/3 w-[60%] items-center">
      <div className="sm:w-[60px] w-[40px] mr-3">
        <img src={playbackState.item.album.images[0].url} alt="" />
      </div>
      <div className="truncate">
        <p className="text-[white]  lg:text-[16px] text-sm  my-1 leading-none  cursor-default">
          {playbackState.item.name.length > 25
            ? playbackState.item.name.slice(0, 25) + `...`
            : playbackState.item.name}
        </p>
        <div className="flex">
          {playbackState.item.artists.map((artist: IArtist, i: number) => (
            <NavLink
              to={`artist/${artist.id}`}
              key={i}
              className="text-gray border-b-[1px] border-[#00000000] hover:border-gray text-[11px] font-bold leading-none"
            >
              {artist.name}
              {playbackState.item.artists.length > 1 ? ',' : null}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}
