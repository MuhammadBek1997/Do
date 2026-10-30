import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Button, Card, CityMap, Header, Screen } from '../ui/components'
import { som, useTheme } from '../ui/theme'

function useNav() {
  return useNavigation<any>()
}

export function OfferTakenScreen() {
  const navigation = useNav()
  return (
    <Screen footer={<Button title="Yana taklif" variant="secondary" onPress={() => navigation.popToTop()} />}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 24 }}>Buyurtmani boshqa haydovchi oldi</Text>
      <Text style={{ color: '#64748B', marginTop: 8 }}>2 soniyadan keyin avtomatik yopiladi. Yangi taklif kutiladi.</Text>
    </Screen>
  )
}

export function WaitingClientScreen() {
  const navigation = useNav()
  const { colors } = useTheme()
  const [step, setStep] = useState<'road' | 'free' | 'paid' | 'pause'>('road')
  if (step === 'free') {
    return (
      <Screen map pad={false} footer={<Button title="Mijozga eslatma yuborish" variant="secondary" onPress={() => setStep('paid')} />}>
        <CityMap />
        <View style={{ backgroundColor: colors.surface, padding: 16, gap: 4 }}>
          <Text style={{ fontSize: 20, fontWeight: '700' }}>Mijozni kutyapsiz</Text>
          <Text style={{ color: colors.secondary }}>Mustaqillik ko'chasi, 15 · manzildasiz · GPS 18 m</Text>
          <Text style={{ fontSize: 40, fontWeight: '800' }}>7:18</Text>
          <Text style={{ color: colors.secondary }}>Bepul vaqt. Pullik kutishni tugma boshlamaydi — 10 daqiqa tugasa ilova o'zi yozadi.</Text>
          <Text style={{ color: colors.success, fontWeight: '700' }}>Mijoz "Chiqyapman" dedi · 1 daq oldin</Text>
        </View>
      </Screen>
    )
  }
  if (step === 'paid') {
    return (
      <Screen footer={
        <View style={{ gap: 8 }}>
          <Button title="Mijoz chiqdi — safarni boshlash" onPress={() => navigation.navigate('ActiveTrip')} />
          <Button title="Bekor qilish · 15:30 dan keyin" variant="ghost" onPress={() => navigation.navigate('DriverCancel')} />
        </View>
      }>
        <Text style={{ fontSize: 22, fontWeight: '800', marginTop: 16 }}>Pullik kutish · avtomatik</Text>
        <Text style={{ fontSize: 40, fontWeight: '800' }}>04:30</Text>
        <Text>+2 250 so'm · 550 so'm / daqiqa</Text>
        <Text style={{ color: colors.secondary }}>50 m ichida 20 soniyadan ko'p turdingiz. Ilova kutishni o'zi ochdi.</Text>
      </Screen>
    )
  }
  if (step === 'pause') {
    return (
      <Screen footer={<Button title="Tushunadim — to'xtayman" onPress={() => navigation.navigate('ActiveTrip')} />}>
        <Text style={{ fontSize: 22, fontWeight: '800', marginTop: 16 }}>Mijoz to'xtashni so'radi</Text>
        <Text style={{ color: colors.secondary }}>Dilnoza Rahimova · 20:18</Text>
        <Card><Text style={{ fontWeight: '700' }}>Yo'lda to'xtash</Text><Text>3 daqiqa bepul, keyin 550 so'm/daqiqa. Hozir 03:00.</Text></Card>
      </Screen>
    )
  }
  return (
    <Screen map pad={false} footer={<Button title="Yetib keldim" disabled onPress={() => setStep('free')} />}>
      <CityMap />
      <View style={{ backgroundColor: colors.surface, padding: 16, gap: 6 }}>
        <Text style={{ fontWeight: '700' }}>Mijozga yo'l · 1.2 km · 3 daq</Text>
        <Text style={{ color: colors.error, fontWeight: '700' }}>Hali yetib kelmadingiz</Text>
        <Text style={{ color: colors.secondary }}>"Yetib keldim" 50 metr qolganda ochiladi. GPS bilan tasdiqlanadi.</Text>
        <Button title="50 m ga yetdim" variant="secondary" onPress={() => setStep('free')} />
        <Pressable onPress={() => setStep('pause')}><Text style={{ color: colors.accent, fontWeight: '700' }}>Mijoz to'xtash so'radi</Text></Pressable>
      </View>
    </Screen>
  )
}

