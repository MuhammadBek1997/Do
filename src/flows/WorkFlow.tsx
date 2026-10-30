import { useEffect, useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuthStore } from '../store/authStore'
import { usePrefs, useWork } from '../store/prefsStore'
import { Button, Card, CityMap, Header, RoundButton, Screen, Segment } from '../ui/components'
import { som, useTheme } from '../ui/theme'

export function DashboardScreen() {
  const navigation = useNavigation<any>()
  const { colors, dark } = useTheme()
  const toggleDark = usePrefs((s) => s.toggleDark)
  const mode = useWork((s) => s.mode)
  const setMode = useWork((s) => s.setMode)
  const vehicle = useWork((s) => s.vehicle)
  const setVehicle = useWork((s) => s.setVehicle)
  const online = useWork((s) => s.online)
  const setOnline = useWork((s) => s.setOnline)
  const driver = useAuthStore((s) => s.driver)
  return (
    <Screen pad={false} map>
      <CityMap>
        <View style={{ position: 'absolute', top: 12, left: 12, backgroundColor: colors.surface, borderRadius: 12, padding: 8 }}>
          <Text style={{ color: colors.accent, fontWeight: '800' }}>×1.4</Text>
        </View>
        <View style={{ position: 'absolute', top: 12, right: 12, backgroundColor: colors.surface, borderRadius: 12, padding: 8 }}>
          <Text style={{ color: colors.accent, fontWeight: '800' }}>×1.2</Text>
        </View>
      </CityMap>
      <View style={{ backgroundColor: colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 16, gap: 10 }}>
        <Segment
          value={mode}
          onChange={(id) => setMode(id as 'taxi' | 'courier')}
          options={[{ id: 'taxi', label: 'Taksi' }, { id: 'courier', label: 'Kuryer' }]}
        />
        {mode === 'courier' ? (
          <Segment
            value={vehicle}
            onChange={(id) => setVehicle(id as 'moto' | 'velo' | 'auto' | 'yuk')}
            options={[
              { id: 'moto', label: 'Moto' },
              { id: 'velo', label: 'Velo' },
              { id: 'auto', label: 'Auto' },
              { id: 'yuk', label: 'Yuk' },
            ]}
          />
        ) : null}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ color: colors.text, fontSize: 20, fontWeight: '700' }}>{online ? 'Liniyada' : 'Oflayn'}</Text>
            <Text style={{ color: colors.secondary }}>{online ? 'Buyurtmalar qabul qilinmoqda' : 'Buyurtma kelmaydi'} · {driver?.name || 'Sherzod'}</Text>
          </View>
          <Pressable onPress={() => setOnline(!online)} style={{ backgroundColor: online ? colors.success : colors.subtle, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 8 }}>
            <Text style={{ color: online ? '#fff' : colors.text, fontWeight: '700' }}>{online ? 'On' : 'Off'}</Text>
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Stat label="Bugun, so'm" value="412 000" />
          <Stat label="Safar" value={mode === 'taxi' ? '17' : '9'} />
          <Stat label="Liniyada" value="6.5 soat" />
          <Stat label="Reyting" value="4.92" />
        </View>
        <Text style={{ color: colors.secondary }}>{online ? 'Buyurtma qidirilmoqda' : 'Liniyaga chiqing'}</Text>
        <Text style={{ color: colors.text }}>Yuqori talab: Toshkent City (×1.4)</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <RoundButton label={dark ? '☀' : '☾'} onPress={toggleDark} />
          <Button title="Filtr" variant="secondary" onPress={() => navigation.navigate('Filters')} />
        </View>
        <Button
          title={mode === 'taxi' ? 'Yangi taksi buyurtmasi' : vehicle === 'yuk' ? 'Yuk so\'rovi' : 'Yangi yetkazish'}
          disabled={!online}
          onPress={() => navigation.navigate(mode === 'taxi' ? 'Incoming' : vehicle === 'yuk' ? 'CargoRequest' : 'CourierIncoming')}
        />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable onPress={() => navigation.navigate('Earnings')} style={{ flex: 1 }}><Text style={{ color: colors.accent, fontWeight: '700' }}>Daromad</Text></Pressable>
          <Pressable onPress={() => navigation.navigate('WorkProfile')} style={{ flex: 1 }}><Text style={{ color: colors.accent, fontWeight: '700' }}>Profil</Text></Pressable>
          <Pressable onPress={() => navigation.navigate('GpsOff')} style={{ flex: 1 }}><Text style={{ color: colors.accent, fontWeight: '700' }}>GPS</Text></Pressable>
          <Pressable onPress={() => navigation.navigate('IntercityDrive')} style={{ flex: 1 }}><Text style={{ color: colors.accent, fontWeight: '700' }}>Shahar</Text></Pressable>
          {mode === 'courier' && vehicle === 'auto' ? (
            <Pressable onPress={() => navigation.navigate('MultiRoute')} style={{ flex: 1 }}><Text style={{ color: colors.accent, fontWeight: '700' }}>Marshrut</Text></Pressable>
          ) : null}
        </View>
      </View>
    </Screen>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  const { colors } = useTheme()
  return (
    <View style={{ flex: 1, backgroundColor: colors.subtle, borderRadius: 12, padding: 8 }}>
      <Text style={{ color: colors.text, fontWeight: '700' }}>{value}</Text>
      <Text style={{ color: colors.secondary, fontSize: 10 }}>{label}</Text>
    </View>
  )
}

