import { Logo } from 'components/svg/Logo'
import { Playlists } from './Playlists/Playlists'

interface Props {}

export const Navbar = ({}: Props) => {
  return (
    <div className="bg-black px-5 pt-5 h-full">
      <div className="max-w-full">
        <Logo color="white" />
        <Playlists />
      </div>
    </div>
  )
}