export function ConfirmFinishScreen() {
  const navigation = useNav()
  return (
    <Screen footer={
      <View style={{ gap: 8 }}>
        <Button title="Bosib turing — yakunlash" onPress={() => navigation.replace('CashReceived')} />
        <Button title="Hali emas" variant="ghost" onPress={() => navigation.goBack()} />
      </View>
    }>
      <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 24 }}>Safarni yakunlaysizmi?</Text>
      <Text style={{ color: '#64748B', marginTop: 8 }}>Mijoz manzilga yetib keldi. Tasdiqlang.</Text>
    </Screen>
  )
}

export function CashReceivedScreen() {
  const navigation = useNav()
  return (
    <Screen footer={
      <View style={{ gap: 8 }}>
        <Button title="Naqd pul olindi" variant="success" onPress={() => navigation.popToTop()} />
        <Button title="Muammo bor" variant="ghost" onPress={() => navigation.navigate('DriverCancel')} />
      </View>
    }>
      <Text style={{ color: '#64748B', marginTop: 24 }}>Mijozdan oling</Text>
      <Text style={{ fontSize: 40, fontWeight: '800' }}>{som(19000)}</Text>
      <Card><Text>Mijoz 100 000 so'mdan to'laydi. Qaytim 81 000 so'm.</Text></Card>
    </Screen>
  )
}

export function DriverCancelScreen() {
  const navigation = useNav()
  const { colors } = useTheme()
  const reasons = ['Mijoz chiqmadi', 'Mashina buzildi', "Yo'l yopiq", "Manzil noto'g'ri", 'Boshqa']
  const [reason, setReason] = useState(reasons[0])
  return (
    <Screen scroll footer={
      <View style={{ gap: 8 }}>
        <Button title="Bekor qilish" variant="danger" onPress={() => navigation.popToTop()} />
        <Button title="Orqaga" variant="ghost" onPress={() => navigation.goBack()} />
      </View>
    }>
      <Header title="Buyurtmani bekor qilish" onBack={() => navigation.goBack()} />
      {reasons.map((item) => (
        <Pressable key={item} onPress={() => setReason(item)} style={{ marginTop: 8 }}>
          <Card><Text style={{ color: reason === item ? colors.accent : colors.text, fontWeight: '700' }}>{item}</Text></Card>
        </Pressable>
      ))}
    </Screen>
  )
}

export function ClientCancelledScreen() {
  const navigation = useNav()
  return (
    <Screen footer={<Button title="Liniyaga qaytish" onPress={() => navigation.popToTop()} />}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 24 }}>Mijoz buyurtmani bekor qildi</Text>
      <Text style={{ color: '#64748B', marginTop: 8 }}>To'lov yo'q. Yangi buyurtma kuting.</Text>
    </Screen>
  )
}

export function GpsOffScreen() {
  const navigation = useNav()
  const [on, setOn] = useState(false)
  return (
    <Screen footer={<Button title={on ? 'Liniyada' : 'Hozir emas'} onPress={() => navigation.goBack()} />}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 24 }}>GPS o'chiq</Text>
      <Text style={{ color: '#64748B', marginTop: 8 }}>Liniyaga chiqish uchun joylashuv yoniq bo'lishi kerak. O'chiq paytda buyurtma 0 so'm.</Text>
      <Button title={on ? 'GPS yoniq' : 'Liniyaga chiqish'} variant="secondary" onPress={() => setOn(true)} />
    </Screen>
  )
}

export function BackgroundLocationScreen() {
  const navigation = useNav()
  return (
    <Screen footer={<Button title="Davom etish" onPress={() => navigation.goBack()} />}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 24 }}>Joylashuvni fonda ham ulashing</Text>
      <Text style={{ color: '#64748B', marginTop: 8 }}>Ilova yopiq bo'lsa ham safar va liniya GPS bilan tasdiqlanadi. Pullik kutish shu masofa bilan yoziladi.</Text>
    </Screen>
  )
}

