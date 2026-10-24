import { create } from 'zustand'

interface PrefsState {
  dark: boolean
  toggleDark: () => void
  setDark: (dark: boolean) => void
}

export const usePrefs = create<PrefsState>()((set) => ({
  dark: false,
  toggleDark: () => set((s) => ({ dark: !s.dark })),
  setDark: (dark) => set({ dark }),
}))

export type WorkMode = 'taxi' | 'courier'
export type WorkVehicle = 'moto' | 'velo' | 'auto' | 'yuk'

interface WorkState {
  mode: WorkMode
  vehicle: WorkVehicle
  online: boolean
  setMode: (mode: WorkMode) => void
  setVehicle: (vehicle: WorkVehicle) => void
  setOnline: (online: boolean) => void
}

export const useWork = create<WorkState>()((set) => ({
  mode: 'taxi',
  vehicle: 'moto',
  online: true,
  setMode: (mode) => set({ mode }),
  setVehicle: (vehicle) => set({ vehicle }),
  setOnline: (online) => set({ online }),
}))
