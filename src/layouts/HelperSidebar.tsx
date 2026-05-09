'use client'

import Button from '@/components/shared/Button'
import { HeadsetIcon, ShieldCheckIcon, UserRoundPlusIcon } from 'lucide-react'

export default function HelperSidebar() {
   return (
      <div className='flex flex-col items-center space-y-2'>
         <Button
            variant='outline'
            className='h-[40px] w-[40px] !rounded-full border-0 bg-gray-100 !p-0 hover:bg-gray-200'
         >
            <UserRoundPlusIcon size={20} fill='#111' />
         </Button>

         <Button
            variant='outline'
            className='h-[40px] w-[40px] !rounded-full border-0 bg-gray-100 !p-0 hover:bg-gray-200'
         >
            <ShieldCheckIcon size={20} color='white' fill='#111' />
         </Button>

         <div className='overflow-hidden rounded-md bg-gray-100 hover:cursor-pointer'>
            <div className='text-primary transtion flex flex-col items-center gap-1 p-1.5 text-[10px] duration-300 hover:bg-gray-200'>
               <UserRoundPlusIcon size={20} className='text-dark-gray' />
               <div>Góp ý</div>
            </div>
            <div className='text-primary transtion flex flex-col items-center gap-1 p-1.5 text-[10px] duration-300 hover:bg-gray-200'>
               <HeadsetIcon size={20} className='text-dark-gray' />
               <div>Hỗ trợ</div>
            </div>
         </div>
      </div>
   )
}
