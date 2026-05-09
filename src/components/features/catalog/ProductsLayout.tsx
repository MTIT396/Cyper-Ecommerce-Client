import Container from '@/components/Container'
import ProductsGrid from './ProductsGrid'
import { BreadcrumbProduct } from '@/components/shared/BreadcrumbProduct'
import FilterSidebar from '@/layouts/FilterSidebar'
import { Product } from '@/types/product.type'
import { useSidebarToggle } from '@/hooks/useSidebarToggle'
import { Category } from '@/types/category.type'

type BreadcrumbItem = { label: string; href?: string }

type Props = {
   category?: Category
   products: Product[]
   isLoading: boolean
   breadcrumb?: BreadcrumbItem[]
}

export default function ProductsLayout({ category, products, isLoading, breadcrumb }: Props) {
   const { isShowSidebar, toggleSidebar } = useSidebarToggle()

   const defaultBreadcrumb: BreadcrumbItem[] = [
      { label: 'Trang chủ', href: '/' },
      { label: 'Danh mục', href: '/catalog' },
      { label: category?.name ?? '' }
   ]

   return (
      <Container>
         <div className='mt-30'>
            {category?.id && <BreadcrumbProduct items={breadcrumb ?? defaultBreadcrumb} />}
            <div className='mt-10 flex items-start gap-6'>
               <FilterSidebar
                  categorySlug={category?.slug}
                  isShowSidebar={isShowSidebar}
                  onClose={() => toggleSidebar()}
               />
               <ProductsGrid
                  categoryId={category?.id}
                  products={products}
                  isLoading={isLoading}
                  isShowSidebar={isShowSidebar}
                  onShowSidebar={toggleSidebar}
               />
            </div>
         </div>
      </Container>
   )
}
