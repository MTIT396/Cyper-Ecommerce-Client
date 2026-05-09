import { apiClient } from '@/lib/axios'
import { Category } from '@/types/category.type'

export const getCategories = async () => {
   const response = await apiClient.get<Category[]>('/api/categories')
   return response.data
}
export const getCategory = async (slug: string) => {
   const response = await apiClient.get<Category>(`/api/categories/${slug}`)
   return response.data
}
