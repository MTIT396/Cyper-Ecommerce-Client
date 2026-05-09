import { Frown } from 'lucide-react'
import React from 'react'

const NoProductAvailable = () => {
   return (
      <div className='flex min-h-80 w-full flex-col items-center justify-center'>
         <h1 className='text-dark-gray flex items-center gap-2 text-2xl font-medium tracking-wide text-nowrap'>
            <Frown size={20} className='shrink-0' />
            Không tìm thấy sản phẩm nào phù hợp
         </h1>
         <p className='text-dark-gray mt-2 font-light'>
            Rất tiếc, hiện tại không có sản phẩm nào phù hợp với các tiêu chí tìm kiếm của bạn.
         </p>
         <p className='text-dark-gray font-light'>
            Vui lòng quay lại sau hoặc khám phá các danh mục sản phẩm khác của chúng tôi.
         </p>
      </div>
   )
}

export default NoProductAvailable
