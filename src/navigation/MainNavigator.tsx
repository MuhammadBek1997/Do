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
import {
  BackgroundLocationScreen,
  CameraPermissionScreen,
  CashReceivedScreen,
  ClientCancelledScreen,
  CodeBlockedScreen,
  ConfirmFinishScreen,
  DeliveredPlainScreen,
  DontHandScreen,
  DriverCancelScreen,
  DropPhotoScreen,
  GpsOffScreen,
  InspectionScreen,
  IntercityDriveScreen,
  OfferTakenScreen,
  OrderSuspendedScreen,
  PickupPhotoScreen,
  ReturnParcelScreen,
  WaitingClientScreen,
} from '../flows/GapsFlow'

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
      <Stack.Screen name="OfferTaken" component={OfferTakenScreen} />
      <Stack.Screen name="WaitingClient" component={WaitingClientScreen} />
      <Stack.Screen name="ConfirmFinish" component={ConfirmFinishScreen} />
      <Stack.Screen name="CashReceived" component={CashReceivedScreen} />
      <Stack.Screen name="DriverCancel" component={DriverCancelScreen} />
      <Stack.Screen name="ClientCancelled" component={ClientCancelledScreen} />
      <Stack.Screen name="GpsOff" component={GpsOffScreen} />
      <Stack.Screen name="BackgroundLocation" component={BackgroundLocationScreen} />
      <Stack.Screen name="Inspection" component={InspectionScreen} />
      <Stack.Screen name="IntercityDrive" component={IntercityDriveScreen} />
      <Stack.Screen name="PickupPhoto" component={PickupPhotoScreen} />
      <Stack.Screen name="DropPhoto" component={DropPhotoScreen} />
      <Stack.Screen name="CodeBlocked" component={CodeBlockedScreen} />
      <Stack.Screen name="DontHand" component={DontHandScreen} />
      <Stack.Screen name="DeliveredPlain" component={DeliveredPlainScreen} />
      <Stack.Screen name="CameraPermission" component={CameraPermissionScreen} />
      <Stack.Screen name="ReturnParcel" component={ReturnParcelScreen} />
      <Stack.Screen name="OrderSuspended" component={OrderSuspendedScreen} />
    </Stack.Navigator>
  )
}
