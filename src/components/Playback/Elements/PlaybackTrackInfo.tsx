import { PlaybackState } from 'types/spotifySlice'

interface Props {
  playbackState: PlaybackState
}

export const PlaybackTrackInfo = (props: Props) => {
  const { playbackState } = props
  return (
    <div className="flex w-1/3 items-center">
      <div className="w-[60px] mr-3">
        <img src={playbackState.item.album.images[0].url} alt="" />
      </div>
      <div>
        <p className="text-[white]  lg:text-[16px] text-sm  my-1 leading-none cursor-default">
          {playbackState.item.name.length > 25
            ? playbackState.item.name.slice(0, 25) + `...`
            : playbackState.item.name}
        </p>
        <div className="flex">
          {playbackState.item.artists.map((artist: any, i: number) => (
            <p key={i} className="text-gray text-[11px] font-bold leading-none">
              {artist.name}
              {playbackState.item.artists.length > 1 ? ',' : null}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
