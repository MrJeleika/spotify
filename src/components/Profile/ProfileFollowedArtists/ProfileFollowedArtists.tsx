import { Card } from 'components/common/Card/Card'
import { NoPlaylistImageSVG } from 'components/svg/NoPlaylistImageSVG'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useFetchMyFollowedArtistsQuery } from 'redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { setMyFollowedArtists } from 'redux/slices/spotifySlice'

interface Props {}

export const ProfileFollowedArtists = ({}: Props) => {
  const { myFollowedArtists } = useAppSelector((state) => state.spotify)
  const { data, error } = useFetchMyFollowedArtistsQuery()
  console.log(error)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (data) {
      dispatch(setMyFollowedArtists(data))
    }
  }, [])
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
