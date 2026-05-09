import { cn } from '@/lib/utils'
import React from 'react'

type InfoCardProps = {
   className?: string
   title: string
   children: React.ReactNode
}

const InfoCard = ({ className, title, children }: InfoCardProps) => {
   return (
      <div className={cn('rounded-md border p-6 shadow-sm', className)}>
         <h1 className='border-b pb-2 text-2xl font-bold'>{title}</h1>
         <div className='mt-4 space-y-2.5'>{children}</div>
      </div>
   )
}

export default InfoCard
