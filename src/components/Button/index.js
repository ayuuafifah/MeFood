import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import SIZES, {ColorPrimary, ColorSecondary, TextColor} from '../../utils/constanta';

export default Button = ({navigation, action, label, type}) => {

  return (
    type != "secondary"?
        <TouchableOpacity 
            style={{alignSelf:'center',width:SIZES.width-40, padding:15,borderRadius:10, marginBottom:20, alignItems:'center', backgroundColor:ColorSecondary}}
            onPress={action}>
                <Text style={{color:ColorPrimary, fontSize:18}}>{label}</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity 
            style={{alignSelf:'center', width:SIZES.width-40, padding:15, borderColor:ColorSecondary, borderWidth:1 ,borderRadius:10, alignItems:'center', backgroundColor:ColorPrimary}}
            onPress={action}>
                <Text style={{color:ColorSecondary, fontSize:18}}>{label}</Text>
        </TouchableOpacity>
  );
};