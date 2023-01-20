import { ArtistProfile } from 'components/Artists/ArtistProfile/ArtistProfile'
import { ProfileTrack } from 'components/Tracks/ProfileTrack'
import { BlackBackground } from 'components/common/BlackBackground/BlackBackground'
import { Card } from 'components/common/Card/Card'
import { useAppSelector } from 'redux/app/hooks'

export const Search = () => {
  const { search } = useAppSelector((state) => state.spotify)
  return (
    <BlackBackground>
      <h1 className="title">What do you what to listen to?</h1>
    </BlackBackground>
  )
}
