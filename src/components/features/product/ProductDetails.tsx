/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useMemo, useState } from 'react'
import { Truck, Package, Shield, Heart, Handbag, CircleCheckBig } from 'lucide-react'

import Container from '@/components/Container'
import ProductsImageSlider from '@/components/features/product/ProductsImageSlider'
import { formatVNCurrency } from '@/lib/utils'
import Button from '@/components/shared/Button'
import { BreadcrumbProduct } from '@/components/shared/BreadcrumbProduct'
import { useCategories } from '@/hooks/useCategories'
import { TooltipColor } from '@/components/shared/TooltipColor'
import { Badge } from '@/components/ui/badge'
import StarView from '@/components/shared/StarView'
import { useCartQuery } from '@/hooks/useCartQuery'
import { useQueryString } from '@/hooks/useQueryString'
import { useUpdateURL } from '@/hooks/useUpdateURL'
import LoadingModal from '@/components/shared/LoadingModal'
import { useWishlistQuery } from '@/hooks/useWishlistQuery'
import { useProductDetail } from '@/hooks/useProductsQuery'
import BodyContent from '@/components/shared/BodyContent'
import { useRequireAuth } from '@/hooks/useRequireAuth'
import { Skeleton } from '@/components/ui/skeleton'
import { SpecificsIcon } from '@/constants/attribute.constant'
import InfoItem from './InfoItem'

