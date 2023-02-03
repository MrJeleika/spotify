// Hooks
import React, { useState } from 'react'
// Misc
import { ITrack } from 'types/spotifySlice'
// Components
import { DotsSVG } from 'components/svg/DotsSVG'
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
        className="md:opacity-0 md:group-hover:opacity-100 "
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
