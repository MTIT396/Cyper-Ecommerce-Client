'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { userService } from '@/services/user.service'
import { useQueryClient } from '@tanstack/react-query'
import FormWrapper from '@/components/shared/FormWrapper'
import TextFormField from '@/components/shared/TextFormField'
import Button from '@/components/shared/Button'
import { FadeMotionWrapper } from '@/components/shared/FadeMotionWrapper'
import { FadeMotionItem } from '@/components/shared/FadeMotionItem'
import { FadeUpVariants } from '@/lib/variants'

const editProfileSchema = z.object({
   username: z.string().min(2, 'Username must be at least 2 characters').optional()
})

type EditProfileFormValues = z.infer<typeof editProfileSchema>

interface EditProfileFormProps {
   defaultValues: {
      username?: string
   }
}

export function EditProfileForm({ defaultValues }: EditProfileFormProps) {
   const [isLoading, setIsLoading] = useState(false)
   const queryClient = useQueryClient()

   const form = useForm<EditProfileFormValues>({
      resolver: zodResolver(editProfileSchema),
      defaultValues: {
         username: defaultValues.username || ''
      }
   })

   const onSubmit = async (values: EditProfileFormValues) => {
      setIsLoading(true)
      try {
         const dataToSend = {
            ...(values.username && { username: values.username })
         }

         if (Object.keys(dataToSend).length === 0) {
            toast.error('No changes to save')
            setIsLoading(false)
            return
         }

         await userService.updateProfile(dataToSend)
         toast.success('Profile updated successfully')
         queryClient.invalidateQueries({ queryKey: ['me'] })
      } catch (error: unknown) {
         const errorMessage = error instanceof Error ? error.message : 'Failed to update profile'
         toast.error(errorMessage)
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <FadeMotionWrapper mode='normal'>
         <FormWrapper form={form} onSubmit={onSubmit} className='max-w-md space-y-6'>
            {/* Username field */}
            <FadeMotionItem variants={FadeUpVariants} delay={0.1}>
               <TextFormField
                  name='username'
                  label='Username'
                  placeholder='Enter your username'
                  className='rounded-md'
               />
            </FadeMotionItem>

            {/* Submit button */}
            <FadeMotionItem variants={FadeUpVariants} delay={0.2}>
               <Button
                  isLoading={isLoading}
                  disabled={isLoading}
                  loadingText='Updating...'
                  className='w-full py-2.5 text-sm'
               >
                  Save Changes
               </Button>
            </FadeMotionItem>
         </FormWrapper>
      </FadeMotionWrapper>
   )
}
