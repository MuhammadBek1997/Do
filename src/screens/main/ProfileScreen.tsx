import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthStore } from '../../store/authStore'

const MOCK_CAR = {
  brand: 'Chevrolet Cobalt',
  color: 'Oq',
  plate: '01 A 123 BC',
  year: '2021',
}

export default function ProfileScreen() {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const driver = useAuthStore(s => s.driver)
  const logout = useAuthStore(s => s.logout)

  const handleLogout = () => {
    Alert.alert(
      'Chiqish',
      'Hisobdan chiqishni xohlaysizmi?',
      [
        { text: 'Bekor qilish', style: 'cancel' },
        { text: 'Chiqish', style: 'destructive', onPress: logout },
      ]
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top || 16 }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <Text style={styles.driverName}>{driver?.name ?? 'Haydovchi'}</Text>
          <Text style={styles.driverPhone}>{driver?.phone ?? '—'}</Text>
          <View style={[styles.statusBadge,
            driver?.status === 'APPROVED' ? styles.badgeApproved :
            driver?.status === 'BLOCKED' ? styles.badgeBlocked : styles.badgePending
          ]}>
            <Text style={styles.badgeText}>
              {driver?.status === 'APPROVED' ? '✓ Tasdiqlangan' :
               driver?.status === 'BLOCKED' ? '✗ Bloklangan' : '⏳ Kutilmoqda'}
            </Text>
          </View>
        </View>

        {/* Car info */}
        <Text style={styles.sectionTitle}>Avtomobil</Text>
        <View style={styles.card}>
          {[
            { label: 'Model', value: MOCK_CAR.brand },
            { label: 'Rang', value: MOCK_CAR.color },
            { label: 'Davlat raqami', value: MOCK_CAR.plate },
            { label: 'Yil', value: MOCK_CAR.year },
          ].map(item => (
            <View key={item.label} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoVal}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Rating */}
        <Text style={styles.sectionTitle}>Statistika</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>⭐ 4.8</Text>
            <Text style={styles.statLabel}>Reyting</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>247</Text>
            <Text style={styles.statLabel}>Safarlar</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statVal}>98%</Text>
            <Text style={styles.statLabel}>Qabul</Text>
          </View>
        </View>

        {/* Settings */}
        <Text style={styles.sectionTitle}>Sozlamalar</Text>
        <View style={styles.card}>
          {[
            { icon: '🔔', label: 'Bildirishnomalar' },
            { icon: '🌐', label: 'Til: O\'zbek' },
            { icon: '❓', label: 'Yordam' },
          ].map(item => (
            <TouchableOpacity key={item.label} style={styles.menuRow}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Hisobdan chiqish</Text>
        </TouchableOpacity>
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
  scroll: { padding: 20, gap: 8, paddingBottom: 40 },
  avatarSection: { alignItems: 'center', paddingVertical: 24, gap: 8 },
  avatarCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center',
    marginBottom: 4,
  },
  avatarEmoji: { fontSize: 40 },
  driverName: { fontSize: 22, fontWeight: '700', color: '#111827' },
  driverPhone: { fontSize: 14, color: '#6B7280' },
  statusBadge: {
    borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, marginTop: 4,
  },
  badgeApproved: { backgroundColor: '#DCFCE7' },
  badgePending: { backgroundColor: '#FEF3C7' },
  badgeBlocked: { backgroundColor: '#FEE2E2' },
  badgeText: { fontSize: 13, fontWeight: '600', color: '#374151' },
  sectionTitle: {
    fontSize: 13, fontWeight: '700', color: '#9CA3AF',
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, marginTop: 8,
  },
  card: {
    backgroundColor: '#F9FAFB', borderRadius: 16,
    borderWidth: 1, borderColor: '#E5E7EB', overflow: 'hidden', marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  infoLabel: { fontSize: 14, color: '#6B7280' },
  infoVal: { fontSize: 14, fontWeight: '600', color: '#111827' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  statCard: {
    flex: 1, backgroundColor: '#F9FAFB', borderRadius: 14, padding: 14,
    alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB',
  },
  statVal: { fontSize: 18, fontWeight: '700', color: '#111827' },
  statLabel: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  menuRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 16, gap: 12,
    borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  menuIcon: { fontSize: 20 },
  menuLabel: { flex: 1, fontSize: 15, color: '#374151' },
  menuArrow: { fontSize: 20, color: '#D1D5DB' },
  logoutBtn: {
    marginTop: 24, paddingVertical: 16, borderRadius: 14,
    borderWidth: 1.5, borderColor: '#FEE2E2', alignItems: 'center',
    backgroundColor: '#FFF5F5',
  },
  logoutText: { fontSize: 15, fontWeight: '600', color: '#EF4444' },
})
