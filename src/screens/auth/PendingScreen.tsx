import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthStore } from '../../store/authStore'

export default function PendingScreen() {
  const insets = useSafeAreaInsets()
  const logout = useAuthStore(s => s.logout)

  return (
    <View style={[styles.container, { paddingTop: insets.top || 40, paddingBottom: insets.bottom || 24 }]}>
      <View style={styles.content}>
        <Text style={styles.emoji}>⏳</Text>
        <Text style={styles.title}>Ariza ko'rib chiqilmoqda</Text>
        <Text style={styles.subtitle}>
          Hujjatlaringiz tekshirilmoqda. Odatda 1-2 ish kuni davom etadi.
          Tasdiqlangandan so'ng SMS orqali xabar beramiz.
        </Text>

        <View style={styles.steps}>
          {[
            { label: 'Ariza yuborildi', done: true },
            { label: 'Hujjatlar tekshirilmoqda', done: false, active: true },
            { label: 'Tasdiqlash', done: false },
          ].map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View
                style={[
                  styles.stepDot,
                  step.done && styles.stepDotDone,
                  step.active && styles.stepDotActive,
                ]}
              >
                {step.done ? (
                  <Text style={styles.checkIcon}>✓</Text>
                ) : step.active ? (
                  <ActivityIndicator size="small" color="#FACC15" />
                ) : (
                  <View style={styles.stepDotInner} />
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  step.done && styles.stepLabelDone,
                  step.active && styles.stepLabelActive,
                ]}
              >
                {step.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Chiqish</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'space-between' },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 60, alignItems: 'center' },
  emoji: { fontSize: 72, marginBottom: 24 },
  title: { fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 22, marginBottom: 48 },
  steps: { width: '100%', gap: 20 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  stepDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  stepDotDone: { backgroundColor: '#22C55E', borderColor: '#22C55E' },
  stepDotActive: { backgroundColor: '#FFFBEB', borderColor: '#FACC15' },
  stepDotInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D1D5DB' },
  checkIcon: { color: '#fff', fontSize: 16, fontWeight: '700' },
  stepLabel: { fontSize: 15, color: '#9CA3AF' },
  stepLabelDone: { color: '#22C55E', fontWeight: '600' },
  stepLabelActive: { color: '#111827', fontWeight: '600' },
  logoutBtn: {
    marginHorizontal: 24,
    marginBottom: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  logoutText: { fontSize: 15, color: '#6B7280', fontWeight: '500' },
})
