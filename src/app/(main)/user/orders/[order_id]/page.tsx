import OrderDetailPageClient from '@/components/features/user/order/OrderDetailPage'

export default async function OrderDetailPage({
   params
}: {
   params: Promise<{ order_id: number }>
}) {
   const { order_id } = await params
   return <OrderDetailPageClient order_id={order_id} />
}
