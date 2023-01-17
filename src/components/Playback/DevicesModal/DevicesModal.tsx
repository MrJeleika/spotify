import React, { RefObject, useEffect, useRef } from 'react'
import { useAppSelector } from 'redux/app/hooks'
import { motion } from 'framer-motion'
import {
  useFetchAvailableDevicesQuery,
  useTransferPlaybackMutation,
} from 'redux/api/spotifyAPI'
import { setAvailableDevices } from 'redux/slices/spotifySlice'
import { DevicesSVG } from 'components/svg/DevicesSVG'
import { Device } from 'types/spotifySlice'
import { useSetFetchedData } from 'hooks/useSetFetchedData'

interface Props {
  devicesRef: RefObject<HTMLDivElement>
  devicesIsOpen: boolean
  setDevicesIsOpen: (value: boolean) => void
}

export const DevicesModal = ({
  devicesIsOpen,
  devicesRef,
  setDevicesIsOpen,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { availableDevices, playbackState } = useAppSelector(
    (state) => state.spotify
  )

  const { data, isFetching } = useFetchAvailableDevicesQuery(null)
  useSetFetchedData(data, setAvailableDevices, isFetching)

  const [transferPlayback, { error }] = useTransferPlaybackMutation()

  // Close dropdown on outside click
  useEffect(() => {
    let handler = (e: any) => {
      if (
        !modalRef.current?.contains(e.target) &&
        !devicesRef.current?.contains(e.target)
      ) {
        setDevicesIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  })

  const variants = {
    open: { opacity: 1, display: 'block' },
    closed: { opacity: 0, transitionEnd: { display: 'none' } },
  }

  return (
    <motion.div
      animate={devicesIsOpen ? 'open' : 'closed'}
      variants={variants}
      transition={{ duration: 0.1 }}
      ref={modalRef}
      className="absolute z-[777] bg-[#282828] p-5 rounded-md left-[-125px] bottom-[40px] mx-auto w-[250px]"
    >
      <div>
        {availableDevices.devices.map((device: Device, i: number) =>
          device.is_active ? (
            <div key={i} className="mb-3">
              <div
                className="flex mb-3"
                onClick={() =>
                  transferPlayback([playbackState.device.id.split(' ')])
                }
              >
                <div className="w-[40px] mr-2">
                  <img
                    src="https://open.spotifycdn.com/cdn/images/device-picker-equaliser-animation.946e7243.webp"
                    alt="img"
                    className="max-w-full"
                  />
                </div>
                <div>
                  <h1 className="title text-lg break-keep">Current device</h1>
                  <p className="text-green text-xs">{device.name}</p>
                </div>
              </div>
              <h1 className="title text-base">Select device</h1>
            </div>
          ) : null
        )}
        {availableDevices.devices.map((device: Device, i: number) =>
          !device.is_active ? (
            <div key={i} className="mb-5 last:mb-0 cursor-pointer">
              <div
                className="flex mb-3 items-center"
                onClick={() => transferPlayback([playbackState.device.id])}
              >
                <div className=" mr-4">
                  <DevicesSVG color="white" size={30} />
                </div>

                <p className="text-white text-sm">{device.name}</p>
              </div>
            </div>
          ) : null
        )}
      </div>
    </motion.div>
  )
}
