import { BlackBackground } from 'components/common/BlackBackground/BlackBackground'
import { useAppSelector } from 'redux/app/hooks'
import { ProfileTrack } from 'components/Tracks/ProfileTrack'
import { useFetchMyPlaybackQueueQuery } from 'redux/api/spotifyAPI'
import { useSetFetchedData } from 'hooks/useSetFetchedData'
import { setIsloading, setPlaybackQueue } from 'redux/slices/spotifySlice'
import { Tracks } from 'types/spotifySlice'
import { useEffect } from 'react'

export const PlaybackQueue = () => {
  const { playbackState, playbackQueue } = useAppSelector(
    (state) => state.spotify
  )
  const { data, isFetching, refetch } = useFetchMyPlaybackQueueQuery()
  console.log(data)
  useEffect(() => {
    refetch()
  }, [playbackState.item])

  useSetFetchedData(data, setPlaybackQueue)

  return (
    <BlackBackground>
      <h1 className="title">Queue</h1>
      <h1 className="subtitle">Now playing</h1>
      <div className="mb-10">
        <ProfileTrack track={playbackState.item} i={0} />
      </div>
      <h1 className="subtitle">Next in queue</h1>
      {playbackQueue.queue &&
        playbackQueue.queue.map((track: Tracks, i: number) =>
          i < 10 ? <ProfileTrack track={track} i={i} /> : null
        )}
    </BlackBackground>
  )
}
