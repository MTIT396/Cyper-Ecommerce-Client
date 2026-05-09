'use client'

import Button from '@/components/shared/Button'
import FormWrapper from '@/components/shared/FormWrapper'
import PasswordFormField from '@/components/shared/PasswordFormField'
import TextFormField from '@/components/shared/TextFormField'
import { useAuthQuery } from '@/hooks/useAuthQuery'
import { useGoogleLogin } from '@/hooks/useGoogleLogin'
import { LoginRequest } from '@/types/auth.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, LogIn, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FadeMotionWrapper } from '@/components/shared/FadeMotionWrapper'
import { FadeMotionItem } from '@/components/shared/FadeMotionItem'
import { FadeUpVariants } from '@/lib/variants'
const loginSchema = z.object({
   email: z.string().email('Invalid Email'),
   password: z.string().min(6, 'Password must be at least 6 characters')
})

export default function LoginForm() {
   // use hook
   const { login, isLoggingIn } = useAuthQuery()
   const { handleGoogleLogin, isLoggingIn: isGoogleLoggingIn } = useGoogleLogin()

   // use form
   const form = useForm<LoginRequest>({
      resolver: zodResolver(loginSchema)
   })

   // other functions
   const handleSubmit = (data: LoginRequest) => {
      login(data)
   }

   return (
      <div className='flex w-full items-center justify-center p-4'>
         <div className='bg-light-gray relative h-[90vh] w-full max-w-xl overflow-hidden rounded-2xl border border-gray-300 shadow-xl'>
            <FadeMotionWrapper className='flex h-full flex-col items-center shadow-2xl'>
               <div className='flex w-full items-center justify-center p-10'>
                  <div className='w-full max-w-md'>
                     {/* HEADING TEXT */}
                     <FadeMotionItem variants={FadeUpVariants} className='mb-8 text-center'>
                        <Image
                           width={120}
                           height={120}
                           src='/Logo.png'
                           alt='Logo'
                           className='mx-auto object-contain'
                        />
                        <h2 className='text-dark-gray mt-6 mb-1 text-2xl font-bold'>
                           Chào mừng đến với Cyper!
                        </h2>
                        <p className='text-extra-gray'>
                           Đăng nhập vào tài khoản Cyber ​​Store của bạn
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
                                 leftAddon={<User />}
                              />
                           </FadeMotionItem>

                           {/* Password field */}
                           <FadeMotionItem variants={FadeUpVariants} delay={0.2}>
                              <PasswordFormField
                                 name='password'
                                 label='Mật khẩu'
                                 placeholder='Nhập mật khẩu của bạn'
                                 className='rounded-full py-1.5'
                                 required
                                 leftAddon={<Lock />}
                              />
                           </FadeMotionItem>

                           {/* Login button */}
                           <FadeMotionItem variants={FadeUpVariants} delay={0.3}>
                              <Button
                                 disabled={isLoggingIn}
                                 isLoading={isLoggingIn}
                                 loadingText='Đang đăng nhập...'
                                 className='w-full rounded-full py-2.5 text-[15px]'
                              >
                                 <LogIn size={16} />
                                 Đăng nhập
                              </Button>
                           </FadeMotionItem>

                           {/* Divider */}
                           <div className='relative'>
                              <div className='absolute inset-0 flex items-center'>
                                 <div className='w-full border-t border-gray-300'></div>
                              </div>
                              <div className='relative flex items-center justify-center text-sm'>
                                 <span className='bg-light-gray text-extra-gray px-2'>
                                    hoặc tiếp tục với
                                 </span>
                              </div>
                           </div>

                           {/* Google login button */}
                           <FadeMotionItem variants={FadeUpVariants} delay={0.4}>
                              <Button
                                 onClick={handleGoogleLogin}
                                 disabled={isGoogleLoggingIn}
                                 isLoading={isGoogleLoggingIn}
                                 loadingText='Đang đăng nhập...'
                                 className='bg-light-gray/50 hover:bg-light-gray text-dark-gray w-full rounded-full border border-gray-300 py-2.5 text-[15px]'
                              >
                                 <Image src='/google.svg' alt='Google' width={20} height={20} />
                                 Tiếp tục với Google
                              </Button>
                           </FadeMotionItem>
                        </FormWrapper>
                     </FadeMotionWrapper>

                     <FadeMotionItem
                        variants={FadeUpVariants}
                        className='mt-6 flex items-center justify-center gap-1'
                     >
                        <span className='text-extra-gray text-sm'>Chưa có tài khoản?</span>
                        <Link href='/auth/register' className='text-sm font-semibold underline'>
                           Tạo tài khoản ngay
                        </Link>
                     </FadeMotionItem>
                  </div>
               </div>
            </FadeMotionWrapper>
         </div>
      </div>
   )
}
