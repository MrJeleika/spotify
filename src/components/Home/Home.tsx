// Components
import { ProfileTrack } from 'components/Tracks/ProfileTrack'
import { BlackBackground } from 'components/common/BlackBackground/BlackBackground'
// Hooks
import { useEffect, useState } from 'react'
import { useAppSelector } from 'redux/app/hooks'
import { useSetFetchedData } from 'hooks/useSetFetchedData'
// Misc
import { useFetchRecommendationsQuery } from 'redux/api/spotifyAPI'
import { setRecommendations } from 'redux/slices/spotifySlice'

export const Home = () => {
  const { savedTracks, recommendations } = useAppSelector(
    (state) => state.spotify
  )

  const [recommendationTracksUris, setRecommendationTracksUris] = useState<
    string[]
  >([])
  const [recommendationArtistsUris, setRecommendationArtistsUris] = useState<
    string[]
  >([])
  const [skip, setSkip] = useState<boolean>(true)
  useEffect(() => {
    if (savedTracks.total) {
      for (let i = 0; i < 5; i++) {
        const rand: number = Math.floor(
          Math.random() * savedTracks.items.length + 1
        )
        const artistOrTrack: number = Math.round(Math.random()) // 0 - artist, 1 - track

        // check if track exists
        if (savedTracks.items[rand].track) {
          artistOrTrack // check artist or track
            ? setRecommendationArtistsUris([
                ...recommendationArtistsUris,
                savedTracks.items[rand].track.artists[0].id,
              ])
            : setRecommendationTracksUris([
                ...recommendationTracksUris,
                savedTracks.items[rand].track.id,
              ])
        }
      }
    }
  }, [savedTracks])

  useEffect(() => {
    if (
      recommendationArtistsUris.length === 2 &&
      recommendationTracksUris.length === 2 &&
      !recommendations.tracks[0]
    ) {
      setSkip(false)
    }
    return () => setSkip(true)
  }, [recommendationArtistsUris, recommendationTracksUris])

  const { data, isFetching } = useFetchRecommendationsQuery(
    {
      artists: recommendationArtistsUris.join(','),
      tracks: recommendationTracksUris.join(','),
    },
    { skip: skip }
  )
  useSetFetchedData(data, setRecommendations, isFetching)

  return (
    <BlackBackground>
      <div className="pb-12">
        <h1 className="title">Recommendations</h1>
        <div className="w-full">
          {recommendations.tracks[0] &&
            recommendations.tracks.map((track, i) => (
              <ProfileTrack track={track} key={i} i={i} />
            ))}
        </div>
      </div>
    </BlackBackground>
  )
}
