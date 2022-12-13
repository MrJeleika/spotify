import { useEffect } from 'react'
import { useFetchProfileQuery } from '../../redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks'
import { setProfile } from '../../redux/slices/spotifySlice'

interface Props {}

export const Dashboard = (props: Props) => {
  const { data = [], isFetching } = useFetchProfileQuery('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data && !isFetching) {
      dispatch(setProfile(data))
    }
  }, [isFetching])
  const profile = useAppSelector((state) => state.spotify.profile)
  if (isFetching) return <div>FETCHING</div>
  return <div>{profile.display_name}</div>
}
