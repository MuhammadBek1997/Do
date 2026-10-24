import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useAuthStore } from '../store/authStore'
import { useWork, WorkVehicle } from '../store/prefsStore'
import { Button, Card, Field, Header, Screen } from '../ui/components'
import { useTheme } from '../ui/theme'

export function PartnerScreen() {
  const navigation = useNavigation<any>()
  const { colors } = useTheme()
  return (
    <Screen scroll footer={<Button title="Hisobingiz bormi? Kirish" variant="ghost" onPress={() => navigation.navigate('Login')} />}>
      <Text style={{ color: colors.accent, fontSize: 36, fontWeight: '800' }}>yello</Text>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: '700', marginTop: 12 }}>Hamkorimiz bo'ling</Text>
      <Text style={{ color: colors.secondary, marginTop: 6, marginBottom: 16 }}>
        Taksi va kuryer bitta ilova. Rejimni keyin almashtirasiz.
      </Text>
      <View style={{ gap: 12 }}>
        <Card onPress={() => navigation.navigate('DriverVehicle')}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>Haydovchi</Text>
          <Text style={{ color: colors.secondary, marginTop: 4 }}>Yo'lovchilarni manzilga yetkazing</Text>
          <Text style={{ color: colors.accent, marginTop: 8, fontWeight: '700' }}>Boshlash</Text>
        </Card>
        <Card onPress={() => navigation.navigate('CourierType')}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>Kuryer</Text>
          <Text style={{ color: colors.secondary, marginTop: 4 }}>Taom, posilka, market va yuk</Text>
          <Text style={{ color: colors.text, marginTop: 4 }}>Auto · Moto · Velo</Text>
          <Text style={{ color: colors.accent, marginTop: 8, fontWeight: '700' }}>Boshlash</Text>
        </Card>
      </View>
    </Screen>
  )
}

export function LoginScreen() {
  const setAuth = useAuthStore((s) => s.setAuth)
  const navigation = useNavigation<any>()
  const [phone, setPhone] = useState('+998 90 123 45 67')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  return (
    <Screen scroll footer={
      <Button title="Kirish" onPress={() => {
        if (password.length < 8) { setError('Kamida 8 ta belgi'); return }
        setAuth('demo', { id: 'd1', name: 'Sherzod', phone, status: 'APPROVED' })
      }} />
    }>
      <Header title="Kirish" onBack={() => navigation.goBack()} />
      <View style={{ gap: 12, marginTop: 12 }}>
        <Field label="Telefon raqami" value={phone} onChangeText={setPhone} keyboard="phone-pad" />
        <Field label="Parol" value={password} onChangeText={setPassword} secure error={error} hint="Kamida 8 ta belgi" />
      </View>
    </Screen>
  )
}

const VEHICLES = ['Ekonom', 'Komfort', 'Biznes', 'Minivan']

