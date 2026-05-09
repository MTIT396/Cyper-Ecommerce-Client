import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { useUpdateURL } from '@/hooks/useUpdateURL'
import { BadgeFilter } from '@/types/filter.type'

interface BadgeOnFilterProps {
   badge: BadgeFilter
}

const BadgeOnFilter = ({ badge }: BadgeOnFilterProps) => {
   const { updateURL } = useUpdateURL()

   const handleRemove = () => {
      // remove filter badge
      updateURL(badge.key, badge.value.toString(), true)
   }
   return (
      <Badge
         onClick={handleRemove}
         variant='secondary'
         className='bg-light-gray cursor-pointer px-3 py-1 text-sm font-medium text-gray-600 transition hover:border hover:border-gray-300'
      >
         {badge.label}
         <X />
      </Badge>
   )
}

export default BadgeOnFilter
