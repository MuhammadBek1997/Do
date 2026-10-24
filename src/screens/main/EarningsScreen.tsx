import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const MOCK_WEEK = [
  { day: 'Du', trips: 8, amount: 98000 },
  { day: 'Se', trips: 12, amount: 145000 },
  { day: 'Ch', trips: 6, amount: 74000 },
  { day: 'Pa', trips: 15, amount: 182000 },
  { day: 'Ju', trips: 11, amount: 133000 },
  { day: 'Sh', trips: 9, amount: 108000 },
  { day: 'Ya', trips: 0, amount: 0 },
]
const MAX_AMOUNT = Math.max(...MOCK_WEEK.map(d => d.amount))
const TOTAL = MOCK_WEEK.reduce((s, d) => s + d.amount, 0)
const TOTAL_TRIPS = MOCK_WEEK.reduce((s, d) => s + d.trips, 0)

function fmt(n: number) {
  return n.toLocaleString('uz-UZ') + ' so\'m'
}

export default function EarningsScreen() {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top || 16 }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daromad</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Summary cards */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, styles.cardGreen]}>
            <Text style={styles.summaryLabel}>Haftalik</Text>
            <Text style={styles.summaryAmount}>{fmt(TOTAL)}</Text>
            <Text style={styles.summaryTrips}>{TOTAL_TRIPS} ta safar</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Bugun</Text>
            <Text style={styles.summaryAmount}>0 so'm</Text>
            <Text style={styles.summaryTrips}>0 ta safar</Text>
          </View>
        </View>

        {/* Bar chart */}
        <Text style={styles.sectionTitle}>Bu hafta</Text>
        <View style={styles.chartCard}>
          <View style={styles.bars}>
            {MOCK_WEEK.map(d => (
              <View key={d.day} style={styles.barCol}>
                <View style={styles.barWrap}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: MAX_AMOUNT > 0 ? (d.amount / MAX_AMOUNT) * 100 : 4,
                        backgroundColor: d.amount === MAX_AMOUNT ? '#FACC15' : '#E5E7EB',
                      },
                    ]}
                  />
                </View>
                <Text style={styles.barDay}>{d.day}</Text>
                <Text style={styles.barTrips}>{d.trips}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.chartNote}>* Ustunlar safar soni (raqam) va daromad (balandlik)</Text>
        </View>

        {/* Trip history */}
        <Text style={styles.sectionTitle}>Oxirgi safarlar</Text>
        <View style={styles.historyCard}>
          {[
            { time: '14:32', from: 'Chilonzor', to: 'Yunusobod', amount: 12500 },
            { time: '12:15', from: 'Olmazor', to: "Amir Temur ko'chasi", amount: 9800 },
            { time: '10:44', from: 'Mirzo Ulug\'bek', to: 'Minor', amount: 7200 },
          ].map((t, i) => (
            <View key={i} style={[styles.tripRow, i > 0 && styles.tripBorder]}>
              <View style={styles.tripTime}>
                <Text style={styles.tripTimeText}>{t.time}</Text>
              </View>
              <View style={styles.tripRoute}>
                <Text style={styles.tripFrom}>{t.from}</Text>
                <Text style={styles.tripArrow}>→</Text>
                <Text style={styles.tripTo}>{t.to}</Text>
              </View>
              <Text style={styles.tripAmount}>+{fmt(t.amount)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center',
  },
  backIcon: { fontSize: 20, color: '#1F2937' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#111827' },
  scroll: { padding: 20, gap: 8 },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  summaryCard: {
    flex: 1, backgroundColor: '#F9FAFB', borderRadius: 16,
    padding: 16, borderWidth: 1, borderColor: '#E5E7EB',
  },
  cardGreen: { backgroundColor: '#DCFCE7', borderColor: '#86EFAC' },
  summaryLabel: { fontSize: 12, color: '#6B7280', fontWeight: '600', marginBottom: 4 },
  summaryAmount: { fontSize: 18, fontWeight: '800', color: '#111827' },
  summaryTrips: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  sectionTitle: {
    fontSize: 13, fontWeight: '700', color: '#9CA3AF',
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, marginTop: 8,
  },
  chartCard: {
    backgroundColor: '#F9FAFB', borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 16,
  },
  bars: { flexDirection: 'row', gap: 8, height: 120, alignItems: 'flex-end' },
  barCol: { flex: 1, alignItems: 'center' },
  barWrap: { flex: 1, justifyContent: 'flex-end', width: '100%' },
  bar: { width: '100%', borderRadius: 4, minHeight: 4 },
  barDay: { fontSize: 11, color: '#9CA3AF', marginTop: 4 },
  barTrips: { fontSize: 11, fontWeight: '700', color: '#374151' },
  chartNote: { fontSize: 11, color: '#D1D5DB', marginTop: 8, textAlign: 'center' },
  historyCard: {
    backgroundColor: '#F9FAFB', borderRadius: 16,
    borderWidth: 1, borderColor: '#E5E7EB', overflow: 'hidden',
  },
  tripRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  tripBorder: { borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  tripTime: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center',
  },
  tripTimeText: { fontSize: 11, fontWeight: '600', color: '#374151' },
  tripRoute: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' },
  tripFrom: { fontSize: 13, color: '#374151', fontWeight: '500' },
  tripArrow: { fontSize: 12, color: '#9CA3AF' },
  tripTo: { fontSize: 13, color: '#374151', fontWeight: '500' },
  tripAmount: { fontSize: 13, fontWeight: '700', color: '#22C55E' },
})
