import React, {useState, useEffect,useMemo, useCallback, useRef} from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon2 from 'react-native-vector-icons/Entypo'
import Icon3 from 'react-native-vector-icons/Ionicons'
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";

import { pinUpIcon, pinDownIcon } from '../../../assets/images';
import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../../utils/constanta';
import { dummyDataDeliveryPromo } from '../../../utils/StaticDatabase';
import { Button, DropdownPromo } from '../../../components';

export default DeliveryMenu = ({ navigation }) => {
    const [pickupLocation, setPickupLocation]= useState({name:'Angela', address:'Jalan Diponegoro'});
    const [deliveryLocation, setDeliveryLocation]= useState();
    const [searchAddress, setSearchAddress]= useState(false);
    const [searchHistory, setSearchHistory] = useState();
    const [keyword, setKeyword] = useState();
    const [addressList, setAddressList] = useState();
    const sheetRef =  useRef();
    const snapPoints = useMemo(() => ["1","65%" ], []);

    //Inisiasi data dummy
    const getData = ()=>{
        let dummyDataHistory = [
            {name: 'Toko DESI TRESNA', address:'Jalan Banteng, Hadimulyo Timur, Metro Pusat, Kota Metro, Lampung, 34111'},
            {name: 'Bengkel Dj Art Punggur', address:'Jalan Pattimura No. 16, Tanggul Angin, Punggur, Lampung Tengah, Lampung, 34152'}
          ];

        let dummyDataAddress = [
            {name: 'Toko DESI TRESNA', address:'Jalan Banteng, Hadimulyo Timur, Metro Pusat, Kota Metro, Lampung, 34111'},
            {name: 'SDN 21 Metro', address:'Jalan Banteng, Hadimulyo Timur, Metro Pusat, Kota Metro, Lampung, 34111'},
            {name: 'Masjid Nurul Huda', address:'Jalan Veteran, Hadimulyo Barat, Metro Pusat, Kota Metro, Lampung, 34111'},
            {name: 'Bengkel Dj Art Punggur', address:'Jalan Pattimura No. 16, Tanggul Angin, Punggur, Lampung Tengah, Lampung, 34152'}
        ]
          setAddressList(dummyDataAddress);
          setSearchHistory(dummyDataHistory);
    }

    
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

    //menghapus riwayat pencarian alamat tujuan
    const deleteSearchHistory = (index) =>{
        if(index){
            setSearchHistory(searchHistory.slice(0, index))
        }else{
            setSearchHistory();
        }
    }
    
    //Tampilan item promo
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
        getData();
        
      },[]);

    //output tampilan halaman DeliveryMenu
    return(
        searchAddress?
        //Tampilan ketika mengisi alamat tujuan
            <View style={{flex:1, backgroundColor:ColorPrimary}}>
                <View style={{ flexDirection:'row', alignItems:'center', margin:15}}>
                    <Icon 
                        style={{marginBottom:15}}            
                        name='arrow-left'            
                        size={30}
                        color={TextColor}
                        onPress={()=>setSearchAddress(false)}
                    />
                    <TextInput
                    theme={{ roundness: 10 }}
                    style={{backgroundColor:'white', margin:10, borderColor:'#D9D9D9', borderWidth:2, height:40, flex:1, borderRadius:10}}
                    placeholder='Cari Alamat'
                    placeholderTextColor="#BDBDBD"
                    left={ <TextInput.Icon color="#8C8C8C" icon="search" size={20} /> }
                    value={keyword}
                    onChangeText={(text)=>setKeyword(text)}
                    />
                
                </View>
                {keyword?
                    //tampilan ketika input alamat tujuan
                    <View>
                        {addressList?
                            <View>
                                {/* menampilkan daftar alamat berdasarkan keyword */}
                                <FlatList
                                data={addressList}
                                renderItem={({item}) => {
                                    //Tampilan item2 alamat yang sesuai keyword
                                    return( 
                                            item.address.toUpperCase().includes(keyword.toUpperCase()) || item.name.toUpperCase().includes(keyword.toUpperCase())?
                                                <TouchableOpacity 
                                                    onPress={()=>{
                                                        setDeliveryLocation(item);
                                                        setSearchAddress(false);
                                                    }} 
                                                    style={{width:SIZES.width, flexDirection:'row',padding:15}}>
                                                    <Icon2 name='location' size={25} color={TextColor}/>
                                                    <View style={{marginHorizontal:10, width:SIZES.width-60}}>
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
                    //tampilan ketika tidak/belum menginputkan alamat tujuan
                    <View>
                        {searchHistory?
                            <View>
                                <View style={{flexDirection:'row', margin:15, alignItems:'center', justifyContent:'space-between'}}>
                                    <Text style={{fontSize:16, color:TextColor}} >Alamat terakhir</Text>
                                    <TouchableOpacity onPress={()=>deleteSearchHistory()}>
                                        <Text  style={{fontSize:16, color:'#BDBDBD'}}>Bersihkan semua</Text>
                                    </TouchableOpacity>
                                    
                                </View>   
                                {/* menampilkan daftar riwayat pencarian alamat */}
                                <FlatList
                                data={searchHistory}
                                renderItem={({item, index}) => {
                                    return(  
                                            <TouchableOpacity 
                                                onPress={()=>{
                                                    setDeliveryLocation(item);
                                                    setSearchAddress(false);
                                                }} 
                                                style={{width:SIZES.width, flexDirection:'row',padding:15}}>
                                                <Icon2 name='back-in-time' size={25} color={TextColor}/>
                                                <View style={{marginHorizontal:10, width:SIZES.width-120}}>
                                                    <Text style={{fontSize:16, color:TextColor}}>{item.name}</Text>
                                                    <Text style={{color:TextColor}}>{item.address}</Text>
                                                </View>
                                                <Icon2 name='cross' size={25} onPress={()=>deleteSearchHistory(index)} color={TextColor}/>
                                            </TouchableOpacity>
                                        )}}
                                />
                            </View>
                        :
                        null
                        }
                    </View>
                }
               
        </View>
        :
        //tampilan ketika tidak/belum mengisi alamat tujuan
        <View style={{flex:1, backgroundColor:ColorPrimary}}>
            <View style={{backgroundColor:ColorSecondary, height:200, borderBottomRightRadius:20, borderBottomLeftRadius:20}}>
                <View style={{flexDirection:'row', margin:15, marginTop:25, alignItems:'center'}}>
                <Icon            
                    name='arrow-left'            
                    size={30}
                    color={ColorPrimary}
                    onPress={()=>navigation.goBack()}
                />
                    <View style={{marginLeft:'auto', marginRight:'auto', paddingRight:45}}>
                        <Text style={{color:ColorPrimary, fontSize:20, fontWeight:'bold' }}>
                            Delivery
                        </Text>
                    </View>
                </View>
            </View>

            <View style={{position:'absolute', top:120, left:SIZES.width*0.125}}>
                <Text style={{color:ColorPrimary, fontSize:16, marginBottom:10, fontWeight:'bold'}}>Mau kirim paket kemana?</Text>
                <View style={{width:SIZES.width*0.75, flexDirection:'row', height:150, backgroundColor:ColorPrimary, borderRadius:15, borderWidth:2, borderColor:'#BDBDBD'}}>
                    <View style={{justifyContent:'space-between',width:SIZES.width*0.6,  paddingVertical:10}}>
                        <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                            <Image source={pinUpIcon} style={{height:30, width:30}}/>
                            <Text numberOfLines={1} style={{color:TextColor, marginLeft:10}}>{pickupLocation.name} , {pickupLocation.address}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>setSearchAddress(true)} style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                            <Image source={pinDownIcon} style={{height:30, width:30}}/>
                            <Text numberOfLines={1} style={{color:deliveryLocation?TextColor:'#BDBDBD', marginLeft:10}}>{deliveryLocation?deliveryLocation.name +' , '+ deliveryLocation.address:'Kirim ke?'}</Text>
                        </TouchableOpacity>
                    </View>
                  
                    <Icon3 style={{margin:10, marginLeft:'auto'}} color={TextColor} name='swap-vertical-outline' size={30} />
                    
                </View>
            </View>

            <TouchableOpacity  onPress={() => handleSnapPress(1)} style={{margin:15, marginTop:200}}>
                <DropdownPromo/>
            </TouchableOpacity>

           
            { pickupLocation && deliveryLocation? 
                 //menampilkan tombol lanjut setelah alamat pickup dan alamat delivery terisi
                <View style={{position:'absolute', width:SIZES.width, bottom:10}}>
                    <Button label="Lanjut" action={()=>navigation.navigate('DeliveryDetail',{pickup:pickupLocation, delivery:deliveryLocation})}/>
                </View>:null
            }

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
                        {/* menampilkan daftar promo */}
                        {dummyDataDeliveryPromo.map((item) => PromoItem(item))}
                    </View>

                </BottomSheetScrollView>
            </BottomSheet> 
           
        </View>
    );
}