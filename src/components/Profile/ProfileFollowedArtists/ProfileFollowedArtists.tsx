// Components
import { Card } from 'components/common/Card/Card'
// Misc
import { NavLink } from 'react-router-dom'
import { setMyFollowedArtists } from 'redux/slices/spotifySlice'
import { useFetchMyFollowedArtistsQuery } from 'redux/api/spotifyAPI'
// Hooks
import { useSetFetchedData } from 'hooks/useSetFetchedData'
import { useAppSelector } from 'redux/app/hooks'

export const ProfileFollowedArtists = () => {
  const { myFollowedArtists } = useAppSelector((state) => state.spotify)
  const { data, isFetching } = useFetchMyFollowedArtistsQuery()

  useSetFetchedData(data, setMyFollowedArtists, isFetching)

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <h1 className="title ml-2 lg:ml-4">Following</h1>
        <NavLink
          to={'following'}
          className="text-gray text-md font-bold uppercase border-b-[1px] border-[#00000000] hover:border-gray cursor-pointer"
        >
          SHOW ALL
        </NavLink>
      </div>
      <div className="flex w-full overflow-hidden">
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
    </div>
  )
}
