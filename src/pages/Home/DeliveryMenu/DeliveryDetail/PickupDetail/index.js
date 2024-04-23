import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TextInput } from 'react-native-paper';

import { carIcon, motorIcon } from '../../../../../assets/images';
import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../../../../utils/constanta';
import { HeaderBar } from '../../../../../components';
import { dummyDataDeliveryPromo } from '../../../../../utils/StaticDatabase';

export default PickupDetail = ({ navigation, route }) => {
    const {pickup, delivery, senderName, senderPhone, packageWeight, packageType, packageSize} = route.params;
    const [transport, setTransport] = useState({item:null, price:0});
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const sheetRef =  useRef();
    const snapPoints = useMemo(() => ["1","65%" ], []);

    //Menampilkan bottom sheet ketika promo diklik
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);

    //Menutup bottom sheet setelah promo dipilih
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);

    //tampilan backdrop bottom sheet
    const renderBackdrop = useCallback(
        props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={0}
            appearsOnIndex={1}
          />
        ),
        []
      );

      //tampilan item promo
      const PromoItem = (item) =>{
        return (
          <View style={{width:SIZES.width-50, margin:15, borderRadius:15, shadowColor: 'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2}, shadowRadius: 10, elevation: 3, backgroundColor:ColorPrimary}}> 
              <Image source={item.banner} style={{flex:5,height:150, width:'100%', borderTopLeftRadius:15,borderTopRightRadius:15}} resizeMode='stretch' />
              <View style={{flex:2,padding:10, borderBottomLeftRadius:15,borderBottomRightRadius:15,}}>
                  <Text style={{color:TextColor, fontSize:14}}>{item.title}</Text>
                  <View style={{display:'flex', flexDirection:'row', alignItems:'center', paddingTop:10, justifyContent:'space-between'}}>
                      <View style={{display:'flex', flexDirection:'row'}}>
                        <Icon name='calendar-clock-outline' size={20} color='black' />
                        <Text style={{color:TextColor, marginLeft:5}}>Hingga {item.validityDate}</Text>
                      </View>
                      <TouchableOpacity onPress={()=>handleClosePress()} style={{padding:5, paddingHorizontal:15, borderWidth:1, borderColor:ColorSecondary, borderRadius:12}}>
                        <Text style={{color:ColorSecondary}}>Pakai</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
        );
    }
 
  useEffect(() => {
  },[]);


    //output halaman pickup detail
    return(
        <View style={{flex:1,backgroundColor:ColorPrimary, paddingBottom:70}}>
            <HeaderBar navigation={navigation} headerText='Detail Pengambilan' type={2}/>
            <ScrollView style={{paddingHorizontal:15}}>
                
                <View style={{paddingVertical:15, borderBottomWidth:3, borderBottomColor:'#DDDDDD'}}>
                    <Text style={{color:TextColor, fontSize:16, fontWeight:'600'}}>Pengirim</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:10}}>
                        <Text style={{color:TextColor, width:100}}>Nama</Text>
                        <TextInput
                            style={{backgroundColor:ColorPrimary, width:SIZES.width-130, height:30}}
                            placeholder='Nama pengirim'
                            textColor={TextColor}
                            value={name}
                            onChangeText={text => setName(text)}
                        />
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:15}}>
                        <Text style={{color:TextColor, width:100}}>Nomor telpon</Text>
                        <TextInput
                            style={{backgroundColor:ColorPrimary, width:SIZES.width-130, height:30}}
                            placeholder='Nomor telepon pengirim'
                            textColor={TextColor}
                            value={phone}
                            onChangeText={text => setPhone(text)}
                            keyboardType='numeric'
                        />
                    </View>
                </View>

                <View style={{paddingVertical:15, paddingBottom:25, borderBottomWidth:1, borderBottomColor:'#DDDDDD'}}>
                    <Text style={{color:TextColor, fontSize:16, fontWeight:'600', marginBottom:15}}>Jenis Pengiriman</Text>
                    <TouchableOpacity onPress={()=>setTransport({item:'Motor', price:20000})} style={{width:'100%', flexDirection:'row', alignItems:'center', padding:10, borderWidth:2, borderColor:transport.item=='Motor'?ColorSecondary:'#BDBDBD', borderRadius:10}}>
                        <Image source={motorIcon} style={{width:25, height:25}}/>
                        <Text style={{color:TextColor, marginHorizontal:10, fontSize:14, fontWeight:'600'}}>Motor</Text>
                        <Text style={{color:TextColor, marginLeft:'auto', fontSize:14, fontWeight:'600'}}>Rp.20.000</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>setTransport({item:'Mobil', price:40000})} style={{width:'100%', marginVertical:15, flexDirection:'row', alignItems:'center', padding:10, borderWidth:2, borderColor:transport.item=='Mobil'?ColorSecondary:'#BDBDBD', borderRadius:10}}>
                        <Image source={carIcon} style={{width:25, height:25}}/>
                        <Text style={{color:TextColor, fontSize:14,  marginHorizontal:10, fontWeight:'600'}}>Mobil</Text>
                        <Text style={{color:TextColor, fontSize:14, marginLeft:'auto', fontWeight:'600'}}>Rp.40.000</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity  onPress={() => handleSnapPress(1)} style={{marginTop:40}}>
                    <DropdownPromo/>
                </TouchableOpacity>

            </ScrollView>
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                index={0}
                backdropComponent={renderBackdrop}
            >   
           
                <BottomSheetView>
                < Text style={{color:TextColor, marginRight:15, marginLeft:30, marginTop:20,  fontWeight:'bold', fontSize:14 }}>Voucher Promo</Text>
                    <View style={{flexDirection:'row', marginTop:20,marginBottom:10, height:50, marginHorizontal:15, borderWidth:1, borderRadius:15}}>
                        <TextInput
                            style={{flex:2, borderBottomLeftRadius:15, borderTopLeftRadius:15, paddingLeft:10, backgroundColor:ColorPrimary}}
                            placeholder='Masukan kode Voucher'
                            placeholderTextColor="#BDBDBD"
                            color={ColorSecondary}
                        /> 
                        <TouchableOpacity style={{flex:1, marginLeft:5, backgroundColor:ColorSecondary, borderBottomRightRadius:15, borderTopRightRadius:15, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:ColorPrimary, fontSize:16}}>Simpan</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetView>
                
                <BottomSheetScrollView> 
                    <View style={{width:SIZES.width, alignItems:'center'}}>
                        {dummyDataDeliveryPromo.map((item) => PromoItem(item))}
                    </View>

                </BottomSheetScrollView>
            </BottomSheet>

            { name && phone && transport.item?
                    //menampilkan tombol lanjut ketika seluruh input yang dibutuhkan terisi 
                    <View style={{position:'absolute', width:SIZES.width, bottom:10}}>
                        <Button label="Lanjut" action={()=>navigation.navigate('ConfirmDeliveryOrder',{pickup:pickup, delivery:delivery, senderName:senderName, senderPhone:senderPhone, recipientName:name, recipientPhone:phone, packageWeight:packageWeight, packageType:packageType, packageSize:packageSize, transport:transport, processId:1})}/>
                    </View>:null
            }
        </View>
    );
}