'use client'

import FilterSection from './FilterSection'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useQueryString } from '@/hooks/useQueryString'
import { OptionType, ParamKey } from '@/types/filter.type'
import { useUpdateURL } from '@/hooks/useUpdateURL'

type CheckboxFilterProps = {
   className?: string
   header: string
   options: OptionType[]
   paramKey: ParamKey
   multiple?: boolean
   specKey?: string // slug của spec (VD: ram, resolution)
   onChecked?: () => void
}

export default function CheckboxFilter({
   className,
   header,
   options,
   paramKey,
   multiple = false,
   specKey,
   onChecked
}: CheckboxFilterProps) {
   const queryString = useQueryString()
   const { updateURL } = useUpdateURL()

   const rawValue = queryString[paramKey]

   /* ================= PARSE ================= */

   const selectedValues = rawValue
      ? rawValue
           .split(',')
           .map((v) => v.trim())
           .filter(Boolean)
      : []

   const selectedPairs =
      paramKey === 'specs' && rawValue
         ? rawValue
              .split(',')
              .map((item) => {
                 const [k, v] = item.split(':')
                 return {
                    key: k?.trim(),
                    value: v?.trim()
                 }
              })
              .filter((p) => p.key && p.value)
         : []

   /* ================= HELPERS ================= */

   const unique = (arr: string[]) => [...new Set(arr)]

   const buildQuery = (arr: string[]) => (arr.length ? arr.join(',') : undefined)

   /* ================= HANDLE ================= */

   const handleCheckedChange = (checked: CheckedState, option: OptionType) => {
      const isChecked = checked === true
      const value = String(option.value)

      /* ===== SPECS ===== */
      if (paramKey === 'specs' && specKey) {
         let next = [...selectedPairs]

         if (isChecked) {
            // chỉ chọn 1 value / spec
            next = next.filter((p) => p.key !== specKey)
            next.push({ key: specKey, value })
         } else {
            next = next.filter((p) => !(p.key === specKey && p.value === value))
         }

         const query = next.map((p) => `${p.key}:${p.value}`).join(',')

         updateURL(paramKey, query || undefined)
         return
      }

      /* ===== NORMAL FILTER ===== */

      if (multiple) {
         const next = isChecked
            ? unique([...selectedValues, value])
            : selectedValues.filter((v) => v !== value)

         updateURL(paramKey, buildQuery(next))
      } else {
         if (isChecked) {
            updateURL(paramKey, value)
         } else {
            updateURL(paramKey, undefined)
         }
      }
   }

   /* ================= RENDER ================= */

   return (
      <FilterSection header={header} className={className}>
         <div className='space-y-2 text-sm'>
            {options?.map((option) => {
               const value = String(option.value)

               const isChecked =
                  paramKey === 'specs' && specKey
                     ? selectedPairs.some((p) => p.key === specKey && p.value === value)
                     : selectedValues.includes(value)

               return (
                  <div key={value} className='flex items-center gap-2 py-1'>
                     <Checkbox
                        id={`${paramKey}-${value}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                           onChecked?.()
                           handleCheckedChange(checked, option)
                        }}
                     />

                     <Label htmlFor={`${paramKey}-${value}`} className='leading-snug'>
                        {option.label}
                     </Label>
                  </div>
               )
            })}
         </div>
      </FilterSection>
   )
}
