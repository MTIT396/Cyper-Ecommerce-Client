'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ChangePasswordForm } from './ChangePasswordForm'

interface ChangePasswordDialogProps {
   isOpen: boolean
   onOpenChange: (open: boolean) => void
}

export function ChangePasswordDialog({ isOpen, onOpenChange }: ChangePasswordDialogProps) {
   return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
         <DialogContent className='max-w-md'>
            <DialogHeader>
               <DialogTitle className='text-2xl'>Đổi mật khẩu</DialogTitle>
            </DialogHeader>
            <div className='scrollbar max-h-[80vh] overflow-y-auto px-2'>
               <div className='mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4'>
                  <p className='text-sm text-amber-800'>
                     Hãy bảo vệ tài khoản của bạn bằng cách sử dụng mật khẩu mạnh và độc đáo.
                  </p>
               </div>
               <ChangePasswordForm />
               <div className='mt-8 border-t border-gray-200 pt-8'>
                  <h3 className='text-dark-gray mb-4 font-medium'>Yêu cầu về mật khẩu:</h3>
                  <ul className='space-y-2 text-sm text-gray-600'>
                     <li className='flex items-start gap-3'>
                        <span className='mt-1 size-1.5 flex-shrink-0 rounded-full bg-gray-400'></span>
                        <span>Dài ít nhất 8 ký tự</span>
                     </li>
                     <li className='flex items-start gap-3'>
                        <span className='mt-1 size-1.5 flex-shrink-0 rounded-full bg-gray-400'></span>
                        <span>Không được trùng với mật khẩu hiện tại của bạn.</span>
                     </li>
                     <li className='flex items-start gap-3'>
                        <span className='mt-1 size-1.5 flex-shrink-0 rounded-full bg-gray-400'></span>
                        <span>Phải trùng khớp với mật khẩu xác nhận.</span>
                     </li>
                  </ul>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   )
}