export function FiltersScreen() {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()
  const [auto, setAuto] = useState(false)
  return (
    <Screen scroll footer={<Button title="Saqlash" onPress={() => navigation.goBack()} />}>
      <Header title="Filtr" onBack={() => navigation.goBack()} />
      <View style={{ gap: 10, marginTop: 12 }}>
        <Card><Text style={{ color: colors.text, fontWeight: '700' }}>Komfort</Text><Text style={{ color: colors.secondary }}>Shu tarifdagi buyurtmalar</Text></Card>
        <Card onPress={() => setAuto((v) => !v)}>
          <Text style={{ color: colors.text, fontWeight: '700' }}>Avto-qabul</Text>
          <Text style={{ color: colors.secondary }}>{auto ? 'Yoniq' : "O'chiq"}</Text>
        </Card>
        <Card><Text style={{ color: colors.text, fontWeight: '700' }}>Masofa</Text><Text style={{ color: colors.secondary }}>5 km gacha</Text></Card>
      </View>
    </Screen>
  )
}

export function IncomingScreen() {
  const navigation = useNavigation<any>()
  const [left, setLeft] = useState(10)
  const { colors } = useTheme()
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <Screen map pad={false} footer={
      <View style={{ gap: 8 }}>
        <Button title="Qabul qilish" disabled={left === 0} onPress={() => navigation.replace('PickupNav')} />
        <Button title="Rad etish" variant="danger" onPress={() => navigation.goBack()} />
        <Button title="Boshqa haydovchi oldi" variant="ghost" onPress={() => navigation.replace('OfferTaken')} />
      </View>
    }>
      <CityMap />
      <View style={{ backgroundColor: colors.surface, padding: 16, gap: 4 }}>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>Yangi buyurtma · Komfort</Text>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: '700' }}>{som(19000)}</Text>
        <Text style={{ color: colors.secondary }}>Naqd · +2 000 so'm talab bonusi</Text>
        <Text style={{ color: colors.text }}>1.2 km · Mijozgacha · 3 daq</Text>
        <Text style={{ color: colors.text }}>4.2 km · Safar · 14 daq</Text>
        <Text style={{ color: colors.secondary }}>Mustaqillik ko'chasi, 15 → Toshkent City Mall</Text>
        <Text style={{ color: colors.text, fontWeight: '600' }}>Aziz A. · 4.8 · 126 safar</Text>
        <Text style={{ color: colors.warning, fontWeight: '700' }}>{left > 0 ? `${left} soniyada boshqa haydovchiga o'tadi` : 'Vaqt tugadi'}</Text>
      </View>
    </Screen>
  )
}

