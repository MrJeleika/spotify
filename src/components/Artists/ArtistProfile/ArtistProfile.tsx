import { ProfileTrack } from 'components/Tracks/ProfileTrack'
import { MainGradientBackground } from 'components/common/MainGradientBackground/MainGradientBackground'
import { SecondaryGradientBackground } from 'components/common/SecondaryGradientBackground/SecondaryGradientBackground'
import { useSetFetchedData } from 'hooks/useSetFetchedData'
import { useParams } from 'react-router-dom'
import {
  useFetchArtistProfileQuery,
  useFetchArtistTopTracksQuery,
} from 'redux/api/spotifyAPI'
import { useAppSelector } from 'redux/app/hooks'
import { setArtistProfile, setArtistTopTracks } from 'redux/slices/spotifySlice'
import { ArtistProfilePlaylists } from './ArtistProfilePlaylists/ArtistProfilePlaylists'
import { PlayButton } from 'components/common/PlayButton/PlayButton'

export const ArtistProfile = () => {
  const artistId = useParams().artistId

  const { artistProfile, artistTopTracks } = useAppSelector(
    (state) => state.spotify
  )

  const { data: artistProfileData, isFetching: artistProfileIsFetching } =
    useFetchArtistProfileQuery(artistId)
  const { data: artistTopTracksData, isFetching: artistTopTracksIsFetching } =
    useFetchArtistTopTracksQuery(artistId)

  useSetFetchedData(
    artistProfileData,
    setArtistProfile,
    artistProfileIsFetching
  )
  useSetFetchedData(
    artistTopTracksData,
    setArtistTopTracks,
    artistTopTracksIsFetching
  )
  console.log(artistTopTracks)

  return (
    <div>
      {artistProfile && artistTopTracks && (
        <MainGradientBackground>
          <div className="">
            <div className="flex p-7 text-white">
              <div className="mr-7 lg:h-[250px] lg:w-[250px] h-[120px] w-[120px] overflow-hidden ">
                <img
                  src={artistProfile.images[0].url}
                  alt="ProfileImage"
                  className="object-cover   shadow-xl"
                />
              </div>
              <div className="flex flex-col justify-end">
                <p className="uppercase font-bold text-sm mb-1">Profile</p>
                <h1 className="lg:text-8xl md:text-4xl text-4xl font-bold mb-8 tracking-tighter">
                  {artistProfile.name}
                </h1>
                <div className="flex"></div>
              </div>
            </div>
          </div>
          <SecondaryGradientBackground>
            <PlayButton tracks={artistTopTracks} />
            <div className="mb-10">
              <h1 className="title">Popular tracks</h1>
              {artistTopTracks.tracks &&
                artistTopTracks.tracks.map((track, i: number) => (
                  <ProfileTrack track={track} i={i} key={i} />
                ))}
            </div>
            <div className="">
              <h1 className="title">Music</h1>
              <ArtistProfilePlaylists artistId={artistId} />
            </div>
          </SecondaryGradientBackground>
        </MainGradientBackground>
      )}
    </div>
  )
}
