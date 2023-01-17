import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  IAlbums,
  IArtist,
  IPlaybackState,
  IPlaylist,
  IPlaylists,
  IProfile,
  ITrack,
  IUserTopItems,
} from '../../types/spotifySlice'
import { RootState } from '../app/store'

interface IArtistAlbums{
  id: string
  type: string
  offset: number
}

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
  tagTypes: ['Queue'],
  endpoints: (builder) => ({
    fetchProfile: builder.query<IProfile, void | null>({
      query: () => {
        return `/me`
      },
    }),
    fetchMyPlaylist: builder.query<IPlaylists, void>({
      query: () => {
        return `/me/playlists`
      },
    }),
    fetchMySavedTracks: builder.query<any, number | void | undefined>({
      query: (offset: number = 0) => {
        return `/me/tracks?limit=50&offset=${offset}`
      },
    }),
    fetchUserPlaylists: builder.query<IPlaylists, string>({
      query: (userId) => {
        return `users/${userId}/playlists`
      },
    }),
    fetchMyTopTracks: builder.query<IUserTopItems, number>({
      query: (limit = 4) => {
        return `/me/top/tracks?limit=${limit}&time_range=short_term`
      },
    }),
    fetchMyTopArtist: builder.query<IUserTopItems, number>({
      query: (limit = 10) => {
        return `/me/top/artists?limit=${limit}&time_range=short_term`
      },
    }),
    fetchPlaybackState: builder.query<IPlaybackState, void | null>({
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
    fetchMyFollowedArtists: builder.query<any, void | undefined>({
      query: () => {
        return `/me/following?type=artist&limit=50`
      },
    }),
    transferPlayback: builder.mutation<any, string[]>({
      query: (id) => ({
        url: `me/player`,
        method: 'PUT',
        body: { device_ids: id, play: true },
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
        providesTags: ['Queue'],
      }),

    }),
    fetchMyPlaybackQueue: builder.query<any, void | undefined>({
      query: () => `me/player/queue`,
      providesTags: ['Queue'],
    }),
    addTrackToQueue: builder.mutation<any, string>({
      query: (uri) => ({
        url: `me/player/queue?uri=${uri}`,
        method: 'POST',
      }),
      invalidatesTags: ['Queue'],
    }),
    fetchArtistProfile: builder.query<IArtist, string | undefined>({
      query: (id) => `artists/${id}`,
    }),
    fetchArtistTopTracks: builder.query<ITrack[], string | undefined>({
      query: (id) => `artists/${id}/top-tracks?country=UA`,
    }),
    fetchArtistAlbums: builder.query<IAlbums, Object | undefined>({
      query: ({id, type, offset}: IArtistAlbums) => `artists/${id}/albums?market=UA&limit=50&include_groups=${type}&offset=${offset}`,
    }),
  }),
})

export const {
  useFetchProfileQuery,
  useFetchMyPlaylistQuery,
  useFetchUserPlaylistsQuery,
  useFetchMyTopTracksQuery,
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
  useFetchMyTopArtistQuery,
  useFetchMyFollowedArtistsQuery,
  useFetchMyPlaybackQueueQuery,
  useAddTrackToQueueMutation,
  useFetchArtistProfileQuery,
  useFetchArtistTopTracksQuery,
  useFetchArtistAlbumsQuery,
} = apiSlice
