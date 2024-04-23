import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import SIZES, {ColorPrimary, ColorSecondary, TextColor} from '../../utils/constanta';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

export default DropdownAddress = () => {

  return (
        <View style={{marginHorizontal:15, paddingVertical:15,  borderBottomColor:'#DDDDDD', borderBottomWidth:1}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon size={25} color={TextColor} name="location-pin"/>
                <Text style={{color:TextColor, fontWeight:'bold', marginLeft:10}}>Alamat Pengiriman</Text>
            </View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <View style={{width:SIZES.width-85, marginLeft:25}}>
                <Text style={{color:TextColor, lineHeight:25, marginLeft:10}}>Angela  |  +62813-0825-2016</Text>
                <Text style={{color:TextColor,lineHeight:25, marginLeft:10}}>Jalan Diponegoro, Hadimulyo Barat, Kecamatan Metro Pusat, Kota Metro</Text>
              </View>
              <Icon2 size={25} color={TextColor} name="chevron-right"/>  
            </View>
        </View>
  )    
};


