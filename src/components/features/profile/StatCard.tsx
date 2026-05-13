import { cn } from '@/lib/utils'
import React from 'react'

interface StatCardProps {
   stat?: number | string
   title?: string
   icon?: React.ComponentType<{ className?: string }>
   className?: string
}

const StatCard = ({ stat, title, icon: Icon, className = '' }: StatCardProps) => {
   return (
      <div
         className={cn(
            'w-fit min-w-36 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-zinc-300 hover:bg-white',
            className
         )}
      >
         <div className='mb-2 flex items-center gap-2'>
            {Icon && <Icon className='size-5 text-zinc-700' />}
            <span className='text-extra-gray text-sm'>{title}</span>
         </div>

         <h3 className='inline-block pr-2 text-2xl font-bold text-zinc-900'>{stat}</h3>
      </div>
   )
}

export default StatCard