export function InspectionScreen() {
  const navigation = useNav()
  return (
    <Screen scroll footer={<Button title="Operator bilan bog'lanish" variant="secondary" onPress={() => navigation.goBack()} />}>
      <Header title="Tekshiruv" onBack={() => navigation.goBack()} />
      <Card>
        <Text style={{ fontWeight: '700' }}>Ofisga kelib tekshiruvdan o'ting</Text>
        <Text>Yangiyer avtobozor</Text>
        <Text>Dushanba–Juma 09:00–18:00</Text>
      </Card>
    </Screen>
  )
}

export function IntercityDriveScreen() {
  const navigation = useNav()
  const { colors } = useTheme()
  const [step, setStep] = useState<'post' | 'inbox' | 'counter'>('post')
  const [offer, setOffer] = useState(32000)
  if (step === 'inbox') {
    const rows = [
      { name: 'Dilshod T. · 4.8', text: "1 o'rin · 2 ta yuk", price: 30000 },
      { name: 'Malika K. · 5.0', text: 'Narsangizga teng', price: 70000 },
      { name: 'Posilka · hujjatlar', text: '0.5 kg · 30×20×10', price: 20000 },
    ]
    return (
      <Screen scroll>
        <Header title="Kelgan so'rovlar" onBack={() => setStep('post')} />
        <Text style={{ color: colors.secondary }}>1/3 · 3 yangi · daromad {som(65000)}</Text>
        {rows.map((row) => (
          <Card key={row.name}>
            <Text style={{ fontWeight: '700' }}>{row.name}</Text>
            <Text>{row.text} · {som(row.price)}</Text>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
              <Button title="Rad" variant="ghost" onPress={() => navigation.popToTop()} />
              <Button title="Qarshi" variant="secondary" onPress={() => setStep('counter')} />
              <Button title="Qabul" onPress={() => navigation.popToTop()} />
            </View>
          </Card>
        ))}
      </Screen>
    )
  }
  if (step === 'counter') {
    return (
      <Screen footer={<Button title="Taklifni yuborish" onPress={() => navigation.popToTop()} />}>
        <Header title="Dilshodga qarshi taklif" onBack={() => setStep('inbox')} />
        <Text>Yo'lovchi taklifi {som(30000)}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Button title="−" variant="secondary" onPress={() => setOffer((n) => n - 1000)} />
          <Text style={{ fontSize: 22, fontWeight: '800' }}>{som(offer)}</Text>
          <Button title="+" variant="secondary" onPress={() => setOffer((n) => n + 1000)} />
        </View>
        <Text style={{ color: colors.secondary }}>Yo'lovchi 3 daqiqa ichida javob beradi. Maksimal 3 raund.</Text>
      </Screen>
    )
  }
  return (
    <Screen scroll footer={<Button title="E'lon qilish" onPress={() => setStep('inbox')} />}>
      <Header title="Reys e'lon qilish" onBack={() => navigation.goBack()} />
      <Card><Text>Yangiyer, avtovokzal → Toshkent, Olmazor</Text><Text>Bugun, 22-okt · 15:00 · 3 bo'sh o'rin</Text></Card>
      <Text>O'rin narxi {som(35000)} · minimal {som(28000)}</Text>
      <Text style={{ color: colors.secondary }}>28 000 dan past takliflar ko'rinmaydi. Konditsioner bor. Posilka ham olaman.</Text>
    </Screen>
  )
}

export function PickupPhotoScreen() {
  const navigation = useNav()
  const [shot, setShot] = useState(false)
  return (
    <Screen footer={
      <View style={{ gap: 8 }}>
        <Button title="Kamerani ochish" variant="secondary" onPress={() => setShot(true)} />
        <Button title="Buyurtmani oldim" disabled={!shot} onPress={() => navigation.navigate('CourierDeliver')} />
      </View>
    }>
      <Header title="Posilkani olish" onBack={() => navigation.goBack()} />
      <Text style={{ marginTop: 8 }}>Posilkani suratga oling. Rasmsiz olib ketib bo'lmaydi.</Text>
      {shot ? <Text style={{ color: '#15966A', fontWeight: '700', marginTop: 8 }}>Rasm olindi</Text> : null}
    </Screen>
  )
}

