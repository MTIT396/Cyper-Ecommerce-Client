'use client'

import Button from '@/components/shared/Button'
import FormWrapper from '@/components/shared/FormWrapper'
import PasswordFormField from '@/components/shared/PasswordFormField'
import TextFormField from '@/components/shared/TextFormField'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuthQuery } from '@/hooks/useAuthQuery'
import { RegisterRequest } from '@/types/auth.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Lock, Mail, User } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { FadeMotionWrapper } from '@/components/shared/FadeMotionWrapper'
import { FadeMotionItem } from '@/components/shared/FadeMotionItem'
import { FadeUpVariants } from '@/lib/variants'

const registerSchema = z.object({
   email: z.string().email('Email không hợp lệ'),
   username: z.string().min(6, 'Tên người dùng phải có ít nhất 6 ký tự.'),
   password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự.')
})

export default function RegisterForm() {
   const [isAccepted, setIsAccepted] = useState<boolean>(false)
   const { register, isRegistering } = useAuthQuery()

   const form = useForm<RegisterRequest>({
      resolver: zodResolver(registerSchema)
   })

   const handleSubmit = (data: RegisterRequest) => {
      if (!isAccepted) {
         toast.error('Vui lòng chấp nhận chính sách của Cyper trước khi tiếp tục.', {
            id: 'policy-error'
         })
         return
      }
      // call register API
      register(data)
   }

   return (
      <div className='flex w-full items-center justify-center p-4'>
         <div className='bg-light-gray relative h-[90vh] w-full max-w-xl overflow-hidden rounded-2xl border border-gray-300 shadow-xl'>
            <FadeMotionWrapper className='flex h-full flex-col items-center shadow-2xl'>
               {/* FORM COLOUMN - LEFT SIDE */}
               <div className='flex items-center justify-center p-10'>
                  <div className='w-full max-w-md'>
                     {/* HEADING TEXT */}
                     <FadeMotionItem variants={FadeUpVariants} className='mb-8 text-center'>
                        <Image
                           width={120}
                           height={120}
                           src='/Logo.png'
                           alt='People using mobile devices'
                           className='mx-auto object-contain'
                        />
                        <h2 className='text-dark-gray mt-6 mb-2 text-2xl font-bold'>
                           Tạo tài khoản Cyper!
                        </h2>
                        <p className='text-extra-gray'>
                           Tham gia Cyber ​​Store và bắt đầu mua sắm!
                        </p>
                     </FadeMotionItem>

                     {/* FORM */}
                     <FadeMotionWrapper mode='normal'>
                        <FormWrapper form={form} onSubmit={handleSubmit} className='mt-4 space-y-4'>
                           {/* Email field */}
                           <FadeMotionItem variants={FadeUpVariants} delay={0.1}>
                              <TextFormField
                                 name='email'
                                 type='email'
                                 label='Email'
                                 placeholder='Nhập email của bạn'
                                 required
                                 className='rounded-full py-1.5'
                                 leftAddon={<Mail />}
                              />
                           </FadeMotionItem>

                           {/* Username field */}
                           <FadeMotionItem variants={FadeUpVariants} delay={0.2}>
                              <TextFormField
                                 name='username'
                                 type='text'
                                 label='Họ và tên'
                                 placeholder='Nhập họ và tên của bạn'
                                 required
                                 className='rounded-full py-1.5'
                                 leftAddon={<User />}
                              />
                           </FadeMotionItem>

                           {/* Password field */}
                           <FadeMotionItem variants={FadeUpVariants} delay={0.3}>
                              <PasswordFormField
                                 name='password'
                                 label='Mật khẩu'
                                 placeholder='Nhập mật khẩu của bạn'
                                 className='rounded-full py-1.5'
                                 required
                                 leftAddon={<Lock />}
                              />
                           </FadeMotionItem>

                           {/* Terms & Conditions checkbox */}
                           <FadeMotionItem variants={FadeUpVariants} delay={0.4}>
                              <div className='flex items-center gap-x-2'>
                                 <Checkbox
                                    id='terms'
                                    checked={isAccepted}
                                    onCheckedChange={(v) => setIsAccepted(!!v)}
                                    className='border-dark-gray size-4 border'
                                 />
                                 <label
                                    htmlFor='terms'
                                    className='text-sm text-gray-800/90 select-none'
                                 >
                                    <span>Bằng cách tiếp tục, tôi đồng ý với </span>
                                    <span className='font-semibold underline'>
                                       Điều khoản dịch vụ{' '}
                                    </span>
                                    và
                                    <span className='font-semibold underline'>
                                       {' '}
                                       Chính sách bảo mật
                                    </span>{' '}
                                    của Cyper Store.
                                 </label>
                              </div>
                           </FadeMotionItem>

                           {/* Sign up button */}
                           <FadeMotionItem variants={FadeUpVariants} delay={0.5}>
                              <Button
                                 className='w-full rounded-full py-2.5'
                                 disabled={isRegistering}
                              >
                                 {isRegistering ? (
                                    <div className='flex items-center gap-1.5'>
                                       <Loader2 className='size-4 animate-spin' />
                                       Đang tạo...
                                    </div>
                                 ) : (
                                    'Tạo tài khoản'
                                 )}
                              </Button>
                           </FadeMotionItem>
                        </FormWrapper>
                     </FadeMotionWrapper>
                  </div>
               </div>
            </FadeMotionWrapper>
         </div>
      </div>
   )
}
