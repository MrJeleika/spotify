import { motion } from 'framer-motion'

interface Props {
  text: string
}

export const Tooltip = ({ text }: Props) => {
  const variants = {
    hover: { opacity: 1, display: 'inline' },
  }
  return (
    <motion.div
      variants={variants}
      transition={{ duration: 0.15, delay: 0.15 }}
      className="absolute top-[-40px] left-[-30%] opacity-0 cursor-default rounded  shadow-2xl py-1 px-2 bg-[#282828]"
    >
      <p className="text-white break-keep text-sm select-none">{text}</p>
    </motion.div>
  )
}
