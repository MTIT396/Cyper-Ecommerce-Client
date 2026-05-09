export interface RegisterRequest {
   email: string
   username: string
   password: string
}

export interface RegisterResponse extends RegisterRequest {
   provider: string
}

export interface LoginRequest {
   email: string
   password: string
}

export interface LoginResponse {
   accessToken: string
   user: {
      id: string
      email: string
      username: string
      role: string
   }
}
