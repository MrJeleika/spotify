// Hooks
import { useAppDispatch } from 'redux/app/hooks'
import { useEffect } from 'react'
// Redux
import { setToken } from 'redux/slices/authSlice'
// Misc

const CLIENT_ID = '9ee3f2540a7f4c24936f361bebf63668'
const REDIRECT_URI = 'http://localhost:3000'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'

let urlParams = new URLSearchParams(window.location.hash.replace('#', '?'))
let token = urlParams.get('access_token')

export const Login = () => {
  const dispatch = useAppDispatch()
  // Set token for login
  useEffect(() => {
    window.location.hash = ''
    if (token) {
      window.localStorage.setItem('token', token)
      dispatch(setToken(token))
    }
    token = null
  }, [])

  return (
    <div className="w-full h-full bg-background flex flex-col items-center justify-center">
      <h1 className="text-5xl mb-5 text-white text-center">Login to Spotify</h1>
      <h1 className="text-3xl mb-5 text-white text-center">
        To connect player: open <span className="text-green">Spotify app</span>,
        click available devices and choose{' '}
        <span className="text-green">My React app</span>
      </h1>
      <a
        className="bg-green px-10 py-5 text-white text-xl rounded-3xl"
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=user-read-currently-playing%20user-modify-playback-state%20user-read-playback-state%20ugc-image-upload%20app-remote-control%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-private%20playlist-modify-public%20user-follow-modify%20user-follow-read%20user-top-read%20user-read-recently-played%20user-library-modify%20user-library-read%20streaming%20user-read-private%20user-read-email`}
      >
        LOGIN
      </a>
    </div>
  )
}
