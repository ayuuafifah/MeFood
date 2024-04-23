import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView  } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from 'react-native-vector-icons/Ionicons';

import { location3, location1, location2_black } from '../../../assets/images';
import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../../utils/constanta';

export default TransportMenu = ({ navigation }) => {
    const [pickupLocation, setPickupLocation]= useState({name:'Angela', address:'Jalan Diponegoro'});
    const [searchHistory, setSearchHistory] = useState();

    //Inisiasi dummy data
    const getData = ()=>{
        let dummyDataHistory = [
            {name: 'Toko DESI TRESNA', address:'Jalan Banteng, Hadimulyo Timur, Metro Pusat, Kota Metro, Lampung, 34111'},
            {name: 'Bengkel Dj Art Punggur', address:'Jalan Pattimura No. 16, Tanggul Angin, Punggur, Lampung Tengah, Lampung, 34152'}
          ];
          setSearchHistory(dummyDataHistory);
    }
    
    useEffect(() => {
        getData();   
      },[]);

    //output tampilan halaman Transportmenu
    return(
       
        <View style={{flex:1, backgroundColor:ColorPrimary}}>
            <View style={{backgroundColor:ColorSecondary, height:200}}>
                <View style={{flexDirection:'row', margin:15, marginTop:25, alignItems:'center'}}>
                <Icon            
                    name='arrow-left'            
                    size={30}
                    color={TextColor}
                    onPress={()=>navigation.goBack()}
                />
                    <View style={{marginLeft:'auto', marginRight:'auto', paddingRight:45}}>
                        <Text style={{color:TextColor, fontSize:20, fontWeight:'bold' }}>
                            Transportation
                        </Text>
                    </View>
                </View>
            </View>

            <View style={{position:'absolute', top:120, left:SIZES.width*0.125}}>
                <View style={{width:SIZES.width*0.75, flexDirection:'row', height:150, backgroundColor:ColorPrimary, borderRadius:15, borderWidth:2, borderColor:'#BDBDBD'}}>
                    <View style={{justifyContent:'space-between',width:SIZES.width*0.6,  paddingVertical:10}}>
                        <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                            <Image source={location1} style={{height:30, width:30}}/>
                            <Text numberOfLines={1} style={{color:TextColor, marginLeft:10}}>{pickupLocation.address}</Text>
                        </View>

                        {/* redirect ke halaman AddDestination ketika menginput tujuan */}
                        <TouchableOpacity onPress={()=>navigation.navigate('AddDestination')} style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                            <Image source={location3} style={{height:30, width:30}}/>
                            <Text numberOfLines={1} style={{color:'#BDBDBD', marginLeft:10}}>Mau Kemana?</Text>
                        </TouchableOpacity>
                    </View>
                  
                    <Icon3 style={{margin:10, marginTop:'auto', marginBottom:'auto', marginLeft:'auto'}} color={TextColor} name='swap-vertical-outline' size={25} />
                    
                </View>
            </View>

            <View>
                {searchHistory?
                    //menampilkan daftar history pencarian ketika searchHistory != null
                    <View style={{marginTop:100, marginHorizontal:SIZES.width*0.125-15}}>
                        <FlatList
                        data={searchHistory}
                        renderItem={({item, index}) => {
                            return(  
                                    <TouchableOpacity 
                                        onPress={()=>{
                                            navigation.navigate('ConfirmTransportOrder',{pickUp:pickupLocation, destination:item});
                                        }} 
                                        style={{width:SIZES.width, alignItems:'center', flexDirection:'row',padding:15}}>
                                        <Image source={location2_black} style={{height:30, tintColor:TextColor, width:30}}/>
                                        <View style={{marginHorizontal:10, width:SIZES.width-120}}>
                                            <Text style={{fontSize:16, color:TextColor}}>{item.name}</Text>
                                            <Text numberOfLines={1} style={{color:TextColor}}>{item.address}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}}
                        />
                    </View>
                :
                null
                }
            </View>
        </View>
    );
}