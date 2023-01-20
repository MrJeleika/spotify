import { BlackBackground } from 'components/common/BlackBackground/BlackBackground'
import { Card } from 'components/common/Card/Card'
import { useAppSelector } from 'redux/app/hooks'

interface Props {}

export const MyTopArtists = (props: Props) => {
  const { myTopArtists } = useAppSelector((state) => state.spotify)
  return (
    <BlackBackground>
      <h1 className="title">Top artists this month</h1>
      <h1 className="subtitle">Only visible for you</h1>
      <div className="flex flex-wrap">
        {myTopArtists.items.map((artist, i: number) => (
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
