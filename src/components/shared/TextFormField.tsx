import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { useFormContext, type FieldPath, type FieldValues } from 'react-hook-form'
import { FormInput } from './FormInput'

type TextFormFieldProps<TFieldValues extends FieldValues> = {
   name: FieldPath<TFieldValues>
   label?: string
   className?: string
   rightAddon?: React.ReactNode
   leftAddon?: React.ReactNode
} & Omit<React.ComponentProps<'input'>, 'name' | 'value' | 'onChange' | 'onBlur'>

export default function TextFormField<TFieldValues extends FieldValues>({
   name,
   label,
   className,
   rightAddon,
   leftAddon,
   ...inputProps
}: TextFormFieldProps<TFieldValues>) {
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
                     type='text'
                     className={cn(
                        className,
                        'focus-within:ring-primary hover:border-primary focus-within:ring-1 hover:border'
                     )}
                     {...field}
                     {...inputProps}
                     leftAddon={leftAddon}
                     rightAddon={rightAddon}
                  />
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   )
}
