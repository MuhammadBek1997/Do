import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  CourierDocsScreen,
  CourierPrefsScreen,
  CourierTypeScreen,
  CourierVehicleScreen,
  CourierWelcomeScreen,
  DriverDocsScreen,
  DriverStatusScreen,
  DriverVehicleScreen,
  LoginScreen,
  PartnerScreen,
} from '../flows/PartnerFlow'

const Stack = createNativeStackNavigator()

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Partner" component={PartnerScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="DriverVehicle" component={DriverVehicleScreen} />
      <Stack.Screen name="DriverDocs" component={DriverDocsScreen} />
      <Stack.Screen name="DriverStatus" component={DriverStatusScreen} />
      <Stack.Screen name="CourierType" component={CourierTypeScreen} />
      <Stack.Screen name="CourierVehicle" component={CourierVehicleScreen} />
      <Stack.Screen name="CourierDocs" component={CourierDocsScreen} />
      <Stack.Screen name="CourierPrefs" component={CourierPrefsScreen} />
      <Stack.Screen name="CourierWelcome" component={CourierWelcomeScreen} />
    </Stack.Navigator>
  )
}
