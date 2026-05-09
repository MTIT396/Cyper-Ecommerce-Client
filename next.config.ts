import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
   /* config options here */
   // next.config.js
   images: {
      remotePatterns: [
         // FPT Shop
         {
            protocol: 'https',
            hostname: 'cdn2.fptshop.com.vn'
         },
         {
            protocol: 'https',
            hostname: '**.fptshop.com.vn'
         },

         // CellphoneS
         {
            protocol: 'https',
            hostname: 'cdn2.cellphones.com.vn'
         },
         {
            protocol: 'https',
            hostname: '**.cellphones.com.vn'
         },
         {
            protocol: 'https',
            hostname: 'cellphones.com.vn',
            pathname: '/media/catalog/product/**'
         },

         // Tiki
         {
            protocol: 'https',
            hostname: 'salt.tikicdn.com'
         },

         // Shopee
         {
            protocol: 'https',
            hostname: 'cf.shopee.vn'
         },

         // Lazada
         {
            protocol: 'https',
            hostname: '**.lazcdn.com'
         },

         // Google/YouTube
         {
            protocol: 'https',
            hostname: '**.googleusercontent.com'
         },

         // Facebook/Instagram
         {
            protocol: 'https',
            hostname: '**.fbcdn.net'
         },
         {
            protocol: 'https',
            hostname: '**.instagram.com'
         },

         // Cloudinary
         {
            protocol: 'https',
            hostname: 'res.cloudinary.com'
         }
      ],

      // Cấu hình tối ưu hình ảnh
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

      // ịnh dạng hỗ trợ
      formats: ['image/webp', 'image/avif']
   }
}

export default nextConfig
