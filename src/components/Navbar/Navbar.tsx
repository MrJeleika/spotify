// Components
import { LogoSVG } from 'components/svg/LogoSVG'
import { Playlists } from './Playlists/Playlists'

interface Props {}

export const Navbar = ({}: Props) => {
  return (
    <div className="relative">
      <div className="fixed w-[20%]  top-0 l-0 bg-black px-5 pt-5 h-[100vh]">
        <div className="max-w-full">
          <LogoSVG color="white" />
          <Playlists />
        </div>
      </div>
    </div>
  )
}
