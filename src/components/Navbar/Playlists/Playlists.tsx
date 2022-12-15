import { useEffect } from 'react'
import { useFetchMyPlaylistQuery } from 'redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { setMyPlaylists } from 'redux/slices/spotifySlice'

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
            <div
              key={playlist.id}
              className="text-stone-50/70 my-5 text-[14px]"
            >
              {playlist.name}
            </div>
          )
        })}
    </div>
  )
}
