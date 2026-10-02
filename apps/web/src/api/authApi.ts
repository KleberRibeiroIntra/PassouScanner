import type { User } from '@/types/User'
import { ApiError, request } from './client'
import { tokenStorage } from './tokenStorage'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  expiresAt: string
  user: User
}

export interface CurrentUser {
  name: string
  email: string
}

export const authApi = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await request<LoginResponse>('POST', '/Auth/login', data)
      tokenStorage.set(response.token)
      return response
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        throw new ApiError(401, 'E-mail ou senha inválidos.')
      }
      throw error
    }
  },
  me: () => request<CurrentUser>('GET', '/Auth/me'),
  logout() {
    tokenStorage.clear()
  },
}
