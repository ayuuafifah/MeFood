import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home,Auth, Activity, Promo, Profile, FoodMenu, SearchFood, FoodTransaction, FavoriteFood } from '../../pages';
import { activityIcon, homeIcon, promoIcon, profileIcon, foodIcon, searchIcon, receiptIcon, loveIcon } from '../../assets/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import SIZES, { ColorPrimary, ColorSecondary, TextColor } from '../../utils/constanta';

const Tab = createBottomTabNavigator();

const TabsFood =  () => {
  return (
      <Tab.Navigator 
        initialRouteName='FoodMenu'
        screenOptions={{
            tabBarStyle:{
                position:'absolute',
                backgroundColor:ColorPrimary,                               
                height:70,
                ...styles.shadow,
                paddingHorizontal:5,
            },
            tabBarShowLabel:false
        }}
      >
        <Tab.Screen name="FoodMenu" component={FoodMenu} 
          options={{ headerShown: false,
            tabBarIcon: ({focused}) => (
                <View>
                    <View style={{alignItems:'center'}}>
                      <Image source={foodIcon} resizeMode='contain'
                      style={{
                          width:30,
                          height:30,
                          tintColor: focused ? ColorSecondary : TextColor
                      }} />
                      <Text style={{fontSize:16,color:TextColor}}>Makanan</Text>
                  </View>
                </View>
            )
          }}/>

        <Tab.Screen name="SearchFood" component={SearchFood} 
          options={{ headerShown: false,
            tabBarIcon: ({focused}) => (
                <View>
                    <View style={{alignItems:'center'}}>
                      <Image source={searchIcon} resizeMode='contain'
                      style={{
                          width:30,
                          height:30,
                          tintColor: focused ? ColorSecondary : TextColor
                      }} />
                      <Text style={{fontSize:16,color:TextColor}}>Cari</Text>
                  </View>
                </View>
            )
          }}/>

        <Tab.Screen name="FoodTransaction" component={FoodTransaction} 
          options={{ headerShown: false,
            tabBarIcon: ({focused}) => (
                <View>
                    <View style={{alignItems:'center'}}>
                      <Image source={receiptIcon} resizeMode='contain'
                      style={{
                          width:30,
                          height:30,
                          tintColor: focused ? ColorSecondary : TextColor
                      }} />
                      <Text style={{fontSize:16,color:TextColor}}>Pesanan</Text>
                  </View>
                </View>
            )
          }}/>

        <Tab.Screen name="FavoriteFood" component={FavoriteFood} 
          options={{ headerShown: false,
            tabBarIcon: ({focused}) => (
                <View>
                    <View style={{alignItems:'center'}}>
                      <Image source={loveIcon} resizeMode='contain'
                      style={{
                          width:30,
                          height:30,
                          tintColor: focused ? ColorSecondary : TextColor
                      }} />
                      <Text style={{fontSize:16,color:TextColor}}>Favorit</Text>
                  </View>
                </View>
            )
          }}/>


          
      </Tab.Navigator>
  );
}

export default TabsFood;

const styles = StyleSheet.create({
    shadow:{
        shadowColor:'#000',
        shadowOffset: {
            width:0,
            height:-20
        },
        shadowOpacity:0.25,
        shadowRadius:2.5,
        elevation:5
    }
})