import React, { useMemo } from 'react'
import ProductSuggestItem from '../features/search-bar/ProductSuggestItem'
import { Frown, History, Search, X } from 'lucide-react'
import ProductSuggestSkeleton from '../features/search-bar/ProductSuggestSkeleton '
import { useProducts } from '@/hooks/useProductsQuery'
import Button from './Button'
import { useSearchHistoryStore } from '@/store/useSearchHistoryStore'

type SearchDropdownProps = {
   keyword: string
   onClose: () => void
   onHistoryChange: (value: string) => void
}

const LIMIT_PRODUCTS_FOR_SUGGESTIONS = 50
const DEFAULT_SUGGESTIONS_COUNT = 4
const KEYWORD_SUGGESTIONS_COUNT = 5

const SearchDropdown = ({ keyword, onClose, onHistoryChange }: SearchDropdownProps) => {
   const { data: products, isFetching } = useProducts({
      params: {
         type: 'featured',
         limit: LIMIT_PRODUCTS_FOR_SUGGESTIONS
      }
   })

   const { history, removeSearch } = useSearchHistoryStore()

   const suggestions = useMemo(() => {
      if (!products?.data) return []

      if (!keyword) return products.data.slice(0, DEFAULT_SUGGESTIONS_COUNT)

      const lower = keyword.toLowerCase()
      return products.data
         .filter((p) => p.name.toLowerCase().includes(lower))
         .slice(0, KEYWORD_SUGGESTIONS_COUNT)
   }, [keyword, products?.data])

   const suggestionTitle = keyword ? 'Đề xuất cho bạn' : 'Sản phẩm nổi bật'

   return (
      <div className='p-4'>
         {/* History */}
         {history.length > 0 && (
            <div className='mb-2 space-y-1.5'>
               <h1 className='mb-2 flex items-center gap-2 text-sm'>
                  <Search className='size-4' />
                  Tìm kiếm gần đây
               </h1>
               {history.map((item) => (
                  <div
                     key={item}
                     onClick={() => onHistoryChange(item)}
                     className='group hover:bg-light-gray flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 text-sm transition hover:underline'
                  >
                     <div className='flex items-center gap-2'>
                        <History className='size-4' />
                        <span>{item}</span>
                     </div>
                     <Button
                        onClick={(e) => {
                           e.stopPropagation()
                           removeSearch(item)
                        }}
                        variant='icon'
                        className='hidden h-fit w-fit rounded-full border-0 bg-transparent p-0 shadow-none group-hover:block'
                     >
                        <X className='size-4' />
                     </Button>
                  </div>
               ))}
            </div>
         )}

         {/* Suggestions */}
         {isFetching ? (
            <div className='space-y-3'>
               {Array.from({ length: DEFAULT_SUGGESTIONS_COUNT }).map((_, i) => (
                  <ProductSuggestSkeleton key={i} />
               ))}
            </div>
         ) : suggestions.length > 0 ? (
            <div className='space-y-3'>
               <h1 className='text-dark-gray mb-2 flex items-center gap-2 text-sm font-semibold'>
                  {suggestionTitle}
               </h1>
               {suggestions.map((product) => (
                  <div key={product.id} onMouseDown={(e) => e.preventDefault()} onClick={onClose}>
                     <ProductSuggestItem product={product} />
                  </div>
               ))}
            </div>
         ) : keyword ? (
            <div className='space-y-2 pb-2'>
               <p className='text-dark-gray flex items-center gap-2 text-sm'>
                  <Frown size={16} />
                  Không tìm thấy sản phẩm nào cho <b>{keyword}</b>
               </p>
               <p className='text-xs text-gray-400'>Hãy thử với từ khóa khác.</p>
            </div>
         ) : null}
      </div>
   )
}

export default SearchDropdown
