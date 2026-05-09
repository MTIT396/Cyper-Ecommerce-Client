import { productKeys } from '@/constants/queryKey'
import { productServices } from '@/services/product.service'
import { FilterRequest } from '@/types/filter.type'
import { ProductsRequest } from '@/types/product.type'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

type UseProductsProps = {
   params?: ProductsRequest
   enabled?: boolean
}

export const useProducts = ({ params, enabled }: UseProductsProps = {}) => {
   return useQuery({
      queryKey: productKeys.lists(params),
      queryFn: () => productServices.getProducts(params),
      enabled
   })
}

export const useProductDetail = (slug: string) => {
   return useQuery({
      queryKey: productKeys.detail(slug),
      queryFn: () => productServices.getProductDetail(slug),
      enabled: !!slug
   })
}

export const useFilterProductsQuery = (params?: FilterRequest) => {
   return useQuery({
      queryKey: productKeys.filter(params),
      queryFn: () => productServices.getFilterProducts(params as FilterRequest),
      enabled: !!params
   })
}

type UseInfiniteProductsProps = {
   params?: Omit<ProductsRequest, 'page'>
   pageSize?: number
}

export const useInfiniteProducts = ({ params, pageSize = 10 }: UseInfiniteProductsProps = {}) => {
   return useInfiniteQuery({
      queryKey: productKeys.infinite(params),
      queryFn: ({ pageParam = 1 }) =>
         productServices.getProducts({ ...params, page: pageParam, limit: pageSize }),
      getNextPageParam: (lastPage, allPages) => {
         const total = lastPage.meta.total
         const loaded = allPages.length * pageSize

         return loaded < total ? allPages.length + 1 : undefined
      },
      initialPageParam: 1
   })
}
