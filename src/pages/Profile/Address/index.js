import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity,FlatList, Image } from 'react-native';
import { useIsFocused } from "@react-navigation/native";

import SIZES, { ColorPrimary, ColorSecondary, TextColor, storage } from '../../../utils/constanta';
import { HeaderBar, Button } from '../../../components';
import { addressIcon } from "../../../assets/images";

export default Address= ({ navigation }) => {
  const focus = useIsFocused();
  const [addressList, setAddressList] = useState(JSON.parse(storage.getString('user')).address);
  
  //inisiasi data
  const getData = ()=>{
      const user = JSON.parse(storage.getString('user')); //mengambil data pengguna yang login
      setAddressList(user.address); //mendapatkan alamat pengguna yang login
  }

  //tampilan item2 Address
  const AddressItem = (item, index)=>{
    return(
      <TouchableOpacity 
        //redirect ke halamat UpdateAddress saat item diklik
        onPress={()=> navigation.navigate('UpdateAddress', {item:item, index:index})}
        style={{width:SIZES.width-30, margin:15, paddingHorizontal:20, paddingBottom:15, display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderBottomColor:'#DDDDDD'}}>
            <Image source={addressIcon} style={{width:20, height:20, marginRight:10}} resizeMode='contain' />
          <View>
            <Text style={{color:TextColor, fontSize:16}}>{item.name}</Text>
            <Text style={{color:'rgba(0,0,0,0.55)', fontSize:14}}>{item.address}</Text>
          </View>
        </TouchableOpacity>
    );
  }
  
  useEffect(() => {
    getData();
  },[focus]);
  
  //output tampilan halaman Address
  return (
    <View style={{flex:1, backgroundColor:ColorPrimary}}>
        <HeaderBar navigation={navigation} headerText='Alamat' type={2}/>
        <View style={{height:20}}/>

        {/* menampilkan daftar alamat */}
        <FlatList
          data={addressList}
          renderItem={({item, index}) => AddressItem(item,index) }
        />

        <View style={{position:'absolute', bottom:25, left:20 }}>
          {/* redirect ke halaman AddAddress saat tombol tambah halaman diklik*/}
          <Button action={()=>navigation.navigate('AddAddress')} label="Tambah Alamat"/> 
        </View>
        
    </View>
  );
};

