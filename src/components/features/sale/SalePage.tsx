'use client'
import ProductsLayout from '@/components/features/catalog/ProductsLayout'
import { useFilterProducts } from '@/hooks/useFilterProducts'
export const SALE_PERCENT = 30

export default function SalePage() {
   const { products, isLoading } = useFilterProducts()
   const saleProducts =
      products?.filter(
         (p) => ((p.base_price - p.sale_price) / p.base_price) * 100 > SALE_PERCENT
      ) || products
   return (
      <div className='px-2 py-10 sm:px-4'>
         <ProductsLayout isLoading={isLoading} products={saleProducts}></ProductsLayout>
      </div>
   )
}
