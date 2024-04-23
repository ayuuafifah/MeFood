//Import Komponen
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native';
import {Checkbox} from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";

import { HeaderBar, Button } from '../../../components';
import SIZES, { ColorPrimary, ColorSecondary, TextColor } from '../../../utils/constanta';

export default Signup = ({ navigation }) => {
    const [name, setName] = useState("");
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [eyeIconPassword, setEyeIconPassword] = useState("visibility-off");
    const [eyeIconConfirmPassword, setEyeIconConfirmPassword] = useState("visibility-off");
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [checked, setChecked] = useState(false);

    //handle show/hide password ketika icon diklick
    const iconPasswordPressed = () => {
        setEyeIconPassword(showPassword ? "visibility" : "visibility-off");
        setShowPassword(!showPassword);
    }

    //handle show/hide confirm password ketika icon diklick
    const iconConfirmPasswordPressed = () => {
        setEyeIconConfirmPassword(showConfirmPassword ? "visibility" : "visibility-off");
        setShowConfirmPassword(!showConfirmPassword);
    }

    //redirect ke halaman auth ketika tombol buat akun diklick
    const signupPressed = () => {
        navigation.replace('Auth');
        ToastAndroid.show('Berhasil Membuat Akun',ToastAndroid.SHORT);
     }

  //Output Tampilan SignUp   
  return (
       <View style={{flex:1, backgroundColor:ColorPrimary}}>
        <HeaderBar navigation={navigation} headerText='Sign Up'/>

        <TextInput
            style={{backgroundColor:'white',paddingLeft:15, borderWidth:1, marginTop:35, marginBottom:10, borderColor:ColorSecondary, borderRadius:10, width:SIZES.width-40, alignSelf:'center'}}
            placeholder='Nama'
            placeholderTextColor="#BDBDBD"
            color={ColorSecondary}
            value={name}
            onChangeText={(text)=>setName(text)}
        /> 

        <TextInput
            style={{backgroundColor:'white',paddingLeft:15, borderWidth:1, marginVertical:10, borderColor:ColorSecondary, borderRadius:10, width:SIZES.width-40, alignSelf:'center'}}
            placeholder='Email atau Nomor Telpon'
            placeholderTextColor="#BDBDBD"
            color={ColorSecondary}
            value={emailOrPhone}
            onChangeText={(text)=>setEmailOrPhone(text)}
        /> 

        <View style={{display:"flex",flexDirection:'row',backgroundColor:'white', borderWidth:1, marginVertical:10, borderColor:ColorSecondary, borderRadius:10, width:SIZES.width-40, alignSelf:'center'}}>
            <TextInput
                style={{flex:1, paddingLeft:15}}
                placeholder='Kata Sandi'
                placeholderTextColor="#BDBDBD"
                color={ColorSecondary}
                secureTextEntry={showPassword}
                value={password}
                onChangeText={(text)=>setPassword(text)}
            />
             <Icon
                style={{position: "absolute", alignSelf:"center", right: 5}}
                name={eyeIconPassword}
                size={20}
                color="#BDBDBD"
                onPress={(iconPasswordPressed)}
            />
        </View>

        <View style={{display:"flex",flexDirection:'row',backgroundColor:'white', borderWidth:1, marginVertical:10, borderColor:ColorSecondary, borderRadius:10, width:SIZES.width-40, alignSelf:'center'}}>
            <TextInput
                style={{flex:1, paddingLeft:15}}
                placeholder='Konfirmasi Kata Sandi'
                placeholderTextColor="#BDBDBD"
                color={ColorSecondary}
                secureTextEntry={showConfirmPassword}
                value={confirmPassword}
                onChangeText={(text)=>setConfirmPassword(text)}
            />
             <Icon
                style={{position: "absolute", alignSelf:"center", right: 5}}
                name={eyeIconConfirmPassword}
                size={20}
                color="#BDBDBD"
                onPress={iconConfirmPasswordPressed}
            />
        </View>

        <View style={{display:'flex',flexDirection:"row", alignItems:'center', justifyContent:'space-between', marginTop:10, marginBottom:30, paddingHorizontal :20}}>
            <View style={{display:'flex', flexDirection:"row", alignItems:'center'}}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    color={ColorSecondary}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                />
                <Text style={{color:TextColor}}>
                     Saya setuju dengan <Text style={{color:ColorSecondary}}>syarat dan ketentuan</Text> serta  <Text style={{color:ColorSecondary}}>kebijakan privacy</Text>
                </Text>
            </View>
        
        </View>

        <Button action={signupPressed} label="Buat Akun"/>

        <View style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:25}}>
            <Text style={{color:TextColor}}>Sudah punya akun? </Text>
            <TouchableOpacity
              onPress={()=>navigation.navigate('Login')}>
                <Text style={{color:ColorSecondary}}>
                    Masuk
                </Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

