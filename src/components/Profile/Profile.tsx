import { useAppDispatch, useAppSelector } from 'redux/app/hooks'
import { ProfileMyPlaylists } from './ProfileMyPlaylists/ProfileMyPlaylists'
import { ProfileTopTracks } from './ProfileTopTracks/ProfileTopTracks'

import { MainGradientBackground } from 'components/common/MainGradientBackground/MainGradientBackground'
import { SecondaryGradientBackground } from 'components/common/SecondaryGradientBackground/SecondaryGradientBackground'
import { useEffect, useState } from 'react'
import { ProfileFollowedArtists } from './ProfileFollowedArtists/ProfileFollowedArtists'
import { ProfileTopArtists } from './ProfileTopArtists/ProfileTopArtists'

interface Props {}

export const Profile = ({}: Props) => {
  const { profile, myPlaylists, savedTracks } = useAppSelector(
    (state) => state.spotify
  )

  const publicPlaylistsCount = myPlaylists.items.reduce(
    (total, item) => (item.public ? total + 1 : total),
    0
  )
  return (
    <MainGradientBackground>
      <div className="">
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
      <SecondaryGradientBackground>
        <div className="mb-10">
          <ProfileTopArtists />
        </div>
        <div className="mb-10">
          <ProfileMyPlaylists />
        </div>
        <div className="mb-10">
          <ProfileTopTracks />
        </div>
        <div className="">
          <ProfileFollowedArtists />
        </div>
      </SecondaryGradientBackground>
    </MainGradientBackground>
  )
}
