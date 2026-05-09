import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
import { Loader2, SearchIcon, XIcon } from 'lucide-react'

export interface SearchProps {
   className?: string
   placeholder?: string
   defaultValue?: string
   value?: string
   onChange?: (value: string) => void
   onSearch?: (value: string) => void
   onFocus?: () => void
   onClear?: () => void
   showClearButton?: boolean
   debounceTime?: number
   disabled?: boolean
   size?: 'sm' | 'md' | 'lg'
   loading?: boolean
   autoFocus?: boolean
   icon?: React.ReactNode
   iconPosition?: 'left' | 'right'
}

export interface SearchRef {
   focus: () => void
   blur: () => void
}

const Search = forwardRef<SearchRef, SearchProps>(
   (
      {
         className,
         placeholder = 'Search...',
         defaultValue = '',
         value: controlledValue,
         onChange,
         onSearch,
         onClear,
         onFocus,
         showClearButton = true,
         debounceTime = 0,
         disabled = false,
         loading = false,
         autoFocus = false,
         icon = <SearchIcon className='text-extra-gray h-4 w-4' />,
         iconPosition = 'left'
      },
      ref
   ) => {
      const inputRef = useRef<HTMLInputElement>(null)
      const debounceRef = useRef<NodeJS.Timeout | null>(null)
      const [internalValue, setInternalValue] = useState(defaultValue)

      const isControlled = controlledValue !== undefined
      const value = isControlled ? controlledValue : internalValue

      useImperativeHandle(ref, () => ({
         focus: () => inputRef.current?.focus(),
         blur: () => inputRef.current?.blur()
      }))

      const triggerChange = (val: string) => {
         if (debounceRef.current) clearTimeout(debounceRef.current)

         if (debounceTime > 0) {
            debounceRef.current = setTimeout(() => {
               onChange?.(val)
            }, debounceTime)
         } else {
            onChange?.(val)
         }
      }

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const val = e.target.value
         if (!isControlled) setInternalValue(val)
         triggerChange(val)
      }

      const handleSearch = () => {
         if (debounceRef.current) clearTimeout(debounceRef.current)
         onSearch?.(value)
         inputRef.current?.blur()
      }

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
         if (e.key === 'Enter') {
            e.preventDefault()
            handleSearch()
         }
      }

      const handleClear = () => {
         if (!isControlled) setInternalValue('')
         onChange?.('')
         onClear?.()
         inputRef.current?.focus()
      }

      const showClear = showClearButton && value.length > 0 && !disabled

      return (
         <InputGroup className={className}>
            {iconPosition === 'left' && (
               <InputGroupAddon onClick={handleSearch}>
                  {loading ? <Loader2 className='animate-spin' /> : icon}
               </InputGroupAddon>
            )}

            <InputGroupInput
               ref={inputRef}
               value={value}
               onChange={handleChange}
               onKeyDown={handleKeyDown}
               placeholder={placeholder}
               disabled={disabled}
               autoFocus={autoFocus}
               onFocus={onFocus}
            />

            {showClear && (
               <InputGroupAddon onClick={handleClear} align='inline-end'>
                  <XIcon className='hover:text-dark-gray h-4 w-4 cursor-pointer transition' />
               </InputGroupAddon>
            )}
         </InputGroup>
      )
   }
)

Search.displayName = 'Search'
export default Search
