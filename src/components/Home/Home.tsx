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

  const [skip, setSkip] = useState<boolean>(true)
  useEffect(() => {
    if (savedTracks.total) {
      for (let i = 0; i < 5; i++) {
        const rand: number = Math.floor(
          Math.random() * savedTracks.items.length + 1
        )
        // check if track exists
        if (savedTracks.items[rand].track) {
          setRecommendationTracksUris([
            ...recommendationTracksUris,
            savedTracks.items[rand].track.id,
          ])
        }
      }
    }
  }, [savedTracks])

  useEffect(() => {
    if (!recommendations.tracks[0]) {
      setSkip(false)
    }
    return () => setSkip(true)
  }, [recommendationTracksUris])

  const { data, isFetching, error } = useFetchRecommendationsQuery(
    {
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
