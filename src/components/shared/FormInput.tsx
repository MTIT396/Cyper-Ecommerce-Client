import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type FormInputProps = React.ComponentProps<'input'> & {
   leftAddon?: React.ReactNode
   rightAddon?: React.ReactNode
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
   ({ leftAddon, rightAddon, className, ...inputProps }, ref) => {
      return (
         <InputGroup
            className={cn(
               'border-extra-gray !h-auto rounded-full border py-0.5 pr-2 outline-0',
               className
            )}
         >
            {leftAddon && <InputGroupAddon>{leftAddon}</InputGroupAddon>}
            <InputGroupInput
               ref={ref}
               className='!px-3'
               {...inputProps}
               value={inputProps.value ?? ''}
            />

            {rightAddon && <InputGroupAddon align='inline-end'>{rightAddon}</InputGroupAddon>}
         </InputGroup>
      )
   }
)

FormInput.displayName = 'FormInput'
