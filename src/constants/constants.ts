import { Heart, History, LayoutDashboard, MapPinned } from 'lucide-react'
import { CgScreen } from 'react-icons/cg'
import { IoPhonePortraitOutline } from 'react-icons/io5'
import { PiTelevisionSimpleLight } from 'react-icons/pi'
import { RxLaptop } from 'react-icons/rx'
import { TbDeviceAirpods, TbDeviceIpad, TbDeviceWatch } from 'react-icons/tb'

export const CategoriesList = [
   {
      id: 1,
      name: 'Laptop',
      slug: 'laptop',
      icon: RxLaptop,
      image: '/images/laptop_bg.jpg'
   },
   {
      id: 2,
      name: 'Điện thoại',
      slug: 'smartphones',
      icon: IoPhonePortraitOutline,
      image: '/images/iphone_bg.jpg'
   },
   {
      id: 6,
      slug: 'ipad',
      name: 'Ipad',
      icon: TbDeviceIpad,
      image: '/images/ipad_bg.jpg'
   },
   {
      id: 4,
      slug: 'tivi',
      name: 'Tivi',
      icon: PiTelevisionSimpleLight,
      image: '/images/tivi_bg.jpg'
   },
   {
      id: 3,
      name: 'Đồng hồ',
      slug: 'smartwatches',
      icon: TbDeviceWatch,
      image: '/images/smart_watches_bg.jpg'
   },

   {
      id: 5,
      slug: 'screen',
      name: 'Màn hình',
      icon: CgScreen,
      image: '/images/screen_bgd.jpg'
   },

   {
      id: 7,
      name: 'Tai nghe',
      slug: 'headphones',
      icon: TbDeviceAirpods,
      image: '/images/airpods_bgd.jpg'
   }
]

export const NAVIGATIONS = [
   {
      id: 'home',
      label: 'Trang chủ',
      link: '/'
   },

   {
      id: 'about',
      label: 'Về chúng tôi',
      link: '/about'
   },
   {
      id: 'contact',
      label: 'Liên hệ',
      link: '/contact'
   },
   {
      id: 'sale',
      label: 'SALE 30%',
      link: '/sale'
   }
]

export const SIDEBAR_ITEMS = [
   {
      icon: LayoutDashboard,
      label: 'Tổng quan',
      href: '/user/profile'
   },
   {
      icon: History,
      label: 'Lịch sử mua hàng',
      href: '/user/profile/order'
   },
   {
      icon: Heart,
      label: 'Sản phẩm yêu thích',
      href: '/user/profile/wishlist'
   },
   {
      icon: MapPinned,
      label: 'Sổ địa chỉ',
      href: '/user/profile/address'
   }
]
