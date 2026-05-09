import { userService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

export const useAuth = () => {
   const { data } = useQuery({
      queryKey: ['me'],
      queryFn: userService.getMe
   })

   return {
      user: data?.user,
      isAuthenticated: !!data
   }
}
