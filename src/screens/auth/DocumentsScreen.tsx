import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const MOCK_MODE = true

export default function DocumentsScreen() {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: insets.top || 40 }]}>
      <View style={styles.content}>
        <Text style={styles.emoji}>📋</Text>
        <Text style={styles.title}>Hujjatlaringizni yuklang</Text>
        <Text style={styles.subtitle}>
          Haydovchilik guvohnomasi va avtomobil hujjatlari talab qilinadi
        </Text>

        <View style={styles.docList}>
          {[
            { icon: '🪪', label: "Haydovchilik guvohnomasi" },
            { icon: '🚗', label: "Texnik pasport" },
            { icon: '📄', label: "Majburiy sug'urta" },
          ].map(doc => (
            <View key={doc.label} style={styles.docRow}>
              <Text style={styles.docIcon}>{doc.icon}</Text>
              <Text style={styles.docLabel}>{doc.label}</Text>
              <View style={styles.docBadge}>
                <Text style={styles.docBadgeText}>Yuklanmagan</Text>
              </View>
            </View>
          ))}
        </View>

        {MOCK_MODE ? (
          <View style={styles.mockBox}>
            <Text style={styles.mockTitle}>Mock rejim</Text>
            <Text style={styles.mockText}>
              Haqiqiy rejimda hujjat yuklash bo'ladi.{'\n'}
              Hozir "O'tkazib yuborish" tugmasini bosing.
            </Text>
            <TouchableOpacity
              style={styles.skipBtn}
              onPress={() => navigation.navigate('Pending')}
            >
              <Text style={styles.skipText}>O'tkazib yuborish →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.8}>
            <Text style={styles.uploadText}>Hujjatlarni yuklash</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 40, alignItems: 'center' },
  emoji: { fontSize: 64, marginBottom: 24 },
  title: { fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 20, marginBottom: 32 },
  docList: { width: '100%', gap: 12, marginBottom: 32 },
  docRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  docIcon: { fontSize: 24 },
  docLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: '#374151' },
  docBadge: {
    backgroundColor: '#FEE2E2',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  docBadgeText: { fontSize: 11, color: '#DC2626', fontWeight: '600' },
  mockBox: {
    width: '100%',
    backgroundColor: '#FEF3C7',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },
  mockTitle: { fontSize: 14, fontWeight: '700', color: '#92400E', marginBottom: 8 },
  mockText: { fontSize: 13, color: '#78350F', textAlign: 'center', lineHeight: 18, marginBottom: 16 },
  skipBtn: {
    backgroundColor: '#FACC15',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  skipText: { fontSize: 14, fontWeight: '700', color: '#111827' },
  uploadBtn: {
    width: '100%',
    backgroundColor: '#FACC15',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  uploadText: { fontSize: 16, fontWeight: '700', color: '#111827' },
})
