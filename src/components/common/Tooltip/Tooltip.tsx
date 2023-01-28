import { PlacesType, Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

interface Props {
  text: string
  id: string
  place?: PlacesType | undefined
}

export const Tooltip = ({ text, id, place }: Props) => {
  return <ReactTooltip anchorId={id} place={place} content={text} />
}
