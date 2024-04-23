//Import komponen
import React, { useState } from "react";
import { View, Text, TextInput, ToastAndroid, TouchableOpacity } from 'react-native';
import {Checkbox} from 'react-native-paper';

import { HeaderBar, Button } from '../../../components';
import Icon from "react-native-vector-icons/MaterialIcons";
import SIZES, { ColorPrimary, ColorSecondary, TextColor, storage } from '../../../utils/constanta';
import { users } from "../../../utils/StaticDatabase";

export default Login = ({ navigation }) => {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [eyeIcon, setEyeIcon] = useState("visibility-off");
    const [showPassword, setShowPassword] = useState(true);
    const [checked, setChecked] = useState(false);

    //handle show/hide password ketika icon diklick
    const iconPressed = () => {
        setEyeIcon(showPassword ? "visibility" : "visibility-off");
        setShowPassword(showPassword ? false : true);
    }

    //Validasi login ketika tombol login diklick
    const loginPressed = () => {
       if(emailOrPhone && password){
            let user = users.find((user)=>user.email==emailOrPhone || user.phone == emailOrPhone);
            if(user){ 
                if(user.password == password){
                    storage.set('user', JSON.stringify(user)); //menyimpan informasi user yang berhasil login

                    navigation.replace('Tabs'); //redirect ke halaman Home
                    ToastAndroid.show('Berhasil Login',ToastAndroid.SHORT);
                }else{
                    ToastAndroid.show('Username atau email tidak valid',ToastAndroid.SHORT);
                }
            }else{
                ToastAndroid.show('Username atau email tidak valid',ToastAndroid.SHORT);
            }            
       }else{ ToastAndroid.show('Seluruh field tidak boleh kosong',ToastAndroid.SHORT);} 
    }

    // output tampilan login
    return (
       <View style={{flex:1, backgroundColor:ColorPrimary}}>
        <HeaderBar navigation={navigation} headerText='Login'/>

        <TextInput
            style={{backgroundColor:'white',paddingLeft:15, borderWidth:1,marginTop:35, marginBottom:10, borderColor:ColorSecondary, borderRadius:10, width:SIZES.width-40, alignSelf:'center'}}
            placeholder='Email atau Nomor Telpon'
            placeholderTextColor="#BDBDBD"
            color={ColorSecondary}
            onChangeText={(text)=>setEmailOrPhone(text)}
        /> 

        <View style={{display:"flex",flexDirection:'row',backgroundColor:'white', borderWidth:1, marginVertical:10, borderColor:ColorSecondary, borderRadius:10, width:SIZES.width-40, alignSelf:'center'}}>
            <TextInput
                style={{flex:1, paddingLeft:15}}
                placeholder='Kata Sandi'
                placeholderTextColor="#BDBDBD"
                color={ColorSecondary}
                secureTextEntry={showPassword}
                onChangeText={(text)=>setPassword(text)}
            />
             <Icon
                style={{ position: "absolute", alignSelf:"center", right:5}}
                name={eyeIcon}
                size={20}
                color="#BDBDBD"
                onPress={iconPressed}
            />
        </View>

        <View style={{display:'flex', flexDirection:"row", alignItems:'center', justifyContent:'space-between', marginTop:10, marginBottom:30, paddingHorizontal :20}}>
            <View style={{display:'flex', flexDirection:"row", alignItems:'center'}}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    color={ColorSecondary}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                />
                <Text style={{color:TextColor}}>
                    Ingatkan Saya
                </Text>
            </View>
            
            <TouchableOpacity
              onPress={()=>navigation.navigate('ForgotPassword')}>
                <Text style={{color:TextColor}}>
                    Lupa Kata Sandi?
                </Text>
            </TouchableOpacity>
        </View>

        <Button action={loginPressed} label="Log In"/>

        <View style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:25}}>
            <Text style={{color:TextColor}}>Belum punya akun? </Text>
            <TouchableOpacity
              onPress={()=>navigation.navigate('Signup')}>
                <Text style={{color:ColorSecondary}}>
                    Buat Akun
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    );
};

