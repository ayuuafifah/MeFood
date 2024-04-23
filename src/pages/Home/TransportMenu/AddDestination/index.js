import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView  } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { location1, location3, location2 } from '../../../../assets/images';
import SIZES, { ColorPrimary, TextColor } from '../../../../utils/constanta';


export default AddDestination = ({ navigation }) => {
    const [pickupLocation, setPickupLocation]= useState({name:'Angela', address:'Jalan Diponegoro'});
    const [keyword, setKeyword] = useState();
    const [addressList, setAddressList] = useState();
   
    //Inisiasi data dummy
    const getData = ()=>{
        let dummyDataAddress = [
            {name: 'Toko DESI TRESNA', address:'Jalan Banteng, Hadimulyo Timur, Metro Pusat, Kota Metro, Lampung, 34111'},
            {name: 'SDN 21 Metro', address:'Jalan Banteng, Hadimulyo Timur, Metro Pusat, Kota Metro, Lampung, 34111'},
            {name: 'Masjid Nurul Huda', address:'Jalan Veteran, Hadimulyo Barat, Metro Pusat, Kota Metro, Lampung, 34111'},
            {name: 'Bengkel Dj Art Punggur', address:'Jalan Pattimura No. 16, Tanggul Angin, Punggur, Lampung Tengah, Lampung, 34152'}
        ]

          setAddressList(dummyDataAddress);
    }

    useEffect(() => {
        getData();
        
    },[]);

    //Output tampilan halaman AddDestination
    return(
            <View style={{flex:1, backgroundColor:ColorPrimary}}>
                <View style={{ flexDirection:'row', alignItems:'center', margin:15, marginBottom:0}}>
                    <Icon 
                        style={{marginBottom:15}}            
                        name='arrow-left'            
                        size={30}
                        color={TextColor}
                        onPress={()=>navigation.goBack()}
                    />
                </View>

                <View style={{ marginBottom:10, marginHorizontal:55, flexDirection:'row', borderRadius:5, paddingLeft:15,  borderColor:'#BDBDBD', borderWidth:2, height:50, alignItems:'center'}}>
                    <Image source={location1} style={{height:25, width:25}}/>
                    <Text numberOfLines={1} style={{backgroundColor:'white', fontSize:14, marginLeft:15, color:TextColor}}>
                        {pickupLocation.address}
                    </Text>
                </View>
                <View  style={{backgroundColor:'white', flexDirection:'row', alignItems:'center',paddingLeft:15, margin:10, marginHorizontal:55, borderRadius:5, borderColor:'#BDBDBD', borderWidth:2}}>
                    <Image source={location3} style={{height:25, width:25}}/>
                    <TextInput
                        style={{backgroundColor:'white',flex:1, height:45}}
                        placeholder='Cari Alamat'
                        placeholderTextColor="#BDBDBD"
                        value={keyword}
                        onChangeText={(text)=>setKeyword(text)}
                    />
                </View>

                <View style={{width:SIZES.width-30, height:3, backgroundColor:'#DDDDDD', marginTop:40, marginBottom:15, marginHorizontal:15}} />
                
                {keyword?
                    //Tampilan ketika menginputkan alamat
                    <View>
                        {addressList?
                            //Menampilkan daftar alamat berdasarkan keyword
                            <View>
                                <FlatList
                                data={addressList}
                                renderItem={({item}) => {
                                    return( 
                                            item.address.toUpperCase().includes(keyword.toUpperCase()) || item.name.toUpperCase().includes(keyword.toUpperCase())?
                                                <TouchableOpacity 
                                                    onPress={()=>{
                                                        navigation.navigate('ConfirmTransportOrder',{pickUp:pickupLocation, destination:item});
                                                    }} 
                                                    style={{width:SIZES.width, flexDirection:'row',padding:15, paddingHorizontal:30}}>
                                                    <Image source={location2} style={{height:30, width:30}}/>
                                                    <View style={{marginHorizontal:10, width:SIZES.width-90}}>
                                                        <Text style={{fontSize:16, color:TextColor}}>{item.name}</Text>
                                                        <Text style={{color:TextColor}}>{item.address}</Text>
                                                    </View>
                                                </TouchableOpacity>:null
                                        )}}
                                />
                            </View>
                        :
                        null
                        }
                    </View>
                    :
                    <View>
                       
                    </View>
                }
               
            </View>
    );
}