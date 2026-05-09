export interface FilterRequest {
   categoryId?: number
   query?: string
   sort?: 'price_asc' | 'price_desc' | 'rating_desc' | 'newest'
   price?: string
   brands?: string
   rating?: string
}

export type ParamKey = 'query' | 'sort' | 'price' | 'brands' | 'rating' | 'sku' | 'specs'

export interface OptionType {
   label: string
   value: string
}

export interface BadgeFilter extends OptionType {
   key: ParamKey
}

export interface URLParams {
   query?: string
   brands?: string
   price?: string
   rating?: string
   specs?: string
   sku?: string
   sort?: 'price_asc' | 'price_desc' | 'rating_desc' | 'newest'
}

export interface FilterMetadata {
   price: OptionType[]
   rating: OptionType[]
   brands: OptionType[]
   specs: {
      slug: string
      name: string
      values: OptionType[]
   }[]
}
