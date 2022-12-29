import { Card } from 'components/common/Card/Card'
import { NoPlaylistImageSVG } from 'components/svg/NoPlaylistImageSVG'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from 'redux/app/hooks'

interface Props {}

export const ProfileMyPlaylists = ({}: Props) => {
  const playlists = useAppSelector((state) => state.spotify.myPlaylists)
  return (
    <div>
      <h1 className="title ml-2 lg:ml-4">Public playlists</h1>
      <div className="flex w-full overflow-hidden">
        {playlists.items.map((playlist, i) =>
          playlist.public ? (
            <Card i={i} key={i} type={'playlist'} item={playlist}>
              <div className="w-full h-full pb-3">
                {playlist.images[0] ? (
                  <img
                    src={playlist.images[0].url}
                    className="h-full shadow-xl object-cover"
                    alt=""
                  />
                ) : (
                  <div className="w-full h-full flex bg-[#333333] items-center justify-center ">
                    <NoPlaylistImageSVG color="#b3b3b3" width="50px" />
                  </div>
                )}
              </div>
              <h1 className="text-white font-bold">{playlist.name}</h1>
            </Card>
          ) : null
        )}
      </div>
    </div>
  )
}
