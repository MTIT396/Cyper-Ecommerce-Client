import Button from './Button'
import Link from 'next/link'

const FallbackExpired = () => {
   return (
      <div className='flex min-h-[90vh] flex-col items-center justify-center gap-10'>
         <div className='space-y-2'>
            <h1 className='text-dark-gray text-2xl font-medium tracking-wide text-nowrap'>
               Liên kết đã hết hạn hoặc không tồn tại.
            </h1>
            <p className='text-center font-light'>Gọi số 0328077936 để được tư vấn miễn phí.</p>
         </div>
         <Link href='/'>
            <Button variant='primary' className='rounded-full px-10'>
               Trở về trang chủ
            </Button>
         </Link>
      </div>
   )
}

export default FallbackExpired
