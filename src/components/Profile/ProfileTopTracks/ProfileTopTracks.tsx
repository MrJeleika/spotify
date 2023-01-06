import { ProfileTrack } from 'components/Tracks/ProfileTrack'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useFetchMyTopTracksQuery } from 'redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { setIsloading, setMyTopTracks } from 'redux/slices/spotifySlice'

export const ProfileTopTracks = () => {
  const { myTopTracks } = useAppSelector((state) => state.spotify)
  const dispatch = useAppDispatch()
  const { data, error, isFetching, isSuccess } = useFetchMyTopTracksQuery(4)
  useEffect(() => {
    if (data) {
      dispatch(setMyTopTracks(data))
    }
  }, [data])
  useEffect(() => {
    dispatch(setIsloading(isFetching))
  }, [isFetching])

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
        {myTopTracks.items.map((myTopTrack: any, i) => (
          <ProfileTrack track={myTopTrack} key={i} i={i} />
        ))}
      </div>
    </div>
  )
}
