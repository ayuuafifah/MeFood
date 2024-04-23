import React, {useEffect,useCallback, useMemo, useRef, useState} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image  } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import Icon3 from "react-native-vector-icons/Ionicons";
import Icon4 from "react-native-vector-icons/MaterialCommunityIcons";

import { dummyPerson, lineDot, locationIcon2, mapsView, pinDownIcon, pinUpIcon} from '../../../../../assets/images';
import SIZES, { ColorPrimary, TextColor, ColorSecondary, STATUS_DITERIMA, STATUS_DIMASAK, STATUS_DIAMBIL, STATUS_SELESAI } from '../../../../../utils/constanta'
import {PrintDetail } from '../../../../../components';


export default DetailTransactionDelivery = ({ navigation, route}) => {
    const {orderId, pickup, delivery, senderName, senderPhone, recipientName, recipientPhone, packageWeight, packageType, packageSize, transport, protection, serviceFee, discount, time, createdAt, paymentMethod, processId} = route.params;
    const [status, setStatus] = useState(0);
    const [message, setMessage] = useState();
    const sheetRef =  useRef();
    const snapPoints = useMemo(() => [280, "80" ], []);
 

    //Inisiasi dummy Data
    const getData = ()=>{
        setStatus(processId)
        let x =  { 
            name: 'Anton',
            picture: dummyPerson, 
            message:[
                    { from:'Anton', text:'Mohon ditunggu', time:'10:00', date: '2023-11-20'},
                    { from:'You', text:'Oke Mas', time:'10:01', date: '2023-11-20'},
                  ],
          }
        setMessage(x);
    }

    //tampilan backdrop bottom sheet
    const renderBackdrop = useCallback(
        props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={0}
            appearsOnIndex={1}
            handleClosePress={false}
            
          />
        ),
        []
      );

    //dummy auto update status
    const dummyUpdateStatus = () => {
            setTimeout(() => {
                setStatus(STATUS_SELESAI);

                setTimeout(() => {
                    //redirect ke halaman DeliveryRating
                    navigation.navigate('DeliveryRating',  {driverName:'Anton', driverPicture:dummyPerson})
                }, 2000);
            },3000);
    };
  
    useEffect(() => {
        getData();
        dummyUpdateStatus();
    },[]);


    //Output tampilan halaman DetailTransactionDelivery
    return(
        <ImageBackground source={mapsView} resizeMode='cover' style={{flex:1}}>
 
            <View style={{position:'absolute', top:15, left:15, backgroundColor:ColorPrimary, padding:5, borderRadius:25, shadowColor:'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2}, shadowRadius: 10, elevation: 3}}>
                <Icon4            
                    name='arrow-left'            
                    size={30}
                    color={ColorSecondary}
                    onPress={()=>navigation.goBack()}
                />
            </View>

            <TouchableOpacity style={{position:'absolute', top:15, right:15, padding:5, borderRadius:25}}>
               <Image source={locationIcon2} style={{width:50, height:50}}/>
            </TouchableOpacity>


            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                index={0}
                backdropComponent={renderBackdrop}
                >

                
                <View style={{borderTopRightRadius:50, paddingHorizontal:15, borderTopLeftRadius:50}}>
                <View style={{width:SIZES.width-30, alignItems:'center'}}>
                            <Text style={{color:TextColor, fontSize:18, fontWeight:'600',}}>
                                {status == STATUS_DITERIMA ? 'Pesanan sedang diambil' :
                                    status == STATUS_DIMASAK ? 'Pesanamu sedang dibawa' :
                                        status == STATUS_DIAMBIL ? 'Pesanan diterima' :
                                            'Pesanan Selesai'
                                }
                            </Text>
                            <View>
                                 <View style={{flexDirection:'row', position:'absolute', top:50, width:SIZES.width-30, justifyContent:'center'}}>
                                    <View style={{width:SIZES.width/6, marginHorizontal:10, height:3, backgroundColor:status >= STATUS_DIMASAK?ColorSecondary:'#DDDDDD'}} />
                                    <View style={{width:SIZES.width/6, marginHorizontal:10, height:3, backgroundColor:status >= STATUS_DIAMBIL?ColorSecondary:'#DDDDDD'}} />
                                    <View style={{width:SIZES.width/6, marginHorizontal:10, height:3, backgroundColor:status == STATUS_SELESAI?ColorSecondary:'#DDDDDD'}} />
                                </View>
                                

                                <View style={{flexDirection:'row', padding:25, width:SIZES.width-30, justifyContent:'center', borderBottomColor:'#DDDDDD', borderBottomWidth:2}}>
                                    <View style={{alignItems:'center', width:SIZES.width/6, margin:10}}>
                                        <Icon name='check-circle'  color={status >= 1?ColorSecondary :'#DDDDDD'} size={30}/>
                                        <Text style={{fontSize:14, fontWeight:'600', color:TextColor}}>Diambil</Text>
                                    </View>
                                    
                                    <View style={{alignItems:'center', width:SIZES.width/6, margin:10}}>
                                        <Icon name='check-circle' color={status >= 2?ColorSecondary : '#DDDDDD'} size={30}/>
                                        <Text style={{fontSize:14, fontWeight:'600', color:TextColor}}>Dibawa</Text>
                                    </View>

                                    <View style={{alignItems:'center', width:SIZES.width/6, margin:10}}>
                                        <Icon name='check-circle'  color={status >= 3?ColorSecondary : '#DDDDDD'} size={30}/>
                                        <Text style={{fontSize:14, fontWeight:'600', color:TextColor}}>Diterima</Text>
                                    </View>

                                    <View style={{alignItems:'center', width:SIZES.width/6, margin:10}}>
                                        <Icon name='check-circle'  color={status == 4?ColorSecondary : '#DDDDDD'} size={30}/>
                                        <Text style={{fontSize:14, fontWeight:'600', color:TextColor}}>Selesai</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{width:SIZES.width-30,  flexDirection:'row', alignItems:'center', paddingVertical:15, borderBottomWidth:3, borderBottomColor:'#DDDDDD'}}>
                                <Image source={dummyPerson} style={{width:60, height:60, margin:10}}/>
                                <View>
                                    <Text style={{color:TextColor, fontSize:14}}>Anton</Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Icon name='star' size={18} color="#F2C94C"/>
                                        <Text style={{color:TextColor, fontSize:14, marginLeft:5}}>4.9</Text> 
                                        <View style={{backgroundColor:"#D9D9D9", borderRadius:5, margin:7, width:7, height:7}} />
                                        <Text style={{color:TextColor, fontSize:14, marginLeft:5}}>BE7777DR</Text> 
                                    </View>
                                </View>

                                <View style={{marginLeft:'auto', flexDirection:'row'}}>
                                    <Icon2 name='phone' size={30} color={TextColor} style={{marginHorizontal:10, marginRight:15}}/>
                                    <Icon3 onPress={()=>navigation.navigate("MessageDetail", {item:message})} name='chatbox-ellipses-outline' size={30} color={TextColor}/>
                                </View>
                            </View>
                        </View>
                </View>
            
           
                <BottomSheetScrollView style={{marginTop:15}}>
                        <View>
                            <View style={{ flexDirection:'row',justifyContent:'center', marginHorizontal:15, paddingBottom:15, borderBottomColor:'#DDDDDD', borderBottomWidth:1, }}>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Image source={pinUpIcon} style={{width:23, height:23, marginRight:15}}/>
                                    <View>
                                        <Text style={{color:TextColor, fontSize:12}}>Pengirim</Text>
                                        <Text numberOfLines={1} style={{color:TextColor, maxWidth:SIZES.width/4, fontSize:16}}>{senderName}</Text>
                                    </View>
                                </View>

                                <Image source={lineDot} style={{width:60, height:5, margin:20}}/>

                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Image source={pinDownIcon} style={{width:23, height:23, marginRight:15}}/>
                                    <View>
                                        <Text style={{color:TextColor, fontSize:12}}>Penerima</Text>
                                        <Text numberOfLines={1} style={{color:TextColor, maxWidth:SIZES.width/4, fontSize:16}}>{recipientName}</Text>
                                    </View>
                                </View>
                            </View>

                          
                            <PrintDetail items={[{Kendaraan_motor:transport.price, Biaya_layanan:serviceFee, Diskon:discount}]} borderWidth={0} fontWeight="600" paddingVertical={20}/>
                            <PrintDetail items={[{Total: transport.price+protection+serviceFee-discount}]} borderWidth={3} fontSize={16} paddingVertical={20}/>
                            <PrintDetail items={[{Tunai: transport.price+protection+serviceFee-discount}]} borderWidth={3} fontSize={16} fontWeigh="bold" paddingVertical={20}/>
                            <PrintDetail items={[{No_pesanan:orderId, Waktu_pemesanan:createdAt}]} paddingVertical={20}/>
                        </View>
                </BottomSheetScrollView>
            </BottomSheet>
            
        </ImageBackground>
    );
} 