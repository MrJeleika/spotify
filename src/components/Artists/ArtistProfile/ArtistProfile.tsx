import { MainGradientBackground } from 'components/common/MainGradientBackground/MainGradientBackground'
import { SecondaryGradientBackground } from 'components/common/SecondaryGradientBackground/SecondaryGradientBackground'
import { useSetFetchedData } from 'hooks/useSetFetchedData'
import { useParams } from 'react-router-dom'
import { useFetchArtistProfileQuery } from 'redux/api/spotifyAPI'
import { useAppSelector } from 'redux/app/hooks'
import { setArtistProfile } from 'redux/slices/spotifySlice'

export const ArtistProfile = () => {
  const artistId = useParams().artistId

  const { artistProfile } = useAppSelector((state) => state.spotify)

  const { data } = useFetchArtistProfileQuery(artistId)

  useSetFetchedData(data, setArtistProfile)

  console.log(artistProfile)

  return (
    <div>
      {artistProfile && (
        <MainGradientBackground>
          <div className="">
            <div className="flex p-7 text-white">
              <div className="flex flex-col justify-end">
                <p className="uppercase font-bold text-sm mb-1">Profile</p>
                <h1 className="lg:text-8xl sm:text-6xl text-4xl font-bold mb-8 tracking-tighter">
                  {artistProfile.name}
                </h1>
                <div className="flex">
                  <div className="text-sm">
                    {artistProfile.followers.total} followers
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SecondaryGradientBackground>
            <div></div>
          </SecondaryGradientBackground>
        </MainGradientBackground>
      )}
    </div>
  )
}
