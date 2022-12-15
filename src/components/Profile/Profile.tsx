import { useAppSelector } from 'redux/app/hooks'

interface Props {}

export const Profile = ({}: Props) => {
  const { profile, myPlaylists } = useAppSelector((state) => state.spotify)

  return (
    <div>
      <div className="bg-gradient-to-b pt-[80px] from-[#555555] to-[#2b2b2b] w-full">
        <div className="flex p-7 text-white">
          <div className="rounded-full mr-7  w-[225px] h-[225px] overflow-hidden">
            <img
              src={profile.images[0].url}
              alt="ProfileImage"
              className="mt-[-20px]"
            />
          </div>
          <div className="flex flex-col justify-end">
            <p className="uppercase font-bold text-sm mb-1">Profile</p>
            <h1 className="text-8xl font-bold mb-8 tracking-tighter">
              {profile.display_name}
            </h1>
            <div className="flex">
              <div className="text-sm">
                {myPlaylists.items.length} open playlists
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
