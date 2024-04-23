import React, {useEffect,useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import SIZES, {ColorPrimary, ColorSecondary, TextColor} from '../../utils/constanta';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from "react-native-vector-icons/AntDesign";

export default DropdownPaymentMethod = () => {
  return (
    <View
        style={{ flexDirection:'row', alignItems:'center', paddingHorizontal:10, borderColor:'#D9D9D9'}}
      >
        <Icon2            
            name='creditcard'            
            size={25}
            color={TextColor}
        />
        <Text style={{marginLeft:10, marginRight:'auto', color:TextColor}}>Payment Method</Text>
        <Icon            
            name='chevron-right'            
            size={25}
            color={TextColor}
        />
      </View>
  );
};