export function PickupNavScreen() {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()
  return (
    <Screen map pad={false} footer={<Button title="Yetib keldim" onPress={() => navigation.navigate('WaitingClient')} />}>
      <CityMap />
      <View style={{ backgroundColor: colors.surface, padding: 16, gap: 4 }}>
        <Text style={{ color: colors.text, fontSize: 28, fontWeight: '800' }}>350 m</Text>
        <Text style={{ color: colors.text, fontWeight: '700' }}>Amir Temur ko'chasiga o'nga</Text>
        <Text style={{ color: colors.secondary }}>Keyin · Mustaqillik ko'chasi, 15</Text>
        <Text style={{ color: colors.text }}>Mijozga yo'l · 1.2 km · 3 daq · 14:38</Text>
        <Text style={{ color: colors.secondary }}>Komfort · Aziz A. · 4.8 ★</Text>
        <Text style={{ color: colors.text }}>Izoh: "Kirish oldida kutaman"</Text>
      </View>
    </Screen>
  )
}

export function ActiveTripScreen() {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()
  return (
    <Screen map pad={false} footer={
      <View style={{ gap: 8 }}>
        <Button title="Safarni yakunlash" onPress={() => navigation.navigate('ConfirmFinish')} />
        <Button title="Bekor qilish" variant="ghost" onPress={() => navigation.navigate('DriverCancel')} />
      </View>
    }>
      <CityMap>
        <Pressable onPress={() => navigation.navigate('ClientCancelled')} style={{ position: 'absolute', top: 16, left: 16, backgroundColor: colors.surface, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 }}>
          <Text style={{ color: colors.error, fontWeight: '700' }}>Mijoz bekor</Text>
        </Pressable>
      </CityMap>
      <View style={{ backgroundColor: colors.surface, padding: 16, gap: 4 }}>
        <Text style={{ color: colors.text, fontSize: 28, fontWeight: '800' }}>600 m</Text>
        <Text style={{ color: colors.text, fontWeight: '700' }}>Furqat ko'chasiga chapga</Text>
        <Text style={{ color: colors.secondary }}>Toshkent City Mall · 2.8 km · 9 daq · 14:52</Text>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>{som(19000)}</Text>
        <Text style={{ color: colors.secondary }}>Mijoz · Ulashish</Text>
      </View>
    </Screen>
  )
}

export function TripDoneScreen() {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()
  return (
    <Screen footer={<Button title="Liniyaga qaytish" onPress={() => navigation.popToTop()} />}>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: '700', marginTop: 24 }}>Safar yakunlandi</Text>
      <Text style={{ color: colors.text, fontSize: 32, fontWeight: '800', marginTop: 8 }}>{som(19000)}</Text>
      <Text style={{ color: colors.secondary }}>Naqd · Komfort · Aziz A.</Text>
    </Screen>
  )
}

export function EarningsScreen() {
  const navigation = useNavigation<any>()
  const mode = useWork((s) => s.mode)
  const { colors } = useTheme()
  return (
    <Screen scroll>
      <Header title="Daromad" onBack={() => navigation.goBack()} />
      <Text style={{ color: colors.text, fontSize: 32, fontWeight: '800', marginTop: 12 }}>{som(412000)}</Text>
      <Text style={{ color: colors.secondary }}>Bugun</Text>
      <View style={{ gap: 8, marginTop: 16 }}>
        <Card><Text style={{ color: colors.text, fontWeight: '700' }}>{mode === 'taxi' ? '17 ta safar' : '9 ta yetkazish'}</Text></Card>
        <Card><Text style={{ color: colors.text, fontWeight: '700' }}>6.5 soat liniyada</Text></Card>
        {mode === 'courier' ? <Card><Text style={{ color: colors.text, fontWeight: '700' }}>Yutuq · 10 ta tezkor yetkazish</Text></Card> : null}
      </View>
    </Screen>
  )
}

export function CourierIncomingScreen() {
  const navigation = useNavigation<any>()
  const vehicle = useWork((s) => s.vehicle)
  const [left, setLeft] = useState(10)
  const { colors } = useTheme()
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])
  const title = vehicle === 'velo' ? 'Velo buyurtma' : vehicle === 'auto' ? 'Auto posilka' : 'Moto · Rayhon'
  return (
    <Screen footer={
      <View style={{ gap: 8 }}>
        <Button title="Qabul qilish" disabled={left === 0} onPress={() => navigation.replace('CourierNav')} />
        <Button title="Rad etish" variant="outline" onPress={() => navigation.goBack()} />
      </View>
    }>
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: '700' }}>{title}</Text>
      <Text style={{ color: colors.secondary, marginVertical: 8 }}>{left} soniya</Text>
      <Card>
        <Text style={{ color: colors.text, fontWeight: '700' }}>Rayhon milliy taomlari</Text>
        <Text style={{ color: colors.secondary }}>Olib ketish · keyin Mustaqillik ko'chasi, 15</Text>
        <Text style={{ color: colors.text, marginTop: 8 }}>{som(18000)}</Text>
      </Card>
    </Screen>
  )
}

