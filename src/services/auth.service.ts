import { apiClient } from '@/lib/axios'
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types/auth.type'

export const authService = {
   register: async (payload: RegisterRequest): Promise<RegisterResponse> => {
      const response = await apiClient.post('/api/auth/register', payload)
      return response.data
   },
   login: async (payload: LoginRequest): Promise<LoginResponse> => {
      const response = await apiClient.post('/api/auth/login', payload)
      return response.data
   },
   logout: async () => {
      const response = await apiClient.post('/api/auth/logout')
      return response.data
   }
}
