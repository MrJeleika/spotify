import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile, SpotifyState } from "../../types/spotifySlice";

const initialState: SpotifyState  = {
  profile: {
    country: '',
    display_name: '',
    email: '',
    explicit_content:{
      filter_enabled: false,
      filter_locked: false,
    },
    external_urls: {
      spotify: '',
    },
    followers: {
      href: '',
      total: 0,
    },
    href: '',
    id: '',
    images: {
      url: '',
      height: null,
      width: null,
    },
    product: '',
    type: '',
    uri: '',
  }
}

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers:{
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = {...action.payload}
    }
  },

})

export default spotifySlice.reducer

export const {setProfile} = spotifySlice.actions