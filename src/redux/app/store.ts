
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../api/spotifyAPI'
import authSlice from '../slices/authSlice'
import spotifySlice from '../slices/spotifySlice'



export const store = configureStore({
  reducer: {
    spotify: spotifySlice,
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware)
  },

})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
