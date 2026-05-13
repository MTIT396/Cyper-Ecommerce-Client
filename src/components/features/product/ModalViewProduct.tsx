import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { BsX, BsZoomIn, BsZoomOut } from 'react-icons/bs'
import { AnimatePresence, motion } from 'framer-motion'
import { Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { Position } from '@/types/slider.type'
import { SwiperSlide, Swiper } from 'swiper/react'
import Image from 'next/image'
import Button from '@/components/shared/Button'

type ModalViewProduct = {
   isOpen: boolean
   onOpen: Dispatch<SetStateAction<boolean>>
   activeSlide: number
   productImages: string[]
   activeIndex: number
   modalActiveIndex: number
   onModalActiveIndex: Dispatch<SetStateAction<number>>
}
const ModalViewProduct = ({
   isOpen,
   onOpen,
   activeSlide,
   productImages,
   modalActiveIndex,
   onModalActiveIndex
}: ModalViewProduct) => {
   const modalSwiperRef = useRef<SwiperType | null>(null)

   useEffect(() => {
      if (isOpen && modalSwiperRef.current) {
         modalSwiperRef.current.slideTo(activeSlide, 0)
         resetTransform()
      }
   }, [isOpen, activeSlide])

   const resetTransform = (): void => {
      setZoom(1)
      setPosition({ x: 0, y: 0 })
      setIsDragging(false)
   }

   // Zoom & drag
   const [zoom, setZoom] = useState<number>(1)
   const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
   const [isDragging, setIsDragging] = useState<boolean>(false)
   const dragStart = useRef<Position>({ x: 0, y: 0 })

   // Zoom bằng wheel
   const handleWheel = (e: React.WheelEvent<HTMLImageElement>): void => {
      e.preventDefault()
      const delta = e.deltaY < 0 ? 0.2 : -0.2
      setZoom((z) => {
         const newZoom = Math.min(4, Math.max(1, +(z + delta).toFixed(2)))
         if (newZoom === 1) setPosition({ x: 0, y: 0 })
         if (modalSwiperRef.current) {
            modalSwiperRef.current.allowTouchMove = newZoom === 1
         }
         return newZoom
      })
   }

   // Drag handlers
   const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>): void => {
      if (zoom > 1) {
         setIsDragging(true)
         dragStart.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
         }
      }
   }

   const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>): void => {
      if (isDragging) {
         setPosition({
            x: e.clientX - dragStart.current.x,
            y: e.clientY - dragStart.current.y
         })
      }
   }

   const handleMouseUp = (): void => {
      setIsDragging(false)
   }

   return (
      <AnimatePresence>
         {isOpen && (
            <>
               {/* Overlay */}
               <motion.div
                  className='fixed inset-0 z-60 bg-black/90'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
               />

               {/* Modal */}
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'tween', duration: 0.25 }}
                  className='fixed inset-0 z-70 flex flex-col items-center justify-center'
               >
                  <Swiper
                     modules={[Navigation, Pagination]}
                     spaceBetween={0}
                     slidesPerView={1}
                     navigation
                     onSwiper={(swiper) => (modalSwiperRef.current = swiper)}
                     onSlideChange={(s) => {
                        onModalActiveIndex(s.activeIndex)
                        resetTransform()
                     }}
                     className='w-full max-w-5xl'
                  >
                     {productImages.map((image, index) => (
                        <SwiperSlide key={index}>
                           <div className='flex h-screen w-full items-center justify-center rounded-xl'>
                              <Image
                                 width={600}
                                 height={600}
                                 src={image}
                                 alt={`preview-${index}`}
                                 draggable={false}
                                 style={{
                                    transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                                    cursor:
                                       zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                                    transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                                 }}
                                 className='max-h-full max-w-full rounded-xl object-contain select-none'
                                 onWheel={handleWheel}
                                 onMouseDown={handleMouseDown}
                                 onMouseMove={handleMouseMove}
                                 onMouseUp={handleMouseUp}
                                 onMouseLeave={handleMouseUp}
                              />
                           </div>
                        </SwiperSlide>
                     ))}
                  </Swiper>

                  {/* Counter */}
                  <div className='absolute top-5 left-6 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white'>
                     {modalActiveIndex + 1} / {productImages.length}
                  </div>

                  {/* Controls */}
                  <div className='absolute top-5 right-6 flex items-center gap-3'>
                     <Button
                        onClick={() =>
                           setZoom((z) => {
                              const newZoom = Math.max(1, z - 0.2)
                              if (newZoom === 1) setPosition({ x: 0, y: 0 })
                              if (modalSwiperRef.current) {
                                 modalSwiperRef.current.allowTouchMove = newZoom === 1
                              }
                              return newZoom
                           })
                        }
                        className='size-fit rounded-full bg-white/20 p-4 transition hover:bg-white/40'
                        aria-label='Zoom out'
                     >
                        <BsZoomOut className='size-4 text-white' />
                     </Button>

                     <Button
                        onClick={() =>
                           setZoom((z) => {
                              const newZoom = Math.min(4, z + 0.2)
                              if (modalSwiperRef.current) {
                                 modalSwiperRef.current.allowTouchMove = newZoom === 1
                              }
                              return newZoom
                           })
                        }
                        className='size-fit rounded-full bg-white/20 p-4 transition hover:bg-white/40'
                        aria-label='Zoom in'
                     >
                        <BsZoomIn className='size-4 text-white' />
                     </Button>

                     <Button
                        onClick={() => {
                           onOpen(false)
                           resetTransform()
                        }}
                        className='size-fit rounded-full bg-white/20 p-4 transition hover:bg-white/40'
                        aria-label='Close'
                     >
                        <BsX className='size-4 text-white' />
                     </Button>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
   )
}

export default ModalViewProduct
