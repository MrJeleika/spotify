import { useEffect, useRef } from 'react'
import { Tracks } from 'types/spotifySlice'
import { motion } from 'framer-motion'
import { useAddTrackToQueueMutation } from 'redux/api/spotifyAPI'

interface Props {
  track: Tracks
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  optionsRef: React.RefObject<HTMLDivElement>
}

export const TrackOptionsModal = ({
  track,
  isOpen,
  setIsOpen,
  optionsRef,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let handler = (e: any) => {
      if (
        !modalRef.current?.contains(e.target) &&
        !optionsRef.current?.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  })

  const variants = {
    open: { opacity: 1, display: 'block' },
    closed: { opacity: 0, transitionEnd: { display: 'none' } },
  }

  const [addToQueue, { error, status }] = useAddTrackToQueueMutation()
  console.log(error)

  useEffect(() => {
    setIsOpen(false)
  }, [status])
  return (
    <motion.div
      ref={modalRef}
      variants={variants}
      animate={isOpen ? 'open' : 'closed'}
      className="absolute hidden p-1 w-[200px] bg-zinc-700 bottom-[-50px] right-0 rounded"
    >
      <ul>
        <li
          onClick={() => addToQueue(track.uri)}
          className="w-full hover:bg-zinc-500  p-3 text-white cursor-pointer "
        >
          Add to queue{' '}
        </li>
      </ul>
    </motion.div>
  )
}
