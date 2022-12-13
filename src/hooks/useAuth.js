// import { useEffect, useState } from 'react'
// import axios from 'axios'

// export const useAuth = (code) => {
//   const [accessToken, setAccessToken] = useState()
//   const [refreshToken, setRefreshToken] = useState()
//   const [experiesIn, setExperiesIn] = useState()

//   useEffect(() => {
//     axios
//       .post('http://localhost:3001/login', {
//         code: code,
//       })
//       .then((res) => {
//         setAccessToken(res.data.access_token)
//         setRefreshToken(res.data.refresh_token)
//         console.log(res.data)
//         setExperiesIn(res.data.experiesIn)
//         window.history.pushState({}, null, '/')
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }, [code])

//   useEffect(() => {})

//   return accessToken
// }
