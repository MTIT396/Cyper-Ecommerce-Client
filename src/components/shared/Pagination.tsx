'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import Button from './Button'

type PaginationProps = {
   totalPages: number
   isLoading?: boolean
}

export default function Pagination({ totalPages, isLoading = false }: PaginationProps) {
   const router = useRouter()
   const searchParams = useSearchParams()
   const page = Number(searchParams.get('page')) || 1

   if (totalPages <= 1) return null

   // get pages to display
   const getPages = () => {
      const pages: (number | '...')[] = []
      const delta = 1

      const range = []
      for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
         range.push(i)
      }

      if (page - delta > 2) {
         pages.push(1, '...')
      } else {
         pages.push(1)
      }

      pages.push(...range)

      if (page + delta < totalPages - 1) {
         pages.push('...', totalPages)
      } else {
         pages.push(totalPages)
      }

      return [...new Set(pages)]
   }

   const pages = getPages()

   // change page
   const changePage = (p: number) => {
      if (p === page || p < 1 || p > totalPages) return

      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(p))

      router.push(`?${params.toString()}`)
   }

   return (
      <div className='mt-6 flex items-center justify-center gap-2'>
         {/* Prev */}
         <Button
            variant='icon'
            onClick={() => changePage(page - 1)}
            disabled={page === 1 || isLoading}
            className={clsx(
               'flex items-center justify-center rounded-lg border px-3 py-2 transition',
               'hover:bg-gray-100',
               (page === 1 || isLoading) && 'cursor-not-allowed opacity-50'
            )}
         >
            <ChevronLeft size={16} />
         </Button>

         {/* Pages */}
         {pages.map((p, i) =>
            p === '...' ? (
               <span key={i} className='px-2 text-gray-400'>
                  ...
               </span>
            ) : (
               <button
                  key={p}
                  onClick={() => changePage(p)}
                  disabled={isLoading}
                  className={clsx(
                     'min-w-[36px] rounded-lg border px-3 py-2 text-sm font-medium transition',
                     p === page
                        ? 'border-dark-gray bg-primary text-white shadow-sm'
                        : 'hover:bg-gray-100'
                  )}
               >
                  {p}
               </button>
            )
         )}

         {/* Next */}
         <Button
            variant='icon'
            onClick={() => changePage(page + 1)}
            disabled={page === totalPages || isLoading}
            className={clsx(
               'flex items-center justify-center rounded-lg border px-3 py-2 transition',
               'hover:bg-gray-100',
               (page === totalPages || isLoading) && 'cursor-not-allowed opacity-50'
            )}
         >
            <ChevronRight size={16} />
         </Button>
      </div>
   )
}
