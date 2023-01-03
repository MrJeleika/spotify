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
    pausePlayback: builder.mutation<any, any>({
      query: () => ({
        url: `me/player/pause`,
        method: 'PUT',
      }),
    }),
    playPlayback: builder.mutation<any, any>({
      query: () => ({
        url: `me/player/play`,
        method: 'PUT',
      }),
    }),
    skipToNextSong: builder.mutation<any, any>({
      query: () => ({
        url: `me/player/next`,
        method: 'POST',
      }),
    }),
    skipToPrevSong: builder.mutation<any, any>({
      query: () => ({
        url: `me/player/previous`,
        method: 'POST',
      }),
    }),
    seekPlayback: builder.mutation<any, number | number[]>({
      query: (position) => ({
        url: `me/player/seek?position_ms=${position}`,
        method: 'PUT',
      }),
    }),
    fetchAvailableDevices: builder.query<any, any>({
      query: () => {
        return `/me/player/devices`
      },
    }),
    transferPlayback: builder.mutation<any, string[]>({
      query: (id) => ({
        url: `me/player?device_ids=${id}`,
        method: 'PUT',
      }),
    }),
    setVolume: builder.mutation<any, number>({
      query: (vol) => ({
        url: `me/player/volume?volume_percent=${vol}`,
        method: 'PUT',
      }),
    }),
    playTrack: builder.mutation<any, any>({
      query: (body) => ({
        url: `me/player/play`,
        method: 'PUT',
        body: body,
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
  useSeekPlaybackMutation,
  usePlayPlaybackMutation,
  usePausePlaybackMutation,
  useSkipToNextSongMutation,
  useSkipToPrevSongMutation,
  useFetchPlaylistQuery,
  useFetchAvailableDevicesQuery,
  useTransferPlaybackMutation,
  useSetVolumeMutation,
  usePlayTrackMutation,
} = apiSlice
