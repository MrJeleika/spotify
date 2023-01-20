import { BlackBackground } from 'components/common/BlackBackground/BlackBackground'
import { Card } from 'components/common/Card/Card'
import { useAppSelector } from 'redux/app/hooks'

interface Props {}

export const MyFollowedArtists = (props: Props) => {
  const { myFollowedArtists } = useAppSelector((state) => state.spotify)
  return (
    <BlackBackground>
      <h1 className="title">Following</h1>

      <div className="flex flex-wrap">
        {myFollowedArtists.artists.items.map((artist, i: number) => (
          <Card
            i={i}
            key={i}
            link={`artist/${artist.id}`}
            item={artist}
            rounded={true}
          ></Card>
        ))}
      </div>
    </BlackBackground>
  )
}
