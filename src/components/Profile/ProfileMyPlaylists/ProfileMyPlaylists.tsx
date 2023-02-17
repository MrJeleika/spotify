// Components
import { Card } from 'components/common/Card/Card'
// Hooks
import { useAppSelector } from 'redux/app/hooks'

export const ProfileMyPlaylists = () => {
  const playlists = useAppSelector((state) => state.spotify.myPlaylists)
  return (
    <div>
      <h1 className="title ml-2 lg:ml-4">Public playlists</h1>
      <div className="flex w-full overflow-hidden">
        {playlists.next &&
          playlists.items.map((playlist, i) =>
            playlist.public ? (
              <Card
                i={i}
                key={i}
                link={`playlist/${playlist.id}`}
                item={playlist}
              ></Card>
            ) : null
          )}
      </div>
    </div>
  )
}
