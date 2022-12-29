import { ProfileTrack } from 'components/Tracks/ProfileTrack'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useFetchMyTopItemsQuery } from 'redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { setMyTopItems } from 'redux/slices/spotifySlice'

export const ProfileTopTracks = () => {
  const { myTopItems } = useAppSelector((state) => state.spotify)
  const dispatch = useAppDispatch()
  const { data, error, isFetching, isSuccess } = useFetchMyTopItemsQuery(4)
  useEffect(() => {
    if (data) {
      dispatch(setMyTopItems(data))
    }
  }, [data])

  return (
    <div>
      <div className="flex w-full justify-between items-center">
        <h1 className="title ml-2 lg:ml-4">Top tracks this month</h1>
        <NavLink
          to={'top/tracks'}
          className="text-gray text-md font-bold uppercase hover:border-b-[1px] hover:border-[#5f5f5] cursor-pointer"
        >
          SHOW ALL
        </NavLink>
      </div>

      <h1 className="subtitle ml-2 lg:ml-4">Only visible to you</h1>
      <div className="w-full overflow-hidden">
        {myTopItems.items.map((myTopTrack: any, i) => (
          <ProfileTrack track={myTopTrack} key={i} i={i} />
        ))}
      </div>
    </div>
  )
}
