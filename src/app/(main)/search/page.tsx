'use client'

import Container from '@/components/Container'
import ProductsGrid from '@/components/features/catalog/ProductsGrid'
import BodyContent from '@/components/shared/BodyContent'
import { useFilterProducts } from '@/hooks/useFilterProducts'
import { useSidebarToggle } from '@/hooks/useSidebarToggle'
import FilterSidebar from '@/layouts/FilterSidebar'

const SearchPage = () => {
   const { products, isLoading } = useFilterProducts()
   const { isShowSidebar, toggleSidebar } = useSidebarToggle()

   return (
      <Container>
         <BodyContent>
            <div className='mt-10 flex items-start gap-6'>
               <FilterSidebar isShowSidebar={isShowSidebar} />
               <ProductsGrid
                  products={products}
                  isLoading={isLoading}
                  isShowSidebar={isShowSidebar}
                  onShowSidebar={toggleSidebar}
               />
            </div>
         </BodyContent>
      </Container>
   )
}

export default SearchPage
