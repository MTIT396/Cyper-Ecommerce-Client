import React from 'react'
import { IconType } from 'react-icons'

type CategoryItemProps = {
   icon: IconType
   label: string
}
const CategoryItem = ({ icon: Icon, label }: CategoryItemProps) => {
   return (
      <div className='flex flex-col items-center justify-center gap-3 rounded-xl bg-[#ededed] px-8 py-6'>
         <Icon size={28} />
         <p className='text-sm'>{label}</p>
      </div>
   )
}

export default CategoryItem
