import { cn } from '@/lib/utils'
import React from 'react'

type ContainerProps = {
   className?: string
   children: React.ReactNode
}

const Container = ({ className, children }: ContainerProps) => {
   return (
      <div
         className={cn(`mx-auto w-full max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10`, className)}
      >
         {children}
      </div>
   )
}

export default Container
