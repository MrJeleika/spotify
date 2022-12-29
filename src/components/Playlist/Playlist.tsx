import { MainGradientBackground } from 'components/common/MainGradientBackground/MainGradientBackground'
import { useParams } from 'react-router-dom'
import { useFetchPlaylistQuery } from 'redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { setIsloading, setPlaylist } from 'redux/slices/spotifySlice'
import { useEffect } from 'react'
import { SecondaryGradientBackground } from 'components/common/SecondaryGradientBackground/SecondaryGradientBackground'
import { PlaylistTrack } from 'components/Tracks/PlaylistTrack'
import { ClockSVG } from 'components/svg/ClockSVG'

interface Props {}

export const Playlist = ({}: Props) => {
  const playlistId = useParams().playlistId

  const dispatch = useAppDispatch()
  const { data, isFetching } = useFetchPlaylistQuery(playlistId)
  const { playlist } = useAppSelector((state) => state.spotify)
  useEffect(() => {
    if (data) {
      dispatch(setPlaylist(data))
    }
  }, [data])
  useEffect(() => {
    dispatch(setIsloading(isFetching))
  }, [isFetching])

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
        <div className="pb-10"></div>
        <div className=" track-item flex border-b-[1px] border-gray duration- pr-5 mb-1 py-2 w-full">
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
          </div>
        </div>
        {playlist.tracks.items.map((track: any, i: number) => (
          <PlaylistTrack track={track} key={i} i={i} />
        ))}
      </SecondaryGradientBackground>
    </MainGradientBackground>
  )
}
