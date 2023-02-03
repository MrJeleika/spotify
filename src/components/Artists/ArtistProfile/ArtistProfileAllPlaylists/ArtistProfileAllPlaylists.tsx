// Components
import { setArtistAlbums } from 'redux/slices/spotifySlice'
import { Card } from 'components/common/Card/Card'
import { BlackBackground } from 'components/common/BlackBackground/BlackBackground'
// Hooks
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useAppSelector } from 'redux/app/hooks'
import { useSetFetchedData } from 'hooks/useSetFetchedData'
// Misc
import { useFetchArtistAlbumsQuery } from 'redux/api/spotifyAPI'

export const ArtistProfileAllPlaylists = () => {
  const { artistAlbums, artistProfile } = useAppSelector(
    (state) => state.spotify
  )

  const [offset, setOffset] = useState<number>(0)
  const dispatch = useDispatch()
  const { data, isFetching } = useFetchArtistAlbumsQuery({
    id: artistProfile.id,
    type: 'album,single',
    offset: 0,
  })

  useSetFetchedData(data, setArtistAlbums, isFetching)
  useEffect(() => {
    if (data) {
      dispatch(setArtistAlbums(data))
      if (data.next) {
        setOffset(50)
      }
    }
  }, [data])

  return (
    <BlackBackground>
      <h1 className="title">{artistProfile.name}</h1>
      <div className="flex flex-wrap">
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
    </BlackBackground>
  )
}
