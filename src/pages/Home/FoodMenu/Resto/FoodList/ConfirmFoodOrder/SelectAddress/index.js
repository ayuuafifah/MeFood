import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity,FlatList, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

import SIZES, { ColorPrimary, ColorSecondary, TextColor } from '../../../../../../../utils/constanta';
import { HeaderBar, Button } from '../../../../../../../components';
import { addressIcon } from "../../../../../../../assets/images";

export default SelectAddress= ({ navigation }) => {
  const [addressList, setAddressList] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  
  //inisiasi data dummy
  const getData = ()=>{
      let dummyData = [
        {name: 'Angela',address: 'Jalan Diponegoro, Hadimulyo Barat, Kota Metro'},
        {name: 'Rachel', address: 'Jalan Cendrawasih III, Purwosari, Kota Metro'},
      ];
      setAddressList(dummyData);
  }

  //Tampilan item Address
  const AddressItem = (item)=>{
    return(
      <TouchableOpacity
        onPress={()=>setSelectedAddress(item)} 
        style={{width:SIZES.width-30, margin:15, paddingHorizontal:20, paddingBottom:15, display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderBottomColor:'#DDDDDD'}}>
          <Image source={addressIcon} style={{width:20, height:20, marginRight:10}} resizeMode='contain' />
          <View style={{width:SIZES.width-110}}>
            <Text style={{color:TextColor, fontSize:16}}>{item.name}</Text>
            <Text style={{color:'rgba(0,0,0,0.55)', fontSize:14}}>{item.address}</Text>
          </View>
          <Icon
                  name="check-circle"
                  size={20}
                  color={selectedAddress==item?ColorSecondary:ColorPrimary}
            />
        </TouchableOpacity>
    );
  }

  useEffect(() => {
    getData();
  },[]);
  
  //Output tampilan halaman select address
  return (
    <View style={{flex:1, backgroundColor:ColorPrimary}}>
        <HeaderBar navigation={navigation} headerText='Alamat' type={2}/>
        <View style={{height:20}}/>

        {/* menampilkan daftar alamat yang tersedia*/}
        <FlatList
          data={addressList}
          renderItem={({item}) => AddressItem(item) }
        />

        <View style={{position:'absolute', bottom:25, left:20 }}>
          <Button action={()=>navigation.goBack()} label="Pilih Alamat"/>
        </View>
        
    </View>
  );
};

