import { cn } from '@/lib/utils'
import React from 'react'

type InfoCardProps = {
   className?: string
   title: string
   children: React.ReactNode
}

const InfoCard = ({ className, title, children }: InfoCardProps) => {
   return (
      <div className='rounded-md border p-6 shadow-sm'>
         <h1 className='border-b pb-2 text-2xl font-bold'>{title}</h1>
         <div className={cn('mt-4 space-y-3', className)}>{children}</div>
      </div>
   )
}

export default InfoCard
