import Button from './Button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { DialogClose, DialogDescription, DialogTrigger } from '@radix-ui/react-dialog'
import { Info } from 'lucide-react'

type ReminderBoxProps = {
   children: React.ReactNode
   title?: string
   desc?: string
   onConfirm: () => void
}

const ReminderBox = ({
   children,
   title = 'Bạn có chắc không?',
   desc = 'Bạn có chắc chắn muốn thực hiện hành động này không? Hành động này không thể hoàn tác!',
   onConfirm
}: ReminderBoxProps) => {
   return (
      <Dialog>
         <DialogTrigger asChild>{children}</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className='flex items-center gap-2 border-b pb-3.5 uppercase'>
                  <Info className='size-5' />
                  {title}
               </DialogTitle>
               <DialogDescription className='text-extra-gray py-2.5 text-sm'>
                  {desc}
               </DialogDescription>
               <DialogFooter className='mt-4'>
                  <DialogClose asChild>
                     <Button
                        variant='outline'
                        className='h-fit w-fit px-5 py-2 text-sm'
                        onClick={onConfirm}
                     >
                        Xác nhận
                     </Button>
                  </DialogClose>
                  <DialogClose asChild>
                     <Button className='h-fit w-fit border-red-600 bg-red-600 px-5 py-2 text-sm hover:border-red-800 hover:bg-red-800'>
                        Hủy bỏ
                     </Button>
                  </DialogClose>
               </DialogFooter>
            </DialogHeader>
         </DialogContent>
      </Dialog>
   )
}

export default ReminderBox
