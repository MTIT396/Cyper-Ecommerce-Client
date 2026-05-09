import { Body, Content, Footer, Skeleton, TitleBlock, TitleContent } from '@/components/ui/skeleton'

const ProductCardSkeleton = () => {
   return (
      <div className='group relative flex flex-col rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md'>
         <Body>
            <Content>
               <Skeleton className='h-40 w-full rounded-md' />
               <TitleContent>
                  <Skeleton className='h-4 w-full rounded-md' />
                  <TitleBlock>
                     <Skeleton className='h-4 w-1/2 rounded-md' />
                     <Skeleton className='h-4 w-10 rounded-md' />
                  </TitleBlock>
                  <Footer>
                     <Skeleton className='h-10 w-full rounded-full' />
                  </Footer>
               </TitleContent>
            </Content>
         </Body>
      </div>
   )
}

export default ProductCardSkeleton
