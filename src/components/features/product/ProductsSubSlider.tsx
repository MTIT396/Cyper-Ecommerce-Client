import type { Swiper as SwiperType } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper/modules'

import Image from 'next/image'

import 'swiper/css'

interface ProductsSubSliderProps {
   productImages: string[]
   activeSlide: number
   onNavigate: (index: number) => void
   onSwiper?: (swiper: SwiperType) => void
}

export default function ProductsSubSlider({
   productImages,
   activeSlide,
   onNavigate,
   onSwiper
}: ProductsSubSliderProps) {
   return (
      <div className='mx-auto w-full max-w-[520px] overflow-hidden'>
         <Swiper
            modules={[FreeMode, Navigation]}
            freeMode={{
               enabled: true,
               momentum: true,
               momentumRatio: 0.35
            }}
            watchSlidesProgress
            navigation
            speed={500}
            spaceBetween={12}
            slidesPerView={4}
            breakpoints={{
               0: {
                  slidesPerView: 3.5
               },
               640: {
                  slidesPerView: 4
               },
               768: {
                  slidesPerView: 5
               }
            }}
            onSwiper={onSwiper}
            className='!overflow-visible'
         >
            {productImages.map((image, index) => {
               const isActive = activeSlide === index

               return (
                  <SwiperSlide key={index}>
                     <button
                        type='button'
                        onClick={() => onNavigate(index)}
                        aria-label={`Go to image ${index + 1}`}
                        className={`group relative w-24 overflow-hidden rounded-xl border-2 bg-white transition-all duration-300 ${
                           isActive
                              ? 'border-dark-gray shadow-lg shadow-black/10'
                              : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
                        }`}
                     >
                        {/* Thumbnail */}
                        <div className='relative h-[84px] w-full overflow-hidden rounded-2xl bg-white sm:h-[92px]'>
                           <Image
                              fill
                              src={image}
                              alt={`Thumbnail ${index + 1}`}
                              sizes='120px'
                              unoptimized
                              draggable={false}
                              className={`object-contain p-2.5 transition-all duration-300 ${
                                 isActive
                                    ? 'scale-100 opacity-100'
                                    : 'scale-95 opacity-70 group-hover:scale-100 group-hover:opacity-100'
                              }`}
                           />
                        </div>
                     </button>
                  </SwiperSlide>
               )
            })}
         </Swiper>
      </div>
   )
}
