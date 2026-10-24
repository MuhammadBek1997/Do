import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  ActiveTripScreen,
  CargoLoadScreen,
  CargoRequestScreen,
  CargoTransitScreen,
  CargoUnloadScreen,
  CourierCodeScreen,
  CourierDeliverScreen,
  CourierIncomingScreen,
  CourierNavScreen,
  CourierPickupScreen,
  DashboardScreen,
  EarningsScreen,
  FiltersScreen,
  IncomingScreen,
  MultiRouteScreen,
  PickupNavScreen,
  TripDoneScreen,
  WorkProfileScreen,
} from '../flows/WorkFlow'

const Stack = createNativeStackNavigator()

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Filters" component={FiltersScreen} />
      <Stack.Screen name="Incoming" component={IncomingScreen} />
      <Stack.Screen name="PickupNav" component={PickupNavScreen} />
      <Stack.Screen name="ActiveTrip" component={ActiveTripScreen} />
      <Stack.Screen name="TripDone" component={TripDoneScreen} />
      <Stack.Screen name="Earnings" component={EarningsScreen} />
      <Stack.Screen name="CourierIncoming" component={CourierIncomingScreen} />
      <Stack.Screen name="CourierNav" component={CourierNavScreen} />
      <Stack.Screen name="CourierPickup" component={CourierPickupScreen} />
      <Stack.Screen name="CourierDeliver" component={CourierDeliverScreen} />
      <Stack.Screen name="CourierCode" component={CourierCodeScreen} />
      <Stack.Screen name="CargoRequest" component={CargoRequestScreen} />
      <Stack.Screen name="CargoLoad" component={CargoLoadScreen} />
      <Stack.Screen name="CargoTransit" component={CargoTransitScreen} />
      <Stack.Screen name="CargoUnload" component={CargoUnloadScreen} />
      <Stack.Screen name="MultiRoute" component={MultiRouteScreen} />
      <Stack.Screen name="WorkProfile" component={WorkProfileScreen} />
    </Stack.Navigator>
  )
}
