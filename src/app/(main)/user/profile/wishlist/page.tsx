'use client'

import WishlistCard from '@/components/features/wishlist/WishlistCard'
import Button from '@/components/shared/Button'
import { FadeMotionItem } from '@/components/shared/FadeMotionItem'
import { FadeMotionWrapper } from '@/components/shared/FadeMotionWrapper'
import Loading from '@/components/shared/Loading'
import { useWishlistQuery } from '@/hooks/useWishlistQuery'
import { FadeUpVariants } from '@/lib/variants'
import Link from 'next/link'

export default function WishlistPage() {
   const { wishlist, isLoading } = useWishlistQuery()
   return (
      <FadeMotionItem variants={FadeUpVariants} className='rounded-2xl bg-white p-4 sm:p-8'>
         <FadeMotionItem variants={FadeUpVariants}>
            <div className='mb-8 pb-2'>
               <h1 className='flex items-center gap-2 text-2xl font-semibold'>
                  Sản phẩm yêu thích
               </h1>
            </div>
         </FadeMotionItem>

         <FadeMotionWrapper className='flex flex-col gap-6'>
            {isLoading ? (
               <div className='flex w-full items-center justify-center'>
                  <Loading />
               </div>
            ) : !wishlist.length ? (
               <FadeMotionItem variants={FadeUpVariants}>
                  <div className='flex min-h-80 w-full flex-col items-center justify-center'>
                     <h1 className='text-dark-gray flex items-center gap-2 text-2xl font-medium tracking-wide text-nowrap'>
                        Danh sách yêu thích của bạn hiện đang trống.
                     </h1>
                     <p className='text-dark-gray mt-2 font-light'>
                        Bạn có thể xem tất cả các sản phẩm hiện có và thêm vào danh sách yêu thích
                        trong cửa hàng.
                     </p>
                     <Link href='/'>
                        <Button variant='outline' className='mt-10 rounded-full px-10 text-sm'>
                           Khám phá sản phẩm
                        </Button>
                     </Link>
                  </div>
               </FadeMotionItem>
            ) : (
               wishlist.map((item) => (
                  <FadeMotionItem key={item.wishlist_id} variants={FadeUpVariants}>
                     <WishlistCard wishlist={item} />
                  </FadeMotionItem>
               ))
            )}
         </FadeMotionWrapper>
      </FadeMotionItem>
   )
}
