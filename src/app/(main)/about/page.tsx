'use client'
import Container from '@/components/Container'
import BodyContent from '@/components/shared/BodyContent'
import { FadeMotionItem } from '@/components/shared/FadeMotionItem'
import { FadeUpVariants } from '@/lib/variants'
import { motion } from 'framer-motion'

export default function AboutPage() {
   return (
      <Container>
         <BodyContent>
            {/* HERO */}
            <section className='mx-auto max-w-5xl px-6 py-10 text-center'>
               <FadeMotionItem variants={FadeUpVariants}>
                  <h1 className='mb-6 text-5xl font-semibold tracking-tight'>Cyper Store</h1>
               </FadeMotionItem>
               <FadeMotionItem variants={FadeUpVariants}>
                  <p className='text-extra-gray mx-auto max-w-xl text-lg leading-relaxed'>
                     Mang công nghệ đến gần hơn với bạn — tối giản, hiện đại và đáng tin cậy.
                  </p>
               </FadeMotionItem>
            </section>

            {/* DIVIDER */}
            <div className='mx-auto max-w-5xl border-t border-gray-200' />

            {/* ABOUT */}
            <section className='mx-auto grid max-w-5xl items-center gap-12 px-6 py-16 md:grid-cols-2'>
               <div>
                  <h2 className='mb-4 text-2xl font-medium tracking-tight'>Chúng tôi là ai?</h2>
                  <p className='text-extra-gray leading-relaxed'>
                     Cyper là công ty chuyên cung cấp các sản phẩm công nghệ như laptop, điện thoại,
                     phụ kiện và thiết bị thông minh. Chúng tôi tập trung vào trải nghiệm mua sắm
                     đơn giản, nhanh chóng và đáng tin cậy.
                  </p>
               </div>

               <div className='rounded-2xl border border-gray-200 p-6'>
                  <p className='text-dark-gray italic'>
                     &#34;Công nghệ không chỉ là sản phẩm — đó là cách chúng ta kết nối và phát
                     triển mỗi ngày.&#34;
                  </p>
               </div>
            </section>

            {/* DIVIDER */}
            <div className='mx-auto max-w-5xl border-t border-gray-200' />

            {/* VALUES */}
            <section className='mx-auto max-w-5xl px-6 py-16'>
               <h2 className='mb-10 text-center text-2xl font-medium tracking-tight'>
                  Giá trị cốt lõi
               </h2>

               <div className='grid gap-6 md:grid-cols-3'>
                  {[
                     {
                        title: 'Chất lượng',
                        desc: 'Sản phẩm chính hãng, trải nghiệm đáng tin cậy.'
                     },
                     {
                        title: 'Đổi mới',
                        desc: 'Luôn cập nhật công nghệ và xu hướng mới.'
                     },
                     {
                        title: 'Khách hàng',
                        desc: 'Lấy khách hàng làm trung tâm trong mọi quyết định.'
                     }
                  ].map((item, i) => (
                     <motion.div
                        key={i}
                        whileHover={{ y: -4 }}
                        className='rounded-2xl border border-gray-200 p-6 transition'
                     >
                        <h3 className='mb-2 text-lg font-medium tracking-tight'>{item.title}</h3>
                        <p className='text-extra-gray text-sm leading-relaxed'>{item.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </section>

            {/* DIVIDER */}
            <div className='mx-auto max-w-5xl border-t border-gray-200' />

            {/* MISSION */}
            <section className='mx-auto max-w-3xl px-6 py-20 text-center'>
               <h2 className='mb-4 text-2xl font-medium tracking-tight'>Sứ mệnh</h2>
               <p className='text-extra-gray leading-relaxed'>
                  Giúp mọi người tiếp cận công nghệ hiện đại với giá trị tốt nhất, nâng cao hiệu
                  suất làm việc và chất lượng cuộc sống.
               </p>
            </section>
         </BodyContent>
      </Container>
   )
}
