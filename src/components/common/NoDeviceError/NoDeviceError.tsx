import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppDispatch } from 'redux/app/hooks'
import { setDeviceError } from 'redux/slices/spotifySlice'
interface Props {
  show: boolean
  setShow: (value: boolean) => void
}

export const NoDeviceError = ({ show, setShow }: Props) => {
  const modalBgRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (modalBgRef.current && e.target === modalBgRef.current) {
        dispatch(setDeviceError(false))
        setShow(false)
      }
    }

    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  const variantsBG = {
    open: { opacity: 1, display: 'block' },
    closed: { opacity: 0, transitionEnd: { display: 'none' } },
  }
  const variantsModal = {
    open: { opacity: 1, y: '0', display: 'flex' },
    closed: { opacity: 0, y: '-5%', transitionEnd: { display: 'none' } },
  }
  show
    ? (document.body.style.overflowY = 'hidden')
    : (document.body.style.overflowY = 'visible')

  return (
    <motion.div
      ref={modalBgRef}
      animate={show ? 'open' : 'closed'}
      initial={{ display: 'none' }}
      transition={{ duration: 0.1 }}
      variants={variantsBG}
      className="fixed w-[100vw] bg-[#18181880] h-[100vh] z-[600] overflow-y-hidden"
    >
      <motion.div
        animate={show ? 'open' : 'closed'}
        transition={{ duration: 0.1 }}
        initial={{ display: 'none', y: '5%' }}
        variants={variantsModal}
        className="fixed lg:w-1/3 w-2/3 h-[150px] p-4 rounded-lg bg-[#202020] z-[600] top-[20vh] lg:left-[33.333%] left-[16.6666%] flex items-center"
      >
        <h1 className="text-white text-center text-xl">
          To connect player: open{' '}
          <span className="text-green">Spotify app</span>, click available
          devices and choose <span className="text-green">My React app</span>
        </h1>
      </motion.div>
    </motion.div>
  )
}
