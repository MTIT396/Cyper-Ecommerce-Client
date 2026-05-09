'use client'
import Container from '@/components/Container'
import BodyContent from '@/components/shared/BodyContent'
import { FadeMotionItem } from '@/components/shared/FadeMotionItem'
import { FadeUpVariants } from '@/lib/variants'

export default function ContactPage() {
   return (
      <Container>
         <BodyContent>
            {/* HERO */}
            <section className='mx-auto max-w-5xl px-6 py-10 text-center'>
               <FadeMotionItem
                  variants={FadeUpVariants}
                  className='mb-6 text-5xl font-semibold tracking-tight'
               >
                  Liên hệ với Cyper
               </FadeMotionItem>
               <FadeMotionItem variants={FadeUpVariants}>
                  <p className='mx-auto max-w-xl text-lg leading-relaxed text-gray-500'>
                     Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy gửi thông tin và Cyper sẽ phản hồi sớm
                     nhất.
                  </p>
               </FadeMotionItem>
            </section>

            {/* DIVIDER */}
            <div className='mx-auto max-w-5xl border-t border-gray-200' />

            {/* CONTACT CONTENT */}
            <section className='mx-auto max-w-5xl px-6 py-16'>
               {/* INFO */}
               <div className='mx-auto w-fit'>
                  <h2 className='mb-6 text-2xl font-medium tracking-tight'>Thông tin liên hệ</h2>

                  <div className='text-dark-gray space-y-4'>
                     <p>
                        <strong>Địa chỉ:</strong> TP. Hồ Chí Minh
                     </p>
                     <p>
                        <strong>Email:</strong> minhthienit39@gmail.com
                     </p>
                     <p>
                        <strong>Điện thoại:</strong> 0328077936
                     </p>
                  </div>
               </div>
            </section>

            {/* DIVIDER */}
            <div className='mx-auto max-w-5xl border-t border-gray-200' />

            {/* CTA */}
            <section className='mx-auto max-w-3xl px-6 py-20 text-center'>
               <h2 className='mb-4 text-2xl font-medium tracking-tight'>Bạn cần hỗ trợ nhanh?</h2>
               <p className='mb-6 leading-relaxed text-gray-600'>
                  Đội ngũ Cyper luôn sẵn sàng giải đáp mọi thắc mắc về sản phẩm và dịch vụ.
               </p>
            </section>
         </BodyContent>
      </Container>
   )
}
