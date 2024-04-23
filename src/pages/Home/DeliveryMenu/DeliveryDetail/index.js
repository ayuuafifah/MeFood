import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image,  ScrollView  } from 'react-native';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from 'react-native-vector-icons/Ionicons'
import { TextInput } from 'react-native-paper';

import {cardiganIcon, pinDownIcon, pinUpIcon } from '../../../../assets/images';
import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../../../utils/constanta'
import { HeaderBar } from '../../../../components';

export default DeliveryDetail = ({ navigation, route }) => {
    const {pickup, delivery} = route.params;
    const [pickupLocation, setPickupLocation]= useState({name:' ', address:' '});
    const [deliveryLocation, setDeliveryLocation]= useState({name:' ', address:' '});
    const [packageSize, setPackageSize] = useState();
    const [packageType, setPackageType] = useState();
    const [packageWeight, setPackageWeight] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    

  //Inisiasi data dummy
  const getData = ()=>{
      setPickupLocation(pickup);
      setDeliveryLocation(delivery);
  }

 
  useEffect(() => {
    getData();
  },[]);


    //output tampilan halaman DeliveryDetail
    return(
        <View style={{flex:1,backgroundColor:ColorPrimary, paddingBottom:70}}>
            <HeaderBar navigation={navigation} headerText='Detail Pengiriman' type={2}/>
            <ScrollView style={{paddingHorizontal:15}}>
                <View style={{width:SIZES.width*0.75, flexDirection:'row', height:150, alignSelf:'center', marginTop:15, backgroundColor:ColorPrimary, borderRadius:15, borderWidth:2, borderColor:'#BDBDBD'}}>
                        <View style={{justifyContent:'space-between', paddingVertical:10}}>
                            <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                <Image source={pinUpIcon} style={{height:30, width:30}}/>
                                <Text style={{color:TextColor, marginLeft:10}}>{pickupLocation.name} , {pickupLocation.address}</Text>
                            </View>
                            <TouchableOpacity style={{flexDirection:'row', margin:10, alignItems:'center', overflow:'hidden'}}>
                                <Image source={pinDownIcon} style={{height:30, width:30}}/>
                                <Text numberOfLines={1} style={{color:deliveryLocation?TextColor:'#BDBDBD', overflow:'hidden', width:SIZES.width-200, marginLeft:10}}>{deliveryLocation?deliveryLocation.name + ', '+ deliveryLocation.address:'Kirim ke?'}</Text>
                            </TouchableOpacity>
                        </View>
                    
                        <Icon2 style={{margin:10, marginLeft:'auto'}} color={TextColor} name='swap-vertical-outline' size={30} />
                </View>

                <View style={{paddingVertical:15, borderBottomWidth:3, borderBottomColor:'#DDDDDD'}}>
                    <Text style={{color:TextColor, fontSize:16, fontWeight:'600'}}>Penerima</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:10}}>
                        <Text style={{color:TextColor, width:100}}>Nama</Text>
                        <TextInput
                            style={{backgroundColor:ColorPrimary, width:SIZES.width-130, height:30}}
                            placeholder='Nama penerima'
                            textColor={TextColor}
                            value={name}
                            onChangeText={text => setName(text)}
                        />
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:15}}>
                        <Text style={{color:TextColor, width:100}}>Nomor telpon</Text>
                        <TextInput
                            style={{backgroundColor:ColorPrimary, width:SIZES.width-130, height:30}}
                            placeholder='Nomor telepon penerima'
                            textColor={TextColor}
                            value={phone}
                            onChangeText={text => setPhone(text)}
                            keyboardType='numeric'
                        />
                    </View>
                </View>

                <View style={{paddingVertical:15}}>
                    <Text style={{color:TextColor, fontSize:16, fontWeight:'600'}}>Detail Paket</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:10}}>
                         <Icon name="weight-kilogram" color={TextColor} size={25}/>
                        <TextInput
                            style={{backgroundColor:ColorPrimary, width:SIZES.width-65, height:30}}
                            placeholder='Masukan berat paket'
                            textColor={TextColor}
                            value={packageWeight}
                            onChangeText={text => setPackageWeight(text)}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:15}}>
                        <Image source={cardiganIcon} style={{width:25, height:25}}/>
                        <TextInput
                            style={{backgroundColor:ColorPrimary, width:SIZES.width-65, height:30}}
                            placeholder='Masukan jenis paket'
                            textColor={TextColor}
                            value={packageType}
                            onChangeText={text => setPackageType(text)}
                        />
                    </View>
                </View>

                <View style={{paddingVertical:15}}>
                    <Text style={{color:TextColor, fontSize:16, fontWeight:'600', marginBottom:15}}>Ukuran Paket</Text>
                    <TouchableOpacity onPress={()=>setPackageSize('Kecil')} style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:10, borderWidth:2, borderColor:packageSize=='Kecil'?ColorSecondary:'#BDBDBD', borderRadius:10}}>
                        <View>
                            <Text style={{color:TextColor, fontSize:14, fontWeight:'600'}}>Kecil</Text>
                            <Text style={{color:'rgba(0,0,0,0.5)', fontSize:12}}>Barang memiliki berat maksimal 3kg</Text>
                        </View>
                        {packageSize=='Kecil'? <Icon2 name="checkmark-circle" color={ColorSecondary} size={25}/>:<Icon name="checkbox-blank-circle-outline" color={TextColor} size={25}/>}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>setPackageSize('Sedang')} style={{width:'100%', marginVertical:15, flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:10, borderWidth:2, borderColor:packageSize=='Sedang'?ColorSecondary:'#BDBDBD', borderRadius:10}}>
                        <View>
                            <Text style={{color:TextColor, fontSize:14, fontWeight:'600'}}>Sedang</Text>
                            <Text style={{color:'rgba(0,0,0,0.5)', fontSize:12}}>Barang memiliki berat maksimal 10kg</Text>
                        </View>
                        {packageSize=='Sedang'? <Icon2 name="checkmark-circle" color={ColorSecondary} size={25}/>:<Icon name="checkbox-blank-circle-outline" color={TextColor} size={25}/>}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>setPackageSize('Besar')} style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:10, borderWidth:2, borderColor:packageSize=='Besar'?ColorSecondary:'#BDBDBD', borderRadius:10}}>
                        <View>
                            <Text style={{color:TextColor, fontSize:14, fontWeight:'600'}}>Besar</Text>
                            <Text style={{color:'rgba(0,0,0,0.5)', fontSize:12}}>Barang memiliki berat lebih dari 10kg</Text>
                        </View>
                        {packageSize=='Besar'? <Icon2 name="checkmark-circle" color={ColorSecondary} size={25}/>:<Icon name="checkbox-blank-circle-outline" color={TextColor} size={25}/>}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            { name && phone && packageSize && packageType && packageWeight?
                    //Menampilkan tombol lanjut ketika semua inputan yang diperlukan terisi.
                    <View style={{position:'absolute', width:SIZES.width, bottom:10}}>
                        <Button label="Lanjut" action={()=>navigation.navigate('PickupDetail',{pickup:pickupLocation, delivery:deliveryLocation, senderName:name, senderPhone:phone, packageWeight:packageWeight, packageType:packageType, packageSize:packageSize})}/>
                    </View>:null
            }
        </View>
    );
}