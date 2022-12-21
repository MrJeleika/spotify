// Redux
import { useFetchMyPlaylistQuery } from 'redux/api/spotifyAPI'
import { setMyPlaylists } from 'redux/slices/spotifySlice'
//Hooks
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { useEffect } from 'react'
interface Props {}

export const Playlists = ({}: Props) => {
  const dispatch = useAppDispatch()
  const { data, isFetching } = useFetchMyPlaylistQuery()
  const playlists = useAppSelector((state) => state.spotify.myPlaylists)
  useEffect(() => {
    if (data && !isFetching) {
      dispatch(setMyPlaylists(data))
    }
  }, [isFetching])
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
