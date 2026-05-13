'use client'

import Container from '@/components/Container'
import { NAVIGATIONS, SIDEBAR_ITEMS } from '@/constants/constants'
import { Handbag, Heart, LogOut, TextAlignJustify, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import CategoryBar from './CategoryBar'
import SearchBar from '@/components/shared/SearchbarPopover'
import { useAuth } from '@/hooks/useAuth'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { useAuthQuery } from '@/hooks/useAuthQuery'
import { useCartQuery } from '@/hooks/useCartQuery'
import { useWishlistQuery } from '@/hooks/useWishlistQuery'
import CartSheet from '@/components/features/cart/CartSheet'
import Button from '@/components/shared/Button'
import SidebarSheet from './SidebarSheet'
import NavItem from '@/components/shared/NavItem'
import { useState } from 'react'

// --- Main Header ---
const Header = () => {
   const [openSidebar, setOpenSidebar] = useState(false)
   const { isAuthenticated, user } = useAuth()
   const { cart } = useCartQuery()
   const { wishlist } = useWishlistQuery()
   const { logout } = useAuthQuery()
   const handleLogout = () => {
      logout()
   }
   return (
      <header className='fixed inset-0 z-50 h-18 bg-white shadow-xl'>
         <Container className='flex h-full cursor-pointer items-center justify-between'>
            <div className='flex items-center gap-4'>
               <SidebarSheet open={openSidebar} onOpenChange={setOpenSidebar}>
                  <Button
                     variant='icon'
                     className='block h-fit w-fit border-none p-4 shadow-none lg:hidden'
                  >
                     <TextAlignJustify className='size-6' />
                  </Button>
               </SidebarSheet>
               <Link href='/' className='shrink-0'>
                  <Image src='/Logo.png' alt='logo' width={96} height={32} />
               </Link>
            </div>

            {/* Search bar */}
            <SearchBar className='relative hidden w-full max-w-[433px] xl:block' />

            {/* Nav */}
            <nav className='hidden items-center gap-10 lg:flex'>
               {NAVIGATIONS.map((nav) => (
                  <NavItem key={nav.id} href={nav.link} label={nav.label} />
               ))}
            </nav>

            {/* Actions */}

            <div className='text-extra-gray flex items-center gap-6'>
               {/* Wishlist */}
               <Link href='/user/profile/wishlist'>
                  <span className='relative'>
                     {!!wishlist.length && (
                        <span className='absolute -top-2.5 -right-2.5 flex size-5 cursor-pointer items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white'>
                           {wishlist.length}
                        </span>
                     )}
                     <Heart className='hover:text-dark-gray size-6 cursor-pointer transition' />
                  </span>
               </Link>

               {/* Cart */}
               <CartSheet>
                  <span className='relative'>
                     {!!cart?.items?.length && (
                        <span className='absolute -top-2.5 -right-2.5 flex size-5 cursor-pointer items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white'>
                           {cart?.items.length}
                        </span>
                     )}
                     <Handbag className='hover:text-dark-gray size-6 cursor-pointer transition' />
                  </span>
               </CartSheet>

               {/* User */}
               {isAuthenticated ? (
                  <HoverCard openDelay={0} closeDelay={0}>
                     <Link href='/user/profile'>
                        <HoverCardTrigger asChild>
                           <div className='flex cursor-pointer items-center gap-x-2'>
                              <div className='size-11'>
                                 <Image
                                    width={40}
                                    height={40}
                                    alt={user?.username || 'avatar'}
                                    src={user?.avatar || '/images/default-avt.jpg'}
                                    className='border-extra-gray h-full w-full rounded-full border object-cover p-[2px]'
                                 />
                              </div>
                              <div className='hidden flex-col sm:flex'>
                                 <span className='text-dark-gray text-xs'>Xin chào!</span>
                                 <span className='line-clamp-1 max-w-20 text-sm text-black'>
                                    {user?.username}
                                 </span>
                              </div>
                           </div>
                        </HoverCardTrigger>
                     </Link>

                     <HoverCardContent>
                        <div className='my-2 border-b px-2 pr-16 pb-2'>
                           <h1 className='text-sm leading-3 text-black'>{user?.username}</h1>
                           <span className='text-extra-gray text-xs'>{user?.email}</span>
                        </div>

                        <div className='mb-2 border-b pb-2'>
                           {SIDEBAR_ITEMS.map(({ icon: Icon, label, href }) => (
                              <Link key={label} href={href}>
                                 <div className='text-dark-gray hover:bg-input/50 flex cursor-pointer items-center gap-x-2 rounded-md px-2 py-2.5 text-sm transition-colors'>
                                    <Icon size={18} />
                                    {label}
                                 </div>
                              </Link>
                           ))}
                        </div>

                        <Button
                           variant='outline'
                           size='lg'
                           onClick={handleLogout}
                           className='h-fit w-full justify-start rounded-md border-none border-red-100 px-2 py-2.5 text-sm text-red-500 shadow-none hover:bg-red-50'
                        >
                           <LogOut className='size-5' />
                           Đăng xuất
                        </Button>
                     </HoverCardContent>
                  </HoverCard>
               ) : (
                  <Link
                     href={'/auth/login'}
                     className='hover:text-dark-gray flex cursor-pointer items-center gap-x-2 transition'
                  >
                     <User size={22} />
                  </Link>
               )}
            </div>
         </Container>
         <CategoryBar />
      </header>
   )
}

export default Header
