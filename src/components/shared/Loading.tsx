import { Loader2 } from 'lucide-react'
import Image from 'next/image'

const Loading = () => {
   return (
      <div className='mt-10 flex w-full max-w-60 flex-col items-center justify-center gap-1 rounded-xl bg-white p-6 py-10 shadow-xl'>
         <Image
            src='/cyper.png'
            alt='Cyper logo'
            width={160}
            height={60}
            priority
            className='h-12 w-auto scale-150 object-contain md:h-14'
         />
         <div className='text-dark-gray flex items-center justify-center space-x-2 text-[13px]'>
            <Loader2 className='size-6 animate-spin' />
            <span className='text-nowrap'>Vui lòng chờ một chút...</span>
         </div>
      </div>
   )
}

export default Loading