export function CourierNavScreen() {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()
  return (
    <Screen map pad={false} footer={<Button title="Restoranga yetib keldim" onPress={() => navigation.navigate('CourierPickup')} />}>
      <CityMap />
      <View style={{ backgroundColor: colors.surface, padding: 16 }}>
        <Text style={{ color: colors.text, fontWeight: '700' }}>Rayhon milliy taomlari</Text>
        <Text style={{ color: colors.secondary }}>1.1 km · 4 daq</Text>
      </View>
    </Screen>
  )
}

export function CourierPickupScreen() {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()
  const checks = ['Buyurtma tayyor', 'Ichki ichimlik bor', 'Chek olindi']
  return (
    <Screen scroll footer={<Button title="Rasmga olish" onPress={() => navigation.navigate('PickupPhoto')} />}>
      <Header title="Olib ketish" onBack={() => navigation.goBack()} />
      <View style={{ gap: 8, marginTop: 12 }}>
        {checks.map((item) => <Card key={item}><Text style={{ color: colors.text }}>{item}</Text></Card>)}
      </View>
    </Screen>
  )
}

export function CourierDeliverScreen() {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()
  return (
    <Screen map pad={false} footer={
      <View style={{ gap: 8 }}>
        <Button title="Topshirish rasmi" onPress={() => navigation.navigate('DropPhoto')} />
        <Button title="Yetkazib bo'lmadi" variant="ghost" onPress={() => navigation.navigate('ReturnParcel')} />
      </View>
    }>
      <CityMap />
      <View style={{ backgroundColor: colors.surface, padding: 16 }}>
        <Text style={{ color: colors.text, fontWeight: '700' }}>Mijozga yetkazish</Text>
        <Text style={{ color: colors.secondary }}>Mustaqillik ko'chasi, 15 · 4-xonadon</Text>
      </View>
    </Screen>
  )
}

