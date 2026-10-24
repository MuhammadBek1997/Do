import { create } from 'zustand'

interface Driver {
  id: string
  name: string
  phone: string
  status: 'PENDING' | 'APPROVED' | 'BLOCKED'
}

interface AuthState {
  token: string | null
  driver: Driver | null
  setAuth: (token: string, driver: Driver) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  driver: null,
  setAuth: (token, driver) => set({ token, driver }),
  logout: () => set({ token: null, driver: null }),
}))