export function DropPhotoScreen() {
  const navigation = useNav()
  const [count, setCount] = useState(0)
  return (
    <Screen footer={<Button title="Davom etish — kodga" disabled={count < 1} onPress={() => navigation.navigate('CourierCode')} />}>
      <Header title="Topshirishda rasm" onBack={() => navigation.goBack()} />
      <Text style={{ marginVertical: 8 }}>Old, o'ng, chap, orqa. Kamida bitta rasm.</Text>
      <Button title={count ? `${count} ta rasm` : 'Rasmga olish'} variant="secondary" onPress={() => setCount((n) => Math.min(4, n + 1))} />
    </Screen>
  )
}

export function CodeBlockedScreen() {
  const navigation = useNav()
  return (
    <Screen footer={<Button title="Operator bilan bog'lanish" onPress={() => navigation.navigate('OrderSuspended')} />}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 24 }}>Kod kiritish bloklandi</Text>
      <Text style={{ color: '#64748B', marginTop: 8 }}>Urinishlar tugadi. Posilkani bermang.</Text>
    </Screen>
  )
}

export function DontHandScreen() {
  const navigation = useNav()
  return (
    <Screen footer={<Button title="Qayta urinish" onPress={() => navigation.goBack()} />}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 24 }}>Aloqani kutyapmiz</Text>
      <Text style={{ color: '#DC5252', marginTop: 8, fontWeight: '700' }}>Posilkani bermang. Internet qaytgach kodni tekshiring.</Text>
    </Screen>
  )
}

export function DeliveredPlainScreen() {
  const navigation = useNav()
  return (
    <Screen footer={<Button title="Keyingi buyurtmalarga" onPress={() => navigation.popToTop()} />}>
      <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 24 }}>Yetkazildi</Text>
      <Text style={{ fontSize: 32, fontWeight: '800', marginTop: 8 }}>{som(18500)}</Text>
    </Screen>
  )
}

export function CameraPermissionScreen() {
  const navigation = useNav()
  return (
    <Screen footer={
      <View style={{ gap: 8 }}>
        <Button title="Sozlamalarni ochish" onPress={() => navigation.goBack()} />
        <Button title="Operator bilan bog'lanish" variant="secondary" onPress={() => navigation.goBack()} />
      </View>
    }>
      <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 24 }}>Kamera ruxsati kerak</Text>
      <Text style={{ color: '#64748B', marginTop: 8 }}>Olish va topshirish rasmi uchun kamera ochilishi kerak.</Text>
    </Screen>
  )
}

export function ReturnParcelScreen() {
  const navigation = useNav()
  const { colors } = useTheme()
  const reasons = ['Qabul qiluvchi chiqmadi', "Manzilni xato kiritib qo'ygan", 'Qabul qiluvchini manzili']
  const [reason, setReason] = useState(reasons[0])
  return (
    <Screen scroll footer={<Button title="Jo'natuvchiga qaytarish" onPress={() => navigation.popToTop()} />}>
      <Header title="Yetkazib bo'lmadi" onBack={() => navigation.goBack()} />
      <Text style={{ fontWeight: '700', marginVertical: 8 }}>Nima bo'ldi?</Text>
      {reasons.map((item) => (
        <Pressable key={item} onPress={() => setReason(item)} style={{ marginTop: 8 }}>
          <Card><Text style={{ color: reason === item ? colors.accent : colors.text, fontWeight: '700' }}>{item}</Text></Card>
        </Pressable>
      ))}
    </Screen>
  )
}

export function OrderSuspendedScreen() {
  const navigation = useNav()
  return (
    <Screen footer={
      <View style={{ gap: 8 }}>
        <Button title="Operator bilan bog'lanish" variant="secondary" onPress={() => navigation.goBack()} />
        <Button title="Liniyaga chiqish" onPress={() => navigation.popToTop()} />
      </View>
    }>
      <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 24 }}>Buyurtma tekshiruvda</Text>
      <Text style={{ color: '#64748B', marginTop: 8 }}>Dispetcher qaror qilguncha posilka sizda qoladi.</Text>
    </Screen>
  )
}