export function DriverVehicleScreen() {
  const navigation = useNavigation<any>()
  const [kind, setKind] = useState('Komfort')
  const { colors } = useTheme()
  return (
    <Screen scroll footer={<Button title="Davom etish" onPress={() => navigation.navigate('DriverDocs', { kind })} />}>
      <Header title="Mashina turi" onBack={() => navigation.goBack()} />
      <View style={{ gap: 10, marginTop: 12 }}>
        {VEHICLES.map((item) => (
          <Pressable key={item} onPress={() => setKind(item)} style={{ borderWidth: 1, borderColor: kind === item ? colors.accent : colors.border, borderRadius: 16, padding: 14, backgroundColor: colors.surface }}>
            <Text style={{ color: colors.text, fontWeight: '700' }}>{item}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  )
}

export function DriverDocsScreen() {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const [plate, setPlate] = useState('01 A 777 BA')
  const [car, setCar] = useState('Chevrolet Cobalt')
  return (
    <Screen scroll footer={<Button title="Yuborish" onPress={() => navigation.navigate('DriverStatus', { ...route.params, plate, car })} />}>
      <Header title="Mashina va hujjatlar" onBack={() => navigation.goBack()} />
      <View style={{ gap: 12, marginTop: 12 }}>
        <Field label="Mashina" value={car} onChangeText={setCar} />
        <Field label="Davlat raqami" value={plate} onChangeText={setPlate} />
        <Field label="Haydovchilik guvohnomasi" value="AA 1234567" onChangeText={() => {}} />
      </View>
    </Screen>
  )
}

export function DriverStatusScreen() {
  const setAuth = useAuthStore((s) => s.setAuth)
  const { colors } = useTheme()
  return (
    <Screen footer={<Button title="Liniyaga chiqish" onPress={() => setAuth('demo', { id: 'd1', name: 'Sherzod', phone: '+998 90 123 45 67', status: 'APPROVED' })} />}>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: '700', marginTop: 24 }}>Hujjatlar tekshirilmoqda</Text>
      <Text style={{ color: colors.secondary, marginTop: 8 }}>Operator tasdiqlagach liniyaga chiqasiz. Hozircha davom etish ochiq.</Text>
      <View style={{ gap: 8, marginTop: 16 }}>
        {['Guvohnoma qabul qilindi', 'Mashina tekshirilmoqda', 'Liniya'].map((step, index) => (
          <Text key={step} style={{ color: index === 2 ? colors.secondary : colors.success, fontWeight: '600' }}>{index === 2 ? '○' : '●'} {step}</Text>
        ))}
      </View>
    </Screen>
  )
}

const COURIER_TYPES: { id: WorkVehicle; title: string; text: string }[] = [
  { id: 'auto', title: 'Auto', text: 'Posilka va yengil yuk' },
  { id: 'moto', title: 'Moto', text: 'Taom va kichik buyurtma' },
  { id: 'velo', title: 'Velo', text: 'Yaqin masofa' },
  { id: 'yuk', title: 'Og\'ir yuk', text: 'Isuzu, Katta hajm' },
]

export function CourierTypeScreen() {
  const navigation = useNavigation<any>()
  const setVehicle = useWork((s) => s.setVehicle)
  const { colors } = useTheme()
  return (
    <Screen scroll>
      <Header title="Yetkazish turi" onBack={() => navigation.goBack()} />
      <View style={{ gap: 10, marginTop: 12 }}>
        {COURIER_TYPES.map((item) => (
          <Card key={item.id} onPress={() => { setVehicle(item.id); navigation.navigate('CourierVehicle', { vehicle: item.id, title: item.title }) }}>
            <Text style={{ color: colors.text, fontWeight: '700', fontSize: 17 }}>{item.title}</Text>
            <Text style={{ color: colors.secondary }}>{item.text}</Text>
          </Card>
        ))}
      </View>
    </Screen>
  )
}

export function CourierVehicleScreen() {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const heavy = route.params?.vehicle === 'yuk'
  const [name, setName] = useState(heavy ? 'Isuzu NPR' : route.params?.title || 'Moto')
  const [plate, setPlate] = useState(heavy ? '01 777 AAA' : '01 A 100 AA')
  return (
    <Screen scroll footer={<Button title="Davom etish" onPress={() => navigation.navigate('CourierDocs', route.params)} />}>
      <Header title={heavy ? 'Yuk mashinasi' : 'Transport'} onBack={() => navigation.goBack()} />
      <View style={{ gap: 12, marginTop: 12 }}>
        <Field label="Transport" value={name} onChangeText={setName} />
        <Field label="Raqam" value={plate} onChangeText={setPlate} />
      </View>
    </Screen>
  )
}

export function CourierDocsScreen() {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const [name, setName] = useState('Sherzod')
  return (
    <Screen scroll footer={<Button title="Davom etish" onPress={() => navigation.navigate('CourierPrefs', { ...route.params, name })} />}>
      <Header title="Shaxsiy ma'lumot" onBack={() => navigation.goBack()} />
      <View style={{ gap: 12, marginTop: 12 }}>
        <Field label="Ism" value={name} onChangeText={setName} />
        <Field label="Telefon" value="+998 90 123 45 67" onChangeText={() => {}} />
        <Field label="Pasport" value="AA 1234567" onChangeText={() => {}} />
      </View>
    </Screen>
  )
}

export function CourierPrefsScreen() {
  const navigation = useNavigation<any>()
  const route = useRoute<any>()
  const { colors } = useTheme()
  const prefs = ['Taom', 'Posilka', 'Market', 'Dorixona']
  return (
    <Screen scroll footer={<Button title="Yuborish" onPress={() => navigation.navigate('CourierWelcome', route.params)} />}>
      <Header title="Afzalliklar" onBack={() => navigation.goBack()} />
      <Text style={{ color: colors.secondary, marginVertical: 8 }}>Qaysi buyurtmalarni olasiz</Text>
      <View style={{ gap: 8 }}>
        {prefs.map((item) => (
          <Card key={item}><Text style={{ color: colors.text, fontWeight: '600' }}>{item}</Text></Card>
        ))}
      </View>
    </Screen>
  )
}

export function CourierWelcomeScreen() {
  const route = useRoute<any>()
  const setAuth = useAuthStore((s) => s.setAuth)
  const { colors } = useTheme()
  return (
    <Screen footer={
      <Button title="Ishni boshlash" onPress={() => setAuth('demo', { id: 'd1', name: route.params?.name || 'Sherzod', phone: '+998 90 123 45 67', status: 'APPROVED' })} />
    }>
      <View style={{ flex: 1, justifyContent: 'center', gap: 8 }}>
        <Text style={{ color: colors.text, fontSize: 28, fontWeight: '700' }}>Tasdiqlandi</Text>
        <Text style={{ color: colors.secondary }}>Xush kelibsiz. Taksi va kuryer rejimini bosh sahifada almashtirasiz.</Text>
      </View>
    </Screen>
  )
}
