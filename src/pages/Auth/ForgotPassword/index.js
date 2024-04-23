//Import komponen
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOp, TouchableOpacity } from 'react-native';

import { HeaderBar, Button } from '../../../components';
import SIZES, { ColorPrimary, ColorSecondary, TextColor } from '../../../utils/constanta';

export default ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");

  //output tampilan Forgot Password
  return (
       <View style={{flex:1, backgroundColor:ColorPrimary}}>
        <HeaderBar navigation={navigation} headerText='Lupa Kata Sandi'/>

        <Text style={{paddingHorizontal:20, color:TextColor, paddingBottom:30}}>Silahkan masukan email Anda untuk meminta reset kata sandi</Text>

        <TextInput
            style={{backgroundColor:'white',paddingLeft:15, borderWidth:1, marginTop:10, marginBottom:40, borderColor:ColorSecondary, borderRadius:10, width:SIZES.width-40, alignSelf:'center'}}
            placeholder='Email'
            placeholderTextColor="#BDBDBD"
            color={ColorSecondary}
            onChangeText={(text)=>setEmail(text)}
        /> 

        <Button action={()=>navigation.navigate('Auth')} label="Reset"/>
    </View>
  );
};

