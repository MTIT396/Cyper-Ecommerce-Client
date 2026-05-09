'use client'
import { AddressManagement } from '@/components/features/profile/AddressManagement'
import { FadeMotionItem } from '@/components/shared/FadeMotionItem'
import { FadeUpVariants } from '@/lib/variants'

export default function AddressPage() {
   return (
      <FadeMotionItem variants={FadeUpVariants} className='rounded-3xl bg-white p-8'>
         <AddressManagement />
      </FadeMotionItem>
   )
}
