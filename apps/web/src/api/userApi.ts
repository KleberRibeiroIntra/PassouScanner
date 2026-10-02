import type { User, UserRequest } from '@/types/User'
import { createCrudApi } from './createCrudApi'

export const userApi = createCrudApi<User, UserRequest>('User')
