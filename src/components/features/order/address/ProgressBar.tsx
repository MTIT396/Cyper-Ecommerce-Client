import { cn } from '@/lib/utils'
import { BadgeDollarSign, MapPin, Truck } from 'lucide-react'
import React from 'react'

const progresses: Progress[] = [
   {
      step: 1,
      icon: <MapPin size={20} />,
      label: 'Địa chỉ giao hàng'
   },
   {
      step: 2,
      icon: <Truck size={20} />,
      label: 'Vận chuyển'
   },
   {
      step: 3,
      icon: <BadgeDollarSign size={20} />,
      label: 'Thanh toán'
   }
]

type Progress = {
   step: number
   icon: React.ReactNode
   label: string
}

const ProgressBar = ({ className, step }: { className?: string; step: number }) => {
   return (
      <div className={cn('flex justify-center py-4', className)}>
         <div className='relative w-full'>
            <div className='absolute inset-0 flex items-center'>
               <div className='w-full border-t-2 border-dotted border-gray-300'></div>
            </div>
            <div className='flex items-center justify-between'>
               {progresses.map((progress) => (
                  <ProgressItem
                     key={progress.step}
                     progress={progress}
                     isComplete={progress.step === step}
                  />
               ))}
            </div>
         </div>
      </div>
   )
}

export default ProgressBar

type ProressItemProps = {
   progress: Progress
   isComplete: boolean
}

export const ProgressItem = ({ progress, isComplete }: ProressItemProps) => {
   return (
      <div className='z-2 bg-white px-8'>
         <div className={`flex items-center gap-2 ${isComplete ? '' : 'opacity-20'}`}>
            <div className='bg-light-gray rounded-full border p-2'>{progress.icon}</div>
            <div className='font-semibold'>
               <div className='text-sm'>Bước {progress.step}</div>
               <div className='leading-6'>{progress.label}</div>
            </div>
         </div>
      </div>
   )
}
