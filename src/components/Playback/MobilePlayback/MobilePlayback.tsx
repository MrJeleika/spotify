import { motion } from 'framer-motion'

interface Props {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const MobilePlayback = ({ isOpen, setIsOpen }: Props) => {
  return <motion.div></motion.div>
}