export function CourierCodeScreen() {
  const navigation = useNavigation<any>()
  const [code, setCode] = useState('')
  const [wrong, setWrong] = useState(false)
  const { colors } = useTheme()
  const check = () => {
    if (code === '4819') {
      navigation.replace('TripDone')
      return
    }
    setWrong(true)
  }
  return (
    <Screen footer={<Button title="Tasdiqlash" onPress={check} />}>
      <Header title="Tasdiqlash kodi" onBack={() => navigation.goBack()} />
      <Text style={{ color: colors.secondary, marginVertical: 8 }}>Qabul qiluvchi kodi. To'g'ri kod: 4819. 5 urinish.</Text>
      <TextInput
        value={code}
        onChangeText={(v) => { setCode(v.replace(/\D/g, '').slice(0, 4)); setWrong(false) }}
        keyboardType="number-pad"
        style={{ borderWidth: 1, borderColor: wrong ? colors.error : colors.border, borderRadius: 12, minHeight: 52, paddingHorizontal: 14, color: colors.text, backgroundColor: colors.surface, fontSize: 20 }}
      />
      {wrong ? <Text style={{ color: colors.error, marginTop: 8 }}>Kod noto'g'ri. Qayta urinib ko'ring.</Text> : null}
      <Pressable onPress={() => navigation.navigate('CodeBlocked')} style={{ marginTop: 12 }}><Text style={{ color: colors.error, fontWeight: '700' }}>Kod bloklandi</Text></Pressable>
      <Pressable onPress={() => navigation.navigate('DontHand')} style={{ marginTop: 8 }}><Text style={{ color: colors.secondary, fontWeight: '700' }}>Aloqa yo'q — bermang</Text></Pressable>
      <Pressable onPress={() => navigation.navigate('DeliveredPlain')} style={{ marginTop: 8 }}><Text style={{ color: colors.accent, fontWeight: '700' }}>Kodsiz yetkazildi</Text></Pressable>
    </Screen>
  )
}

export function CargoRequestScreen() {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()
  return (
    <Screen map pad={false} footer={
      <View style={{ gap: 8 }}>
        <Button title="Qabul qilish" onPress={() => navigation.replace('CargoLoad')} />
        <Button title="Rad etish" variant="outline" onPress={() => navigation.goBack()} />
      </View>
    }>
      <CityMap />
      <View style={{ backgroundColor: colors.surface, padding: 16 }}>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>Yuk so'rovi</Text>
        <Text style={{ color: colors.secondary }}>Divan · Mustaqillik → Toshkent City Mall</Text>
        <Text style={{ color: colors.text, fontWeight: '700', marginTop: 6 }}>{som(240000)}</Text>
      </View>
    </Screen>
  )
}

export function CargoLoadScreen() {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()
  const steps = ['Yuk joyida', 'Qadoq butun', 'Yukchi imzosi']
  return (
    <Screen scroll footer={<Button title="Yo'lga chiqdim" onPress={() => navigation.navigate('CargoTransit')} />}>
      <Header title="Yuklash" onBack={() => navigation.goBack()} />
      <View style={{ gap: 8, marginTop: 12 }}>
        {steps.map((item) => <Card key={item}><Text style={{ color: colors.text }}>{item}</Text></Card>)}
      </View>
    </Screen>
  )
}

export function CargoTransitScreen() {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()
  return (
    <Screen map pad={false} footer={<Button title="Manzilga yetdim" onPress={() => navigation.navigate('CargoUnload')} />}>
      <CityMap />
      <View style={{ backgroundColor: colors.surface, padding: 16 }}>
        <Text style={{ color: colors.text, fontWeight: '700' }}>Manzilga yo'l</Text>
        <Text style={{ color: colors.secondary }}>Toshkent City Mall · 40 daq</Text>
      </View>
    </Screen>
  )
}

export function CargoUnloadScreen() {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()
  return (
    <Screen scroll footer={<Button title="Topshirildi" onPress={() => navigation.navigate('TripDone')} />}>
      <Header title="Tushirish" onBack={() => navigation.goBack()} />
      <Card>
        <Text style={{ color: colors.text, fontWeight: '700' }}>Qabul qiluvchi</Text>
        <Text style={{ color: colors.secondary }}>Aziz A. · 4-xonadon</Text>
      </Card>
    </Screen>
  )
}

export function MultiRouteScreen() {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()
  const stops = ['Rayhon · olib ketish', 'Market · sut', 'Mustaqillik ko\'chasi, 15 · topshirish']
  return (
    <Screen scroll>
      <Header title="Bir nechta nuqta" onBack={() => navigation.goBack()} />
      <View style={{ gap: 8, marginTop: 12 }}>
        {stops.map((stop, index) => (
          <Card key={stop}><Text style={{ color: colors.text, fontWeight: '600' }}>{index + 1}. {stop}</Text></Card>
        ))}
      </View>
    </Screen>
  )
}

export function WorkProfileScreen() {
  const navigation = useNavigation<any>()
  const logout = useAuthStore((s) => s.logout)
  const driver = useAuthStore((s) => s.driver)
  const { colors } = useTheme()
  return (
    <Screen scroll footer={<Button title="Chiqish" variant="danger" onPress={logout} />}>
      <Header title="Profil" onBack={() => navigation.goBack()} />
      <Text style={{ color: colors.text, fontSize: 24, fontWeight: '700', marginTop: 12 }}>{driver?.name}</Text>
      <Text style={{ color: colors.secondary }}>{driver?.phone}</Text>
      <Text style={{ color: colors.success, marginTop: 8 }}>{driver?.status === 'APPROVED' ? 'Tasdiqlangan' : 'Tekshiruvda'}</Text>
      <View style={{ gap: 8, marginTop: 12 }}>
        <Card onPress={() => navigation.navigate('Inspection')}><Text style={{ color: colors.text, fontWeight: '700' }}>Tekshiruv joyi</Text></Card>
        <Card onPress={() => navigation.navigate('BackgroundLocation')}><Text style={{ color: colors.text, fontWeight: '700' }}>Fon geolokatsiyasi</Text></Card>
        <Card onPress={() => navigation.navigate('CameraPermission')}><Text style={{ color: colors.text, fontWeight: '700' }}>Kamera ruxsati</Text></Card>
      </View>
    </Screen>
  )
}
