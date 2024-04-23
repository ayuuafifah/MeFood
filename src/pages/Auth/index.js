//import komponen
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import { Logo } from '../../assets/images';
import SIZES, {ColorPrimary, ColorSecondary, TextColor} from '../../utils/constanta';
import { Button } from '../../components';

export default Auth = ({navigation}) => {

  //output tampilan
  return (
    <View style={styles.container}>
      <View style={{alignItems:'center', marginBottom:SIZES.height/6}}>
          <Image source={Logo} style={{width:SIZES.width/3, height:SIZES.width/3, borderRadius:SIZES.width/6}} resizeMode='contain' />
          <Text style={{color:TextColor, fontWeight:'700', fontSize:32}}>MEFOOD - EXPRESS</Text>
      </View>

      <View>
       <Button action={()=>navigation.navigate('Login')} label="Log In"/>
       <Button action={()=>navigation.navigate('Signup')} label="Buat Akun" type="secondary"/>
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