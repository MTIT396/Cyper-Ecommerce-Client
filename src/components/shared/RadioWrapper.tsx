import React from 'react'
import { RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
import { CircleCheckBig } from 'lucide-react'
import { Badge } from '../ui/badge'

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
            'relative w-full rounded-xl border p-0 transition-all duration-200 ease-in-out',
            isChecked
               ? 'ring-primary from-extra-gray/10 via-extra-gray/5 scale-[1.02] bg-linear-to-br to-transparent shadow-[0_4px_12px_rgba(100,100,100,0.15)] ring-[1.5px]'
               : 'border-outline-border hover:border-primary/40 bg-white hover:scale-[1.01] hover:shadow-[0_2px_8px_rgba(100,100,100,0.08)]',
            disabled ? 'cursor-not-allowed opacity-50' : ''
         )}
      >
         {isChecked && (
            <div className='bg-primary absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full shadow-sm'>
               <CircleCheckBig className='size-3 text-white' />
            </div>
         )}

         <Label
            htmlFor={id}
            className={cn(
               'flex items-center justify-between p-4',
               disabled ? 'cursor-not-allowed' : 'cursor-pointer',
               className
            )}
         >
            <div className='flex w-full items-center gap-x-3'>
               <RadioGroupItem
                  id={id}
                  value={value}
                  disabled={disabled}
                  checked={isChecked}
                  className='border-dark-gray size-4 rounded-full border-2'
                  onClick={() => onValueChange(value)}
               />
               {children}
            </div>
            {disabled && <Badge variant='destructive'>Chưa hỗ trợ</Badge>}
         </Label>
      </div>
   )
}

export default RadioWrapper
