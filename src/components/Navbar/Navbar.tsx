import { NavLink } from 'react-router-dom'
// Components
import { LogoSVG } from 'components/svg/LogoSVG'
import { SearchSVG } from 'components/svg/SearchSVG'
import { HomeSVG } from 'components/svg/HomeSVG'

export const Navbar = () => {
  return (
    <div className="relative">
      <div className="fixed w-[20%] sm:block hidden top-0 left-0 bg-black px-5 pt-5 h-[100vh]">
        <div className="max-w-full">
          <div className="mb-10">
            <LogoSVG color="white" />
          </div>
          <NavLink to={'/'} className="group flex items-center mb-5">
            <div className="mr-3">
              <HomeSVG color="gray" />
            </div>
            <h1 className="text-gray group-hover:text-white font-bold text-sm duration-200">
              Home
            </h1>
          </NavLink>
          <NavLink to={'/search'} className="group flex items-center mb-5">
            <div className="mr-3">
              <SearchSVG color="gray" />
            </div>
            <h1 className="text-gray group-hover:text-white font-bold text-sm duration-200">
              Search
            </h1>
          </NavLink>
          <div className="h-[1px] w-full rounded-full bg-gray"></div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="fixed sm:hidden z-50 pt-1 flex justify-evenly bottom-0 left-0 w-full bg-background h-[60px] ">
        <NavLink to={'/'} className="group flex flex-col items-center">
          <div className="mb-2">
            <HomeSVG color="white" />
          </div>
          <h1 className="text-white font-bold text-sm ">Home</h1>
        </NavLink>
        <NavLink to={'/search'} className="group flex flex-col items-center">
          <div className="mb-2">
            <SearchSVG color="white" />
          </div>
          <h1 className="text-white font-bold text-sm ">Search</h1>
        </NavLink>
      </div>
    </div>
  )
}
