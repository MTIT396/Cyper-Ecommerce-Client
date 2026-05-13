import { cn } from '@/lib/utils'
import React from 'react'

type InfoItemProps = {
   className?: React.ReactNode
   icon?: React.ComponentType<{ className?: string }>

   label: string
   info: string
}

const InfoItem = ({ className, icon: Icon, label, info }: InfoItemProps) => {
   return (
      <div className={cn('flex items-start gap-4', className)}>
         {Icon && (
            <div className='flex size-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-100'>
               <Icon className='size-5 text-zinc-700' />
            </div>
         )}

         <div className='min-w-0'>
            <h3 className='text-sm font-semibold text-zinc-900'>{label}</h3>

            <p className='mt-1 text-sm leading-6 text-zinc-500'>{info}</p>
         </div>
      </div>
   )
}

export default InfoItem
