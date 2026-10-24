import { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthStore } from '../../store/authStore'

const MOCK_MODE = true
const MOCK_OTP = '123456'
const MOCK_DRIVER = {
  id: 'driver-1',
  name: 'Alisher Karimov',
  phone: '',
  status: 'APPROVED' as const,
}

export default function OtpScreen() {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const insets = useSafeAreaInsets()
  const setAuth = useAuthStore(s => s.setAuth)

  const phone: string = route.params?.phone ?? ''
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendSec, setResendSec] = useState(30)
  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const timer = setInterval(() => {
      setResendSec(s => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 6)
    setOtp(digits)
    setError('')
    if (digits.length === 6) verify(digits)
  }

  const verify = async (code: string) => {
    setLoading(true)
    if (MOCK_MODE) {
      await new Promise(r => setTimeout(r, 700))
      if (code === MOCK_OTP) {
        setAuth('mock-token-driver', { ...MOCK_DRIVER, phone })
      } else {
        setError("Noto'g'ri kod. Mock: 123456")
      }
      setLoading(false)
      return
    }
    // TODO: real API
    setLoading(false)
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top || 40 }]}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Kodni kiriting</Text>
        <Text style={styles.subtitle}>
          <Text style={styles.phone}>{phone}</Text> raqamiga SMS yuborildi
        </Text>

        <TextInput
          ref={inputRef}
          style={styles.hiddenInput}
          keyboardType="number-pad"
          value={otp}
          onChangeText={handleChange}
          maxLength={6}
          caretHidden
        />

        <TouchableOpacity
          style={styles.otpRow}
          onPress={() => inputRef.current?.focus()}
          activeOpacity={1}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.otpBox,
                otp.length === i && styles.otpBoxActive,
                otp.length > i && styles.otpBoxFilled,
                !!error && styles.otpBoxError,
              ]}
            >
              <Text style={styles.otpDigit}>{otp[i] ?? ''}</Text>
            </View>
          ))}
        </TouchableOpacity>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {loading && (
          <View style={styles.loadingRow}>
            <ActivityIndicator color="#FACC15" />
            <Text style={styles.loadingText}>Tekshirilmoqda...</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.resendBtn}
          disabled={resendSec > 0}
          onPress={() => setResendSec(30)}
        >
          <Text style={[styles.resendText, resendSec > 0 && styles.resendDisabled]}>
            {resendSec > 0
              ? `Qayta yuborish (${resendSec}s)`
              : 'Qayta yuborish'}
          </Text>
        </TouchableOpacity>

        {MOCK_MODE && (
          <View style={styles.mockBadge}>
            <Text style={styles.mockText}>Mock rejim — kod: 123456</Text>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backBtn: {
    marginLeft: 16,
    marginBottom: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { fontSize: 20, color: '#1F2937' },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 32 },
  title: { fontSize: 26, fontWeight: '700', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 40 },
  phone: { fontWeight: '600', color: '#111827' },
  hiddenInput: { position: 'absolute', opacity: 0, width: 1, height: 1 },
  otpRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
    justifyContent: 'center',
  },
  otpBox: {
    width: 48,
    height: 58,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxActive: { borderColor: '#FACC15', backgroundColor: '#FFFBEB' },
  otpBoxFilled: { borderColor: '#111827', backgroundColor: '#fff' },
  otpBoxError: { borderColor: '#EF4444' },
  otpDigit: { fontSize: 22, fontWeight: '700', color: '#111827' },
  errorText: {
    color: '#EF4444',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  loadingText: { fontSize: 14, color: '#6B7280' },
  resendBtn: { alignItems: 'center', marginTop: 8 },
  resendText: { fontSize: 14, color: '#3B82F6', fontWeight: '500' },
  resendDisabled: { color: '#9CA3AF' },
  mockBadge: {
    marginTop: 32,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  mockText: { fontSize: 12, color: '#92400E' },
})
