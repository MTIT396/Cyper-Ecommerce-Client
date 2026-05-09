import { getCategory } from '@/components/api/category.api'
import { useQuery } from '@tanstack/react-query'

export const useCategory = (slug: string) => {
   return useQuery({
      queryKey: ['category', slug],
      queryFn: () => getCategory(slug),
      enabled: !!slug
   })
}
