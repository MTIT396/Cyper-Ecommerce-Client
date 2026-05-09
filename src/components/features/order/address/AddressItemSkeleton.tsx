import { Body, Content, Skeleton, TitleBlock, TitleContent } from '@/components/ui/skeleton'

export default function AddressItemSkeleton() {
   return (
      <div className='!min-h-[124px] border-0 bg-white !p-3'>
         <Body>
            <Skeleton className='size-7 rounded-full' />

            <Content className='mb-6'>
               <TitleBlock>
                  <TitleContent className='!space-y-1.5'>
                     <Skeleton className='h-4 w-1/3' />
                     <Skeleton className='h-4 w-1/2' />
                     <Skeleton className='h-4 w-1/2' />
                  </TitleContent>
                  <Skeleton className='h-4 w-20 rounded-full' />
               </TitleBlock>
            </Content>
         </Body>
      </div>
   )
}
