import { apiClient } from '@/lib/axios'
import { UserResponse } from '@/types/user.type'

export interface UpdateProfileRequest {
   username?: string
   avatar?: string
}

export interface ChangePasswordRequest {
   currentPassword?: string
   newPassword: string
}

export interface UploadResponse {
   success: boolean
   url: string
   publicId: string
}

export interface UpdateProfileWithAvatarRequest {
   username?: string
   file?: File
}

export const userService = {
   getMe: async (): Promise<UserResponse> => {
      const response = await apiClient.get('/api/users/me')
      return response.data
   },

   updateProfile: async (data: UpdateProfileRequest) => {
      const response = await apiClient.put('/api/users/me', data)
      return response.data
   },

   changePassword: async (data: ChangePasswordRequest) => {
      const response = await apiClient.put('/api/users/me/password', data)
      return response.data
   },

   /**
    * Update username and upload avatar in one request
    * Optimized for client performance - single network call
    */
   updateProfileWithAvatar: async (data: UpdateProfileWithAvatarRequest) => {
      const formData = new FormData()

      if (data.username) {
         formData.append('username', data.username)
      }

      if (data.file) {
         formData.append('file', data.file)
      }

      const response = await apiClient.patch('/api/users/me/profile', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      })
      return response.data
   },

   /**
    * Upload image to backend which handles Cloudinary upload securely
    */
   uploadImage: async (file: File): Promise<UploadResponse> => {
      const formData = new FormData()
      formData.append('file', file)

      const response = await apiClient.post('/api/upload/image', formData, {
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      })
      return response.data
   },

   /**
    * Delete image from Cloudinary
    */
   deleteImage: async (publicId: string) => {
      const response = await apiClient.delete(`/api/upload/${publicId}`)
      return response.data
   }
}
