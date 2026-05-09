import { Color } from '@/types/product.type'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Check } from 'lucide-react'

export function TooltipColor({
   disabled,
   color,
   selectedColor,
   onChange
}: {
   disabled?: boolean
   color: Color
   selectedColor: string | null
   onChange: (color: string) => void
}) {
   if (disabled) return null

   const isSelected = selectedColor === color.name

   return (
      <Tooltip>
         <TooltipTrigger asChild>
            <div className='flex items-center gap-3'>
               <div
                  onClick={() => onChange(color.name)}
                  className={`border-extra-gray relative size-8 cursor-pointer rounded-full border transition-all duration-300 ease-out ${
                     isSelected ? 'ring-primary scale-100 ring-2 ring-offset-2' : 'scale-95'
                  } `}
                  style={{ backgroundColor: color.hex_code }}
               >
                  <div
                     className={`absolute inset-0 flex items-center justify-center ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} `}
                  >
                     <Check className='size-4 text-black' />
                  </div>
               </div>
            </div>
         </TooltipTrigger>
         <TooltipContent>{color.name}</TooltipContent>
      </Tooltip>
   )
}
