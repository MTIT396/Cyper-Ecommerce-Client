// StatRow.tsx
import { cn } from '@/lib/utils'
import React from 'react'

type StatRowProps = {
   label: string
   content: React.ReactNode
   className?: string
   labelClassName?: string
   contentClassName?: string
   highlight?: boolean
}

const StatRow = ({
   label,
   content,
   className,
   labelClassName,
   contentClassName,
   highlight = false
}: StatRowProps) => {
   return (
      <div
         className={cn(
            'flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white px-4 py-3 transition-all duration-300',
            highlight && 'border-primary/20 bg-primary/5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]',
            className
         )}
      >
         {/* Label */}
         <span
            className={cn(
               'text-sm font-medium text-zinc-500 sm:text-[15px]',
               highlight && 'text-zinc-700',
               labelClassName
            )}
         >
            {label}
         </span>

         {/* Value */}
         <span
            className={cn(
               'text-right text-base font-semibold tracking-tight text-zinc-900 tabular-nums sm:text-lg',
               highlight && 'text-primary text-lg sm:text-xl',
               contentClassName
            )}
         >
            {content}
         </span>
      </div>
   )
}

export default StatRow
