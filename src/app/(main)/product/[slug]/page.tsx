import ProductDetails from '@/components/features/product/ProductDetails'

export default async function ProductDetailsPage({
   params
}: {
   params: Promise<{ slug: string }>
}) {
   const { slug } = await params
   return <ProductDetails slug={slug} />
}
