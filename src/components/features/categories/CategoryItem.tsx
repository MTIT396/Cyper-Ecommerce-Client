import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'

type CategoryItemProps = {
   item: { id: number; name: string; slug: string; icon: IconType; image: string }
}
const CategoryItem = ({ item }: CategoryItemProps) => {
   const Icon = item.icon
   return (
      <Link href={`/catalog/${item.slug}`}>
         <div className='bg-light-gray flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl px-8 py-6 transition hover:shadow'>
            <Icon size={28} />
            <p className='text-sm'>{item.name}</p>
         </div>
      </Link>
   )
}

export default CategoryItem
