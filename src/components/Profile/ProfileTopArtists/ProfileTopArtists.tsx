import { Card } from 'components/common/Card/Card'
import { useSetFetchedData } from 'hooks/useSetFetchedData'

import { NavLink } from 'react-router-dom'
import { useFetchMyTopArtistQuery } from 'redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { setMyTopArtists } from 'redux/slices/spotifySlice'

interface Props {}

export const ProfileTopArtists = (props: Props) => {
  const { data, isFetching } = useFetchMyTopArtistQuery(10)
  const { myTopArtists } = useAppSelector((state) => state.spotify)

  useSetFetchedData(data, setMyTopArtists, isFetching)

  return (
    <div>
      <div className="flex w-full justify-between items-center">
        <h1 className="title ml-2 lg:ml-4">Top artists this month</h1>
        <NavLink
          to={'top/artists'}
          className="text-gray text-md font-bold uppercase border-b-[1px] border-[#00000000] hover:border-gray cursor-pointer"
        >
          SHOW ALL
        </NavLink>
      </div>
      <h1 className="subtitle ml-2 lg:ml-4">Only visible to you</h1>
      <div className="flex w-full overflow-hidden">
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
    </div>
  )
}
