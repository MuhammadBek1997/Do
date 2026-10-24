import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const MOCK_MODE = true

export default function PhoneScreen() {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  const digits = phone.replace(/\D/g, '').slice(0, 9)
  const isValid = digits.length === 9

  const displayPhone = digits
    .replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4')
    .trim()

  const handleChange = (text: string) => {
    setPhone(text.replace(/\D/g, '').slice(0, 9))
  }

  const handleNext = async () => {
    if (!isValid) return
    setLoading(true)
    if (MOCK_MODE) {
      await new Promise(r => setTimeout(r, 600))
      setLoading(false)
      navigation.navigate('Otp', { phone: '+998' + digits })
      return
    }
    // TODO: real API
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top || 40 }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <View style={styles.logoBox}>
          <Text style={styles.logoIcon}>🚗</Text>
          <Text style={styles.logoText}>Zoomer Driver</Text>
        </View>

        <Text style={styles.title}>Telefon raqamingiz</Text>
        <Text style={styles.subtitle}>
          OTP kodi yuboriladi. Hech kim bilan ulashmang.
        </Text>

        <View style={styles.inputRow}>
          <View style={styles.prefixBox}>
            <Text style={styles.prefixFlag}>🇺🇿</Text>
            <Text style={styles.prefixText}>+998</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="XX XXX XX XX"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            value={displayPhone}
            onChangeText={handleChange}
            maxLength={11}
            autoFocus
          />
        </View>

        <TouchableOpacity
          style={[styles.btn, !isValid && styles.btnDisabled]}
          onPress={handleNext}
          disabled={!isValid || loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#111827" />
          ) : (
            <Text style={styles.btnText}>Davom etish →</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.hint}>
          Ro'yxatdan o'tish orqali{' '}
          <Text style={styles.link}>Foydalanish shartlariga</Text> rozilik
          bildirasiz
        </Text>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 32 },
  logoBox: { alignItems: 'center', marginBottom: 48 },
  logoIcon: { fontSize: 52 },
  logoText: { fontSize: 22, fontWeight: '700', color: '#1F2937', marginTop: 8 },
  title: { fontSize: 26, fontWeight: '700', color: '#111827', marginBottom: 8 },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 32,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#F9FAFB',
  },
  prefixBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    gap: 6,
    backgroundColor: '#F3F4F6',
  },
  prefixFlag: { fontSize: 18 },
  prefixText: { fontSize: 16, fontWeight: '600', color: '#374151' },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    color: '#111827',
    letterSpacing: 1,
  },
  btn: {
    backgroundColor: '#FACC15',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  btnDisabled: { opacity: 0.4 },
  btnText: { fontSize: 16, fontWeight: '700', color: '#111827' },
  hint: {
    marginTop: 24,
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
  },
  link: { color: '#3B82F6' },
})
