'use client'

import Link from 'next/link'
import { FC } from 'react'
import Container from '@/components/Container'
import { FaFacebookF, FaInstagramSquare, FaTwitter } from 'react-icons/fa'
import Image from 'next/image'

interface FooterLink {
   label: string
   href: string
}

interface FooterSection {
   title: string
   links: FooterLink[]
}

interface SocialLink {
   icon: 'twitter' | 'facebook' | 'instagram'
   href: string
   label: string
}

interface FooterProps {
   companyName?: string
   companyDescription?: string
   sections?: FooterSection[]
   socialLinks?: SocialLink[]
   copyrightText?: string
}

const Footer: FC<FooterProps> = ({
   companyName = 'cyber',
   companyDescription = 'Chúng tôi là một công ty cung cấp sản phẩm công nghệ hàng đầu ở đặt tại Việt Nam.Đến Studio để được trải nghiệm sản phẩm thực tế hơn...',
   sections = [
      {
         title: 'Dịch vụ',
         links: [
            { label: 'Chương trình thưởng', href: '/bonus-program' },
            { label: 'Voucher', href: '/gift-cards' },
            { label: 'Tín dụng và thanh toán', href: '/credit-payment' },
            { label: 'Hợp đồng dịch vụ', href: '/service-contracts' },
            { label: 'Tài khoản không dùng tiền mặt', href: '/non-cash-account' }
         ]
      },
      {
         title: 'Hỗ trợ người mua',
         links: [
            { label: 'Tìm một đơn hàng', href: '/find-order' },
            { label: 'Điều khoản giao hàng', href: '/delivery-terms' },
            { label: 'Đổi trả hàng hóa', href: '/exchange-return' },
            { label: 'Bảo hành', href: '/guarantee' },
            { label: 'Câu hỏi thường gặp', href: '/faq' },
            { label: 'Điều khoản sử dụng trang web', href: '/terms' }
         ]
      }
   ],
   socialLinks = [
      { icon: 'twitter', href: 'https://twitter.com', label: 'Twitter' },
      { icon: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
      { icon: 'instagram', href: 'https://instagram.com', label: 'Instagram' }
   ],
   copyrightText
}) => {
   const getSocialIcon = (icon: string) => {
      const iconProps = { size: 20, strokeWidth: 1.5 }
      switch (icon) {
         case 'twitter':
            return <FaTwitter {...iconProps} />
         case 'facebook':
            return <FaFacebookF {...iconProps} />
         case 'instagram':
            return <FaInstagramSquare {...iconProps} />
         default:
            return null
      }
   }

   const currentYear = new Date().getFullYear()
   const copyright = copyrightText || `© ${currentYear} ${companyName}. All rights reserved.`

   return (
      <footer className='bg-black text-white'>
         <Container className='px-10 py-20'>
            {/* Main footer content */}
            <div className='mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12'>
               {/* Company info */}
               <div className='lg:col-span-1'>
                  <Link href='/' className='group mb-4 inline-flex items-center gap-2'>
                     <Image
                        className='shrink-0 cursor-pointer'
                        src='/Logo2.png'
                        alt='logo'
                        width={96}
                        height={32}
                     />
                  </Link>
                  <p className='text-extra-gray max-w-xs text-sm leading-relaxed'>
                     {companyDescription}
                  </p>
               </div>

               {/* Footer sections */}
               {sections.map((section, index) => (
                  <div key={index} className='lg:col-span-1'>
                     <h3 className='mb-4 text-base font-medium'>{section.title}</h3>
                     <ul className='space-y-3'>
                        {section.links.map((link, linkIndex) => (
                           <li key={linkIndex}>
                              <Link
                                 href={link.href}
                                 className='text-extra-gray inline-block text-sm transition-colors duration-200 hover:text-white'
                              >
                                 {link.label}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
               ))}
            </div>

            {/* Bottom section */}
            <div className='pt-8'>
               <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
                  {/* Social links */}
                  <div className='flex items-center gap-9'>
                     {socialLinks.map((social, index) => (
                        <Link
                           key={index}
                           href={social.href}
                           target='_blank'
                           rel='noopener noreferrer'
                           className='hover:text-extra-gray flex items-center justify-center transition-colors duration-200'
                           aria-label={social.label}
                        >
                           {getSocialIcon(social.icon)}
                        </Link>
                     ))}
                  </div>

                  {/* Copyright */}
                  <p className='text-extra-gray text-sm'>{copyright}</p>
               </div>
            </div>
         </Container>
      </footer>
   )
}

export default Footer
