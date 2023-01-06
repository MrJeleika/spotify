import { Card } from 'components/common/Card/Card'
import { NoPlaylistImageSVG } from 'components/svg/NoPlaylistImageSVG'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from 'redux/app/hooks'

interface Props {}

export const ProfileFollowedArtists = ({}: Props) => {
  const { myFollowedArtists } = useAppSelector((state) => state.spotify)
  console.log(myFollowedArtists)

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <h1 className="title ml-2 lg:ml-4">Following</h1>
        <NavLink
          to={'following'}
          className="text-gray text-md font-bold uppercase hover:border-b-[1px] hover:border-[#5f5f5] cursor-pointer"
        >
          SHOW ALL
        </NavLink>
      </div>
      <div className="flex w-full overflow-hidden">
        {myFollowedArtists.artists.items.map((artist: any, i: number) => (
          <Card
            i={i}
            key={i}
            link={`playlist/${artist.id}`}
            item={artist}
            rounded={true}
          ></Card>
        ))}
      </div>
    </div>
  )
}
