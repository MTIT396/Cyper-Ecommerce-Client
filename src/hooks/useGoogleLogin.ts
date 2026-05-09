import { googleService } from '@/services/google.service'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const useGoogleLogin = () => {
   const [isLoggingIn, setIsLoggingIn] = useState(false)

   const handleGoogleLogin = async () => {
      try {
         setIsLoggingIn(true)
         googleService.initiateGoogleLogin()
      } catch (error) {
         setIsLoggingIn(false)
         toast.error('Failed to login with Google')
         console.error(error)
      }
   }

   return {
      handleGoogleLogin,
      isLoggingIn
   }
}
