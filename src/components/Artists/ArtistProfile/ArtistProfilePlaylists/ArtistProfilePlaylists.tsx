import { useSetFetchedData } from 'hooks/useSetFetchedData'
import { useFetchArtistAlbumsQuery } from 'redux/api/spotifyAPI'
import { useAppSelector } from 'redux/app/hooks'
import { setArtistAlbums } from 'redux/slices/spotifySlice'
import { Card } from 'components/common/Card/Card'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface Props {
  artistId: string | undefined
}

export const ArtistProfilePlaylists = ({ artistId }: Props) => {
  const { artistAlbums } = useAppSelector((state) => state.spotify)

  const [offset, setOffset] = useState<number>(0)

  const dispatch = useDispatch()

  const { data, isFetching, isSuccess } = useFetchArtistAlbumsQuery({
    id: artistId,
    type: 'album,single',
    offset: 0,
  })

  useSetFetchedData(data, setArtistAlbums, isFetching)

  useEffect(() => {
    if (data) {
      dispatch(setArtistAlbums(data))
      if (data.next) {
        setOffset(+data.next.split('=')[1].split('&')[0])
      }
    }
  }, [data])

  return (
    <div className="flex w-full overflow-hidden">
      {artistAlbums.items.map((album, i: number) => (
        <Card
          i={i}
          key={i}
          link={`album/${album.id}`}
          item={album}
          rounded={false}
        ></Card>
      ))}
    </div>
  )
}
