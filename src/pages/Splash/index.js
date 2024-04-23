//Import komponen
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import { Logo } from '../../assets/images';
import SIZES, {ColorPrimary, TextColor} from '../../utils/constanta';

export default Splash = ({navigation}) => {

  useEffect(() => {
    //redirect ke halaman Auth setelah 5 detik
    setTimeout(() => {
        navigation.replace('Auth'); 
    }, 5000);

  }, []);

  //output tampilann
  return (
    <View style={styles.container}>
      <View style={{alignItems:'center'}}>
          <Image source={Logo} style={{width:SIZES.width/3, height:SIZES.width/3, borderRadius:SIZES.width/6}} resizeMode='contain' />
          <Text style={{color:TextColor, fontWeight:'700', fontSize:32}}>MEFOOD - EXPRESS</Text>
      </View>
    </View>
  );
};

//styling tampilan
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorPrimary,
        justifyContent: 'center',
        alignItems: 'center',
      },
});