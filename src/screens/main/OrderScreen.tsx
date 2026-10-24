import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function OrderScreen() {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const insets = useSafeAreaInsets()
  const order = route.params?.order
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(t)
          navigation.goBack()
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  const handleAccept = () => {
    navigation.replace('Trip', { order })
  }

  const handleDecline = () => {
    navigation.goBack()
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top || 24, paddingBottom: insets.bottom || 24 }]}>
      {/* Countdown */}
      <View style={styles.countdownBox}>
        <Text style={styles.countdownNum}>{countdown}</Text>
        <Text style={styles.countdownLabel}>soniya qoldi</Text>
      </View>

      <Text style={styles.title}>Yangi buyurtma!</Text>

      <View style={styles.card}>
        <View style={styles.routeRow}>
          <View style={styles.routeDots}>
            <View style={styles.dotGreen} />
            <View style={styles.routeLine} />
            <View style={styles.dotRed} />
          </View>
          <View style={styles.routeAddrs}>
            <View style={styles.addrBox}>
              <Text style={styles.addrLabel}>Olish joyi</Text>
              <Text style={styles.addrText}>{order?.pickup ?? '...'}</Text>
            </View>
            <View style={styles.addrBox}>
              <Text style={styles.addrLabel}>Borish joyi</Text>
              <Text style={styles.addrText}>{order?.destination ?? '...'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaVal}>{order?.distance ?? '—'}</Text>
            <Text style={styles.metaKey}>Masofa</Text>
          </View>
          <View style={styles.metaSep} />
          <View style={styles.metaItem}>
            <Text style={styles.metaVal}>{order?.time ?? '—'}</Text>
            <Text style={styles.metaKey}>Vaqt</Text>
          </View>
          <View style={styles.metaSep} />
          <View style={styles.metaItem}>
            <Text style={[styles.metaVal, styles.priceVal]}>{order?.price ?? '—'}</Text>
            <Text style={styles.metaKey}>Narx</Text>
          </View>
        </View>

        <View style={styles.passengerRow}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <View>
            <Text style={styles.passengerName}>{order?.passenger ?? 'Noma\'lum'}</Text>
            <Text style={styles.passengerLabel}>Yo'lovchi</Text>
          </View>
          <View style={styles.starRow}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.starVal}>4.8</Text>
          </View>
        </View>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity style={styles.declineBtn} onPress={handleDecline}>
          <Text style={styles.declineText}>Rad etish</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept}>
          <Text style={styles.acceptText}>Qabul qilish</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  countdownBox: { alignItems: 'center', paddingVertical: 16 },
  countdownNum: { fontSize: 48, fontWeight: '800', color: '#FACC15' },
  countdownLabel: { fontSize: 13, color: '#9CA3AF', marginTop: -4 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827', textAlign: 'center', marginBottom: 16 },
  card: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 16,
  },
  routeRow: { flexDirection: 'row', gap: 16 },
  routeDots: { alignItems: 'center', paddingTop: 4 },
  dotGreen: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#22C55E' },
  routeLine: { width: 2, flex: 1, backgroundColor: '#E5E7EB', marginVertical: 4 },
  dotRed: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#EF4444' },
  routeAddrs: { flex: 1, gap: 20 },
  addrBox: {},
  addrLabel: { fontSize: 11, color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase', marginBottom: 2 },
  addrText: { fontSize: 15, color: '#111827', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#E5E7EB' },
  metaRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  metaItem: { alignItems: 'center', flex: 1 },
  metaVal: { fontSize: 16, fontWeight: '700', color: '#111827' },
  priceVal: { color: '#22C55E' },
  metaKey: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  metaSep: { width: 1, height: 32, backgroundColor: '#E5E7EB' },
  passengerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 22 },
  passengerName: { fontSize: 15, fontWeight: '600', color: '#111827' },
  passengerLabel: { fontSize: 12, color: '#9CA3AF' },
  starRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: 'auto' },
  star: { fontSize: 14 },
  starVal: { fontSize: 14, fontWeight: '600', color: '#111827' },
  btnRow: { flexDirection: 'row', gap: 12, marginTop: 'auto', paddingTop: 16 },
  declineBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  declineText: { fontSize: 15, fontWeight: '600', color: '#6B7280' },
  acceptBtn: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: '#22C55E',
    alignItems: 'center',
  },
  acceptText: { fontSize: 15, fontWeight: '700', color: '#fff' },
})
