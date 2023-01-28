import { ProfileTrack } from 'components/Tracks/ProfileTrack'
import { useSetFetchedData } from 'hooks/useSetFetchedData'
import { NavLink } from 'react-router-dom'
import { useFetchMyTopTracksQuery } from 'redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { setIsloading, setMyTopTracks } from 'redux/slices/spotifySlice'
import { ITrack } from 'types/spotifySlice'

export const ProfileTopTracks = () => {
  const { myTopTracks } = useAppSelector((state) => state.spotify)
  const { data, error, isFetching, isSuccess } = useFetchMyTopTracksQuery(4)

  useSetFetchedData(data, setMyTopTracks, isFetching)

  return (
    <div>
      <div className="flex w-full justify-between items-center">
        <h1 className="title ml-2 lg:ml-4">Top tracks this month</h1>
        <NavLink
          to={'top/tracks'}
          className="text-gray text-md font-bold uppercase border-b-[1px] border-[#00000000] hover:border-gray cursor-pointer"
        >
          SHOW ALL
        </NavLink>
      </div>

      <h1 className="subtitle ml-2 lg:ml-4">Only visible to you</h1>
      <div className="w-full ">
        {myTopTracks.items.map((myTopTrack: any, i) => (
          <ProfileTrack track={myTopTrack} key={i} i={i} />
        ))}
      </div>
    </div>
  )
}
