import { useAppSelector } from 'redux/app/hooks'
import { Playlists } from './Playlists/Playlists'
import { MyTopTracks } from './MyTopTracks/MyTopTracks'

interface Props {}

export const Profile = ({}: Props) => {
  const { profile, myPlaylists } = useAppSelector((state) => state.spotify)

  const publicPlaylistsCount = myPlaylists.items.reduce(
    (total, item) => (item.public ? total + 1 : total),
    0
  )
  return (
    <div>
      <div className="bg-gradient-to-b pt-[80px] from-[#555555] to-[#2b2b2b] w-full">
        <div className="flex p-7 text-white">
          <div className="rounded-full mr-7 flex lg:h-[250px] lg:w-[250px] h-[120px] w-[120px] overflow-hidden shadow-xl">
            <img
              src={profile.images[0].url}
              alt="ProfileImage"
              className=" h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-end">
            <p className="uppercase font-bold text-sm mb-1">Profile</p>
            <h1 className="lg:text-8xl sm:text-6xl text-4xl font-bold mb-8 tracking-tighter">
              {profile.display_name}
            </h1>
            <div className="flex">
              <div className="text-sm">
                {publicPlaylistsCount} open playlists
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 w-full p-5 lg:p-10">
        <Playlists />
      </div>
      <div className="bg-zinc-900 w-full p-5 lg:p-10">
        <MyTopTracks />
      </div>
    </div>
  )
}
