interface Item {
  href: string
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}

export interface IProfile {
  country: string
  display_name: string
  email: string
  explicit_content: {
    filter_enabled: boolean
    filter_locked: boolean
  }
  external_urls: {
    spotify: string
  }
  followers: {
    href: string
    total: number
  }
  href: string
  id: string
  images: [
    {
      url: string
      height: number | null
      width: number | null
    }
  ]
  product: string
  type: string
  uri: string
}

export interface IPlaylists extends Item {
  items: IPlaylist[]
}

export interface IMyPlaylists extends Item {
  items: [
    {
      collaborative: boolean
      description: string
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      images: [
        {
          width: number | null
          height: number | null
          url: string
        }
      ]
      name: string
      owner: {
        external_urls: {
          spotify: string
        }
        followers: {
          href: string
          total: number
        }
        href: string
        id: string
        type: string
        uri: string
        display_name: string
      }
      public: boolean
      snapshot_id: string
      tracks: {
        href: string
        total: number
      }
      type: string
      uri: string
    }
  ]
}

export interface IPlaylist {
  collaborative: boolean
  description: string
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: [
    {
      width: number | null
      height: number | null
      url: string
    }
  ]
  name: string
  owner: {
    external_urls: {
      spotify: string
    }
    followers: {
      href: string
      total: number
    }
    href: string
    id: string
    type: string
    uri: string
    display_name: string
  }
  public: boolean
  snapshot_id: string
  tracks: {
    href: string
    total: number
    limit: number
    next: string
    offset: number
    previous: string
    items: [
      {
        added_at: string
        added_by: {
          external_urls: {
            spotify: string
          }
          href: string
          id: string
          type: string
          uri: string
        }
        is_local: boolean
        primary_color: null
        track: ITrack
        video_thumbnail: any
      }
    ]
  }
  type: string
  uri: string
}

export interface IPlaybackState {
  device: any
  repeatState: string
  shuffleState: string
  context: any
  timestamp: number
  progress_ms: number
  is_playing: boolean
  item: any
  current_playing_type: string
  actions: any
}

export interface IArtist {
  external_urls: {
    spotify: string
  }
  followers: {
    href: string
    total: number
  }
  genres: string[]
  href: string
  id: string
  images: [
    {
      url: string
      height: number | null
      width: number | null
    }
  ]
  name: string
  popularity: number
  type: string
  uri: string
}

export interface IUserTopItems extends Item {
  items: ITrack[] | IArtist[]
}

export interface ITrack {
  album: any
  artists: IArtist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: {
    isrc: string
    ean: string
    upc: string
  }
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  is_playable: boolean
  linked_from: any
  restrictions: {
    reasons: string
  }
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
  is_local: boolean
}
export interface SavedTracks extends Item {
  items: [
    {
      added_at: string
      track: ITrack[]
    }
  ]
}

export interface AvailableDevices {
  devices: Device[]
}
export interface Device {
  id: string
  is_active: boolean
  is_private_session: boolean
  is_restricted: boolean
  name: string
  type: string
  volume_percent: number
}

export interface MyFollowedArtists {
  artists: {
    href: string
    items: IArtist[]
    limit: number
    next: string | null
    cursors: {
      after: string | null
    }
    total: number
  }
}

export interface IArtistTopTracks {
  tracks: ITrack[]
}

export interface IAlbum {
  album_type: string
  total_tracks: number
  available_markets: string[]
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: [
    {
      url: string
      height: number | null
      width: number | null
    }
  ]
  name: string
  release_date: string
  release_date_precision: string
  restrictions: {
    reason: string
  }
  type: string
  uri: string
  artists: IArtist[]
  tracks: {
    href: string
    items: ITrack[]
    limit: number
    next: string
    offset: number
    previous: string
    total: number
  }
}
export interface IAlbums extends Item {
  items: IAlbum[]
}

export interface ISearch {
  tracks: {
    href: string
    limit: number
    next: string
    offset: number
    previous: string
    total: number
    items: ITrack[]
  }
  artists: {
    href: string
    limit: number
    next: string
    offset: number
    previous: string
    total: number
    items: IArtist[]
  }
  albums: {
    href: string
    limit: number
    next: string
    offset: number
    previous: string
    total: number
    items: IAlbum[]
  }
  playlists: {
    href: string
    limit: number
    next: string
    offset: number
    previous: string
    total: number
    items: IPlaylist[]
  }
  shows: any
  episodes: any
  audiobooks: any
}

export interface SpotifyState {
  profile: IProfile
  myPlaylists: IMyPlaylists
  myTopTracks: IUserTopItems
  playbackState: IPlaybackState
  playlistTracks: IUserTopItems
  savedTracks: SavedTracks | any
  playlist: IPlaylist
  isLoading: boolean
  randomColorNum: number
  availableDevices: AvailableDevices
  playerError: {
    isError: boolean
    message: string
  }

  myFollowedArtists: MyFollowedArtists
  myTopArtists: IUserTopItems
  playbackQueue: any
  artistProfile: IArtist
  artistTopTracks: IArtistTopTracks
  artistAlbums: IAlbums
  album: IAlbum
  search: ISearch
}
