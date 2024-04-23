import React, { useState } from "react";
import { View, Text, TouchableOpacity, ToastAndroid,Image, TextInput } from 'react-native';

import SIZES, { ColorPrimary, ColorSecondary, TextColor, storage } from '../../../../utils/constanta';
import { HeaderBar, Button } from '../../../../components';

export default AddAddress= ({ navigation }) => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  //validasi menyimpan alamat baru ketika tombol simpan alamat diklik
  const savePressed = ()=>{
    if(name && address && phone){
        if(phone.length >= 11 && phone.length <=14){
          //menambahkan alamat baru ke list alamat pengguna
          const user = JSON.parse(storage.getString('user'));
          const newAddress = {name: name,address: address, phone:phone};
          user.address[user.address.length] = newAddress;

          //menyimpan alamat
          storage.set('user', JSON.stringify(user));
      
          //redirect ke halaman Address
          navigation.navigate("Address");
          ToastAndroid.show('Berhasil Menambahkan Alamat',ToastAndroid.SHORT);

        }else{
          ToastAndroid.show('Nomor Hp harus terdiri dari 11-14 karakter ',ToastAndroid.SHORT);
        }
    }else{
      ToastAndroid.show('Seluruh field tidak boleh kosong',ToastAndroid.SHORT);
    }
  }
  
  //output tampilan halaman AddAddress
  return (
    <View style={{flex:1, backgroundColor:ColorPrimary}}>
        <HeaderBar navigation={navigation} headerText='Alamat Baru' type={2}/>
        
        <View
          style={{width:SIZES.width-30, marginHorizontal:15, marginTop:35, paddingBottom:5, display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderBottomColor:'#DDDDDD'}}>
            <View>
              <Text style={{color:TextColor, fontSize:16}}>Nama</Text>
              <TextInput
                style={{backgroundColor:'white', width:SIZES.width-30, borderRadius:10}}
                color={ColorSecondary}
                value={name}
                onChangeText={text => setName(text)}
            /> 
            </View>
        </View>
        <View
          style={{width:SIZES.width-30, marginHorizontal:15, marginTop:10, paddingBottom:5, display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderBottomColor:'#DDDDDD'}}>
            <View>
              <Text style={{color:TextColor, fontSize:16}}>Alamat</Text>
              <TextInput
                style={{backgroundColor:'white', width:SIZES.width-30, borderRadius:10}}
                color={ColorSecondary}
                value={address}
                onChangeText={text => setAddress(text)}
            /> 
            </View>
        </View>
        <View
          style={{width:SIZES.width-30, marginHorizontal:15, marginTop:10, paddingBottom:5, display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderBottomColor:'#DDDDDD'}}>
            <View>
              <Text style={{color:TextColor, fontSize:16}}>Nomor Hp</Text>
              <TextInput
                style={{backgroundColor:'white', width:SIZES.width-30, borderRadius:10}}
                color={ColorSecondary}
                value={phone}
                onChangeText={text => setPhone(text)}
                keyboardType="numeric"
            /> 
            </View>
        </View>

       
        <View style={{position:'absolute', bottom:25, left:20 }}>
          <Button action={savePressed} label="Simpan Alamat"/>
        </View>
        
    </View>
  );
};

