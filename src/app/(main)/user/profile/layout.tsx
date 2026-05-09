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
   Shield
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
import CountCard from '@/components/features/profile/CountCard'

import { formatVNCurrency } from '@/lib/utils'
import { CheckoutStatus } from '@/types/order.type'
import { SIDEBAR_ITEMS } from '@/constants/constants'

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
      <div className='bg-light-gray min-h-screen'>
         <Container>
            <BodyContent className='space-y-6'>
               {/* HERO PROFILE */}
               <Card className='overflow-hidden rounded-[32px] border-0 bg-white shadow-sm'>
                  <CardContent>
                     <div className='relative mt-10 px-5 py-8 sm:mt-0 sm:px-8'>
                        <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
                           {/* LEFT */}
                           <div className='flex flex-col gap-5 sm:flex-row sm:items-end'>
                              {/* avatar */}
                              <div className='relative -mt-14 size-26 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg sm:size-26'>
                                 <Image
                                    src={user.avatar || '/images/default-avt.jpg'}
                                    alt={user.username}
                                    fill
                                    className='object-cover'
                                 />
                              </div>

                              {/* info */}
                              <div className='space-y-3'>
                                 <div>
                                    <h1 className='text-3xl font-bold tracking-tight'>
                                       {user.username}
                                    </h1>

                                    <div className='text-extra-gray mt-2 flex flex-wrap items-center gap-3 text-sm'>
                                       <div className='flex items-center gap-1.5'>
                                          <Mail className='size-4' />
                                          {user.email}
                                       </div>

                                       <Badge className='border-green-200 bg-green-50 text-green-600 hover:bg-green-50'>
                                          <ShieldCheck className='mr-1 size-4' />
                                          {user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
                                       </Badge>
                                    </div>
                                 </div>

                                 <div className='text-extra-gray text-sm'>
                                    Thành viên từ{' '}
                                    {user.created_at &&
                                       new Date(user.created_at).toLocaleDateString('vi-VN')}
                                 </div>
                              </div>
                           </div>

                           {/* ACTIONS */}
                           <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                              <Button variant='icon' onClick={() => setEditProfileOpen(true)}>
                                 <User className='size-4' />
                                 Cập nhật hồ sơ
                              </Button>

                              <Button
                                 variant='secondary'
                                 onClick={() => setChangePasswordOpen(true)}
                              >
                                 <Shield className='size-4' />
                                 Đổi mật khẩu
                              </Button>
                           </div>
                        </div>

                        {/* STATS */}
                        <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                           <CountCard
                              title='Đơn hàng'
                              icon={Package}
                              count={orders?.data?.length || 0}
                           />

                           <CountCard title='Yêu thích' icon={Heart} count={wishlist.length || 0} />

                           <CountCard
                              title='Tổng chi tiêu'
                              icon={Receipt}
                              count={formatVNCurrency(totalCost)}
                           />
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* CONTENT */}
               <div className='grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]'>
                  {/* MOBILE MENU */}
                  <div className='lg:hidden'>
                     <Button
                        variant='outline'
                        onClick={() => setIsSidebarOpen(true)}
                        className='h-12 w-full justify-start rounded-2xl bg-white'
                     >
                        <LayoutDashboard className='mr-2 size-5' />
                        Menu tài khoản
                     </Button>
                  </div>

                  {/* SIDEBAR */}
                  <aside
                     className={`fixed inset-y-0 left-0 z-[20] w-[300px] bg-white p-5 transition-transform duration-300 lg:sticky lg:top-6 lg:h-fit lg:translate-x-0 lg:rounded-3xl lg:shadow-sm ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} `}
                  >
                     {/* mobile header */}
                     <div className='mb-6 flex items-center justify-between lg:hidden'>
                        <h2 className='text-xl font-bold'>Menu</h2>

                        <Button
                           onClick={() => setIsSidebarOpen(false)}
                           className='size-9 rounded-full'
                        >
                           <X className='size-4' />
                        </Button>
                     </div>

                     {/* nav */}
                     <div className='space-y-2'>
                        {SIDEBAR_ITEMS.map((item, index) => {
                           const Icon = item.icon

                           const isActive = pathname === item.href

                           return (
                              <Link
                                 key={index}
                                 href={item.href}
                                 onClick={() => setIsSidebarOpen(false)}
                                 className={`group flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-200 ${
                                    isActive
                                       ? 'border-red-100 bg-red-50 text-red-600 shadow-sm'
                                       : 'border-transparent hover:border-red-100 hover:bg-red-50 hover:text-red-500'
                                 } `}
                              >
                                 <Icon className='size-5 shrink-0' />

                                 <span className='flex-1 font-medium'>{item.label}</span>

                                 <ChevronRight
                                    className={`size-4 transition-transform duration-200 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'} `}
                                 />
                              </Link>
                           )
                        })}
                     </div>

                     {/* logout */}
                     <div className='mt-6 border-t pt-6'>
                        <Button
                           variant='outline'
                           size='lg'
                           onClick={() => {
                              logout()
                              setIsSidebarOpen(false)
                           }}
                           className='w-full justify-start rounded-2xl border-none border-red-100 text-base text-red-500 shadow-none hover:bg-red-50'
                        >
                           <LogOut className='size-5' />
                           Đăng xuất
                        </Button>
                     </div>
                  </aside>

                  {/* OVERLAY */}
                  {isSidebarOpen && (
                     <div
                        className='fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden'
                        onClick={() => setIsSidebarOpen(false)}
                     />
                  )}

                  {/* MAIN CONTENT */}
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
