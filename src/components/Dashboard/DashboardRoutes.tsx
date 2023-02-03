//Components
import { Album } from 'components/Album/Album'
import { ArtistProfile } from 'components/Artists/ArtistProfile/ArtistProfile'
import { ArtistProfileAllPlaylists } from 'components/Artists/ArtistProfile/ArtistProfileAllPlaylists/ArtistProfileAllPlaylists'
import { MyFollowedArtists } from 'components/Artists/MyFollowedArtists/MyFollowedArtists'
import { MyTopArtists } from 'components/Artists/MyTopArtists/MyTopArtists'
import { Home } from 'components/Home/Home'
import { PlaybackQueue } from 'components/Playback/PlaybackQueue/PlaybackQueue'
import { MyAllTopTracks } from 'components/Playlist/MyAllTopTracks/MyAllTopTracks'
import { Playlist } from 'components/Playlist/Playlist'
import { Profile } from 'components/Profile/Profile'
import { Search } from 'components/Search/Search'
import { SearchResults } from 'components/Search/SearchResults'
// Misc
import { Route, Routes } from 'react-router-dom'

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="playlist/:playlistId" element={<Playlist />} />
      <Route path="user/:userId" element={<Profile />} />
      <Route path="user/:userId/top/tracks" element={<MyAllTopTracks />} />
      <Route path="user/:userId/top/artists" element={<MyTopArtists />} />
      <Route path="user/:userId/following" element={<MyFollowedArtists />} />
      <Route path="/queue" element={<PlaybackQueue />} />
      <Route path="artist/:artistId" element={<ArtistProfile />} />
      <Route
        path="/artist/:artistId/discography/all"
        element={<ArtistProfileAllPlaylists />}
      />
      <Route path="/album/:albumId" element={<Album />} />

      <Route path="/search" element={<Search />} />
      <Route path="/search/:query" element={<SearchResults />} />
    </Routes>
  )
}
