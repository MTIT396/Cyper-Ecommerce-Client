import { ColorOptionType } from '@/types/filter.type'
import { Check } from 'lucide-react'
export function ColorItem({
   color,
   isSelected,
   onValueChange
}: {
   color: ColorOptionType
   isSelected: boolean
   onValueChange: (color: string) => void
}) {
   return (
      <div className='flex items-center gap-3'>
         <div
            key={color.hex_code}
            onClick={() => onValueChange(color.value)}
            className='group border-extra-gray relative z-2 size-8 cursor-pointer rounded-full border transition'
            style={{ backgroundColor: color.hex_code }}
         >
            <div
               className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out ${isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} `}
            >
               <Check
                  className={`size-4 text-black transition-transform duration-300 ease-in-out ${isSelected ? 'rotate-0' : '-rotate-45'} `}
               />
            </div>
         </div>
         <div>
            <span className='line-clamp-1 text-xs'>{color.label}</span>
            <span className='text-outline-border text-xs'>({color.count})</span>
         </div>
      </div>
   )
}
