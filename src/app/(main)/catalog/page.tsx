import Container from '@/components/Container'
import BodyContent from '@/components/shared/BodyContent'
import { CategoriesList } from '@/constants/constants'
import Image from 'next/image'
import Link from 'next/link'

export default function CatalogBrowse() {
   return (
      <Container>
         <BodyContent>
            {/* Header */}
            <div className='mb-10'>
               <h1 className='text-4xl font-bold tracking-tight'>Mua sắm theo danh mục</h1>
               <p className='mt-2 text-gray-500'>
                  Khám phá các bộ sưu tập được tuyển chọn của chúng tôi.
               </p>
            </div>

            {/* Grid */}
            <div className='grid auto-rows-[260px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
               {CategoriesList.map((cat, index) => {
                  const isFeatured = index === 0

                  return (
                     <Link
                        key={cat.id}
                        href={`/catalog/${cat.slug}`}
                        className={`group block ${isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                     >
                        <div className='relative h-full overflow-hidden rounded-2xl'>
                           {/* Image */}
                           <Image
                              src={cat.image}
                              alt={cat.name}
                              fill
                              className='object-cover transition-transform duration-500 group-hover:scale-110'
                           />

                           {/* Overlay */}
                           <div className='absolute inset-0 bg-black/30 transition duration-300 group-hover:bg-black/50' />

                           {/* Content */}
                           <div className='absolute inset-0 flex items-end p-6'>
                              <span className='rounded-full bg-white px-10 py-2 text-lg font-semibold tracking-wide text-black shadow-sm'>
                                 {cat.name}
                              </span>
                           </div>
                        </div>
                     </Link>
                  )
               })}
            </div>
         </BodyContent>
      </Container>
   )
}
