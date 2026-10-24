import { useState, useEffect, useRef } from 'react'
import * as Location from 'expo-location'

interface LocationState {
  latitude: number
  longitude: number
  accuracy: number | null
}

interface UseLocationResult {
  location: LocationState | null
  isReady: boolean
  isLoading: boolean
  error: string | null
}

export function useLocation(): UseLocationResult {
  const [location, setLocation] = useState<LocationState | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const watchRef = useRef<Location.LocationSubscription | null>(null)

  useEffect(() => {
    let mounted = true

    async function start() {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        if (mounted) {
          setError('Joylashuv ruxsati berilmadi')
          setIsLoading(false)
        }
        return
      }

      try {
        const last = await Location.getLastKnownPositionAsync()
        if (last && mounted) {
          setLocation({
            latitude: last.coords.latitude,
            longitude: last.coords.longitude,
            accuracy: last.coords.accuracy,
          })
        }
      } catch {}

      watchRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 2000,
          distanceInterval: 5,
        },
        (pos) => {
          if (!mounted) return
          const { latitude, longitude, accuracy } = pos.coords
          setLocation({ latitude, longitude, accuracy })
          setIsLoading(false)
          if (accuracy !== null && accuracy <= 50) {
            setIsReady(true)
          }
        }
      )
    }

    start().catch(() => {
      if (mounted) {
        setError('Joylashuvni aniqlashda xatolik yuz berdi')
        setIsLoading(false)
      }
    })

    return () => {
      mounted = false
      watchRef.current?.remove()
    }
  }, [])

  return { location, isReady, isLoading, error }
}
