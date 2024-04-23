import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Splash, Home, Login, Auth, Signup, ForgotPassword, UpdateProfile, Language, PaymentMethod, Address, AddAddress, Notification, Message, NearbyFood, PromoFood, BestSellingFood, AlwaysOpenFood, AllFood, Resto, FoodList, ConfirmFoodOrder, FoodRating, SelectAddress, PharmacyMenu, Apotek, Medicine, ConfirmPharmOrder, DeliveryMenu, ConfirmDeliveryOrder, DetailTransactionFood, UpdateAddress, PickupDetail, TransportMenu, AddDestination, ConfirmTransportOrder, DetailTransactionTransport, DeliveryRating, PharmacyRating } from '../pages';
import Tabs from './../components/BottomTabs' 
import TabsFood from '../components/BottomTabsFood';

const Stack = createNativeStackNavigator();

export default Routes=()=>{
  return (
      <Stack.Navigator initialRouteName="Splash" screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontWeight: 'bold',
        }}}>
        
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="TabsFood" component={TabsFood} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="MessageDetail" component={MessageDetail} />
        <Stack.Screen name="Resto" component={Resto} />
        <Stack.Screen name="FoodList" component={FoodList} />
        <Stack.Screen name="FoodRating" component={FoodRating} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ConfirmFoodOrder" component={ConfirmFoodOrder} />
        <Stack.Screen name="ConfirmPharmOrder" component={ConfirmPharmOrder} />
        <Stack.Screen name="SelectAddress" component={SelectAddress} />
        <Stack.Screen name="PharmacyMenu" component={PharmacyMenu} />
        <Stack.Screen name="Apotek" component={Apotek} />
        <Stack.Screen name="Medicine" component={Medicine} />
        <Stack.Screen name="DeliveryMenu" component={DeliveryMenu} />
        <Stack.Screen name="DeliveryDetail" component={DeliveryDetail} />
        <Stack.Screen name="ConfirmDeliveryOrder" component={ConfirmDeliveryOrder} />
        <Stack.Screen name="DetailTransactionFood" component={DetailTransactionFood} />
        <Stack.Screen name="UpdateAddress" component={UpdateAddress} />
        <Stack.Screen name="DetailTransactionPharmacy" component={DetailTransactionPharmacy} />
        <Stack.Screen name="DetailTransactionDelivery" component={DetailTransactionDelivery} />
        <Stack.Screen name="DetailTransactionTransport" component={DetailTransactionTransport} />
        <Stack.Screen name="PickupDetail" component={PickupDetail} />
        <Stack.Screen name="TransportMenu" component={TransportMenu} />
        <Stack.Screen name="AddDestination" component={AddDestination} />
        <Stack.Screen name="ConfirmTransportOrder" component={ConfirmTransportOrder} />
        <Stack.Screen name="DeliveryRating" component={DeliveryRating} />
        <Stack.Screen name="TransportRating" component={TransportRating} />
        <Stack.Screen name="PharmacyRating" component={PharmacyRating} />
      </Stack.Navigator>
  );
}
