'use client'

import React from 'react'

import { cn } from '@/lib/utils'

import { Label } from '../ui/label'
import { Badge } from '../ui/badge'
import { RadioGroupItem } from '../ui/radio-group'

import { CircleCheckBig } from 'lucide-react'

type RadioWrapperProps = {
   disabled?: boolean
   id: string
   selectedValue: string
   value: string
   children: React.ReactNode
   className?: string
   onValueChange: (value: string) => void
}

const RadioWrapper = ({
   disabled,
   id,
   selectedValue,
   value,
   onValueChange,
   children,
   className
}: RadioWrapperProps) => {
   const isChecked = id === selectedValue

   return (
      <div
         className={cn(
            'group relative w-full overflow-hidden rounded-2xl border bg-white transition-all duration-300',
            isChecked
               ? [
                    'border-primary/40',
                    'bg-gradient-to-br from-zinc-50 via-white to-zinc-100',
                    'shadow-[0_6px_24px_rgba(0,0,0,0.06)]',
                    'ring-primary/20 ring-[1.5px]'
                 ]
               : [
                    'border-zinc-200',
                    'hover:border-primary/30',
                    'hover:shadow-[0_4px_18px_rgba(0,0,0,0.05)]'
                 ],
            disabled && 'cursor-not-allowed opacity-60 hover:border-zinc-200 hover:shadow-none',
            className
         )}
      >
         {/* Checked Badge */}
         {isChecked && (
            <div className='absolute top-3 right-3 z-10'>
               <div className='bg-primary flex size-6 items-center justify-center rounded-full shadow-sm'>
                  <CircleCheckBig className='size-3.5 text-white' />
               </div>
            </div>
         )}

         <Label
            htmlFor={id}
            className={cn(
               'flex w-full items-center gap-4 p-4 sm:p-5',
               disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            )}
         >
            {/* Radio */}
            <div className='pt-0.5'>
               <RadioGroupItem
                  id={id}
                  value={value}
                  disabled={disabled}
                  checked={isChecked}
                  onClick={() => onValueChange(value)}
                  className={cn(
                     'size-4 border-2 transition-all duration-200',
                     isChecked ? 'border-primary' : 'border-zinc-400'
                  )}
               />
            </div>

            {/* Content */}
            <div className='min-w-0 flex-1'>{children}</div>

            {/* Disabled Badge */}
            {disabled && (
               <Badge
                  variant='destructive'
                  className='shrink-0 rounded-full px-2 py-1 text-[11px] font-medium'
               >
                  Chưa hỗ trợ
               </Badge>
            )}
         </Label>
      </div>
   )
}

export default RadioWrapper
