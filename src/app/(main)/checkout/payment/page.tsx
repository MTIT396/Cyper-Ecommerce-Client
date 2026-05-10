import dynamic from 'next/dynamic'

const PaymentPage = dynamic(() => import('@/components/features/checkout/PaymentPage'), {
   ssr: false
})

export default function Page() {
   return <PaymentPage />
}
