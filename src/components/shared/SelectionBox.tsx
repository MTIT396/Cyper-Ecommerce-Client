import { OptionType } from '@/types/filter.type'
import { Select, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select'
import { SearchIcon } from 'lucide-react'
import { Input } from '../ui/input'
import { useEffect, useState } from 'react'
import useDebounce from '@/hooks/useDebounce'

type SelectionBoxProps = {
   value?: string
   header?: string
   className?: string
   options: OptionType[]
   placeholder?: string
   onValueChange?: (value: string) => void
   onOpenChange?: (open: boolean) => void
   disabled?: boolean
   searchMode?: boolean
   children: React.ReactNode
}

const SelectionBox = ({
   value,
   header = 'Lựa chọn',
   className = '',
   options,
   onValueChange,
   onOpenChange,
   disabled = false,
   searchMode = true,
   children
}: SelectionBoxProps) => {
   const handleValueChange = (value: string) => {
      onValueChange?.(value)
   }

   // Search options
   const [searchTerm, setSearchTerm] = useState('')
   const [filteredOptions, setFilteredOptions] = useState<OptionType[]>([])

   const keywords = useDebounce(searchTerm, 500).trim()
   useEffect(() => {
      if (keywords === '') {
         setFilteredOptions(options)
      } else {
         const filtered = options.filter((option) =>
            option.label.toLowerCase().includes(keywords.toLowerCase())
         )

         // keep value if not match
         const selectedOption = options.find((option) => option.value === value)
         const alreadyIncluded = filtered.some((option) => option.value === value)

         if (selectedOption && !alreadyIncluded) {
            setFilteredOptions([selectedOption, ...filtered])
         } else {
            setFilteredOptions(filtered)
         }
      }
   }, [keywords, options, value])

   return (
      <div className={className}>
         {header && <div className='py-2 text-left text-sm font-semibold'>{header}</div>}
         <Select
            value={value}
            onValueChange={handleValueChange}
            onOpenChange={onOpenChange}
            disabled={disabled}
         >
            {children}
            <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
               {searchMode && (
                  <>
                     <div className='mb-2 border-b p-2'>
                        <div className='border-extra-gray flex items-center rounded-full border px-3 py-1.5'>
                           <SearchIcon size={16} className='text-extra-gray' />
                           <Input
                              type='text'
                              placeholder='Search...'
                              onKeyDown={(e) => e.stopPropagation()}
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className='h-auto border-0 bg-transparent p-0 pl-2 text-sm shadow-none focus-visible:ring-0'
                           />
                        </div>
                     </div>
                     {filteredOptions.length === 0 && (
                        <div className='text-extra-gray mt-2 p-4 text-center text-sm'>
                           Không tìm thấy kết quả nào
                        </div>
                     )}
                  </>
               )}
               <SelectGroup className='max-h-60'>
                  {filteredOptions.map((option) => (
                     <SelectItem key={option.value} value={option.value}>
                        <span>{option.label}</span>
                     </SelectItem>
                  ))}
               </SelectGroup>
            </SelectContent>
         </Select>
      </div>
   )
}

export default SelectionBox
