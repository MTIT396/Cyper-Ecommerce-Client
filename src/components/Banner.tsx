import React from 'react'
import Button from './shared/Button'
import Container from './Container'
import Image from 'next/image'
import Link from 'next/link'

const Banner = () => {
   return (
      <div className='mt-30 bg-[#211C24]'>
         {/* main banner */}
         <Container>
            <div className='flex w-full flex-col items-center justify-between text-white sm:flex-row'>
               <div className='my-14 flex flex-col gap-4 text-center xl:text-left'>
                  <p className='text-xl opacity-40'>Chuyên nghiệp. Vượt trội.</p>
                  <span className='flex justify-center text-2xl font-light xl:justify-start xl:text-7xl'>
                     IPhone 14 <p className='ml-2 font-bold'>Pro</p>
                  </span>
                  <p className='mb-3 text-balance opacity-40'>
                     Được tạo ra để thay đổi mọi thứ tốt đẹp hơn. Dành cho tất cả mọi người.
                  </p>
                  <Link href='/search?query=iphone'>
                     <Button
                        variant='secondary'
                        className='hover:text-dark-gray w-[14rem] rounded-md bg-transparent text-white'
                     >
                        Mua ngay
                     </Button>
                  </Link>
               </div>
               <Image
                  width={200}
                  height={200}
                  src='/images/bannerProduct.png'
                  alt=''
                  className='mx-auto mt-15 h-[80%] w-[200px] object-cover sm:mx-0 sm:w-[400px]'
               />
            </div>
         </Container>
         {/* sub banner */}
         <div className='container mx-auto grid grid-cols-1 gap-0 xl:grid-cols-2'>
            {/* LEFT */}
            <div className='grid'>
               {/* Playstation */}
               <div className='flex flex-col items-center overflow-hidden bg-white py-10 md:flex-row md:py-0'>
                  <Image
                     src='/images/playstation.png'
                     alt=''
                     width={300}
                     height={300}
                     className='w-1/2 object-contain py-10'
                  />
                  <div className='flex flex-col items-center gap-2 px-6 xl:items-start'>
                     <h1 className='text-4xl font-medium'>Playstation 5</h1>
                     <p className='text-extra-gray text-center text-xs text-balance xl:text-left'>
                        CPU, GPU cực kỳ mạnh mẽ và ổ SSD với I/O tích hợp sẽ định nghĩa lại trải
                        nghiệm PlayStation của bạn.
                     </p>
                  </div>
               </div>

               {/* AirPods + Vision */}
               <div className='flex flex-col md:flex-row'>
                  {/* AirPods */}
                  <div className='bg-light-gray flex w-full flex-col items-center gap-4 overflow-hidden px-6 py-10 sm:flex-row sm:gap-0 sm:py-4'>
                     <Image
                        src='/images/airpods.png'
                        alt=''
                        width={200}
                        height={200}
                        className='object-contain xl:-translate-x-18 xl:scale-150'
                     />
                     <div className='mt-4 flex flex-col gap-2 sm:mt-0'>
                        <div className='flex flex-row gap-1 font-light sm:flex-col'>
                           <span className='text-2xl'>Apple </span>
                           <span className='text-2xl'>
                              AirPods
                              <span className='font-bold'> Max</span>
                           </span>
                        </div>
                        <p className='text-extra-gray text-xs'>
                           Âm thanh điện toán. Nghe này, nó mạnh mẽ lắm.
                        </p>
                     </div>
                  </div>

                  {/* Vision */}
                  <div className='flex w-full flex-col items-center gap-4 overflow-hidden bg-[#353535] px-6 py-20 text-white sm:flex-row sm:gap-0'>
                     <Image
                        src='/images/applevision.png'
                        alt=''
                        width={200}
                        height={200}
                        className='object-contain xl:-translate-x-18 xl:scale-160'
                     />
                     <div className='mt-4 flex flex-col items-center gap-2 sm:mt-0 sm:items-start'>
                        <div className='flex flex-row gap-1 font-light sm:flex-col'>
                           <span className='text-2xl'>Apple </span>
                           <span className='text-2xl'>
                              Vision
                              <span className='font-bold'> Pro</span>
                           </span>
                        </div>
                        <p className='text-extra-gray text-xs'>
                           Một cách trải nghiệm giải trí đầy cuốn hút.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* RIGHT – Macbook */}
            <div className='bg-light-gray flex flex-col items-center gap-10 overflow-hidden px-12 py-10 sm:flex-row'>
               <div className='flex max-w-md flex-col items-center gap-3 sm:items-start'>
                  <span className='text-4xl font-light text-nowrap sm:text-6xl'>
                     Macbook <span className='font-bold'>Air</span>
                  </span>
                  <p className='text-extra-gray mb-3 text-center text-xs sm:text-left'>
                     MacBook Air 15 inch mới mang đến không gian rộng rãi hơn cho những điều bạn yêu
                     thích với màn hình Liquid Retina lớn.
                  </p>
                  <Link href='/search?query=macbook'>
                     <Button variant='secondary' className='w-[14rem] rounded-md border-black'>
                        Mua ngay
                     </Button>
                  </Link>
               </div>
               <Image
                  src='/images/macbook.png'
                  alt=''
                  width={500}
                  height={400}
                  className='object-contain'
               />
            </div>
         </div>
      </div>
   )
}

export default Banner
