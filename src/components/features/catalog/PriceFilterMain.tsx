'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useQueryString } from '@/hooks/useQueryString'
import { useUpdateURL } from '@/hooks/useUpdateURL'
import { OptionType, PriceOptionType, URLParams } from '@/types/filter.type'
import { CheckedState } from '@radix-ui/react-checkbox'

export default function PriceFilterMain({ options }: { options: PriceOptionType[] }) {
   const { price }: URLParams = useQueryString()
   const { updateURL } = useUpdateURL()

   const handleCheckedChange = (checked: CheckedState, option: OptionType) => {
      if (checked) {
         updateURL('price', option.value)
      } else {
         updateURL('price', '', true)
      }
   }

   return (
      <div className='space-y-2 text-sm'>
         {options.map((opt) => (
            <div key={opt.value} className='flex items-center gap-2 py-1'>
               <Checkbox
                  id={opt.value}
                  checked={price === opt.value ? true : false}
                  onCheckedChange={(check) => handleCheckedChange(check, opt)}
               />
               <Label htmlFor={opt.label}>{opt.label}</Label>
            </div>
         ))}
      </div>
   )
}
