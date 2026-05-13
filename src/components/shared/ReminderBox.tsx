'use client'

import React from 'react'
import Button from './Button'

import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogDescription,
   DialogTrigger,
   DialogClose
} from '@/components/ui/dialog'

import { AlertTriangle } from 'lucide-react'

type ReminderBoxProps = {
   children: React.ReactNode
   title?: string
   desc?: string
   confirmText?: string
   cancelText?: string
   onConfirm: () => void
   loading?: boolean
   danger?: boolean
}

const ReminderBox = ({
   children,
   title = 'Xác nhận hành động',
   desc = 'Bạn có chắc chắn muốn tiếp tục? Hành động này có thể không hoàn tác được.',
   confirmText = 'Xác nhận',
   cancelText = 'Hủy',
   onConfirm,
   loading = false,
   danger = true
}: ReminderBoxProps) => {
   return (
      <Dialog>
         <DialogTrigger asChild>{children}</DialogTrigger>

         <DialogContent className='max-w-md rounded-2xl border border-zinc-200 p-0 shadow-xl'>
            <DialogHeader className='space-y-0 p-6 pb-4'>
               {/* Icon + Title */}
               <div className='flex items-start gap-3'>
                  <div
                     className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                        danger ? 'bg-red-100 text-red-600' : 'bg-zinc-100 text-zinc-700'
                     }`}
                  >
                     <AlertTriangle className='size-5' />
                  </div>

                  <div className='space-y-1 text-left'>
                     <DialogTitle className='text-base font-semibold text-zinc-900 sm:text-lg'>
                        {title}
                     </DialogTitle>

                     <DialogDescription className='text-sm leading-6 text-zinc-500'>
                        {desc}
                     </DialogDescription>
                  </div>
               </div>
            </DialogHeader>

            {/* Footer */}
            <DialogFooter className='flex-row justify-end gap-2 border-t border-zinc-100 px-6 py-4'>
               <DialogClose asChild>
                  <Button
                     variant='outline'
                     className='h-10 rounded-xl border-zinc-300 px-5 text-sm font-medium'
                  >
                     {cancelText}
                  </Button>
               </DialogClose>

               <Button
                  onClick={onConfirm}
                  disabled={loading}
                  className={`h-10 rounded-xl px-5 text-sm font-medium shadow-none ${
                     danger ? 'border-red-600 bg-red-600 hover:border-red-700 hover:bg-red-700' : ''
                  }`}
               >
                  {confirmText}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}

export default ReminderBox
