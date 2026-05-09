import { FilterRequest } from '@/types/filter.type'
import { ProductsRequest } from '@/types/product.type'

export const ADDRESS_QUERY_KEY = {
   all: ['addresses'] as const,
   item: ['address'] as const
}

export const ORDER_QUERY_KEY = {
   all: ['orders'] as const,
   item: ['order'] as const
}

export const WISHLIST_QUERY_KEY = {
   all: ['wishlist'] as const
}

export const CART_QUERY_KEY = {
   all: ['cart'] as const
}

export const productKeys = {
   all: ['products'] as const,
   lists: (params?: ProductsRequest) => [...productKeys.all, 'list', params] as const,
   detail: (slug: string) => [...productKeys.all, 'detail', slug] as const,
   filter: (params?: FilterRequest) => [...productKeys.all, 'filter', params] as const,
   infinite: (params?: Omit<ProductsRequest, 'page'>) =>
      [...productKeys.all, 'infinite', params] as const
}
