import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import SIZES, {ColorPrimary, ColorSecondary, TextColor} from '../../utils/constanta';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default DropdownPromo = () => {

  return (
      <View style={{ flexDirection:'row', alignItems:'center', paddingHorizontal:10, borderColor:'#D9D9D9', borderWidth:2, height:40 ,borderRadius:10}}>
        <Icon            
            name='ticket-percent-outline'            
            size={25}
            color={TextColor}
        />
        <Text style={{marginLeft:10, marginRight:'auto', color:TextColor}}>Promo</Text>
        <Icon            
            name='chevron-right'            
            size={25}
            color={TextColor}
        />
      </View>
  );
};