import React, {useState, useEffect} from 'react';
import { View, Text, Image, ScrollView  } from 'react-native';

import {pinDownIcon, pinUpIcon} from '../../../../../assets/images';
import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../../../../utils/constanta';
import { HeaderBar, PrintDetail } from '../../../../../components';

export default ConfirmDeliveryOrder = ({ navigation, route }) => {
    const {pickup, delivery, senderName, senderPhone, recipientName, recipientPhone, packageWeight, packageType, packageSize, transport} = route.params;
    const [detail, setDetail] = useState([{ Harga:0, Ongkir:0, Biaya_layanan:0, Diskon: 0 }]);

    //output tampilan halaman confirmDeliveryOrder
    return(
        <View style={{flex:1,backgroundColor:ColorPrimary, paddingBottom:70}}>
            <HeaderBar navigation={navigation} headerText='Konfirmasi Paket' type={2}/>
            <ScrollView style={{paddingHorizontal:15}}>
                <View style={{paddingBottom:15, marginHorizontal:15, borderBottomColor:'#DDDDDD', borderBottomWidth:3}}>
                    <View style={{width:SIZES.width*0.75, flexDirection:'row', alignSelf:'center', marginVertical:15, backgroundColor:ColorPrimary, borderRadius:15, borderWidth:2, overflow:'hidden', borderColor:'#BDBDBD'}}>
                            <View style={{justifyContent:'space-between', paddingVertical:10}}>
                                <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                    <Image source={pinUpIcon} style={{height:30, width:30}}/>
                                    <View>
                                        <Text style={{color:TextColor, marginLeft:10}}>Pengirim</Text>
                                        <Text style={{color:TextColor, marginLeft:10}}>{senderName}</Text>
                                        <Text style={{color:TextColor, marginLeft:10}}>{senderPhone}</Text> 
                                        <Text numberOfLines={1} style={{color:TextColor, marginLeft:10}}>{pickup.address}</Text>
                                    </View>
                                    
                                </View>
                                <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                    <Image source={pinDownIcon} style={{height:30, width:30}}/> 
                                    <View>
                                        <Text style={{color:TextColor, marginLeft:10}}>Penerima</Text>
                                        <Text style={{color:TextColor, marginLeft:10}}>{recipientName}</Text>
                                        <Text style={{color:TextColor, marginLeft:10}}>{recipientPhone}</Text>
                                        <Text numberOfLines={1} style={{color:TextColor, width:SIZES.width-170, marginLeft:10}}>{delivery.address}</Text>
                                    </View>
                                </View>
                            </View>
                    </View>
                </View>

                <View>
                    <PrintDetail items={[{Berat_total:packageWeight, Jenis_paket:packageType }]} fontWeigh="bold" borderWidth={1} paddingVertical={20}/>
                    {transport.item=='Motor'?
                        <PrintDetail items={[{ Kendaraan_motor:transport.price, Biaya_layanan:2000, Diskon:5000  }]} paddingVertical={20}/>:
                        <PrintDetail items={[{ Kendaraan_mobil:transport.price, Biaya_layanan:2000, Diskon:5000  }]} paddingVertical={20}/>
                    }
                    <PrintDetail items={[{Total:5000+transport.price+2000-5000}]} fontWeigh="bold" borderWidth={3} paddingVertical={20}/>
                    <PrintDetail items={[{Tunai:5000+transport.price+2000-5000}]} fontWeigh="bold" borderWidth={3} paddingVertical={20}/>
                </View>



            </ScrollView>

            <View style={{position:'absolute', width:SIZES.width, bottom:10}}>
                    <Button label="Pesan Sekarang" action={()=>navigation.navigate("DetailTransactionDelivery",{orderId:"234567890", pickup:pickup, delivery:delivery, senderName:senderName, senderPhone:senderPhone, recipientName:recipientName, recipientPhone:recipientPhone, packageWeight:packageWeight, packageType:packageType, packageSize:packageSize, transport:transport, protection:5000, serviceFee:2000, discount:5000, processId:1, time: '19.30', createdAt:"1 Des 2023 10.00", paymentMethod:"Tunai"})}/>
             </View>
        </View>
    );
}