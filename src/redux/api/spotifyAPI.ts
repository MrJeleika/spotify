import {createApi, fetchBaseQuery}  from '@reduxjs/toolkit/query/react'
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
  endpoints: (builder) => {
    return{
      fetchProfile: builder.query<any, any>({
        query: () => {
          return `/me`
      }
    })
    }
  }
})

export const {useFetchProfileQuery} = apiSlice