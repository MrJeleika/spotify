import { useCallback } from 'react'
import { WebPlaybackSDK } from 'react-spotify-web-playback-sdk'
import { useAppSelector } from 'redux/app/hooks'
import { Dashboard } from './Dashboard'

export const MySpotifyPlayer = () => {
  const { token } = useAppSelector((state) => state.auth)
  const getOAuthToken = useCallback((callback) => callback(token), [])

  return (
    <WebPlaybackSDK
      initialDeviceName="MrJeleika's Spotify"
      getOAuthToken={getOAuthToken}
      connectOnInitialized={true}
      children={<Dashboard />}
    ></WebPlaybackSDK>
  )
}
