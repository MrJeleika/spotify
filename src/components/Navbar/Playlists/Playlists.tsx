// Redux
import { useFetchMyPlaylistQuery } from 'redux/api/spotifyAPI'
import { setMyPlaylists } from 'redux/slices/spotifySlice'
//Hooks
import { useAppSelector } from 'redux/app/hooks'
import { useSetFetchedData } from 'hooks/useSetFetchedData'

export const Playlists = () => {
  const { data, isFetching } = useFetchMyPlaylistQuery()
  const playlists = useAppSelector((state) => state.spotify.myPlaylists)

  useSetFetchedData(data, setMyPlaylists, isFetching)

  return (
    <div>
      {playlists &&
        playlists.items.map((playlist: any) => {
          return (
            <div key={playlist.id} className="text-zinc-50/80 my-5 text-[14px]">
              {playlist.name}
            </div>
          )
        })}
    </div>
  )
}
