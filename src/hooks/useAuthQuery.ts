import { authService } from '@/services/auth.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

export const useAuthQuery = () => {
   const qc = useQueryClient()

   const register = useMutation({
      mutationFn: authService.register,
      onSuccess: () => {
         window.location.href = '/auth/login?login=register'
      },
      onError: (error: AxiosError<{ message: string }>) => {
         const status = error.response?.status
         const serverMessage = error.response?.data?.message

         const message =
            status === 409
               ? 'Email đã được sử dụng. Vui lòng sử dụng email khác.'
               : (serverMessage ?? 'Đăng ký thất bại! Vui lòng thử lại.')

         toast.error(message, { id: 'register-error' })
      }
   })

   const login = useMutation({
      mutationFn: authService.login,
      onSuccess: () => {
         window.location.href = '/?login=success'
      },
      onError: (error: AxiosError<{ message: string }>) => {
         const status = error.response?.status
         const serverMessage = error.response?.data?.message

         const message =
            status === 401
               ? (serverMessage ?? 'Tài khoản hoặc mật khẩu không chính xác.')
               : (serverMessage ?? 'Đăng nhập thất bại! Vui lòng thử lại.')
         toast.error(message, { id: 'login-error' })
      }
   })

   const logout = useMutation({
      mutationFn: authService.logout,
      onSuccess: () => {
         qc.removeQueries({ queryKey: ['me'] })
         toast.success('Đăng xuất thành công!')
         window.location.href = '/'
      },
      onError: () => {
         toast.error('Đăng xuất thất bại! Vui lòng thử lại.', { id: 'logout-error' })
      }
   })

   return {
      register: register.mutate,
      login: login.mutate,
      logout: logout.mutate,
      isRegistering: register.isPending,
      isLoggingIn: login.isPending
   }
}
