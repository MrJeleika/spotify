import { motion } from 'framer-motion'
import { QueueSVG } from 'components/svg/QueueSVG'
import { Tooltip } from 'components/common/Tooltip/Tooltip'
import { DevicesModal } from '../DevicesModal/DevicesModal'
import { DevicesSVG } from 'components/svg/DevicesSVG'
import Slider from 'rc-slider'
import { useEffect, useRef, useState } from 'react'
import {
  usePlaybackState,
  useSpotifyPlayer,
} from 'react-spotify-web-playback-sdk'
import { useSetVolumeMutation } from 'redux/api/spotifyAPI'
import { NavLink } from 'react-router-dom'

export const PlaybackDeviceControl = () => {
  const playback = usePlaybackState()
  const player = useSpotifyPlayer()
  const initialVolume = player?.getVolume() ? player?.getVolume() : 0
  const [setVolume, { error: volumeError }] = useSetVolumeMutation()
  const [stateVolume, setStateVolume] = useState<number | number[]>(
    +initialVolume | 0.5
  )

  const devicesRef = useRef<HTMLDivElement>(null)
  const [devicesIsOpen, setDevicesIsOpen] = useState<boolean>(false)
  useEffect(() => {
    if (playback) setVolume(Math.floor(+stateVolume * 100))
  }, [stateVolume])

  return (
    <div className="flex sm:w-1/3 w-[40%] justify-end sm:block hidden">
      <div className="flex w-[80%] lg:w-1/2 items-center">
        <div id="queue" className=" relative p-1 mx-1">
          <Tooltip text="Queue" id="queue" place="top" />
          <NavLink to={'/queue'} className="group">
            <QueueSVG color="#5f5f5f" />
          </NavLink>
        </div>
        <motion.div
          id="devices"
          ref={devicesRef}
          whileHover="hover"
          className="relative p-1 mx-1"
          onClick={() => setDevicesIsOpen(!devicesIsOpen)}
        >
          <DevicesModal
            devicesRef={devicesRef}
            devicesIsOpen={devicesIsOpen}
            setDevicesIsOpen={setDevicesIsOpen}
          />
          <Tooltip text="Available devices" id="devices" place="top" />
          <div className="group">
            <DevicesSVG color="#5f5f5f" />
          </div>
        </motion.div>
        <Slider
          min={0}
          max={1}
          step={0.03}
          value={stateVolume}
          onChange={(value) => setStateVolume(value)}
          className=" "
        />
      </div>
    </div>
  )
}
