import { Loader2 } from 'lucide-react'
import Image from 'next/image'

const Loading = () => {
   return (
      <div className='mt-10 flex w-full max-w-60 flex-col items-center justify-center gap-1 rounded-xl bg-white p-6 py-10 shadow-xl'>
         <div className='w-full max-w-25'>
            <Image
               className='h-full w-full shrink-0 cursor-pointer object-contain'
               src='/Logo.png'
               alt='logo'
               width={96}
               height={32}
            />
         </div>
         <div className='text-dark-gray flex items-center justify-center space-x-2 text-[13px]'>
            <Loader2 className='size-7 animate-spin' />
            <span className='text-nowrap'>Chờ một chút nhaa...</span>
         </div>
      </div>
   )
}

export default Loading
