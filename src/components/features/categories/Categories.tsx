import React from 'react'
import Container from '@/components/Container'
import { CategoriesList } from '@/constants/constants'
import CategoryItem from './CategoryItem'

const Categories = () => {
   return (
      <div className='bg-zinc-50'>
         <Container className='py-20'>
            <div className='mb-10 flex w-full items-center justify-between'>
               <h1 className='text-2xl font-semibold'>Khám phá Danh mục</h1>
            </div>
            <div className='grid grid-cols-6 gap-8'>
               {CategoriesList.map((cat) => (
                  <CategoryItem key={cat.id} icon={cat.icon} label={cat.name} />
               ))}
            </div>
         </Container>
      </div>
   )
}

export default Categories
