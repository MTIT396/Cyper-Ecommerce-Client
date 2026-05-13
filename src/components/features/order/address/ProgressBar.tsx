'use client'

import { cn } from '@/lib/utils'

import { BadgeDollarSign, MapPin, Truck } from 'lucide-react'

import React from 'react'

type Progress = {
   step: number
   icon: React.ReactNode
   label: string
}

const progresses: Progress[] = [
   {
      step: 1,
      icon: <MapPin size={18} />,
      label: 'Địa chỉ'
   },
   {
      step: 2,
      icon: <Truck size={18} />,
      label: 'Vận chuyển'
   },
   {
      step: 3,
      icon: <BadgeDollarSign size={18} />,
      label: 'Thanh toán'
   }
]

const ProgressBar = ({ className, step }: { className?: string; step: number }) => {
   return (
      <div className={cn('w-full', className)}>
         <div className='relative'>
            {/* Line */}
            <div className='absolute top-5 right-0 left-0 border-t border-dashed border-zinc-300 sm:top-6' />

            {/* Items */}
            <div className='relative flex items-start justify-between gap-2'>
               {progresses.map((progress) => (
                  <ProgressItem
                     key={progress.step}
                     progress={progress}
                     isActive={progress.step <= step}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}

export default ProgressBar

type ProgressItemProps = {
   progress: Progress
   isActive: boolean
}

const ProgressItem = ({ progress, isActive }: ProgressItemProps) => {
   return (
      <div className='flex flex-1 justify-center'>
         <div className='flex flex-col items-center text-center'>
            {/* Icon */}
            <div
               className={cn(
                  'relative z-10 flex size-10 items-center justify-center rounded-full border bg-white transition-all duration-300 sm:size-12',
                  isActive
                     ? 'border-dark-gray text-primary shadow-sm'
                     : 'border-zinc-300 text-zinc-400'
               )}
            >
               {progress.icon}
            </div>

            {/* Text */}
            <div className='mt-2 space-y-0.5'>
               <p
                  className={cn(
                     'text-xs font-medium sm:text-sm',
                     isActive ? 'text-zinc-900' : 'text-zinc-400'
                  )}
               >
                  Bước {progress.step}
               </p>

               <p
                  className={cn(
                     'text-xs font-semibold sm:text-sm',
                     isActive ? 'text-zinc-900' : 'text-zinc-400'
                  )}
               >
                  {progress.label}
               </p>
            </div>
         </div>
      </div>
   )
}

export { ProgressItem }
