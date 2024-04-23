import React,{useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';

import {  calendarIcon, promoIcon2 } from '../../assets/images';
import { HeaderBar } from '../../components';
import SIZES, { ColorPrimary, ColorSecondary, TextColor } from '../../utils/constanta';
import { dummyDataVoucherPromo } from '../../utils/StaticDatabase';

export default Promo = ({ navigation }) => {
  const [promoList, setPromoList]=useState();

  //inisiasi dummy data
  const getData = ()=>{
    setPromoList(dummyDataVoucherPromo);
  }

  //tampilan item2 promo
  const PromoItem = (item) =>{
      return (
        <View style={{width:SIZES.width-30, margin:15, borderRadius:15, shadowColor: 'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2}, shadowRadius: 10, elevation: 3, backgroundColor:ColorPrimary}}>  
            <Image source={item.banner} style={{flex:5, height:170, width:'100%', borderTopLeftRadius:15,borderTopRightRadius:15}} resizeMode='stretch' />
            <View style={{flex:2,padding:10, borderBottomLeftRadius:15,borderBottomRightRadius:15,}}>
                <Text style={{color:TextColor, fontWeight:'600', fontSize:15}}>{item.title}</Text>
                <View style={{display:'flex', flexDirection:'row', alignItems:'center', paddingTop:5, justifyContent:'space-between'}}>
                    <View style={{display:'flex', flexDirection:'row'}}>
                      <Image source={calendarIcon} style={{width:20, height:20, marginRight:10}} resizeMode='stretch' />
                      <Text style={{color:TextColor}}>Berlaku hingga {item.validityDate}</Text>
                    </View>
                    <View style={{padding:2, paddingHorizontal:13, borderWidth:1, borderColor:ColorSecondary, borderRadius:15}}>
                      <Text style={{color:ColorSecondary}}>Pakai</Text>
                    </View>
                </View>
            </View>
        </View>
      );
  }

  useEffect(() => {
    getData();
  },[]);

  //output tampilan halaman promo
  return (
    <View style={{flex:1, backgroundColor:ColorPrimary}}>
         <HeaderBar navigation={navigation} headerText='Promo' type={1}/>
         <View style={{display:'flex', flexDirection:'row', marginTop:30, height:50, marginHorizontal:15}}>
            <TextInput
                style={{backgroundColor:'white', paddingLeft:15, borderWidth:1, borderColor:'#D3D1D8', backgroundColor:'rgba(221, 221, 221, 0.25)', borderRadius:10, flex:2}}
                placeholder='Masukan kode Voucher'
                placeholderTextColor="#BDBDBD"
                color={ColorSecondary}
            /> 
            <TouchableOpacity style={{flex:1, marginLeft:5, backgroundColor:ColorSecondary, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
              <Text style={{color:ColorPrimary, fontSize:16}}>Simpan</Text>
            </TouchableOpacity>
         </View>

          {promoList?
              //menampilkan daftar promo jika promolist tidak null
              <FlatList
                style={{marginTop:15, marginBottom:60}}
                data={promoList}
                renderItem={({item}) => PromoItem(item) }
              />
            :
              //tampilan ketika promolist null
              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <View style={{alignItems:'center'}}>
                    <Image source={promoIcon2} style={{width:SIZES.width/3.5, height:SIZES.width/3.5}} resizeMode='contain'/>
                    <Text style={{color:TextColor, fontSize:18}}>Kamu belom memiliki tiket promo</Text>
                </View>
              </View>
          }
   </View>
  );
};

