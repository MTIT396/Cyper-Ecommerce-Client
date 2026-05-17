import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { BsX, BsZoomIn, BsZoomOut } from 'react-icons/bs'
import { AnimatePresence, motion } from 'framer-motion'
import { Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'

import { Position } from '@/types/slider.type'
import Button from '@/components/shared/Button'

type ModalViewProductProps = {
   isOpen: boolean
   onOpen: Dispatch<SetStateAction<boolean>>
   activeSlide: number
   productImages: string[]
   modalActiveIndex: number
   onModalActiveIndex: Dispatch<SetStateAction<number>>
}

const MIN_ZOOM = 1
const MAX_ZOOM = 4
const ZOOM_STEP = 0.2

const ModalViewProduct = ({
   isOpen,
   onOpen,
   activeSlide,
   productImages,
   modalActiveIndex,
   onModalActiveIndex
}: ModalViewProductProps) => {
   const modalSwiperRef = useRef<SwiperType | null>(null)

   const [zoom, setZoom] = useState<number>(1)
   const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
   const [isDragging, setIsDragging] = useState<boolean>(false)

   const dragStart = useRef<Position>({ x: 0, y: 0 })

   const resetTransform = (): void => {
      setZoom(1)
      setPosition({ x: 0, y: 0 })
      setIsDragging(false)

      if (modalSwiperRef.current) {
         modalSwiperRef.current.allowTouchMove = true
      }
   }

   useEffect(() => {
      if (!isOpen) return

      if (modalSwiperRef.current) {
         modalSwiperRef.current.slideTo(activeSlide, 0)
      }

      resetTransform()
   }, [isOpen, activeSlide])

   // Disable body scroll when modal open
   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = 'hidden'
      } else {
         document.body.style.overflow = ''
      }

      return () => {
         document.body.style.overflow = ''
      }
   }, [isOpen])

   const updateSwiperTouch = (currentZoom: number): void => {
      if (!modalSwiperRef.current) return

      modalSwiperRef.current.allowTouchMove = currentZoom === 1
   }

   const updateZoom = (type: 'in' | 'out'): void => {
      setZoom((prev) => {
         const nextZoom =
            type === 'in'
               ? Math.min(MAX_ZOOM, +(prev + ZOOM_STEP).toFixed(2))
               : Math.max(MIN_ZOOM, +(prev - ZOOM_STEP).toFixed(2))

         updateSwiperTouch(nextZoom)

         if (nextZoom === 1) {
            setPosition({ x: 0, y: 0 })
         }

         return nextZoom
      })
   }

   const handleWheel = (e: React.WheelEvent<HTMLImageElement>): void => {
      e.preventDefault()

      const isZoomIn = e.deltaY < 0

      setZoom((prev) => {
         const nextZoom = isZoomIn
            ? Math.min(MAX_ZOOM, +(prev + ZOOM_STEP).toFixed(2))
            : Math.max(MIN_ZOOM, +(prev - ZOOM_STEP).toFixed(2))

         updateSwiperTouch(nextZoom)

         if (nextZoom === 1) {
            setPosition({ x: 0, y: 0 })
         }

         return nextZoom
      })
   }

   const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>): void => {
      if (zoom <= 1) return

      setIsDragging(true)

      dragStart.current = {
         x: e.clientX - position.x,
         y: e.clientY - position.y
      }
   }

   const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>): void => {
      if (!isDragging) return

      setPosition({
         x: e.clientX - dragStart.current.x,
         y: e.clientY - dragStart.current.y
      })
   }

   const handleMouseUp = (): void => {
      setIsDragging(false)
   }

   const handleClose = (): void => {
      onOpen(false)
      resetTransform()
   }

   return (
      <AnimatePresence mode='wait'>
         {isOpen && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.25 }}
               className='fixed inset-0 z-[9999]'
            >
               {/* Overlay */}
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='absolute inset-0 bg-black/90 backdrop-blur-sm'
                  onClick={handleClose}
               />

               {/* Modal */}
               <motion.div
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{
                     type: 'spring',
                     stiffness: 260,
                     damping: 22
                  }}
                  className='relative flex h-screen w-full items-center justify-center'
               >
                  {/* Swiper */}
                  <Swiper
                     modules={[Navigation, Pagination]}
                     navigation
                     pagination={{ clickable: true }}
                     slidesPerView={1}
                     spaceBetween={0}
                     onSwiper={(swiper) => {
                        modalSwiperRef.current = swiper
                     }}
                     onSlideChange={(swiper) => {
                        onModalActiveIndex(swiper.activeIndex)
                        resetTransform()
                     }}
                     className='h-full w-full max-w-5xl'
                  >
                     {productImages.map((image, index) => (
                        <SwiperSlide key={index}>
                           <div className='flex h-screen w-full items-center justify-center px-4'>
                              <Image
                                 src={image}
                                 alt={`preview-${index}`}
                                 width={1200}
                                 height={1200}
                                 priority
                                 draggable={false}
                                 onWheel={handleWheel}
                                 onMouseDown={handleMouseDown}
                                 onMouseMove={handleMouseMove}
                                 onMouseUp={handleMouseUp}
                                 onMouseLeave={handleMouseUp}
                                 style={{
                                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                                    transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                                    cursor:
                                       zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                                    touchAction: zoom > 1 ? 'none' : 'pan-y'
                                 }}
                                 className='max-h-full max-w-full object-contain select-none'
                              />
                           </div>
                        </SwiperSlide>
                     ))}
                  </Swiper>

                  {/* Counter */}
                  <div className='absolute top-5 left-5 z-[10000] rounded-full bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-md'>
                     {modalActiveIndex + 1} / {productImages.length}
                  </div>

                  {/* Controls */}
                  <div className='absolute top-5 right-5 z-[10000] flex items-center gap-3'>
                     <Button
                        onClick={() => updateZoom('out')}
                        aria-label='Zoom out'
                        className='flex size-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/40 active:scale-95'
                     >
                        <BsZoomOut className='size-5 text-white' />
                     </Button>

                     <Button
                        onClick={() => updateZoom('in')}
                        aria-label='Zoom in'
                        className='flex size-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/40 active:scale-95'
                     >
                        <BsZoomIn className='size-5 text-white' />
                     </Button>

                     <Button
                        onClick={handleClose}
                        aria-label='Close modal'
                        className='flex size-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-red-500/80 active:scale-95'
                     >
                        <BsX className='size-6 text-white' />
                     </Button>
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   )
}

export default ModalViewProduct
