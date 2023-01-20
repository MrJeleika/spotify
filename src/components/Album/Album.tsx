import { AlbumTrack } from 'components/Tracks/AlbumTrack'
import { MainGradientBackground } from 'components/common/MainGradientBackground/MainGradientBackground'
import { SecondaryGradientBackground } from 'components/common/SecondaryGradientBackground/SecondaryGradientBackground'
import { useSetFetchedData } from 'hooks/useSetFetchedData'

import { NavLink, useParams } from 'react-router-dom'
import { useFetchAlbumQuery } from 'redux/api/spotifyAPI'
import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { setAlbum } from 'redux/slices/spotifySlice'

export const Album = () => {
  const albumId = useParams().albumId
  const { data, isFetching, error } = useFetchAlbumQuery(albumId)

  useSetFetchedData(data, setAlbum, isFetching)

  const { album } = useAppSelector((state) => state.spotify)

  const date = new Date(album.release_date)

  return (
    <>
      {album.name && album.images && (
        <MainGradientBackground>
          <div className="flex p-7 text-white">
            <div className="mr-7 lg:h-[250px] lg:w-[250px] h-[120px] w-[120px] overflow-hidden ">
              {album.images[0] ? (
                <img
                  src={album.images[0].url}
                  alt="ProfileImage"
                  className="object-cover   shadow-xl"
                />
              ) : (
                <div className="w-full h-full object-cover shadow-xl"></div>
              )}
            </div>
            <div className="flex flex-col justify-end">
              <p className="uppercase font-bold text-sm mb-1">Album</p>
              <h1 className="lg:text-8xl md:text-4xl text-4xl font-bold mb-8 tracking-tighter">
                {album.name}
              </h1>
              <div className="flex"></div>
            </div>
          </div>
          <SecondaryGradientBackground>
            <div className="w-full overflow-hidden mb-5 ">
              {album.tracks.items.map((track: any, i) => (
                <AlbumTrack track={track} key={i} i={i} />
              ))}
            </div>
            <p className="text-gray w-1/4 lg:block hidden group-hover:text-[white] text-left text-sm leading-none">
              {`${date.toLocaleString('en', {
                month: 'long',
              })} ${date.getDate()}, ${date.getFullYear()}`}
            </p>
            <div className="flex w-full items-center justify-between">
              <h1 className="title">More by {album.artists[0].name}</h1>
              <NavLink
                to={`/artist/${album.artists[0].id}/discography/all`}
                className="text-gray text-md font-bold uppercase border-b-[1px] border-[#00000000] hover:border-gray cursor-pointer"
              >
                SHOW ALL
              </NavLink>
            </div>
          </SecondaryGradientBackground>
        </MainGradientBackground>
      )}
    </>
  )
}
