import * as React from 'react';
import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home,Auth, Activity, Promo, Profile } from '../../pages';
import { activityIcon, homeIcon, promoIcon, profileIcon } from '../../assets/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import SIZES, { ColorPrimary, ColorSecondary, TextColor } from '../../utils/constanta';

const Tab = createBottomTabNavigator();

const Tabs =  ({route}) => {
  const params = route.params;
  return (
      <Tab.Navigator 
        initialRouteName= {params?params.tab:'Home'}
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
        <Tab.Screen name="Home" component={Home} 
          options={{ headerShown: false,
            tabBarIcon: ({focused}) => (
                <View>
                    <View style={{alignItems:'center'}}>
                      <Image source={homeIcon} resizeMode='contain'
                      style={{
                          width:30,
                          height:30,
                          tintColor: focused ? ColorSecondary : TextColor
                      }} />
                      <Text style={{fontSize:16,color:TextColor}}>Home</Text>
                  </View>
                </View>
            )
          }}/>

        <Tab.Screen name="Aktivitas" component={Activity} 
          options={{ headerShown: false,
            tabBarIcon: ({focused}) => (
                <View>
                    <View style={{alignItems:'center'}}>
                      <Image source={activityIcon} resizeMode='contain'
                      style={{
                          width:30,
                          height:30,
                          tintColor: focused ? ColorSecondary : TextColor
                      }} />
                      <Text style={{fontSize:16,color:TextColor}}>Aktivitas</Text>
                  </View>
                </View>
            )
          }}/>

        <Tab.Screen name="Promo" component={Promo} 
          options={{ headerShown: false,
            tabBarIcon: ({focused}) => (
                <View>
                    <View style={{alignItems:'center'}}>
                      <Image source={promoIcon} resizeMode='contain'
                      style={{
                          width:30,
                          height:30,
                          tintColor: focused ? ColorSecondary : TextColor
                      }} />
                      <Text style={{fontSize:16,color:TextColor}}>Promo</Text>
                  </View>
                </View>
            )
          }}/>

        <Tab.Screen name="Akun" component={Profile} 
          options={{ headerShown: false,
            tabBarIcon: ({focused}) => (
                <View>
                    <View style={{alignItems:'center'}}>
                      <Image source={profileIcon} resizeMode='contain'
                      style={{
                          width:30,
                          height:30,
                          tintColor: focused ? ColorSecondary : TextColor
                      }} />
                      <Text style={{fontSize:16,color:TextColor}}>Akun</Text>
                  </View>
                </View>
            )
          }}/>


          
      </Tab.Navigator>
  );
}

export default Tabs;

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