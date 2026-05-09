import Catalog from '@/components/features/catalog'

export default async function CatalogPage({ params }: { params: Promise<{ slug: string }> }) {
   const { slug } = await params
   return <Catalog slug={slug} />
}
