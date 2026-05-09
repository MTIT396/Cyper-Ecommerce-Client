import type { Swiper as SwiperType } from 'swiper'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import '@/styles/swiper.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'
import ProductsSubSlider from './ProductsSubSlider'
import ModalViewProduct from './ModalViewProduct'

interface ProductsImageSliderProps {
   productImages: string[]
   activeSlide: number
   setActiveSlide: (index: number) => void
}

export default function ProductsImageSlider({
   activeSlide,
   setActiveSlide,
   productImages
}: ProductsImageSliderProps) {
   const [loaded, setLoaded] = useState<boolean>(false)
   const swiperRef = useRef<SwiperType | null>(null)
   const [isOpen, setIsOpen] = useState<boolean>(false)
   const [modalActiveIndex, setModalActiveIndex] = useState<number>(0)

   const handleSelected = (index: number) => {
      setActiveSlide(index)
      setModalActiveIndex(index)
      setIsOpen(true)
   }

   useEffect(() => {
      if (!swiperRef.current) return
      if (swiperRef.current.activeIndex !== activeSlide) {
         swiperRef.current.slideTo(activeSlide)
      }
   }, [activeSlide])

   return (
      <div className='grid grid-cols-[80px_1fr] gap-3'>
         {/* Sub Slider -  thumbnail column  */}
         <ProductsSubSlider
            productImages={productImages}
            activeSlide={activeSlide}
            onNavigate={(i: number) => {
               swiperRef.current?.slideTo(i)
               setActiveSlide(i)
            }}
         />

         {/* Swiper main */}
         <div className='min-w-0 p-6'>
            <Swiper
               modules={[Navigation, Pagination]}
               spaceBetween={0}
               slidesPerView={1}
               navigation
               onSwiper={(swiper) => (swiperRef.current = swiper)}
               onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            >
               {productImages.map((image, index) => (
                  <SwiperSlide key={index} className='p-2'>
                     <div
                        className='relative mx-auto flex h-[480px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-white p-2'
                        onClick={() => handleSelected(index)}
                     >
                        {!loaded && (
                           <div className='absolute inset-0 animate-pulse rounded-lg bg-gray-200' />
                        )}
                        <Image
                           width={400}
                           height={400}
                           src={image}
                           loading='lazy'
                           alt={`product-${index}`}
                           onLoad={() => setLoaded(true)}
                           className={`h-full w-full object-contain transition-opacity duration-500 ${
                              loaded ? 'opacity-100' : 'opacity-0'
                           }`}
                           unoptimized
                        />
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>

         {/* Modal Preview */}
         <ModalViewProduct
            isOpen={isOpen}
            productImages={productImages}
            activeIndex={modalActiveIndex}
            activeSlide={activeSlide}
            modalActiveIndex={modalActiveIndex}
            onOpen={setIsOpen}
            onModalActiveIndex={setModalActiveIndex}
         />
      </div>
   )
}
