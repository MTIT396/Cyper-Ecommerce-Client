'use client'

import { ReactNode, useMemo, useState } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import {
   LayoutDashboard,
   Receipt,
   Heart,
   ChevronRight,
   LogOut,
   Mail,
   Package,
   ShieldCheck,
   X,
   User,
   Shield,
   CalendarDays
} from 'lucide-react'

import Container from '@/components/Container'
import BodyContent from '@/components/shared/BodyContent'
import Button from '@/components/shared/Button'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'

import { useAuth } from '@/hooks/useAuth'
import { useAuthQuery } from '@/hooks/useAuthQuery'
import { useOrders } from '@/hooks/useOrderQuery'
import { useWishlistQuery } from '@/hooks/useWishlistQuery'

import { EditProfileDialog } from '@/components/features/profile/EditProfileDialog'
import { ChangePasswordDialog } from '@/components/features/profile/ChangePasswordDialog'

import { formatVNCurrency } from '@/lib/utils'
import { CheckoutStatus } from '@/types/order.type'
import { SIDEBAR_ITEMS } from '@/constants/constants'
import StatCard from './StatCard'

interface Props {
   children: ReactNode
}

export default function ProfileLayout({ children }: Props) {
   const pathname = usePathname()

   const { user } = useAuth()

   const { logout } = useAuthQuery()

   const { wishlist } = useWishlistQuery()

   const { orders } = useOrders(1, 10)

   const [isSidebarOpen, setIsSidebarOpen] = useState(false)

   const [editProfileOpen, setEditProfileOpen] = useState(false)

   const [changePasswordOpen, setChangePasswordOpen] = useState(false)

   const totalCost = useMemo(() => {
      return (
         orders?.data
            ?.filter((order) => order.status === CheckoutStatus.completed)
            ?.reduce((total, order) => total + (order.total_amount || 0), 0) || 0
      )
   }, [orders])

   if (!user) {
      return (
         <Container>
            <BodyContent className='space-y-6'>
               <Skeleton className='h-40 w-full rounded-3xl' />
               <Skeleton className='h-[700px] w-full rounded-3xl' />
            </BodyContent>
         </Container>
      )
   }

   return (
      <div className='bg-light-gray/80 min-h-screen'>
         <Container>
            <BodyContent className='space-y-6'>
               {/* HERO */}
               <Card className='overflow-hidden rounded-[32px] border border-zinc-200 bg-white'>
                  <CardContent className='px-5 py-8 sm:px-8'>
                     <div className='flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
                        {/* LEFT */}
                        <div className='flex flex-col gap-5 sm:flex-row sm:items-end'>
                           {/* AVATAR */}
                           <div className='group relative my-auto'>
                              <div className='relative size-32 overflow-hidden rounded-full border-[6px] border-white bg-zinc-100 shadow-xl'>
                                 <Image
                                    src={user.avatar || '/images/default-avt.jpg'}
                                    alt={user.username}
                                    fill
                                    className='object-cover transition duration-500 group-hover:scale-105'
                                 />
                              </div>
                           </div>

                           {/* INFO */}
                           <div className='space-y-4'>
                              <div className='space-y-3'>
                                 <div className='flex flex-wrap items-center gap-6'>
                                    <h1 className='text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl'>
                                       {user.username}
                                    </h1>

                                    <Badge className='border-blue-200 bg-blue-50 font-semibold text-blue-700'>
                                       <ShieldCheck className='mr-1 size-4' />
                                       {user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
                                    </Badge>
                                 </div>

                                 <div className='flex flex-wrap items-center gap-4 text-sm text-zinc-500'>
                                    <div className='flex items-center gap-2'>
                                       <div className='flex size-8 items-center justify-center rounded-full bg-zinc-100'>
                                          <Mail className='size-4' />
                                       </div>

                                       <span>{user.email}</span>
                                    </div>

                                    <div className='flex items-center gap-2'>
                                       <div className='flex size-8 items-center justify-center rounded-full bg-zinc-100'>
                                          <CalendarDays className='size-4' />
                                       </div>

                                       <span>
                                          Tham gia vào{' '}
                                          {user.created_at &&
                                             new Date(user.created_at).toLocaleDateString('vi-VN')}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                              {/* STATS */}
                              <div className='grid grid-cols-2 gap-4 lg:flex lg:flex-row lg:items-center'>
                                 <StatCard
                                    title='Đơn hàng'
                                    icon={Package}
                                    stat={orders?.data?.length || 0}
                                 />

                                 <StatCard
                                    title='Yêu thích'
                                    icon={Heart}
                                    stat={wishlist.length || 0}
                                 />

                                 <StatCard
                                    title='Tổng chi tiêu'
                                    icon={Receipt}
                                    stat={formatVNCurrency(totalCost)}
                                 />
                              </div>
                           </div>
                        </div>

                        {/* ACTIONS */}
                        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                           <Button onClick={() => setEditProfileOpen(true)} className='px-8'>
                              <User className='size-4' />
                              Cập nhật hồ sơ
                           </Button>

                           <Button
                              variant='outline'
                              onClick={() => setChangePasswordOpen(true)}
                              className='px-8'
                           >
                              <Shield className='size-4' />
                              Đổi mật khẩu
                           </Button>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* CONTENT */}
               <div className='grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]'>
                  {/* MOBILE */}
                  <div className='lg:hidden'>
                     <Button
                        variant='outline'
                        onClick={() => setIsSidebarOpen(true)}
                        className='h-12 w-full justify-start rounded-2xl border-zinc-200 bg-white shadow-sm'
                     >
                        <LayoutDashboard className='mr-2 size-5' />
                        Menu tài khoản
                     </Button>
                  </div>

                  {/* SIDEBAR */}
                  <aside
                     className={`fixed inset-y-0 left-0 z-50 w-[300px] bg-white p-5 shadow transition-transform duration-300 sm:z-40 lg:sticky lg:top-6 lg:h-fit lg:translate-x-0 lg:rounded-[32px] lg:border lg:border-zinc-200 lg:shadow-md ${
                        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                     }`}
                  >
                     <div className='flex h-full flex-col'>
                        {/* mobile header */}
                        <div className='mb-6 flex items-center justify-between lg:hidden'>
                           <h2 className='text-xl font-bold text-zinc-900'>Menu</h2>

                           <Button
                              variant='outline'
                              onClick={() => setIsSidebarOpen(false)}
                              className='size-10 rounded-full border-none text-zinc-700 shadow-none'
                           >
                              <X className='size-4' />
                           </Button>
                        </div>

                        {/* user mini */}
                        <div className='mb-6 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4'>
                           <div className='relative size-14 overflow-hidden rounded-full'>
                              <Image
                                 src={user.avatar || '/images/default-avt.jpg'}
                                 alt={user.username}
                                 fill
                                 className='object-cover'
                              />
                           </div>

                           <div className='min-w-0 flex-1'>
                              <h3 className='truncate font-semibold text-zinc-900'>
                                 {user.username}
                              </h3>

                              <p className='truncate text-sm text-zinc-500'>{user.email}</p>
                           </div>
                        </div>

                        {/* nav */}
                        <div className='space-y-2.5'>
                           {SIDEBAR_ITEMS.map((item, index) => {
                              const Icon = item.icon

                              const isActive = pathname === item.href

                              return (
                                 <Link
                                    key={index}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
                                       isActive
                                          ? 'bg-zinc-900 text-white shadow-lg'
                                          : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                                    }`}
                                 >
                                    <Icon className='size-5 shrink-0' />

                                    <span className='flex-1 font-medium'>{item.label}</span>

                                    <ChevronRight
                                       className={`size-4 transition-transform duration-200 ${
                                          isActive ? 'translate-x-1' : 'group-hover:translate-x-1'
                                       }`}
                                    />
                                 </Link>
                              )
                           })}
                        </div>

                        {/* logout */}
                        <div className='mt-auto border-t border-zinc-100 pt-6'>
                           <Button
                              variant='outline'
                              size='lg'
                              onClick={() => {
                                 logout()
                                 setIsSidebarOpen(false)
                              }}
                              className='h-12 w-full justify-start rounded-2xl border-red-200 bg-red-50 text-red-600 hover:border-red-100 hover:bg-red-50'
                           >
                              <LogOut className='size-5' />
                              Đăng xuất
                           </Button>
                        </div>
                     </div>
                  </aside>

                  {/* OVERLAY */}
                  {isSidebarOpen && (
                     <div
                        className='fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden'
                        onClick={() => setIsSidebarOpen(false)}
                     />
                  )}

                  {/* MAIN */}
                  <main className='min-h-[700px]'>{children}</main>
               </div>

               {/* DIALOGS */}
               <EditProfileDialog
                  defaultValues={{
                     username: user.username,
                     avatar: user.avatar
                  }}
                  isOpen={editProfileOpen}
                  onOpenChange={setEditProfileOpen}
               />

               <ChangePasswordDialog
                  isOpen={changePasswordOpen}
                  onOpenChange={setChangePasswordOpen}
               />
            </BodyContent>
         </Container>
      </div>
   )
}
