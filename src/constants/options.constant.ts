import { OptionType } from '@/types/filter.type'

type PaymentOptionType = OptionType & {
   imgUrl: string
   disabled?: boolean
}

export const PaymentOptions: PaymentOptionType[] = [
   {
      label: 'Thanh toán khi nhận hàng',
      value: 'cod',
      imgUrl: '/images/COD.avif'
   },
   {
      label: 'Ví điện tử MoMo',
      value: 'momo',
      imgUrl: '/images/momo.png'
   },
   {
      label: 'VNPAY',
      value: 'vnpay',
      imgUrl: '/images/vnpay.jpg',
      disabled: true
   },
   {
      label: 'Ví ZaloPay',
      value: 'zalopay',
      imgUrl: '/images/zalopay.webp',
      disabled: true
   }
]

export const sortOptions = [
   { label: 'Xếp hạng', value: 'rating_desc' },
   { label: 'Mới nhất', value: 'newest' },
   { label: 'Mức giá: Thấp -> Cao', value: 'price_asc' },
   { label: 'Mức giá: Cao -> Thấp', value: 'price_desc' }
]
