import { cn } from '@/lib/utils'
import React from 'react'

const BodyContent = ({
   children,
   className
}: {
   children: React.ReactNode
   className?: string
}) => {
   return <div className={cn('py-40', className)}>{children}</div>
}

export default BodyContent
