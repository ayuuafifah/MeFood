import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity,FlatList, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

import SIZES, { ColorPrimary, TextColor } from '../../../utils/constanta';
import { HeaderBar } from '../../../components';
import { handWavingIcon } from "../../../assets/images";

export default Notification= ({ navigation }) => {
  const [notificationList, setNotificationList] = useState();
  
  //Inisiasi dummy data
  const getData = ()=>{
      let dummyData = [
        {time: 'Sekarang',message: 'Halo Angela! Selamat datang di Mefood Express. Nantikan promo diskon dan gratis ongkir disini!'},
        {time: '12:30', message: 'Saya Halo Angela! Selamat datang di Mefood Express. Nantikan promo diskon dan gratis ongkir disini! sampai titik'},
      ];

      setNotificationList(dummyData);
  }

  //tampilan item2 notifikasi
  const NotificationItem = (item)=>{
    return(
      <TouchableOpacity 
        style={{width:SIZES.width-30, maxHeight:150, margin:15, marginBottom:0, backgroundColor:'rgba(29,203,0,0.11)', padding:10, display:'flex', flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#DDDDDD'}}>

          <Image source={handWavingIcon} style={{flex:1,width:20, height:20, marginTop:5}} resizeMode='contain' />
          
          <View style={{flex:7.5, flexDirection:'row', overflow:'hidden', paddingHorizontal:5}}>
            <Text style={{color:TextColor, fontSize:16}}>{item.message}</Text>
          </View>

          <View style={{flex:2, padding:5, alignItems:'flex-end' }}>
            <Text style={{color:'rgba(0,0,0,0.55)', fontSize:14}}>{item.time}</Text>
          </View>
        </TouchableOpacity>
    );
  }

  useEffect(() => {
    getData();
  },[]);
  
  //output tampilan halaman notifikasi
  return (
    <View style={{flex:1, backgroundColor:ColorPrimary}}>
        <HeaderBar navigation={navigation} headerText='Notifikasi' type={2}/>
        <View style={{height:30}}/>
      
        {notificationList?
          //menampilkan daftar notifikasi ketika notificationList != null
          <View style={{flex:1}}>
            <Text style={{marginLeft:15, color:TextColor, fontSize:16}}>Terbaru</Text>
            <FlatList
              data={notificationList}
              renderItem={({item}) => NotificationItem(item) }
            />
          </View>      
          :
          //Tampilan ketika notificationList == null
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <View style={{alignItems:'center'}}>
                  <Icon
                    name="notifications-none"
                    size={SIZES.width/3.5}
                    color="#BDBDBD"
                  />
                  <Text style={{color:TextColor, fontSize:18}}>Tidak ada notifikasi</Text>
              </View>
          </View>
        }
        
    </View>
  );
};

