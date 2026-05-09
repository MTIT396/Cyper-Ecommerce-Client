import { FilterMetadata } from './filter.type'

/**
 * Product Type Definitions
 */
export interface Product {
   id: number
   name: string
   slug: string
   category_id: number
   rating: number
   base_price: number
   sale_price: number
   image_url: string
   colors: Color[]
}

export interface ProductsRequest {
   page?: number
   limit?: number
   category_id?: number
   type?: 'newest' | 'bestseller' | 'featured'
}

/**
 * Product Detail
 */

export interface ProductDetail {
   id: number
   name: string
   description: string
   rating: number
   category_id: number

   images: string[]

   variant_attributes: VariantAttribute[]
   variants: Variant[]

   brand: {
      id: number
      name: string
   }
}
export interface VariantAttribute {
   id: number
   name: string
   slug: string
   values: AttributeValue[]
}

export interface AttributeValue {
   id: number
   value: string
   meta?: {
      hex?: string // color
   }
}

export enum Specifics {
   storage = 'Dung lượng',
   size = 'Kích thước',
   version = 'Phiên bản',
   operating_system = 'Hệ điều hành',
   screen_resolution = 'Độ phân giải',
   connection_port = 'Cổng kết nối',
   display_tech = 'Công nghệ màn hình',
   graphics_card = 'Card đồ họa',
   cpu = 'CPU',
   battery_life = 'Thời lượng pin',
   nfc = 'Kết nối NFC',
   scan_frequency = 'Tần số quét',
   screen_size = 'Kích thước màn hình',
   camera = 'Camera',
   ram = 'RAM',
   screen_type = 'Loại màn hình',
   battery_capacity = 'Dung lượng pin',
   screen_standard = 'Chuẩn màn hình',
   chip = 'Chip',
   panel = 'Tấm nền',
   bluetooth = 'Bluetooth',
   feature = 'Tính năng',
   gps = 'GPS',
   watch_face_size = 'Kích thước mặt đồng hồ'
}

export interface Variant {
   id: number
   sku: string
   stock: number
   sold: number

   base_price: number
   sale_price: number

   images: string[]

   attribute_values: VariantAttributeValue[]
   specs: VariantSpec[]
}

export interface VariantAttributeValue {
   attribute_id: number
   attribute_name: string
   attribute_slug: string

   value_id: number
   value: string

   meta?: {
      hex?: string
   }
}

export interface VariantSpec {
   name: Specifics
   value: string
}

export interface Color {
   id: number
   name: string
   hex_code: string
}

export interface ProductListResponse {
   success: boolean
   data: Product[]
   meta: {
      total: number
      page: number
      limit: number
      totalPages: number
      hasNextPage: boolean
   }
}

export interface ProductDetailResponse {
   success: boolean
   data: ProductDetail
}
export interface ProductFilterListResponse {
   success: boolean
   data: {
      products: Product[]
      filters: FilterMetadata
   }
}
