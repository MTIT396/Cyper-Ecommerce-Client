'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { CategoriesList } from '@/constants/constants'
import Link from 'next/link'
const SwiperCategoryBar = () => {
   return (
      <Swiper
         breakpoints={{
            320: {
               slidesPerView: 2.5,
               spaceBetween: 16,
               slidesPerGroup: 2
            },
            640: {
               slidesPerView: 4,
               spaceBetween: 16,
               slidesPerGroup: 4
            },
            1024: {
               slidesPerView: 5,
               spaceBetween: 16,
               slidesPerGroup: 5
            },
            1280: {
               slidesPerView: 6,
               spaceBetween: 16,
               slidesPerGroup: 6
            }
         }}
         modules={[Navigation, Pagination, Scrollbar, A11y]}
         speed={600}
         grabCursor
         className='divided-x divide-white'
      >
         {CategoriesList.map((cat) => (
            <SwiperSlide key={cat.id}>
               <Link href={`/catalog/${cat.slug}`}>
                  <div className='font-secondary flex h-12 cursor-pointer items-center justify-center gap-2 text-sm text-nowrap text-white/60 transition hover:text-white xl:hidden'>
                     <span className='shrink-0'>
                        <cat.icon size={20} />
                     </span>
                     <span>{cat.name}</span>
                  </div>
               </Link>
            </SwiperSlide>
         ))}
      </Swiper>
   )
}

export default SwiperCategoryBar
