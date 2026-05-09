'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function FilterSection({
   header,
   className,
   children
}: {
   header: string
   className?: string
   children: React.ReactNode
}) {
   const [isOpen, setIsOpen] = useState(true)

   return (
      <div className={className}>
         <button
            onClick={() => setIsOpen((prev) => !prev)}
            className='mb-2 flex w-full items-center justify-between font-semibold'
         >
            {header}
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
         </button>

         {/* Content */}
         <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} `}
         >
            <div className='space-y-2 pt-2'>{children}</div>
         </div>
      </div>
   )
}
