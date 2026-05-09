import { Body, Content, Skeleton } from '@/components/ui/skeleton'

type Props = {
   count?: number
}

const Row = () => {
   return (
      <Body className='py-4'>
         {/* image */}
         <Skeleton className='h-[90px] w-[90px] rounded-md' />

         <div className='flex w-full items-center gap-6'>
            {/* left info */}
            <Content>
               <Skeleton className='h-4 w-[60%] rounded' />
               <Skeleton className='h-3 w-[75%] rounded' />
               <Skeleton className='h-3 w-[40%] rounded' />
            </Content>

            {/* right actions */}
            <div className='ml-auto flex shrink-0 items-center gap-6'>
               {/* QuantityInput placeholder */}
               <Skeleton className='h-8 w-30' />

               {/* price placeholder (match w-[100px]) */}
               <Skeleton className='h-5 w-[100px] rounded' />

               {/* remove button placeholder */}
               <Skeleton className='size-6' />
            </div>
         </div>
      </Body>
   )
}

export default function CartItemSkeleton({ count = 3 }: Props) {
   return (
      <>
         {Array.from({ length: count }).map((_, i) => (
            <Row key={i} />
         ))}
      </>
   )
}
