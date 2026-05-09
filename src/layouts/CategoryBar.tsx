'use client'
import Container from '@/components/Container'
import SwiperCategoryBar from '@/components/swipers/SwiperCategoryBar'
import { CategoriesList } from '@/constants/constants'
import Link from 'next/link'
import React from 'react'

const CategoryBar = () => {
   return (
      <div className='bg-dark-gray font-mono'>
         <Container>
            <div className='hidden grid-cols-7 divide-x divide-white/90 py-2 xl:grid'>
               {CategoriesList.map((cat) => (
                  <Link
                     key={cat.id}
                     href={`/catalog/${cat.slug}`}
                     className='flex h-8 cursor-pointer items-center justify-center gap-2 text-sm text-nowrap text-white/60 transition last:pr-0 hover:text-white'
                  >
                     <cat.icon size={20} />
                     {cat.name}
                  </Link>
               ))}
            </div>

            <SwiperCategoryBar />
         </Container>
      </div>
   )
}

export default CategoryBar
