import { NavLink } from 'react-router-dom'

interface Props {
  item: any
  i: number
  type: string
  children: React.ReactNode
}

export const Card = ({ item, i, type, children }: Props) => {
  return (
    <NavLink
      to={`/${type}/${item.id}`}
      key={i}
      className="big-card-item cursor-pointer bg-[#181818] flex-shrink-0 mx-2 lg:mx-4 rounded-lg p-4 pb-20 hover:bg-[#282828] duration-300"
    >
      {children}
    </NavLink>
  )
}
