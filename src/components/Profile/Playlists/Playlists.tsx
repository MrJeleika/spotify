import { NoPlaylistImage } from 'components/svg/NoPlaylistImage'
import { useAppSelector } from 'redux/app/hooks'

interface Props {}

export const Playlists = ({}: Props) => {
  const playlists = useAppSelector((state) => state.spotify.myPlaylists)
  return (
    <div>
      <h1 className="title ml-2 lg:ml-4">Public playlists</h1>
      <div className="flex w-full overflow-hidden">
        {playlists.items.map((playlist, i) =>
          playlist.public ? (
            <div
              key={i}
              className="big-card-item cursor-pointer bg-[#121212] flex-shrink-0 mx-2 lg:mx-4 rounded-lg p-4 pb-20 hover:bg-[#282828] duration-300"
            >
              <div className="w-full h-full  pb-3">
                {playlist.images[0] ? (
                  <img
                    src={playlist.images[0].url}
                    className="h-full shadow-xl object-cover"
                    alt=""
                  />
                ) : (
                  <div className="w-full h-full flex bg-[#333333] items-center justify-center ">
                    <NoPlaylistImage color="#b3b3b3" width="50px" />
                  </div>
                )}
              </div>

              <h1 className="text-white font-bold">{playlist.name}</h1>
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}
