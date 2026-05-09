import { cn } from '@/lib/utils'
import { FaStar } from 'react-icons/fa'

export default function StarView({ value, className }: { value: number; className?: string }) {
   return (
      <div className={cn('flex gap-1', className)}>
         {[1, 2, 3, 4, 5].map((i) => (
            <FaStar key={i} className={i <= value ? 'text-yellow-300' : 'text-gray-300'} />
         ))}
      </div>
   )
}
