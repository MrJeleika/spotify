import { PlaySVG } from 'components/svg/PlaySVG'
import { usePlayTrackMutation } from 'redux/api/spotifyAPI'
import { IArtistTopTracks, IPlaylist, ITrack } from 'types/spotifySlice'

interface Props {
  playlist?: IPlaylist
  tracks?: IArtistTopTracks
}

export const PlayButton = ({ playlist, tracks }: Props) => {
  const [playTrack, error] = usePlayTrackMutation()
  console.log(error)

  // Exclude local tracks
  const uris =
    playlist?.tracks.items
      .filter((track) => !track.track.uri.includes('local'))
      .map((track) => track.track.uri) ||
    tracks?.tracks.map((track) => track.uri)

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
