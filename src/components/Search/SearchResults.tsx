// Components
import { ProfileTrack } from 'components/Tracks/ProfileTrack'
import { BlackBackground } from 'components/common/BlackBackground/BlackBackground'
import { Card } from 'components/common/Card/Card'
// Hooks
import { useAppSelector } from 'redux/app/hooks'

export const SearchResults = () => {
  const { search } = useAppSelector((state) => state.spotify)
  return (
    <BlackBackground>
      {search.artists.total && search.albums.total && search.tracks.total ? (
        <div>
          <div className="mb-5">
            <h1 className="title">Tracks</h1>
            {search.tracks.items.map((track, i: number) =>
              i < 5 ? <ProfileTrack track={track} key={i} i={i} /> : null
            )}
          </div>
          <div className="mb-5">
            <h1 className="title">Artists</h1>
            <div className="flex w-full overflow-hidden">
              {search.artists.items.map((artist, i: number) => (
                <Card
                  item={artist}
                  link={`artist/${artist.id}`}
                  key={i}
                  rounded={true}
                ></Card>
              ))}
            </div>
          </div>
          <div className="mb-5">
            <h1 className="title">Albums</h1>
            <div className="flex w-full overflow-hidden">
              {search.albums.items.map((album, i: number) => (
                <Card item={album} link={`album/${album.id}`} key={i}></Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="title">Not found</h1>
      )}
    </BlackBackground>
  )
}
