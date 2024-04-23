import React, {useEffect,useCallback, useMemo, useRef, useState} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import Icon3 from "react-native-vector-icons/Ionicons";
import Icon4 from "react-native-vector-icons/MaterialCommunityIcons";

import { dummyPerson, locationIcon2, mapsView } from '../../../../../assets/images';
import SIZES, { ColorPrimary, TextColor, ColorSecondary, STATUS_DITERIMA, STATUS_DIMASAK, STATUS_DIAMBIL, STATUS_SELESAI } from '../../../../../utils/constanta'

export default DetailTransactionFood = ({ navigation, route}) => {
    const {transaction, page} = route.params;
    const [status, setStatus] = useState();
    const [message, setMessage] = useState();
    const sheetRef =  useRef();
    const snapPoints = useMemo(() => [280, "80" ], []);

    //inisiasi data dummy
    const getData = ()=>{
        setStatus(transaction.processId)
        let x =  { 
            name: 'Anton',
            picture: dummyPerson, 
            message:[
                    { from:'Anton', text:'Mohon ditunggu', time:'10:00', date: '2023-11-20'},
                    { from:'You', text:'Oke Mas', time:'10:01', date: '2023-11-20'},
                  ],
          }
        setMessage(x);
        console.log(transaction);
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
        var item = {resto:transaction.resto, picture:transaction.picture, driverName:'Anton', driverPicture:dummyPerson}
        if(transaction.processId==1){
            setTimeout(() => {
                setStatus(4);
        
                setTimeout(() => {
                    navigation.navigate('FoodRating',{item})
                }, 3000);
            },3000);
        }
    };
  
    useEffect(() => {
        getData();
        dummyUpdateStatus();
    },[]);


    //output tampilan halaman DetailTransactionFood
    return(
        <ImageBackground source={mapsView} resizeMode='cover' style={{flex:1}}>
 
            <View style={{position:'absolute', top:15, left:15, backgroundColor:ColorPrimary, padding:5, borderRadius:25, shadowColor:'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2}, shadowRadius: 10, elevation: 3}}>
                <Icon4            
                    name='arrow-left'            
                    size={30}
                    color={ColorSecondary}
                    onPress={()=> page?navigation.goBack():navigation.navigate('FoodTransaction')}
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
                                {status == STATUS_DITERIMA ? 'Pesanan diterima siap diproses' :
                                    status == STATUS_DIMASAK ? 'Pesanamu sedang dimasak' :
                                        status == STATUS_DIAMBIL ? 'Pesanan sedang dalam perjalanan' :
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
                                        <Icon name='check-circle'  color={status >= STATUS_DITERIMA?ColorSecondary :'#DDDDDD'} size={30}/>
                                        <Text style={{fontSize:14, fontWeight:'600', color:TextColor}}>Diterima</Text>
                                    </View>
                                    
                                    <View style={{alignItems:'center', width:SIZES.width/6, margin:10}}>
                                        <Icon name='check-circle' color={status >= STATUS_DIMASAK?ColorSecondary : '#DDDDDD'} size={30}/>
                                        <Text style={{fontSize:14, fontWeight:'600', color:TextColor}}>Dimasak</Text>
                                    </View>

                                    <View style={{alignItems:'center', width:SIZES.width/6, margin:10}}>
                                        <Icon name='check-circle'  color={status >= STATUS_DIAMBIL?ColorSecondary : '#DDDDDD'} size={30}/>
                                        <Text style={{fontSize:14, fontWeight:'600', color:TextColor}}>Diambil</Text>
                                    </View>

                                    <View style={{alignItems:'center', width:SIZES.width/6, margin:10}}>
                                        <Icon name='check-circle'  color={status == STATUS_SELESAI?ColorSecondary : '#DDDDDD'} size={30}/>
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
                                    {/* redirect ke halaman detailMessage ketika icon diklik */}
                                    <Icon3 onPress={()=>navigation.navigate("MessageDetail", {item:message})} name='chatbox-ellipses-outline' size={30} color={TextColor}/>
                                </View>
                            </View>
                        </View>
                </View>
            
           
                <BottomSheetScrollView style={{marginTop:15}}>
                        <View>
                            <Text style={{color:TextColor, fontSize:16, fontWeight:'600', marginHorizontal:15}}>List Pesanan</Text>

                            <View style={{ marginHorizontal:15, paddingBottom:15, borderBottomColor:'#DDDDDD', borderBottomWidth:1, }}>
                                {transaction.item.map(food=>{
                                    return(
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                            <Text style={{ color:TextColor}}>{food.name}</Text>
                                            <Text style={{ color:TextColor}}>{food.quantity}</Text> 
                                        </View>
                                    );
                                })}
                            </View>
                          
                            <PrintDetail items={[{Harga:transaction.price, Ongkir:transaction.deliveryFee, Biaya_layanan:transaction.serviceFee, Diskon:transaction.discount}]} borderWidth={0} fontWeight="600" paddingVertical={20}/>
                            <PrintDetail items={[{Total:transaction.totalPrice}]} borderWidth={3} fontSize={16} paddingVertical={20}/>
                            <PrintDetail items={[{Tunai:transaction.totalPrice}]} borderWidth={3} fontSize={16} fontWeigh="bold" paddingVertical={20}/>
                            <PrintDetail items={[{No_pesanan:transaction.orderId, Waktu_pemesanan:transaction.createdAt}]} paddingVertical={20}/>
                        </View>
                </BottomSheetScrollView>
            </BottomSheet>
            
        </ImageBackground>
    );
} 