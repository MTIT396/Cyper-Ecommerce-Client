export interface FilterRequest {
   categoryId?: number
   query?: string
   sort?: 'price_asc' | 'price_desc' | 'rating_desc' | 'newest'
   price?: string
   brands?: string
   rating?: string
}

export type ParamKey = 'query' | 'sort' | 'price' | 'brands' | 'rating' | 'sku' | 'specs' | 'colors'

export interface OptionType {
   label: string
   value: string
}

export type ColorOptionType = OptionType & {
   hex_code: string
}

export interface BadgeFilter extends OptionType {
   key: ParamKey
}

export interface URLParams {
   query?: string
   brands?: string
   price?: string
   rating?: string
   colors?: string
   specs?: string
   sku?: string
   sort?: 'price_asc' | 'price_desc' | 'rating_desc' | 'newest'
}

export interface FilterMetadata {
   price: OptionType[]
   rating: OptionType[]
   brands: OptionType[]
   colors: ColorOptionType[]
   specs: {
      slug: string
      name: string
      values: OptionType[]
   }[]
}
