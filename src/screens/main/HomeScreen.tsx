import { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native'
import { WebView as RNWebView } from 'react-native-webview'

const WebView = RNWebView as any
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuthStore } from '../../store/authStore'
import { useLocation } from '../../hooks/useLocation'

function buildMapHtml(lat: number, lng: number) {
  return `<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>html,body,#map{margin:0;padding:0;width:100%;height:100%;}</style>
</head><body>
<div id="map"></div>
<script>
var map = L.map('map', {zoomControl:false, attributionControl:false}).setView([${lat},${lng}], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:19}).addTo(map);
var marker = L.divIcon({className:'',html:'<div style="font-size:28px;line-height:1;">🚗</div>',iconAnchor:[14,14]});
var m = L.marker([${lat},${lng}],{icon:marker}).addTo(map);
window.updatePos = function(lat,lng){m.setLatLng([lat,lng]);map.panTo([lat,lng]);};
</script>
</body></html>`
}

// Mock buyurtma
const MOCK_ORDER = {
  id: 'order-1',
  passenger: 'Bobur Yusupov',
  pickup: "Chilonzor, 9-kvartal",
  destination: "Yunusobod savdo markazi",
  distance: '4.2 km',
  price: '12 500 so\'m',
  time: '8 daqiqa',
}

export default function HomeScreen() {
  const navigation = useNavigation<any>()
  const insets = useSafeAreaInsets()
  const driver = useAuthStore(s => s.driver)
  const logout = useAuthStore(s => s.logout)
  const { location, isReady, isLoading, error } = useLocation()
  const webViewRef = useRef<any>(null)
  const defaultLat = location?.latitude ?? 41.2995
  const defaultLng = location?.longitude ?? 69.2401

  const [isOnline, setIsOnline] = useState(false)
  const [hasOrder, setHasOrder] = useState(false)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    if (location && mapReady) {
      webViewRef.current?.injectJavaScript(
        `window.updatePos && window.updatePos(${location.latitude}, ${location.longitude}); true;`
      )
    }
  }, [location, mapReady])

  // Online bo'lganda 5 soniyadan keyin mock buyurtma keladi
  useEffect(() => {
    if (!isOnline) { setHasOrder(false); return }
    const t = setTimeout(() => setHasOrder(true), 5000)
    return () => clearTimeout(t)
  }, [isOnline])

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        style={styles.map}
        originWhitelist={['*']}
        source={{ html: buildMapHtml(defaultLat, defaultLng) }}
        onLoad={() => setMapReady(true)}
        javaScriptEnabled
        domStorageEnabled
        mixedContentMode="always"
      />

      {/* Top bar */}
      <View style={[styles.topBar, { paddingTop: insets.top || 16 }]}>
        <View style={[styles.statusPill, isOnline ? styles.pillOnline : styles.pillOffline]}>
          <View style={[styles.statusDot, isOnline ? styles.dotOnline : styles.dotOffline]} />
          <Text style={[styles.statusText, isOnline ? styles.textOnline : styles.textOffline]}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
        </View>

        <View style={styles.driverChip}>
          <Text style={styles.driverName}>{driver?.name?.split(' ')[0] ?? 'Haydovchi'}</Text>
        </View>
      </View>

      {/* GPS banner */}
      {!isReady && location && (
        <View style={styles.gpsBanner}>
          <ActivityIndicator size="small" color="#FACC15" />
          <Text style={styles.gpsText}>GPS: {Math.round(location.accuracy ?? 999)}m</Text>
        </View>
      )}

      {/* Bottom sheet */}
      <View style={[styles.bottomSheet, { paddingBottom: insets.bottom || 24 }]}>
        {hasOrder && isOnline ? (
          /* Incoming order card */
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderTitle}>Yangi buyurtma!</Text>
              <Text style={styles.orderPrice}>{MOCK_ORDER.price}</Text>
            </View>

            <View style={styles.orderRow}>
              <Text style={styles.orderDot}>🟢</Text>
              <Text style={styles.orderAddr}>{MOCK_ORDER.pickup}</Text>
            </View>
            <View style={styles.orderRow}>
              <Text style={styles.orderDot}>🔴</Text>
              <Text style={styles.orderAddr}>{MOCK_ORDER.destination}</Text>
            </View>

            <View style={styles.orderMeta}>
              <Text style={styles.orderMetaText}>📍 {MOCK_ORDER.distance}</Text>
              <Text style={styles.orderMetaText}>⏱ {MOCK_ORDER.time}</Text>
              <Text style={styles.orderMetaText}>👤 {MOCK_ORDER.passenger}</Text>
            </View>

            <View style={styles.orderBtns}>
              <TouchableOpacity
                style={styles.declineBtn}
                onPress={() => setHasOrder(false)}
              >
                <Text style={styles.declineText}>Rad etish</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptBtn}
                onPress={() => {
                  setHasOrder(false)
                  navigation.navigate('Trip', { order: MOCK_ORDER })
                }}
              >
                <Text style={styles.acceptText}>Qabul qilish</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* Online/Offline toggle */
          <View style={styles.toggleSection}>
            <Text style={styles.earningsToday}>
              Bugungi daromad: <Text style={styles.earningsAmount}>0 so'm</Text>
            </Text>

            <TouchableOpacity
              style={[styles.toggleBtn, isOnline ? styles.toggleBtnOnline : styles.toggleBtnOffline]}
              onPress={() => setIsOnline(v => !v)}
              activeOpacity={0.85}
            >
              <Text style={styles.toggleIcon}>{isOnline ? '🟢' : '⏸'}</Text>
              <Text style={styles.toggleText}>
                {isOnline ? 'Buyurtma kutilmoqda...' : 'Ishni boshlash'}
              </Text>
            </TouchableOpacity>

            <View style={styles.navRow}>
              <TouchableOpacity
                style={styles.navBtn}
                onPress={() => navigation.navigate('Earnings')}
              >
                <Text style={styles.navIcon}>💰</Text>
                <Text style={styles.navLabel}>Daromad</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navBtn}
                onPress={() => navigation.navigate('Profile')}
              >
                <Text style={styles.navIcon}>👤</Text>
                <Text style={styles.navLabel}>Profil</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  map: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  errorText: { fontSize: 15, color: '#EF4444', textAlign: 'center' },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  pillOnline: { backgroundColor: '#DCFCE7' },
  pillOffline: { backgroundColor: '#fff' },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  dotOnline: { backgroundColor: '#22C55E' },
  dotOffline: { backgroundColor: '#9CA3AF' },
  statusText: { fontSize: 13, fontWeight: '600' },
  textOnline: { color: '#15803D' },
  textOffline: { color: '#6B7280' },
  driverChip: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  driverName: { fontSize: 13, fontWeight: '600', color: '#111827' },
  gpsBanner: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 80 : 60,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.75)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  gpsText: { color: '#fff', fontSize: 13 },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
  },
  orderCard: { gap: 12 },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  orderPrice: { fontSize: 18, fontWeight: '700', color: '#22C55E' },
  orderRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  orderDot: { fontSize: 12 },
  orderAddr: { fontSize: 14, color: '#374151', flex: 1 },
  orderMeta: { flexDirection: 'row', gap: 16, flexWrap: 'wrap' },
  orderMetaText: { fontSize: 13, color: '#6B7280' },
  orderBtns: { flexDirection: 'row', gap: 12, marginTop: 4 },
  declineBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  declineText: { fontSize: 15, fontWeight: '600', color: '#6B7280' },
  acceptBtn: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#22C55E',
    alignItems: 'center',
  },
  acceptText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  toggleSection: { gap: 16 },
  earningsToday: { fontSize: 13, color: '#6B7280', textAlign: 'center' },
  earningsAmount: { color: '#111827', fontWeight: '700' },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 18,
    borderRadius: 16,
  },
  toggleBtnOnline: { backgroundColor: '#DCFCE7' },
  toggleBtnOffline: { backgroundColor: '#FACC15' },
  toggleIcon: { fontSize: 20 },
  toggleText: { fontSize: 17, fontWeight: '700', color: '#111827' },
  navRow: { flexDirection: 'row', justifyContent: 'center', gap: 32 },
  navBtn: { alignItems: 'center', gap: 4 },
  navIcon: { fontSize: 24 },
  navLabel: { fontSize: 12, color: '#6B7280', fontWeight: '500' },
})
