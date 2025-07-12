/** 👤 Usuario base */
export interface IUser {
  id: string
  email: string
  username: string
  full_name?: string
  avatar_url?: string
  oauth_provider: 'google'
  oauth_id: string
  role: UserRole
  plan: UserPlan
  locale?: string
  is_active: boolean
  verified?: boolean
  created_at: string
  updated_at: string
  last_login_at?: string
}

/** 🎟 Roles posibles del usuario */
export type UserRole = 'user' | 'admin' | 'moderator'

/** 💳 Planes de suscripción */
export type UserPlan = 'free' | 'premium' | 'enterprise'

/** 📦 Payloads de usuario */

export type UpdateProfilePayload = {
  full_name?: string
  avatar_url?: string
  locale?: string
}

export type UpdateEmailPayload = {
  email: string
  password: string
}

export type UpdatePasswordPayload = {
  oldPassword: string
  newPassword: string
}

export type DeleteProfilePayload = {
  password: string
}
