'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ProfileInformationForm } from './ProfileInformationForm'

interface EditProfileDialogProps {
   defaultValues: {
      username?: string
      avatar?: string | null
   }
   isOpen: boolean
   onOpenChange: (open: boolean) => void
}

export function EditProfileDialog({ defaultValues, isOpen, onOpenChange }: EditProfileDialogProps) {
   return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
         <DialogContent className='max-w-2xl'>
            <div className='scrollbar max-h-[80vh]'>
               <ProfileInformationForm defaultValues={defaultValues} onOpenChange={onOpenChange} />
            </div>
         </DialogContent>
      </Dialog>
   )
}
