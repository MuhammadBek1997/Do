import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type TripStatus = 'going_to_pickup' | 'arrived' | 'in_trip' | 'completed'

const STATUS_STEPS = [
  { key: 'going_to_pickup', label: 'Olish joyiga bormoqda' },
  { key: 'arrived', label: 'Olish joyiga yetib keldim' },
  { key: 'in_trip', label: 'Sayohat boshlandi' },
  { key: 'completed', label: 'Sayohat yakunlandi' },
]

const STATUS_ACTIONS: Record<TripStatus, string> = {
  going_to_pickup: 'Yetib keldim',
  arrived: 'Sayohatni boshlash',
  in_trip: 'Sayohatni yakunlash',
  completed: 'Bosh sahifaga qaytish',
}

export default function TripScreen() {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const insets = useSafeAreaInsets()
  const order = route.params?.order

  const [status, setStatus] = useState<TripStatus>('going_to_pickup')

  const currentStep = STATUS_STEPS.findIndex(s => s.key === status)

  const handleAction = () => {
    if (status === 'going_to_pickup') setStatus('arrived')
    else if (status === 'arrived') setStatus('in_trip')
    else if (status === 'in_trip') setStatus('completed')
    else if (status === 'completed') {
      navigation.navigate('Home')
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top || 24, paddingBottom: insets.bottom || 24 }]}>
      {/* Steps */}
      <View style={styles.stepsCard}>
        {STATUS_STEPS.map((step, i) => {
          const done = i < currentStep
          const active = i === currentStep
          return (
            <View key={step.key} style={styles.stepRow}>
              <View style={[styles.stepCircle, done && styles.stepDone, active && styles.stepActive]}>
                {done ? (
                  <Text style={styles.checkMark}>✓</Text>
                ) : (
                  <Text style={[styles.stepNum, active && styles.stepNumActive]}>{i + 1}</Text>
                )}
              </View>
              <Text style={[styles.stepLabel, done && styles.stepLabelDone, active && styles.stepLabelActive]}>
                {step.label}
              </Text>
            </View>
          )
        })}
      </View>

      {/* Order info */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoEmoji}>👤</Text>
          <View>
            <Text style={styles.infoName}>{order?.passenger ?? 'Yo\'lovchi'}</Text>
            <Text style={styles.infoSub}>Yo'lovchi</Text>
          </View>
          <TouchableOpacity style={styles.callBtn}>
            <Text style={styles.callIcon}>📞</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.addrSection}>
          <View style={styles.addrRow}>
            <Text style={styles.addrDot}>🟢</Text>
            <View style={styles.addrTexts}>
              <Text style={styles.addrLabel}>Olish joyi</Text>
              <Text style={styles.addrVal}>{order?.pickup ?? '...'}</Text>
            </View>
          </View>
          <View style={styles.addrRow}>
            <Text style={styles.addrDot}>🔴</Text>
            <View style={styles.addrTexts}>
              <Text style={styles.addrLabel}>Borish joyi</Text>
              <Text style={styles.addrVal}>{order?.destination ?? '...'}</Text>
            </View>
          </View>
        </View>

        {status === 'completed' && (
          <View style={styles.completedBox}>
            <Text style={styles.completedEmoji}>🎉</Text>
            <Text style={styles.completedTitle}>Sayohat yakunlandi!</Text>
            <Text style={styles.completedPrice}>{order?.price ?? '—'}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.actionBtn, status === 'completed' && styles.actionBtnDone]}
        onPress={handleAction}
        activeOpacity={0.85}
      >
        <Text style={styles.actionText}>{STATUS_ACTIONS[status]}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, gap: 16 },
  stepsCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    gap: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  stepDone: { backgroundColor: '#22C55E', borderColor: '#22C55E' },
  stepActive: { backgroundColor: '#FFFBEB', borderColor: '#FACC15' },
  checkMark: { color: '#fff', fontSize: 16, fontWeight: '700' },
  stepNum: { fontSize: 14, fontWeight: '700', color: '#9CA3AF' },
  stepNumActive: { color: '#111827' },
  stepLabel: { fontSize: 14, color: '#9CA3AF' },
  stepLabelDone: { color: '#22C55E', fontWeight: '500' },
  stepLabelActive: { color: '#111827', fontWeight: '600' },
  infoCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoEmoji: { fontSize: 28 },
  infoName: { fontSize: 16, fontWeight: '600', color: '#111827' },
  infoSub: { fontSize: 12, color: '#9CA3AF' },
  callBtn: { marginLeft: 'auto', backgroundColor: '#DCFCE7', borderRadius: 20, padding: 8 },
  callIcon: { fontSize: 18 },
  divider: { height: 1, backgroundColor: '#E5E7EB' },
  addrSection: { gap: 16 },
  addrRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  addrDot: { fontSize: 12, marginTop: 2 },
  addrTexts: {},
  addrLabel: { fontSize: 11, color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase', marginBottom: 2 },
  addrVal: { fontSize: 14, color: '#111827', fontWeight: '500' },
  completedBox: { alignItems: 'center', paddingTop: 8, gap: 4 },
  completedEmoji: { fontSize: 40 },
  completedTitle: { fontSize: 16, fontWeight: '700', color: '#22C55E' },
  completedPrice: { fontSize: 22, fontWeight: '800', color: '#111827' },
  actionBtn: {
    backgroundColor: '#FACC15',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  actionBtnDone: { backgroundColor: '#22C55E' },
  actionText: { fontSize: 16, fontWeight: '700', color: '#111827' },
})
