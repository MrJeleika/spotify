import { PlaySVG } from 'components/svg/PlaySVG'
import { usePlayTrackMutation } from 'redux/api/spotifyAPI'
import { Playlist } from 'types/spotifySlice'

interface Props {
  playlist: Playlist
}

export const PlayButton = ({ playlist }: Props) => {
  const [playTrack, error] = usePlayTrackMutation()
  const uris = playlist.tracks.items.map((track) => track.track.uri)
  console.log(error)

  const handlePlayTrack = (e: any) => {
    playTrack({ uris: uris })
  }
  return (
    <div
      onClick={(e) => handlePlayTrack(e)}
      className="bg-green rounded-full inline-block p-4 hover:scale-110 cursor-pointer"
    >
      <PlaySVG color="black" size={24} />
    </div>
  )
}
