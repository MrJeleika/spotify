// Misc
import { useFetchPlaylistQuery } from 'redux/api/spotifyAPI'
import { setPlaylist } from 'redux/slices/spotifySlice'
// Hooks
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'redux/app/hooks'
import { useSetFetchedData } from 'hooks/useSetFetchedData'
// Components
import { MainGradientBackground } from 'components/common/MainGradientBackground/MainGradientBackground'
import { SecondaryGradientBackground } from 'components/common/SecondaryGradientBackground/SecondaryGradientBackground'
import { PlaylistTrack } from 'components/Tracks/PlaylistTrack'
import { ClockSVG } from 'components/svg/ClockSVG'
import { DotsSVG } from 'components/svg/DotsSVG'
import { PlayButton } from 'components/common/PlayButton/PlayButton'

export const Playlist = () => {
  const playlistId = useParams().playlistId

  const { data, isFetching } = useFetchPlaylistQuery(playlistId)
  const { playlist } = useAppSelector((state) => state.spotify)

  useSetFetchedData(data, setPlaylist, isFetching)

  return (
    <MainGradientBackground>
      <div className="">
        <div className="flex p-7 text-white">
          <div className=" mr-7 flex lg:h-[250px] lg:w-[250px] h-[120px] w-[120px] overflow-hidden shadow-2xl">
            <img
              src={playlist.images[0].url}
              alt="ProfileImage"
              className=" h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-end">
            <p className="uppercase font-bold text-sm mb-1">Public playlist</p>
            <h1 className="lg:text-8xl sm:text-6xl text-4xl font-bold mb-8 tracking-tighter">
              {playlist.name}
            </h1>
          </div>
        </div>
      </div>
      <SecondaryGradientBackground>
        <div className="pb-5">
          <PlayButton playlist={playlist} />
        </div>
        <div className=" track-item flex border-b-[1px] border-gray pr-3 lg:pr-5  mb-1 py-2 w-full">
          <div className="flex lg:w-1/2 md:w-[60%] w-[80%] mx-1">
            <div className="text-gray w-[40px] font-bold text-sm flex items-center justify-center">
              <p>#</p>
            </div>
            <div>
              <p className="text-gray break-normal	 overflow-hidden my-1 leading-none cursor-default">
                Title
              </p>
            </div>
          </div>
          <div className="flex lg:w-1/2 md:w-[40%] w-[20%] mx-1 items-center md:justify-between justify-end cursor-default">
            <p className="text-gray lg:w-1/2 md:w-full md:block hidden  text-sm leading-none">
              Album
            </p>
            <p className="text-gray w-1/4 lg:block hidden text-sm leading-none">
              Date added
            </p>
            <div className="flex justify-end w-[12.5%]">
              <ClockSVG color="gray" />
            </div>
            <div className="opacity-0">
              <DotsSVG />
            </div>
          </div>
        </div>
        {playlist.tracks.items.map((track: any, i: number) => (
          <PlaylistTrack
            track={track.track}
            is_local={track.is_local}
            added_at={track.added_at}
            key={i}
            i={i}
          />
        ))}
      </SecondaryGradientBackground>
    </MainGradientBackground>
  )
}
