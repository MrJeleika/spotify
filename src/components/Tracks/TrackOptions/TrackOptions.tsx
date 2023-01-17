import { DotsSVG } from 'components/svg/DotsSVG'
import React, { useRef, useState } from 'react'
import { ITrack } from 'types/spotifySlice'
import { TrackOptionsModal } from './TrackOptionsModal/TrackOptionsModal'

interface Props {
  track: ITrack
  optionsRef: React.RefObject<HTMLDivElement>
}

export const TrackOptions = ({ track, optionsRef }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="opacity-0 group-hover:opacity-100 "
      >
        <DotsSVG color="white" />
      </div>
      <TrackOptionsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        optionsRef={optionsRef}
        track={track}
      />
    </div>
  )
}
