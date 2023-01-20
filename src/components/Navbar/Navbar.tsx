// Components
import { LogoSVG } from 'components/svg/LogoSVG'
import { Playlists } from './Playlists/Playlists'
import { NavLink } from 'react-router-dom'
import { SearchSVG } from 'components/svg/SearchSVG'

interface Props {}

export const Navbar = ({}: Props) => {
  return (
    <div className="relative">
      <div className="fixed w-[20%]  top-0 l-0 bg-black px-5 pt-5 h-[100vh]">
        <div className="max-w-full">
          <div className="mb-10">
            <LogoSVG color="white" />
          </div>
          <NavLink to={'/search'} className="group flex items-center mb-5">
            <div className="mr-3">
              <SearchSVG color="gray" />
            </div>
            <h1 className="text-gray group-hover:text-white font-bold text-sm duration-200">
              Search
            </h1>
          </NavLink>
          <div className="h-[1px] w-full rounded-full bg-gray"></div>
          <Playlists />
        </div>
      </div>
    </div>
  )
}
