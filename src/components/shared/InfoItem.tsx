import { cn } from '@/lib/utils'
import React from 'react'

type InfoItemProps = {
   className?: React.ReactNode
   label: string
   content: string
}

const InfoItem = ({ className, label, content }: InfoItemProps) => {
   return (
      <div className={cn('bg-bg-gray flex w-full flex-col gap-2 rounded-lg p-4', className)}>
         <span className='text-sm'>{label}</span>
         <span className='text-sm font-semibold'>{content}</span>
      </div>
   )
}

export default InfoItem
