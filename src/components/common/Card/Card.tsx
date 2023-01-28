import { NoPlaylistImageSVG } from 'components/svg/NoPlaylistImageSVG'
import { NavLink } from 'react-router-dom'

interface Props {
  item: any
  i?: number
  link: string
  children?: React.ReactNode
  rounded?: boolean
}

export const Card = ({ item, i, link, children, rounded }: Props) => {
  return (
    <NavLink
      to={`/${link}`}
      key={i}
      className="big-card-item cursor-pointer bg-[#181818] flex-shrink-0 mx-2 lg:mx-4 rounded-lg p-4 pb-20 mb-4 hover:bg-[#282828] duration-300"
    >
      <div className="mb-3">
        {item.images[0] ? (
          <img
            src={item.images[0].url}
            className={
              rounded
                ? `rounded-full aspect-square object-cover`
                : 'object-cover aspect-square'
            }
            alt="Preview"
          />
        ) : (
          <div className="w-full h-full flex bg-[#333333] items-center justify-center ">
            <NoPlaylistImageSVG color="#b3b3b3" width="50px" />
          </div>
        )}
      </div>
      <h1 className="text-white lg:text-base text-sm font-bold">{item.name}</h1>
    </NavLink>
  )
}
