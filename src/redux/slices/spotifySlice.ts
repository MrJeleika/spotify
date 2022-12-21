import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlaybackState, Playlists, Profile, SavedTracks, SpotifyState, UserTopItems } from "../../types/spotifySlice";

const initialState: SpotifyState = {
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
    images: [{
      url: '',
      height: null,
      width: null,
    }],
    product: '',
    type: '',
    uri: '',
  },
  myPlaylists: {
    items: [
      {
        collaborative: false,
        description: "",
        external_urls: {
          spotify: ""
        },
        href: "",
        id: "",
        images: [
          {
            url: "",
            height: null,
            width: null
          }
        ],
        name: "",
        owner: {
          external_urls: {
            spotify: ""
          },
          followers: {
            href: "",
            total: 0
          },
          href: "",
          id: "",
          type: "",
          uri: "",
          display_name: ""
        },
        public: true,
        snapshot_id: "",
        tracks: {
          href: "",
          total: 0
        },
        type: "",
        uri: ""
      }
    ],
    href: "",
    limit: 20,
    next: "",
    offset: 0,
    previous: "",
    total: 0
  },
  myTopItems: {
    href: '',
    items: [],
    limit: 20,
    next: "",
    offset: 0,
    previous: "",
    total: 0,
  },
  playbackState:{
    device: {},
    repeatState: '',
    shuffleState: '',
    context: {},
    timestamp: 0,
    progress_ms: 0,
    is_playing: true,
    item: {},
    current_playing_type: '',
    actions: {},
  },
  playlistTracks:{
    href: '',
    items: [],
    limit: 20,
    next: "",
    offset: 0,
    previous: "",
    total: 0,
  },
  savedTracks:{
    href: '',
    items: [{
      added_at: '',
      track: {}
    }],
    limit: 20,
    next: "",
    offset: 0,
    previous: "",
    total: 0,
  }
  
}

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers:{
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = {...action.payload}
    },
    setMyPlaylists: (state, action: PayloadAction<Playlists>) => {
      state.myPlaylists = {...action.payload}
    },
    setMyTopItems: (state, action: PayloadAction<UserTopItems>) =>{
      state.myTopItems = {...action.payload}
    },
    setPlaybackState: (state, action: PayloadAction<PlaybackState>) =>{
      state.playbackState = {...action.payload}
    },
    setPlaylistTracks: (state, action: PayloadAction<UserTopItems>) =>{
      state.playlistTracks = {...action.payload}
    },
    setSavedTracks: (state, action: PayloadAction<SavedTracks>) =>{
      state.savedTracks.items = [...state.savedTracks.items, ...action.payload.items]
      state.savedTracks.limit = action.payload.limit
      state.savedTracks.next = action.payload.next
      state.savedTracks.offset = action.payload.offset
      state.savedTracks.previous = action.payload.previous
      state.savedTracks.total = action.payload.total
    },
  },

})

export default spotifySlice.reducer

export const {setProfile, setMyPlaylists, setMyTopItems,setPlaybackState, setPlaylistTracks, setSavedTracks} = spotifySlice.actions