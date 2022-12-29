import { ProfileTrack } from 'components/Tracks/ProfileTrack'
import { BlackBackground } from 'components/common/BlackBackground/BlackBackground'
import { ClockSVG } from 'components/svg/ClockSVG'
import React, { useEffect } from 'react'
import { useFetchMyTopItemsQuery } from 'redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { setIsloading, setMyTopItems } from 'redux/slices/spotifySlice'

interface Props {}

export const MyAllTopTracks = ({}: Props) => {
  const dispatch = useAppDispatch()
  const { myTopItems } = useAppSelector((state) => state.spotify)
  const { data, isFetching } = useFetchMyTopItemsQuery(50)
  useEffect(() => {
    if (data) {
      dispatch(setMyTopItems(data))
    }
  }, [data])
  useEffect(() => {
    dispatch(setIsloading(isFetching))
  }, [isFetching])

  return (
    <BlackBackground>
      <h1 className="title">Top tracks this month</h1>
      <h1 className="subtitle">Only visible for you</h1>
      <div className="track-item flex border-b-[1px] border-gray pr-5 mb-1 py-2 w-full">
        <div className="flex lg:w-1/2 md:w-[60%] w-[80%] mx-1">
          <div className="text-gray w-[40px] font-bold text-sm flex items-center justify-center">
            <p>#</p>
          </div>
          <div>
            <p className="text-gray break-normal	 overflow-hidden my-1 leading-none cursor-default">
              Title
            </p>
          </div>
        </div>
        <div className="flex lg:w-1/2 md:w-[40%] w-[20%] mx-1 items-center md:justify-between justify-end cursor-default">
          <p className="text-gray lg:w-1/2 md:w-full md:block hidden  text-sm leading-none">
            Album
          </p>
          <div className="flex justify-end w-[12.5%]">
            <ClockSVG color="gray" />
          </div>
        </div>
      </div>
      {myTopItems.items.map((myTopTrack: any, i) => (
        <ProfileTrack track={myTopTrack} key={i} i={i} />
      ))}
    </BlackBackground>
  )
}
