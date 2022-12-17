export interface Profile{
  country: string;
  display_name: string;
    email: string;
    explicit_content:{
      filter_enabled: boolean;
      filter_locked: boolean;
    }
    external_urls: {
      spotify: string;
    }
    followers: {
      href: string;
      total: number;
    };
    href: string;
    id: string;
    images:[ {
      url: string;
      height: number | null;
      width: number | null;
    }]
    product: string;
    type: string;
    uri: string;
}

export interface Playlists{
  items: [
    {
      collaborative: boolean;
      description: string;
      external_urls: {
        spotify: string;
      }
      href: string;
      id: string;
      images: [
        {
          width: number | null;
          height: number | null;
          url: string;
        }
      ]
      name: string;
      owner: {
        external_urls:{
          spotify: string;
        }
        followers:{
          href: string;
          total: number;
        }
        href: string;
        id: string;
        type: string;
        uri: string;
        display_name: string;  
      }
      public: boolean;
      snapshot_id: string;
      tracks: {
        href: string;
        total: number;
      }
      type: string;
      uri: string;
    }
  ];
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}
export interface UserTopItems{
  href: string;
  items: Array<{}>
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}
export interface PlaybackState {
  device: any;
  repeatState: string
  shuffleState: string;
  context: any
  timestamp: number;
  progress: number;
  is_playing: boolean;
  item: any
  current_playing_type: string;
  actions: any;
}

export interface Artist{
  external_urls: {
    spotify: string;
  }
  followers: {
    href: string;
    total: number;
  }
  genres: string[];
  href: string;
  id: string;
  images: [{
    url: string
    height: number | null;
    width: number | null;
  }]
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface Tracks{
  album: any;
  artists: Artist[]
  available_markets: string[]
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
    ean: string;
    upc:  string;
  }
  external_urls: {
    spotify: string;
  }
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: any;
  restrictions:{
    reasons: string
  }
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean
}


export interface SpotifyState{
  profile: Profile
  myPlaylists: Playlists
  myTopItems: UserTopItems
  playbackState: PlaybackState
  playlistTracks: UserTopItems
}