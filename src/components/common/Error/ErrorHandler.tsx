import { useAppDispatch } from 'redux/app/hooks'
import { setPlayerError } from 'redux/slices/spotifySlice'

interface Error {
  data: {
    error: {
      message: string
      reason: string
      status: number
    }
  }
  status: number
}
interface Props {
  error: Error
}

export const HandleError = ({ error }) => {
  const dispatch = useAppDispatch()

  if (
    error &&
    'data' in error &&
    typeof error.data === 'object' &&
    error.data &&
    'error' in error.data &&
    typeof error.data.error === 'object' &&
    error.data.error &&
    'reason' in error.data.error &&
    typeof error.data.error.reason === 'string'
  )
    dispatch(
      setPlayerError({ isError: true, message: error.data.error.reason })
    )

  return <></>
}
