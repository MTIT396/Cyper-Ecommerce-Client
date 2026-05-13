'use client'

import { FormInput } from '@/components/shared/FormInput'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { useFormContext, type FieldPath, type FieldValues } from 'react-hook-form'

type PasswordFormFieldProps<TFieldValues extends FieldValues> = {
   name: FieldPath<TFieldValues>
   label?: string
   className?: string
   leftAddon?: React.ReactNode
} & Omit<React.ComponentProps<'input'>, 'name' | 'value' | 'onChange' | 'onBlur'>

export default function PasswordFormField<TFieldValues extends FieldValues>({
   name,
   label,
   className,
   leftAddon,
   ...inputProps
}: PasswordFormFieldProps<TFieldValues>) {
   const [show, setShow] = useState(false)
   const form = useFormContext()

   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem>
               <FormLabel className='text-dark-gray text-sm font-semibold'>{label}</FormLabel>
               <FormControl>
                  <FormInput
                     {...field}
                     {...inputProps}
                     className={cn(
                        className,
                        'focus-within:ring-primary hover:border-primary focus-within:ring-1 hover:border'
                     )}
                     type={show ? 'text' : 'password'}
                     leftAddon={leftAddon}
                     rightAddon={
                        <button
                           type='button'
                           aria-label='Toggle password'
                           onClick={() => setShow((s) => !s)}
                        >
                           {show ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
                        </button>
                     }
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   )
}