const ProductDetails = ({ slug }: { slug: string }) => {
   const urlParams = useQueryString()
   const { updateURL } = useUpdateURL()
   const { addToCart, addToCartPending } = useCartQuery()
   const { toggleWishlist, isToggling } = useWishlistQuery()
   const { data: categories } = useCategories()
   const requireAuth = useRequireAuth()

   const { data: rawProduct, isLoading } = useProductDetail(slug)

   const product = rawProduct?.data
   const variants = product?.variants || []
   const variantAttributes = product?.variant_attributes || []

   const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({})
   const [activeSlide, setActiveSlide] = useState(0)

   const hasVariants = variants.length > 0

   /* ================= RESOLVE VARIANT ================= */
   const resolvedVariant = useMemo(() => {
      if (!hasVariants) return null

      if (urlParams.sku) {
         const bySku = variants.find((v) => v.sku === urlParams.sku)
         if (bySku) return bySku
      }

      return (
         variants.find((v) =>
            v.attribute_values.every((av) => selectedOptions[av.attribute_id] === av.value_id)
         ) || variants[0]
      )
   }, [variants, selectedOptions, urlParams.sku])

   /* ================= SYNC SELECTED ================= */
   useEffect(() => {
      if (!resolvedVariant) return

      const next: Record<number, number> = {}

      resolvedVariant.attribute_values.forEach((av) => {
         next[av.attribute_id] = av.value_id
      })

      setSelectedOptions((prev) => {
         const same = Object.keys(next).every((k) => prev[Number(k)] === next[Number(k)])
         return same ? prev : next
      })
   }, [resolvedVariant])

   /* ================= CHECK VALID OPTION ================= */
   const primaryAttrId = variantAttributes[0]?.id
   const isOptionAvailable = (attributeId: number, valueId: number) => {
      if (attributeId === primaryAttrId) return true

      return variants.some((variant) => {
         return variant.attribute_values.every((av) => {
            // attribute đang check
            if (av.attribute_id === attributeId) {
               return av.value_id === valueId
            }

            // chỉ filter theo PRIMARY attribute
            if (av.attribute_id === primaryAttrId) {
               return selectedOptions[primaryAttrId] === av.value_id
            }

            return true
         })
      })
   }
   /* ================= HANDLE SELECT ================= */
   const handleSelectOption = (attributeId: number, valueId: number) => {
      const next = { ...selectedOptions, [attributeId]: valueId }

      // Tìm variant match FULL attributes
      const exactVariant = variants.find((v) =>
         v.attribute_values.every((av) => next[av.attribute_id] === av.value_id)
      )

      if (exactVariant) {
         setSelectedOptions(next)
         updateURL('sku', exactVariant.sku)
         setActiveSlide(0)
         return
      }

      //  Fallback: match theo attribute vừa chọn
      const fallbackVariant = variants.find((v) =>
         v.attribute_values.some((av) => av.attribute_id === attributeId && av.value_id === valueId)
      )

      if (fallbackVariant) {
         const nextOptions: Record<number, number> = {}

         fallbackVariant.attribute_values.forEach((av) => {
            nextOptions[av.attribute_id] = av.value_id
         })

         setSelectedOptions(nextOptions)
         updateURL('sku', fallbackVariant.sku)
         setActiveSlide(0)
         return
      }

      // fallback cuối
      setSelectedOptions(next)
   }

   /* ================= SPLIT ATTR ================= */
   const colorAttribute = variantAttributes.find((a) => a.slug === 'color')
   const otherAttributes = variantAttributes.filter((a) => a.slug !== 'color')

   /* ================= DERIVED ================= */
   const salePrice = resolvedVariant?.sale_price || 0
   const basePrice = resolvedVariant?.base_price || 0
   const sold = resolvedVariant?.sold

   const productImages = product?.images || []
   const variantImages = resolvedVariant?.images || []

   const images = variantImages.length > 0 ? [...variantImages, ...productImages] : productImages
   const salePercent = !salePrice ? 0 : ((basePrice - salePrice) / basePrice) * 100
   const handleAddToCart = () => {
      if (!requireAuth()) return
      addToCart({
         product_id: product?.id as number,
         variant_id: resolvedVariant?.id as number,
         quantity: 1
      })
   }

   const currentCategory = categories?.find((c) => c.id === product?.category_id)

   const breadcrumb = [
      { label: 'Trang chủ', href: '/' },
      { label: 'Danh mục', href: '/catalog' },
      { label: currentCategory?.name as string, href: `/catalog/${currentCategory?.slug}` },
      {
         label: product?.brand.name as string,
         href: `/catalog/${currentCategory?.slug}?brands=${product?.brand.id}`
      },
      { label: product?.name as string }
   ]

   if (isLoading) {
      return (
         <Container>
            <BodyContent className='space-y-6'>
               <Skeleton className='h-12 w-48' />
               <div className='space-y-6'>
                  <Skeleton className='h-48 w-full' />
                  <Skeleton className='h-48 w-full' />
               </div>
            </BodyContent>
         </Container>
      )
   }

   if (!product) return null

   return (
      <>
         <LoadingModal isOpen={addToCartPending || isToggling || isLoading} />
         <Container>
            <BodyContent>
               <BreadcrumbProduct items={breadcrumb} />
               <section className='mt-2 grid grid-cols-1 gap-10 py-8 lg:grid-cols-2'>
                  {/* Left Column */}
                  <div className='flex w-full flex-col gap-y-6'>
                     <ProductsImageSlider
                        productImages={images}
                        activeSlide={activeSlide}
                        setActiveSlide={setActiveSlide}
                     />
                  </div>

                  {/* Right Column */}
                  <div className='flex w-full flex-col'>
                     {/* Name */}
                     <h1 className='mb-2 text-xl font-bold'>{product.name}</h1>
                     <StarView value={product.rating} className='mb-2' />
                     {/* Price */}
                     <div className='mb-4 flex items-center gap-3'>
                        <span className='text-2xl font-bold'>
                           {formatVNCurrency(!salePrice ? basePrice : salePrice)}
                        </span>
                        {!!salePrice && (
                           <span className='text-extra-gray text-lg line-through'>
                              {formatVNCurrency(basePrice)}
                           </span>
                        )}
                        {salePercent > 0 && (
                           <span className='font-semibold text-red-500'>
                              -{Math.round(salePercent)}%
                           </span>
                        )}
                     </div>

                     <Badge className='mb-4 border-blue-200 bg-blue-50 px-2.5 py-1 text-sm font-semibold text-blue-700'>
                        <div className='flex items-center gap-2'>
                           <CircleCheckBig className='size-4' />
                           Đã bán: {sold}
                        </div>
                     </Badge>

                     {/* OTHER ATTR */}
                     {otherAttributes.map((attr) => (
                        <div key={attr.id} className='mb-6'>
                           <p className='mb-4 font-medium'>
                              {attr.name}:{' '}
                              <b>
                                 {attr.values.find((v) => v.id === selectedOptions[attr.id])?.value}
                              </b>
                           </p>

                           <div className='flex flex-wrap gap-4'>
                              {attr.values.map((val) => {
                                 const isAvailable = isOptionAvailable(attr.id, val.id)
                                 const isSelected = selectedOptions[attr.id] === val.id

                                 return (
                                    <Button
                                       key={val.id}
                                       variant='icon'
                                       disabled={!isAvailable}
                                       onClick={() => handleSelectOption(attr.id, val.id)}
                                       className={`text-dark-gray min-w-32 rounded-md border px-8 py-2.5 text-sm font-semibold transition-all duration-200 ease-in-out ${
                                          isSelected
                                             ? 'ring-primary from-extra-gray/10 via-extra-gray/5 scale-[1.02] bg-linear-to-br to-transparent shadow-[0_4px_12px_rgba(100,100,100,0.15)] ring-[1px]'
                                             : 'border-outline-border bg-white'
                                       } ${
                                          !isAvailable
                                             ? 'cursor-not-allowed opacity-40'
                                             : 'hover:border-primary/40 hover:scale-[1.01] hover:shadow-[0_2px_8px_rgba(100,100,100,0.08)]'
                                       }`}
                                    >
                                       {val.value}

                                       {isSelected && (
                                          <div className='bg-primary absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full shadow-sm'>
                                             <CircleCheckBig className='size-3 text-white' />
                                          </div>
                                       )}
                                    </Button>
                                 )
                              })}
                           </div>
                        </div>
                     ))}

                     {/* COLOR */}
                     {colorAttribute && (
                        <div className='mb-6'>
                           <p className='mb-2.5 font-medium'>
                              {colorAttribute.name}:{' '}
                              <b>
                                 {
                                    colorAttribute.values.find(
                                       (v) => v.id === selectedOptions[colorAttribute.id]
                                    )?.value
                                 }
                              </b>
                           </p>

                           <div className='flex gap-3'>
                              {colorAttribute.values.map((val) => {
                                 const isAvailable = isOptionAvailable(colorAttribute.id, val.id)
                                 return (
                                    <TooltipColor
                                       key={val.id}
                                       color={{
                                          id: val.id,
                                          name: val.value,
                                          hex_code: val.meta?.hex || '#ccc'
                                       }}
                                       selectedColor={
                                          colorAttribute.values.find(
                                             (v) => v.id === selectedOptions[colorAttribute.id]
                                          )?.value as string
                                       }
                                       disabled={!isAvailable}
                                       onChange={() => {
                                          if (!isAvailable) return
                                          handleSelectOption(colorAttribute.id, val.id)
                                       }}
                                    />
                                 )
                              })}
                           </div>
                        </div>
                     )}
                     {!!resolvedVariant?.specs?.length && (
                        <div className='py-2'>
                           <h2 className='mb-4 font-semibold'>Thông số nổi bật</h2>
                           <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
                              {resolvedVariant.specs.map((s, i: number) => (
                                 <div
                                    key={i}
                                    className='bg-bg-gray flex w-full flex-col rounded-lg px-4.5 py-2.5'
                                 >
                                    <p className='text-extra-gray text-sm leading-7'>{s.name}</p>
                                    <div className='flex items-center gap-1.5'>
                                       <SpecificsIcon src={s.name} />
                                       <p className='font-semibold'>{s.value}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}
                     <div className='mt-4 mb-6 space-y-2 border-b py-4'>
                        <h2 className='font-semibold'>Mô tả sản phẩm:</h2>
                        <p className='text-dark-gray text-sm'>{product.description}</p>
                     </div>

                     <div className='grid grid-cols-2 gap-4'>
                        <Button
                           onClick={() => toggleWishlist(product.id)}
                           variant='outline'
                           className='h-fit rounded-full py-2.5 text-sm'
                        >
                           <Heart /> Yêu thích
                        </Button>
                        <Button
                           onClick={handleAddToCart}
                           loadingText='Đang thêm giỏ'
                           isLoading={addToCartPending}
                           className='h-fit rounded-full py-2.5 text-sm'
                        >
                           <Handbag /> Thêm vào giỏ
                        </Button>
                     </div>

                     <div className='mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3'>
                        <InfoItem icon={Truck} title='Giao hàng' desc='1-2 ngày' />
                        <InfoItem icon={Package} title='Cam kết' desc='Chính hãng' />
                        <InfoItem icon={Shield} title='Bảo hành' desc='1 năm' />
                     </div>
                  </div>
               </section>
            </BodyContent>
         </Container>
      </>
   )
}

export default ProductDetails
