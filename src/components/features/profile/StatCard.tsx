import React from 'react'

import { cn } from '@/lib/utils'

interface StatCardProps {
   stat?: number | string
   title?: string
   icon?: React.ComponentType<{
      className?: string
   }>
   className?: string
   highlight?: boolean
}

const StatCard = ({ stat, title, icon: Icon, className, highlight = false }: StatCardProps) => {
   return (
      <div
         className={cn(
            'group relative overflow-hidden rounded-3xl border bg-white p-5 transition-all duration-300',
            'min-w-[170px]',
            'hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]',
            highlight
               ? 'border-primary/20 from-primary/5 to-primary/5 bg-gradient-to-br via-white shadow-[0_8px_30px_rgba(0,0,0,0.05)]'
               : 'border-zinc-200 hover:border-zinc-300',
            className
         )}
      >
         {/* Background Glow */}
         <div
            className={cn(
               'absolute -top-10 -right-10 size-28 rounded-full blur-3xl transition-opacity duration-300',
               highlight
                  ? 'bg-primary/10 opacity-100'
                  : 'bg-zinc-200/40 opacity-0 group-hover:opacity-100'
            )}
         />

         {/* Content */}
         <div className='relative z-10'>
            {/* Header */}
            <div className='flex items-center gap-3'>
               {Icon && (
                  <div
                     className={cn(
                        'flex size-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-300',
                        highlight
                           ? 'bg-primary/10 text-primary'
                           : 'bg-zinc-100 text-zinc-700 group-hover:bg-zinc-200'
                     )}
                  >
                     <Icon className='size-5' />
                  </div>
               )}

               <div className='min-w-0'>
                  <p className='text-sm font-medium text-zinc-500'>{title}</p>
               </div>
            </div>

            {/* Value */}
            <div className='mt-2.5'>
               <h3
                  className={cn(
                     'truncate text-xl font-bold tracking-tight text-zinc-900 tabular-nums sm:text-2xl',
                     highlight && 'text-primary'
                  )}
               >
                  {stat}
               </h3>
            </div>
         </div>
      </div>
   )
}

export default StatCard
