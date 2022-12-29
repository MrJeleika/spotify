import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  PlaybackState,
  Playlists,
  Profile,
  UserTopItems,
} from '../../types/spotifySlice'
import { RootState } from '../app/store'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spotify.com/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    fetchProfile: builder.query<Profile, void | null>({
      query: () => {
        return `/me`
      },
    }),
    fetchMyPlaylist: builder.query<Playlists, void>({
      query: () => {
        return `/me/playlists`
      },
    }),
    fetchMySavedTracks: builder.query<any, number | void | undefined>({
      query: (offset: number = 0) => {
        return `/me/tracks?limit=50&offset=${offset}`
      },
    }),
    fetchUserPlaylists: builder.query<Playlists, string>({
      query: (userId) => {
        return `users/${userId}/playlists`
      },
    }),
    fetchMyTopItems: builder.query<UserTopItems, number>({
      query: (limit = 4) => {
        return `/me/top/tracks?limit=${limit}&time_range=short_term`
      },
    }),
    fetchPlaybackState: builder.query<PlaybackState, void | null>({
      query: () => {
        return `/me/player`
      },
    }),
    fetchPlaylistTracks: builder.query<any, string>({
      query: (id) => {
        return `/playlists/${id}/tracks`
      },
    }),
    fetchPlaylist: builder.query<any, string | undefined>({
      query: (id) => {
        return `playlists/${id}`
      },
    }),
    setPlaybackPause: builder.mutation<any, any>({
      query: () => ({
        url: `me/player/play`,
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  useFetchProfileQuery,
  useFetchMyPlaylistQuery,
  useFetchUserPlaylistsQuery,
  useFetchMyTopItemsQuery,
  useFetchPlaybackStateQuery,
  useFetchPlaylistTracksQuery,
  useFetchMySavedTracksQuery,
  useSetPlaybackPauseMutation,
  useFetchPlaylistQuery,
} = apiSlice
