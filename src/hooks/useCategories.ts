import { getCategories } from '@/components/api/category.api'
import { useQuery } from '@tanstack/react-query'

export const useCategories = () => {
   return useQuery({
      queryKey: ['categories'],
      queryFn: getCategories
   })
}
