import { Card } from 'components/common/Card/Card'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useFetchMyTopArtistQuery } from 'redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { setMyTopArtists } from 'redux/slices/spotifySlice'

interface Props {}

export const ProfileTopArtists = (props: Props) => {
  const dispatch = useAppDispatch()
  const { data } = useFetchMyTopArtistQuery(10)
  const { myTopArtists } = useAppSelector((state) => state.spotify)

  useEffect(() => {
    if (data) {
      dispatch(setMyTopArtists(data))
    }
  }, [data])

  return (
    <div>
      <div className="flex w-full justify-between items-center">
        <h1 className="title ml-2 lg:ml-4">Top artists this month</h1>
        <NavLink
          to={'top/artists'}
          className="text-gray text-md font-bold uppercase hover:border-b-[1px] hover:border-[#5f5f5] cursor-pointer"
        >
          SHOW ALL
        </NavLink>
      </div>
      <h1 className="subtitle ml-2 lg:ml-4">Only visible to you</h1>
      <div className="flex w-full overflow-hidden">
        {myTopArtists.items.map((artist: any, i: number) => (
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
