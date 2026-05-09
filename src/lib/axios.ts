import axios, { AxiosInstance } from 'axios'

// Create axios instance
export const apiClient: AxiosInstance = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/',
   timeout: 30000, // 30 seconds
   headers: {
      'Content-Type': 'application/json'
   },
   withCredentials: true
})
