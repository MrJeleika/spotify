import { useAppSelector } from 'redux/app/hooks'

interface Props {}

export const NavbarTop = ({}: Props) => {
  const profile = useAppSelector((state) => state.spotify.profile)
  return (
    <div className="w-full">
      <div className="bg-inherit fixed top-0 p-7 flex justify-between">
        <div></div>
        <div>{profile.display_name}</div>
      </div>
    </div>
  )
}
