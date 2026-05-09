'use client'
import Container from '@/components/Container'
import ProductsLayout from '@/components/features/catalog/ProductsLayout'
import Loading from '@/components/shared/Loading'
import { useCategory } from '@/hooks/useCategory'
import { useFilterProducts } from '@/hooks/useFilterProducts'

export default function Catalog({ slug }: { slug: string }) {
   const { data: category, isLoading: categoryLoading } = useCategory(slug)

   const categoryId = category?.id
   const { products, isLoading: productsLoading } = useFilterProducts(categoryId)
   if (categoryLoading) {
      return (
         <Container className='mt-20'>
            <div className='flex min-h-[80vh] items-center justify-center'>
               <Loading />
            </div>
         </Container>
      )
   }

   return (
      <div className='px-2 py-8 sm:px-4'>
         <ProductsLayout category={category} isLoading={productsLoading} products={products} />
      </div>
   )
}
