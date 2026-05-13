'use client'

import Search, { SearchRef } from './Search'
import SearchDropdown from './SearchDropdown'
import { useRouter } from 'next/navigation'
import { useQueryString } from '@/hooks/useQueryString'
import { useEffect, useRef, useState, useCallback } from 'react'
import useDebounce from '@/hooks/useDebounce'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useSearchHistoryStore } from '@/store/useSearchHistoryStore'

const TIME_CLOSE_QUERY = 5000

type SearchbarPopoverProps = {
   className?: string
}

const SearchbarPopover = ({ className }: SearchbarPopoverProps) => {
   const { query } = useQueryString()
   const [isOpen, setIsOpen] = useState(false)
   const [searchTerm, setSearchTerm] = useState('')

   const router = useRouter()
   const searchRef = useRef<SearchRef | null>(null)
   const { addSearch } = useSearchHistoryStore()

   const keyword = useDebounce(searchTerm.trim(), 500)

   // sync query from URL
   useEffect(() => {
      if (query) setSearchTerm(query as string)
   }, [query])

   // auto clear search term after 5s
   useEffect(() => {
      if (!query) return
      const timer = setTimeout(() => {
         setSearchTerm('')
         setIsOpen(false)
      }, TIME_CLOSE_QUERY)
      return () => clearTimeout(timer)
   }, [query])

   const handleChange = (value: string) => {
      setSearchTerm(value)
   }

   const handleSearch = (value: string) => {
      if (!value.trim()) return
      router.push(`/search?query=${encodeURIComponent(value)}`)
      setIsOpen(false)
      setSearchTerm(value)
      addSearch(value)
      searchRef.current?.blur()
   }

   const handleClose = useCallback(() => {
      setIsOpen(false)
      searchRef.current?.blur()
   }, [])

   // click outside logic
   const popoverRef = useRef<HTMLDivElement>(null)
   const triggerRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
         if (
            !popoverRef.current?.contains(e.target as Node) &&
            !triggerRef.current?.contains(e.target as Node)
         ) {
            setIsOpen(false)
         }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   }, [])

   return (
      <Popover open={isOpen}>
         <PopoverTrigger asChild>
            <div ref={triggerRef} className={className}>
               <Search
                  ref={searchRef}
                  value={searchTerm}
                  onFocus={() => setIsOpen(true)}
                  placeholder='Tìm kiếm...'
                  className='bg-extra-gray/10 h-12 w-full font-mono'
                  onChange={handleChange}
                  onSearch={handleSearch}
                  showClearButton
                  size='lg'
               />
            </div>
         </PopoverTrigger>

         <PopoverContent
            ref={popoverRef}
            className='w-[300px] p-0 duration-300 sm:w-[433px]'
            align='start'
            sideOffset={6}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
         >
            <SearchDropdown
               keyword={keyword}
               onClose={handleClose}
               onHistoryChange={handleSearch}
            />
         </PopoverContent>
      </Popover>
   )
}

export default SearchbarPopover
