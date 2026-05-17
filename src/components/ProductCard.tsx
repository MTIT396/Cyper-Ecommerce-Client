'use client'
import Image from 'next/image'
import Button from './shared/Button'
import { IoIosHeart } from 'react-icons/io'
import { IoHeartOutline } from 'react-icons/io5'
import { formatVNCurrency } from '@/lib/utils'
import { Handbag, Loader2 } from 'lucide-react'
import { Product } from '@/types/product.type'
import Link from 'next/link'
import StarView from './shared/StarView'
import { useCartQuery } from '@/hooks/useCartQuery'
import { useWishlistQuery } from '@/hooks/useWishlistQuery'
import { useProductDetail } from '@/hooks/useProductsQuery'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { Badge } from './ui/badge'

const ProductCard = ({ product }: { product: Product }) => {
   const { wishlist, toggleWishlist, isToggling } = useWishlistQuery()
   const requireAuth = useRequireAuth()

   const wishlistIds = wishlist.map((w) => w.product_id) || []
   const isWishlisted = wishlistIds.includes(product.id)

   // Fetch Product Details
   const { data } = useProductDetail(product.slug)
   const details = data?.data

   // Cart Mutations Hooks
   const { addToCart, addToCartPending } = useCartQuery()

   const handleToggleWishlist = (productId: number) => {
      if (!requireAuth()) return

      toggleWishlist(productId)
   }

   const handleAddToCart = () => {
      if (!requireAuth()) return

      if (!details) return

      const payload = {
         product_id: details.id,
         variant_id: details.variants?.[0]?.id as number,
         quantity: 1
      }
      addToCart(payload)
   }

   // Derived data
   const salePercent = !product.sale_price
      ? 0
      : ((product.base_price - product.sale_price) / product.base_price) * 100

   return (
      <div className='group relative flex h-full flex-col rounded-lg border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md'>
         {/* Wishlist Icon */}
         <Button
            variant='icon'
            onClick={() => handleToggleWishlist(product.id)}
            className='absolute top-2 right-2 z-10 size-8 rounded-full bg-white p-2 shadow-sm sm:size-10'
         >
            {isToggling ? (
               <>
                  <Loader2 className='size-4 animate-spin text-red-500 sm:size-5' />
               </>
            ) : isWishlisted ? (
               <IoIosHeart className='size-4 text-red-500 sm:size-5' />
            ) : (
               <IoHeartOutline className='size-4 text-gray-400 sm:size-5' />
            )}
         </Button>

         {/* Product Image */}
         <Link
            href={`/product/${product.slug}`}
            className='group relative mb-3 aspect-square w-full overflow-hidden rounded-md p-6 transition duration-300 hover:scale-105 lg:p-12'
         >
            <div className='relative flex h-full w-full items-center justify-center'>
               <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className='object-contain transition duration-500 group-hover:scale-105'
                  sizes='(max-width: 640px) 50vw, 25vw'
               />
            </div>
         </Link>

         {/* Product Info */}
         <div className='flex flex-grow flex-col'>
            <Badge className='text-dark-gray bg-light-gray mb-2 text-xs'>Chính hãng 100%</Badge>
            {/* Product Name */}
            <Link title={product.name} href={`/product/${product.slug}`}>
               <h3 className='text-primary mb-2 line-clamp-2 cursor-pointer overflow-hidden text-sm font-semibold sm:text-base'>
                  {product.name}
               </h3>
            </Link>

            <div className='mb-1 flex items-center gap-0.5'>
               <StarView value={product.rating} className='text-xs' />
            </div>

            {/* Prices */}
            <div className='mt-auto space-y-1'>
               <div className='flex flex-col flex-wrap items-baseline gap-x-2'>
                  <div className='flex items-center'>
                     {product.sale_price && (
                        <span className='text-extra-gray text-xs line-through sm:text-sm'>
                           {formatVNCurrency(product.base_price)}
                        </span>
                     )}
                     {salePercent > 0 && (
                        <span className='ml-2 text-xs font-semibold text-red-500'>
                           -{Math.round(salePercent)}%
                        </span>
                     )}
                  </div>
                  <span className='font-semibold'>
                     {formatVNCurrency(product.sale_price ?? product.base_price)}
                  </span>
               </div>
            </div>

            {/* Decrease */}
            {salePercent > 0 && (
               <span className='text-xs text-teal-600'>
                  Giảm {formatVNCurrency(product.base_price - product.sale_price)}
               </span>
            )}

            {/* Colors */}
            {product.colors.length > 1 && (
               <div className='mt-2 flex items-center gap-1'>
                  {product.colors.map((c) => (
                     <div
                        key={c.id}
                        className='size-4.5 rounded-full border'
                        style={{ background: c.hex_code }}
                     />
                  ))}
               </div>
            )}
            {/* Buy Button */}
            <Button
               disabled={addToCartPending}
               variant='primary'
               isLoading={addToCartPending}
               loadingText='Đang thêm vào giỏ...'
               onClick={handleAddToCart}
               className='mt-4 hidden rounded-full py-2 text-xs sm:text-sm lg:flex'
            >
               <Handbag size={20} />
               Thêm vào giỏ
            </Button>
         </div>
         {/* Sale Persent */}
         {!!salePercent && (
            <div className='absolute -top-[7px] left-4'>
               <span
                  className='relative bg-red-600 px-1.5 py-1 text-xs font-semibold text-white'
                  style={{ borderRadius: '0 4px 4px 4px' }}
               >
                  <span
                     style={{
                        content: '',
                        position: 'absolute',
                        top: 0,
                        left: '-5px',
                        width: 0,
                        height: 0,
                        borderBottom: '6px solid #970b12',
                        borderLeft: '6px solid transparent'
                     }}
                     aria-hidden='true'
                  />
                  Giảm {Math.round(salePercent)}%
               </span>
            </div>
         )}
      </div>
   )
}

export default ProductCard
