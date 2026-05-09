/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ColorItem } from '@/components/shared/ColorItem'
import { useQueryString } from '@/hooks/useQueryString'
import { useUpdateURL } from '@/hooks/useUpdateURL'
import { ColorOptionType, URLParams } from '@/types/filter.type'
import { useEffect, useState } from 'react'

export default function ColorFilter({ options }: { options: ColorOptionType[] }) {
   const { colors }: URLParams = useQueryString()
   const { updateURL } = useUpdateURL()

   const urlColors = colors?.split(',') ?? []

   const [selectedColors, setSelectedColors] = useState<string[]>(urlColors)

   /* sync state when URL changes */
   useEffect(() => {
      setSelectedColors(urlColors)
   }, [colors])

   /* update URL when user clicks */
   useEffect(() => {
      updateURL('colors', selectedColors)
   }, [selectedColors])

   const handleSelectedChange = (color: string) => {
      setSelectedColors((prev) =>
         prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
      )
   }
   return (
      <div className='grid grid-cols-1 gap-x-2 gap-y-6 px-2 py-3 text-sm sm:grid-cols-2'>
         {options.map((option) => (
            <ColorItem
               key={option.value}
               color={option}
               isSelected={selectedColors.includes(option.value)}
               onValueChange={handleSelectedChange}
            />
         ))}
      </div>
   )
}
