import {createApi, fetchBaseQuery}  from '@reduxjs/toolkit/query/react'
import { Playlists, Profile } from '../../types/spotifySlice';
import { RootState } from '../app/store'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spotify.com/v1',
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token;
      if(token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
      fetchProfile: builder.query<Profile, void>({
        query: () => {
          return `/me`
      },
      }),
      fetchMyPlaylist: builder.query<Playlists, void>({
        query: () =>{
          return `/me/playlists`
        }
      }),
      fetchUserPlaylists: builder.query<Playlists, string>({
        query: (userId) => {
          return `users/${userId}/playlists`
        }
      }),
  })
})

export const {useFetchProfileQuery, useFetchMyPlaylistQuery, useFetchUserPlaylistsQuery} = apiSlice