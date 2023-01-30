import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IArtist,
  AvailableDevices,
  IArtistTopTracks,
  MyFollowedArtists,
  IPlaybackState,
  IPlaylist,
  IPlaylists,
  IProfile,
  SavedTracks,
  SpotifyState,
  IUserTopItems,
  IMyPlaylists,
  IAlbums,
  IAlbum,
  ISearch,
} from '../../types/spotifySlice'

const initialState: SpotifyState = {
  isLoading: false,

  randomColorNum: 0,

  playerError: {
    isError: false,
    message: '',
  },

  profile: {
    country: '',
    display_name: '',
    email: '',
    explicit_content: {
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
    images: [
      {
        url: '',
        height: null,
        width: null,
      },
    ],
    product: '',
    type: '',
    uri: '',
  },
  myPlaylists: {
    items: [
      {
        collaborative: false,
        description: '',
        external_urls: {
          spotify: '',
        },
        href: '',
        id: '',
        images: [
          {
            url: '',
            height: null,
            width: null,
          },
        ],
        name: '',
        owner: {
          external_urls: {
            spotify: '',
          },
          followers: {
            href: '',
            total: 0,
          },
          href: '',
          id: '',
          type: '',
          uri: '',
          display_name: '',
        },
        public: true,
        snapshot_id: '',
        tracks: {
          href: '',
          total: 0,
        },

        type: '',
        uri: '',
      },
    ],
    href: '',
    limit: 20,
    next: '',
    offset: 0,
    previous: '',
    total: 0,
  },

  myTopArtists: {
    href: '',
    items: [],
    limit: 20,
    next: '',
    offset: 0,
    previous: '',
    total: 0,
  },

  myTopTracks: {
    href: '',
    items: [],
    limit: 20,
    next: '',
    offset: 0,
    previous: '',
    total: 0,
  },

  playbackState: {
    device: {},
    repeat_state: '',
    shuffle_state: false,
    context: {},
    timestamp: 0,
    progress_ms: 0,
    is_playing: true,
    item: {
      album: {},
      artists: [],
      available_markets: [],
      disc_number: 0,
      duration_ms: 0,
      explicit: false,
      external_ids: {
        ean: '',
        isrc: '',
        upc: '',
      },
      external_urls: {
        spotify: '',
      },
      href: '',
      is_local: false,
      is_playable: false,
      id: '',
      linked_from: {},
      restrictions: {
        reasons: '',
      },
      name: '',
      popularity: 0,
      preview_url: '',
      track_number: 0,
      type: '',
      uri: '',
    },
    current_playing_type: '',
    actions: {},
  },

  playlistTracks: {
    href: '',
    items: [],
    limit: 20,
    next: '',
    offset: 0,
    previous: '',
    total: 0,
  },
  savedTracks: {
    href: '',
    items: [
      {
        added_at: '',
        track: {},
      },
    ],
    limit: 20,
    next: '',
    offset: 0,
    previous: '',
    total: 0,
  },

  playlist: {
    collaborative: false,
    description: '',
    external_urls: {
      spotify: '',
    },
    href: '',
    id: '',
    images: [
      {
        url: '',
        height: null,
        width: null,
      },
    ],
    name: '',
    owner: {
      external_urls: {
        spotify: '',
      },
      followers: {
        total: 0,
        href: '',
      },
      href: '',
      id: '',
      type: '',
      uri: '',
      display_name: '',
    },
    public: true,
    snapshot_id: '',
    tracks: {
      href: '',
      items: [
        {
          added_at: '',
          track: {
            album: {},
            artists: [],
            available_markets: [],
            disc_number: 0,
            duration_ms: 0,
            explicit: false,
            external_ids: {
              ean: '',
              isrc: '',
              upc: '',
            },
            external_urls: {
              spotify: '',
            },
            href: '',
            is_local: false,
            is_playable: false,
            id: '',
            linked_from: {},
            restrictions: {
              reasons: '',
            },
            name: '',
            popularity: 0,
            preview_url: '',
            track_number: 0,
            type: '',
            uri: '',
          },
          added_by: {
            external_urls: {
              spotify: '',
            },
            href: '',
            id: '',
            type: '',
            uri: '',
          },
          is_local: false,
          primary_color: null,
          video_thumbnail: {
            url: '',
          },
        },
      ],
      limit: 20,
      next: '',
      offset: 0,
      previous: '',
      total: 0,
    },
    type: '',
    uri: '',
  },

  availableDevices: {
    devices: [
      {
        id: '',
        name: '',
        is_active: false,
        is_private_session: false,
        is_restricted: false,
        type: '',
        volume_percent: 50,
      },
    ],
  },

  myFollowedArtists: {
    artists: {
      href: '',
      items: [],
      limit: 50,
      next: '',
      cursors: {
        after: '',
      },
      total: 0,
    },
  },

  playbackQueue: '',

  artistProfile: {
    external_urls: {
      spotify: '',
    },
    followers: {
      href: '',
      total: 0,
    },
    genres: [],
    href: '',
    id: '',
    images: [
      {
        url: '',
        height: 0,
        width: 0,
      },
    ],
    name: '',
    popularity: 0,
    type: '',
    uri: '',
  },

  artistTopTracks: {
    tracks: [],
  },

  artistAlbums: {
    items: [],
    href: '',
    limit: 0,
    next: '',
    previous: '',
    offset: 0,
    total: 0,
  },

  album: {
    album_type: '',
    total_tracks: 0,
    available_markets: [],
    href: '',
    id: '',
    name: '',
    images: [
      {
        url: '',
        height: 0,
        width: 0,
      },
    ],
    release_date: '',
    release_date_precision: '',
    type: '',
    uri: '',
    artists: [],
    tracks: {
      limit: 0,
      total: 0,
      next: '',
      previous: '',
      offset: 0,
      items: [],
      href: '',
    },
    restrictions: {
      reason: '',
    },
    external_urls: {
      spotify: '',
    },
  },

  search: {
    tracks: {
      total: 0,
      items: [],
      next: '',
      previous: '',
      href: '',
      limit: 0,
      offset: 0,
    },
    albums: {
      total: 0,
      items: [],
      next: '',
      previous: '',
      href: '',
      limit: 0,
      offset: 0,
    },
    artists: {
      total: 0,
      items: [],
      next: '',
      previous: '',
      href: '',
      limit: 0,
      offset: 0,
    },
    playlists: {
      total: 0,
      items: [],
      next: '',
      previous: '',
      href: '',
      limit: 0,
      offset: 0,
    },
    audiobooks: {},
    episodes: {},
    shows: {},
  },
}

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<IProfile>) => {
      state.profile = { ...action.payload }
    },
    setMyPlaylists: (state, action: PayloadAction<IMyPlaylists>) => {
      state.myPlaylists = { ...action.payload }
    },
    setMyTopTracks: (state, action: PayloadAction<IUserTopItems>) => {
      state.myTopTracks = { ...action.payload }
    },
    setMyTopArtists: (state, action: PayloadAction<IUserTopItems>) => {
      state.myTopArtists = { ...action.payload }
    },
    setPlaybackState: (state, action: PayloadAction<IPlaybackState>) => {
      state.playbackState = { ...action.payload }
    },
    setPlaylistTracks: (state, action: PayloadAction<IUserTopItems>) => {
      state.playlistTracks = { ...action.payload }
    },
    setSavedTracks: (state, action: PayloadAction<SavedTracks>) => {
      state.savedTracks.items = [
        ...state.savedTracks.items,
        ...action.payload.items,
      ]
      state.savedTracks.limit = action.payload.limit
      state.savedTracks.next = action.payload.next
      state.savedTracks.offset = action.payload.offset
      state.savedTracks.previous = action.payload.previous
      state.savedTracks.total = action.payload.total
    },
    setPlaylist: (state, action: PayloadAction<IPlaylist>) => {
      state.playlist = { ...action.payload }
    },
    setIsloading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setRandomColorNum: (state, action: PayloadAction<number>) => {
      state.randomColorNum = action.payload
    },
    setAvailableDevices: (state, action: PayloadAction<AvailableDevices>) => {
      state.availableDevices = { ...action.payload }
    },
    setPlayerError: (
      state,
      action: PayloadAction<{ isError: boolean; message: string }>
    ) => {
      state.playerError = { ...action.payload }
    },
    setMyFollowedArtists: (state, action: PayloadAction<MyFollowedArtists>) => {
      state.myFollowedArtists = { ...action.payload }
    },
    setPlaybackQueue: (state, action: PayloadAction<any>) => {
      state.playbackQueue = { ...action.payload }
    },
    setArtistProfile: (state, action: PayloadAction<IArtist>) => {
      state.artistProfile = { ...action.payload }
    },
    setArtistTopTracks: (state, action: PayloadAction<IArtistTopTracks>) => {
      state.artistTopTracks = { ...action.payload }
    },
    setArtistAlbums: (state, action: PayloadAction<IAlbums>) => {
      state.artistAlbums = { ...action.payload }
    },
    setAlbum: (state, action: PayloadAction<IAlbum>) => {
      state.album = { ...action.payload }
    },
    setSearchResult: (state, action: PayloadAction<ISearch>) => {
      state.search = { ...action.payload }
    },
  },
})

export default spotifySlice.reducer

export const {
  setProfile,
  setMyPlaylists,
  setMyTopTracks,
  setPlaybackState,
  setPlaylistTracks,
  setSavedTracks,
  setPlaylist,
  setIsloading,
  setRandomColorNum,
  setPlayerError,
  setMyFollowedArtists,
  setAvailableDevices,
  setMyTopArtists,
  setPlaybackQueue,
  setArtistProfile,
  setArtistTopTracks,
  setArtistAlbums,
  setAlbum,
  setSearchResult,
} = spotifySlice.actions
