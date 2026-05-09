import { cn } from '@/lib/utils'
import React from 'react'

interface CountCardProps {
   count?: number | string
   title?: string
   icon?: React.ComponentType<{ className?: string }>
   className?: string
}

const CountCard = ({ count, title, icon: Icon, className = '' }: CountCardProps) => {
   return (
      <div className={cn('rounded-2xl border bg-zinc-50 px-6 py-4', className)}>
         <div className='flex items-center gap-4'>
            {Icon && (
               <div className='rounded-full bg-white p-3 shadow-sm'>
                  <Icon className='size-6 text-zinc-700' />
               </div>
            )}

            <div>
               <p className='text-extra-gray'>{title}</p>

               <h3 className='mt-1 text-2xl font-bold'>{count}</h3>
            </div>
         </div>
      </div>
   )
}

export default CountCard
