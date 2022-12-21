import { Track } from 'components/Tracks/Track'
import React, { useEffect } from 'react'
import { useFetchMyTopItemsQuery } from 'redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { setMyTopItems } from 'redux/slices/spotifySlice'

export const MyTopTracks = () => {
  const myTopTracks = useAppSelector((state) => state.spotify.myTopItems)
  const dispatch = useAppDispatch()
  const { data, error, isFetching, isSuccess } = useFetchMyTopItemsQuery(4)
  useEffect(() => {
    if (isSuccess) {
      dispatch(setMyTopItems(data))
    }
  }, [isSuccess])

  return (
    <div>
      <h1 className="title ml-2 lg:ml-4">Top tracks this month</h1>
      <h3 className="subtitle ml-2 lg:ml-4">Only visible to you</h3>
      <div className="w-full overflow-hidden">
        {myTopTracks.items.map((myTopTrack, i) => (
          <Track track={myTopTrack} key={i} i={i + 1} />
        ))}
      </div>
    </div>
  )
}
