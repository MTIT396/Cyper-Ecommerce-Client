import dynamic from 'next/dynamic'

const NotFoundPage = dynamic(() => import('@/components/features/notfound/NotFound'), {
   ssr: false
})

export default function Page() {
   return <NotFoundPage />
}
