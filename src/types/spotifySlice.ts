interface Item {
  href: string
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}

export interface Profile {
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

export interface Playlists extends Item {
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
export interface UserTopItems extends Item {
  items: Array<{}>
}
export interface PlaybackState {
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

export interface Artist {
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

export interface Tracks {
  album: any
  artists: Artist[]
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
      track: any
    }
  ]
}

export interface Playlist {
  collaborative: boolean
  description: string | null
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
  name: string
  owner: {}
  public: boolean
  snapshot_id: string
  tracks: {
    href: string
    items: Array<{
      added_at: string
      track: any
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
      primary_color: string | null
      video_thumbnail: {
        url: string
      }
    }>
    total: number
    limit: number
    next: string | null
    offset: number
    previous: string | null
  }
  type: string
  uri: string
}

export interface SpotifyState {
  profile: Profile
  myPlaylists: Playlists
  myTopItems: UserTopItems
  playbackState: PlaybackState
  playlistTracks: UserTopItems
  savedTracks: SavedTracks | any
  playlist: Playlist
  isLoading: boolean
  randomColorNum: number
}
