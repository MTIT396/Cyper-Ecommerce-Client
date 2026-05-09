export interface UserResponse {
   user: {
      id: number
      email: string
      username: string
      role: 'user' | 'admin'
      google_id: string | null
      avatar: string | null
      created_at: string
      updated_at: string
   }
}
