'use client'

import { FilterRequest, URLParams } from '@/types/filter.type'
import { useFilterProductsQuery } from './useProductsQuery'
import { useQueryString } from './useQueryString'
import { useMemo } from 'react'

export function useFilterProducts(categoryId?: number) {
   const queryString: URLParams = useQueryString()

   const { query, price, rating, sort, brands, specs, colors } = queryString

   const parseSpecs = useMemo(() => {
      if (!specs) return []

      return specs
         .split(',')
         .map((s) => s.trim().toLowerCase())
         .filter(Boolean)
   }, [specs])

   const payload: FilterRequest = useMemo(
      () => ({
         ...(categoryId && { categoryId }),
         ...(query && { query }),
         ...(price && { price }),
         ...(rating && { rating }),
         ...(sort && { sort }),
         ...(brands && { brands }),
         ...(colors && { colors }),
         ...(parseSpecs.length > 0 && {
            specs: parseSpecs.join(',')
         })
      }),
      [categoryId, query, price, rating, sort, brands, parseSpecs, colors]
   )
   const { data, isLoading } = useFilterProductsQuery(payload)
   return {
      products: data?.data.products ?? [],
      filters: data?.data.filters ?? null,
      isLoading
   }
}
