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


export interface SpotifyState{
  profile: Profile
  myPlaylists: Playlists
}