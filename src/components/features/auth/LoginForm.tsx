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
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
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
      <div className='flex h-full items-center justify-center p-5 sm:p-8 lg:p-10'>
         <FadeMotionWrapper className='w-full max-w-md'>
            {/* HEADING */}
            <FadeMotionItem variants={FadeUpVariants} className='mb-6 text-center'>
               <div className='mb-4 flex justify-center lg:hidden'>
                  <Image
                     width={80}
                     height={80}
                     src='/Logo.png'
                     alt='Logo'
                     className='object-contain'
                  />
               </div>

               <h2 className='text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl'>
                  Chào mừng trở lại
               </h2>

               <p className='mt-2 text-sm text-zinc-500'>Đăng nhập để tiếp tục mua sắm</p>
            </FadeMotionItem>

            {/* FORM */}
            <FadeMotionWrapper mode='normal'>
               <FormWrapper form={form} onSubmit={handleSubmit} className='space-y-4'>
                  {/* EMAIL */}
                  <FadeMotionItem variants={FadeUpVariants} delay={0.1}>
                     <TextFormField
                        name='email'
                        type='email'
                        label='Email'
                        placeholder='Nhập email của bạn'
                        required
                        className='h-11 rounded-2xl border-zinc-200 bg-zinc-50 px-4 text-sm transition-all focus:border-black focus:bg-white'
                        leftAddon={<User size={18} />}
                     />
                  </FadeMotionItem>

                  {/* PASSWORD */}
                  <FadeMotionItem variants={FadeUpVariants} delay={0.2}>
                     <PasswordFormField
                        name='password'
                        label='Mật khẩu'
                        placeholder='Nhập mật khẩu của bạn'
                        className='h-11 rounded-2xl border-zinc-200 bg-zinc-50 px-4 text-sm transition-all focus:border-black focus:bg-white'
                        required
                        leftAddon={<Lock size={18} />}
                     />
                  </FadeMotionItem>

                  {/* OPTIONS */}
                  <FadeMotionItem
                     variants={FadeUpVariants}
                     delay={0.25}
                     className='flex items-center justify-between'
                  >
                     <Label
                        htmlFor='remember-login'
                        className='text-dark-gray flex cursor-pointer items-center gap-2 font-normal'
                     >
                        <Checkbox id='remember-login' />
                        Ghi nhớ đăng nhập
                     </Label>

                     <Link
                        href='/forgot-password'
                        className='text-xs font-medium text-black hover:underline sm:text-sm'
                     >
                        Quên mật khẩu?
                     </Link>
                  </FadeMotionItem>

                  {/* LOGIN BUTTON */}
                  <FadeMotionItem variants={FadeUpVariants} delay={0.3}>
                     <Button
                        disabled={isLoggingIn}
                        isLoading={isLoggingIn}
                        loadingText='Đang đăng nhập...'
                        className='h-11 w-full rounded-2xl bg-black text-sm font-semibold text-white shadow-lg transition-all hover:bg-zinc-900'
                     >
                        <LogIn size={17} />
                        Đăng nhập
                     </Button>
                  </FadeMotionItem>

                  {/* DIVIDER */}
                  <div className='relative py-1'>
                     <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-zinc-200'></div>
                     </div>

                     <div className='relative flex justify-center text-xs sm:text-sm'>
                        <span className='bg-white px-3 text-zinc-400'>hoặc tiếp tục với</span>
                     </div>
                  </div>

                  {/* GOOGLE */}
                  <FadeMotionItem variants={FadeUpVariants} delay={0.4}>
                     <Button
                        onClick={handleGoogleLogin}
                        disabled={isGoogleLoggingIn}
                        isLoading={isGoogleLoggingIn}
                        loadingText='Đang đăng nhập...'
                        className='h-11 w-full rounded-2xl border border-zinc-200 bg-white text-sm font-medium text-zinc-700 shadow-sm transition-all hover:bg-zinc-50'
                     >
                        <Image src='/google.svg' alt='Google' width={18} height={18} />
                        Tiếp tục với Google
                     </Button>
                  </FadeMotionItem>
               </FormWrapper>
            </FadeMotionWrapper>

            {/* FOOTER */}
            <FadeMotionItem variants={FadeUpVariants} className='mt-6 text-center'>
               <span className='text-xs text-zinc-500 sm:text-sm'>Chưa có tài khoản?</span>

               <Link
                  href='/auth/register'
                  className='ml-1 text-xs font-semibold text-black hover:underline sm:text-sm'
               >
                  Tạo tài khoản ngay
               </Link>
            </FadeMotionItem>
         </FadeMotionWrapper>
      </div>
   )
}
