import React, { useEffect, useState } from 'react'
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger
} from '@/components/ui/sheet'
import Button from '@/components/shared/Button'
import { useCartQuery } from '@/hooks/useCartQuery'
import LoadingModal from '@/components/shared/LoadingModal'
import CartItemSkeleton from './CartItemSkeleton'
import CartItem from './CartItem'
import ReminderBox from '@/components/shared/ReminderBox'
import { ShoppingBag, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { formatVNCurrency } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const CartSheet = ({ children }: { children: React.ReactNode }) => {
   const { cart, isLoading, removeAll, removeAllPending } = useCartQuery()
   const pathname = usePathname()
   const [open, setOpen] = useState(false)

   useEffect(() => {
      setOpen(false)
   }, [pathname])

   const handleRemoveAll = () => {
      removeAll()
   }
   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger asChild>{children}</SheetTrigger>
         <SheetContent onOpenAutoFocus={(e) => e.preventDefault()} className='max-w-lg! p-2'>
            <SheetHeader>
               <SheetTitle className='text-2xl font-semibold'>Giỏ hàng </SheetTitle>
            </SheetHeader>
            <LoadingModal isOpen={removeAllPending} />
            <div className='scrollbar flex flex-col items-stretch gap-2 divide-y-1 overflow-auto px-4'>
               {isLoading ? (
                  <CartItemSkeleton count={3} />
               ) : (
                  cart?.items?.map((item) => <CartItem key={item.id} item={item} />)
               )}
            </div>
            {cart && !cart.total && (
               <div className='flex h-full flex-col items-center justify-center'>
                  <h1 className='text-dark-gray flex items-center gap-2 text-2xl font-medium text-nowrap'>
                     <ShoppingBag size={20} className='shrink-0' />
                     Giỏ hàng của bạn hiện đang trống.
                  </h1>
                  <p className='text-dark-gray mt-2 px-10 text-center font-light text-pretty'>
                     Bạn có thể xem tất cả các sản phẩm có sẵn và mua một số sản phẩm tại cửa hàng.
                  </p>
               </div>
            )}
            <SheetFooter className='space-y-4'>
               <div className='flex items-center justify-between'>
                  {cart && !!cart.total && (
                     <h2 className='space-x-2 text-lg'>
                        <span className='font-medium'>Tổng: </span>
                        <span className='text-xl font-bold'>
                           {formatVNCurrency(cart?.total as number)}
                        </span>
                     </h2>
                  )}

                  {cart && !!cart.total && (
                     <ReminderBox
                        title='Xóa giỏ hàng'
                        desc='Bạn có chắc chắn muốn xóa giỏ hàng không? Thao tác này không thể hoàn tác và tất cả các mặt hàng sẽ bị xóa khỏi giỏ hàng của bạn.'
                        onConfirm={handleRemoveAll}
                     >
                        <Button
                           variant='icon'
                           aria-label='remove-all-cart-items'
                           className='size-fit h-fit rounded-md border-none px-2.5 py-2 text-red-500 shadow-none hover:text-red-600'
                        >
                           <Trash2 size={16} />
                           Xóa giỏ hàng
                        </Button>
                     </ReminderBox>
                  )}
               </div>
               <Link href='/checkout/address' className='w-full'>
                  <SheetClose asChild>
                     <Button
                        disabled={!cart?.items.length}
                        variant='primary'
                        className='w-full py-3'
                        aria-label='checkout'
                     >
                        Thanh toán
                     </Button>
                  </SheetClose>
               </Link>
            </SheetFooter>
         </SheetContent>
      </Sheet>
   )
}

export default CartSheet
