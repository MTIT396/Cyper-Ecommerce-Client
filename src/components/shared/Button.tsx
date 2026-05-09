'use client'

import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'icon'

type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

type ButtonProps = React.ComponentProps<'button'> & {
   variant?: ButtonVariant
   size?: ButtonSize
   isLoading?: boolean
   loadingText?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
   (
      {
         className,
         variant = 'primary',
         size = 'md',
         children,
         isLoading = false,
         loadingText,
         disabled,
         ...props
      },
      ref
   ) => {
      const isDisabled = disabled || isLoading

      /* ================= BASE ================= */

      const base = cn(
         'relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap',
         'font-medium transition-all duration-200 ease-out',
         'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20',
         'disabled:pointer-events-none disabled:opacity-60',
         'active:scale-[0.98]',
         'select-none'
      )

      /* ================= SIZE ================= */

      const sizes: Record<ButtonSize, string> = {
         sm: 'h-9 rounded-xl px-3 text-sm',
         md: 'h-11 rounded-xl px-5 text-sm',
         lg: 'h-12 rounded-2xl px-6 text-base',
         icon: 'size-11 rounded-xl'
      }

      /* ================= VARIANTS ================= */

      const variants: Record<ButtonVariant, string> = {
         primary: cn(
            'bg-black text-white',
            'border border-black',
            'shadow-sm',
            'hover:-translate-y-[1px] hover:bg-zinc-900 hover:shadow-md'
         ),

         secondary: cn(
            'bg-zinc-100 text-zinc-900',
            'border border-zinc-200',
            'hover:bg-zinc-200 hover:border-zinc-300'
         ),

         outline: cn(
            'bg-white text-zinc-900',
            'border border-zinc-200',
            'shadow-sm',
            'hover:border-zinc-300 hover:bg-zinc-50'
         ),

         destructive: cn(
            'bg-red-500 text-white',
            'border border-red-500',
            'shadow-sm',
            'hover:bg-red-600 hover:border-red-600 hover:shadow-md'
         ),

         ghost: cn('bg-transparent text-zinc-700', 'hover:bg-zinc-100 hover:text-black'),

         icon: cn(
            'bg-white text-zinc-700',
            'border border-zinc-200',
            'shadow-sm',
            'hover:bg-zinc-100 hover:text-black hover:border-zinc-300'
         )
      }

      return (
         <button
            ref={ref}
            disabled={isDisabled}
            className={cn(base, sizes[size], variants[variant], className)}
            {...props}
         >
            {/* CONTENT */}
            <span
               className={cn(
                  'flex items-center justify-center gap-2 transition-opacity duration-200',
                  isLoading && 'opacity-0'
               )}
            >
               {children}
            </span>

            {/* LOADING */}
            {isLoading && (
               <span className='absolute inset-0 flex items-center justify-center gap-2'>
                  <Loader2 className='size-4 animate-spin' />

                  {loadingText && <span className='text-sm font-medium'>{loadingText}</span>}
               </span>
            )}
         </button>
      )
   }
)

Button.displayName = 'Button'

export default Button
