'use client'
import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Button from './Button'

interface QuantityInputProps {
   initialValue?: number
   min?: number
   max?: number
   onChange?: (value: number) => void
}

export default function QuantityInput({
   initialValue = 1,
   min = 1,
   max = 99,
   onChange
}: QuantityInputProps) {
   const [quantity, setQuantity] = useState<number | string>(initialValue)

   const updateQuantity = (newValue: number) => {
      setQuantity(newValue)
      onChange?.(newValue)
   }

   const handleDecrease = (): void => {
      if (typeof quantity === 'number' && quantity > min) {
         updateQuantity(quantity - 1)
      }
   }

   const handleIncrease = (): void => {
      if (typeof quantity === 'number' && quantity < max) {
         updateQuantity(quantity + 1)
      }
   }

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const value = e.target.value

      if (value === '') {
         setQuantity('')
         return
      }

      const numValue = parseInt(value, 10)
      if (!isNaN(numValue)) {
         if (numValue >= min && numValue <= max) {
            updateQuantity(numValue)
         } else if (numValue < min) {
            updateQuantity(min)
         } else if (numValue > max) {
            updateQuantity(max)
         }
      }
   }

   const handleBlur = (): void => {
      if (quantity === '' || (typeof quantity === 'number' && quantity < min)) {
         updateQuantity(min)
      }
   }
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         e.currentTarget.blur()
      }
   }
   const isMinimum = typeof quantity === 'number' && quantity <= min
   const isMaximum = typeof quantity === 'number' && quantity >= max

   return (
      <div className='mx-auto flex w-fit items-center justify-center rounded-md border px-3'>
         <div>
            <div className='flex items-center gap-2'>
               <Button
                  onClick={handleDecrease}
                  disabled={isMinimum}
                  variant='icon'
                  aria-label='decrease quantity'
                  className='h-fit w-fit border-0 p-0 shadow-none hover:bg-transparent'
               >
                  <Minus className='size-4' />
               </Button>

               <Input
                  type='text'
                  value={quantity}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  className='max-w-10 border-none text-center text-lg font-semibold shadow-none focus-visible:ring-0'
                  aria-label='quantity input'
               />

               <Button
                  onClick={handleIncrease}
                  disabled={isMaximum}
                  variant='icon'
                  aria-label='increase quantity'
                  className='h-fit w-fit border-0 p-0 shadow-none hover:bg-transparent'
               >
                  <Plus className='size-4' />
               </Button>
            </div>
         </div>
      </div>
   )
}
