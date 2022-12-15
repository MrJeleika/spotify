import { useEffect } from 'react'
// Hooks
import { useAppDispatch } from 'redux/app/hooks'
// Redux
import { setToken } from 'redux/slices/authSlice'

const CLIENT_ID = '9ee3f2540a7f4c24936f361bebf63668'
const REDIRECT_URI = 'http://localhost:3000'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'

let urlParams = new URLSearchParams(window.location.hash.replace('#', '?'))
let token = urlParams.get('access_token')

export const Login = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    window.location.hash = ''
    if (token) window.localStorage.setItem('token', token)
    dispatch(setToken(token))
  }, [])

  return (
    <div className="w-full h-full bg-zinc-700 flex flex-col items-center justify-center">
      <h1 className="text-5xl mb-5 text-center">Login to Spotify</h1>
      <a
        className="bg-green-500 px-10 py-5 text-white text-xl rounded-3xl"
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token`}
      >
        LOGIN
      </a>
    </div>
  )
}
