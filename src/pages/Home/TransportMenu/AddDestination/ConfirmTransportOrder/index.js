import React, {useState, useEffect,useMemo, useCallback, useRef} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, FlatList, ScrollView  } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { mapsView, circumIcon, cardIcon, linkAjaLogo, ovoLogo, cashIcon, location1, location3, motor, mobil, popPerson } from '../../../../../assets/images';
import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../../../../utils/constanta';
import { dummyDataTransportPromo } from '../../../../../utils/StaticDatabase';
import { Button} from '../../../../../components';

export default ConfirmTransportOrder = ({ navigation, route }) => {
    const {pickUp, destination}= route.params;
    const [transportType, setTransportType]=useState('Motor');
    const [promoList, setPromoList]=useState([]);
    const [sheetContent, setSheetContent]= useState([]);
    const [SelectedPaymentMethod,  setSelectedPaymentMethod] = useState('Bayar'); 
    const [SelectedDiscount,  setSelectedDiscount] = useState();
    const sheetRef =  useRef();
    const snapPoints = useMemo(() => ["1","75%"], []);

    //Inisiasi dummy data
    const getData = ()=>{
        setPromoList(dummyDataTransportPromo);
    }

    //membuka bottom sheet
    const handleSnapPress = useCallback((index, sheetContent) => {
        setSheetContent(sheetContent);
        sheetRef.current?.snapToIndex(index);
    }, []);

    //menutup bottom sheet
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
    

    //tampilan item payment method
    const PaymentMethodItem = ({navigation, label, icon})=>{
        return(
          <TouchableOpacity 
            onPress={()=>{
                setSelectedPaymentMethod(label);
                handleClosePress();
            }} 
            style={{flexDirection:'row',alignItems:'center',marginRight:15, justifyContent:'center', width:SIZES.width-30, borderBottomWidth:label=='OVO Cash'?4:0, borderBottomColor:label=='Tunai'?ColorPrimary:'#DDDDDD'}}>
                  <Image source={icon} style={{marginRight:10, width:25, height:20}} resizeMode='stretch' />
                  <View style={{display:'flex', flexDirection:'row', flex:5, justifyContent:'space-between', paddingVertical:25, alignItems:'center', borderBottomWidth:label=='OVO Cash'?0:2, borderBottomColor:label=='Tunai'?ColorPrimary:'#DDDDDD'}}>
                    <Text style={{ fontSize:14, color:TextColor}}>{label}</Text>
                    {label == SelectedPaymentMethod?
                        <Icon           
                            name='check-circle-outline'            
                            size={25}
                            color={ColorSecondary}
                        />
                    :
                        <Icon           
                            name='plus-circle'            
                            size={25}
                            color={ColorSecondary}
                        />
                    }
                    
                  </View>
          </TouchableOpacity>
        );
    }
    
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
                      <TouchableOpacity 
                        onPress={()=>{
                            setSelectedDiscount(item.value);
                            handleClosePress();
                        }}
                        style={{padding:5, paddingHorizontal:15, borderWidth:1, borderColor:ColorSecondary, borderRadius:12}}>
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

    //output tampilan halaman ConfirmTransportOrder
    return(
            <ImageBackground source={mapsView} resizeMode='cover' style={{flex:1}}>
                <View style={{ flexDirection:'row', backgroundColor:ColorPrimary, width:40, height:40, justifyContent:'center', borderRadius:20, alignItems:'center', margin:15, marginTop:25, marginBottom:0, shadowColor:'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2}, shadowRadius: 10, elevation: 3}}>
                    <Icon             
                        name='arrow-left'            
                        size={30}
                        color={ColorSecondary   }
                        onPress={()=>navigation.goBack()}
                    />
                </View>

                <View style={{alignItems:'center', width:SIZES.width}}>
                    <View style={{width:SIZES.width*0.75, flexDirection:'row', height:150, backgroundColor:ColorPrimary, borderRadius:15, borderWidth:2, borderColor:'#BDBDBD'}}>
                        <View style={{justifyContent:'space-between',width:SIZES.width*0.6,  paddingVertical:10}}>
                            <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                <Image source={location1} style={{height:30, width:30}}/>
                                <Text numberOfLines={1} style={{color:TextColor, marginLeft:10}}>{pickUp.address}</Text>
                            </View>
                            <TouchableOpacity onPress={()=>navigation.navigate('AddDestination')} style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                                <Image source={location3} style={{height:30, width:30}}/>
                                <Text numberOfLines={1} style={{color:TextColor, marginLeft:10}}>{destination.address}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{backgroundColor:ColorPrimary, width:SIZES.width-30, height:460, paddingBottom:150, borderTopRightRadius:15, borderTopLeftRadius:15, position:'absolute', bottom:0, left:15}}>
                    <View style={{width:40, backgroundColor:'#bdbdbd',alignSelf:'center', marginTop:10, borderRadius:10, height:5}}/>
                    <Text  style={{color:TextColor, marginHorizontal:15, marginTop:15, marginBottom:5, fontSize:16}}>Pilih Kendaraan</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity onPress={()=>setTransportType('Motor')} style={{width:SIZES.width-60, alignItems:'center', flexDirection:'row', borderColor:transportType=='Motor'?ColorSecondary:'#bdbdbd', borderWidth:1, borderRadius:15, padding:13, marginHorizontal:15, marginTop:10}}>
                        <Image source={motor} style={{width:35, height:35}}/>
                        <View style={{marginHorizontal:15}}>
                            <Text style={{color:TextColor, fontSize:14}}>Motor</Text>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image source={popPerson} style={{width:12, margin:5, height:12}}/>
                                <Text style={{color:'#bdbdbd',fontSize:12}}>1</Text>
                            </View>
                        </View>
                        <View style={{marginLeft:'auto'}}>
                            {SelectedDiscount?
                            <View>
                                <Text  style={{color:'#bdbdbd',textDecorationLine:'line-through', fontSize:14}}>Rp. 10000</Text>
                                <Text style={{color:TextColor, fontSize:14}}>Rp. {10000-SelectedDiscount}</Text>
                            </View>
                            :
                            <Text  style={{color:TextColor, fontSize:14}}>Rp. 10000</Text>
                            }
                            
                        </View> 
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>setTransportType('Mobil1')} style={{width:SIZES.width-60, alignItems:'center', flexDirection:'row', borderColor:transportType=='Mobil1'?ColorSecondary:'#bdbdbd', borderWidth:1, borderRadius:15, padding:13, marginHorizontal:15, marginTop:10}}>
                        <Image source={mobil} style={{width:35, height:35}}/>
                        <View style={{marginHorizontal:15}}>
                            <Text style={{color:TextColor, fontSize:14}}>Mobil</Text>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image source={popPerson} style={{width:12, margin:5, height:12}}/>
                                <Text style={{color:'#bdbdbd',fontSize:12}}>4</Text>
                            </View>
                        </View>
                        <View style={{marginLeft:'auto'}}>
                            <Text style={{color:TextColor, fontSize:14}}>Rp. 20000</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>setTransportType('Mobil2')} style={{width:SIZES.width-60, alignItems:'center', flexDirection:'row', borderColor:transportType=='Mobil2'?ColorSecondary:'#bdbdbd', borderWidth:1, borderRadius:15, padding:13, marginHorizontal:15, marginTop:10}}>
                        <Image source={mobil} style={{width:35, height:35}}/>
                        <View style={{marginHorizontal:15}}>
                            <Text style={{color:TextColor, fontSize:14}}>Mobil</Text>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image source={popPerson} style={{width:12, margin:5, height:12}}/>
                                <Text style={{color:'#bdbdbd',fontSize:12}}>7</Text>
                            </View>
                        </View>
                        <View style={{marginLeft:'auto'}}>
                            <Text style={{color:TextColor, fontSize:14}}>Rp. 30000</Text>
                        </View>
                    </TouchableOpacity>
                    </ScrollView>
                </View>

                <View style={{backgroundColor:ColorPrimary, width:SIZES.width, height:150, borderTopWidth:1, borderTopColor:'#bdbdbd', borderTopRightRadius:25, borderTopLeftRadius:25, position:'absolute', bottom:0, left:0, shadowColor:'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2}, shadowRadius: 10, elevation: 3}}>
                    <View style={{flexDirection:'row', paddingHorizontal:15, marginBottom:20}}>
                        <TouchableOpacity onPress={() => handleSnapPress(1, "Metode Pembayaran")} style={{flexDirection:'row', width:SIZES.width/2-15, alignItems:'center', justifyContent:'center',paddingVertical:10, borderRightColor:'#BDBDBD', borderRightWidth:2, marginTop:15,}}>
                            <Text style={{color:TextColor, fontSize:16, marginRight:15}}>{SelectedPaymentMethod}</Text>
                            <Icon name="chevron-right" color={TextColor} size={25}/>
                        </TouchableOpacity>
                        <View style={{width:SIZES.width/2-15, alignItems:'center', justifyContent:'center', marginTop:15,}} >
                            <TouchableOpacity onPress={() => handleSnapPress(1, "Promo")} style={{flexDirection:'row', justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:ColorSecondary, borderRadius:10, paddingHorizontal:20, paddingVertical:5}}>
                                
                                {SelectedDiscount?<Icon name='check-decagram' size={20} color={ColorSecondary}/>:<Image source={circumIcon} style={{width:20, tintColor:ColorSecondary, height:20}}/>}
                                <Text  style={{color:setSelectedDiscount?TextColor:ColorSecondary, marginLeft:5, fontSize:16}}>{!SelectedDiscount?'Promo':`Diskon ${SelectedDiscount}`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Button label="Pesan Sekarang" action={()=>navigation.navigate('DetailTransactionTransport')}/>
                </View>

                <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                index={0}
                backdropComponent={renderBackdrop}
                >
                {sheetContent=="Promo"?
                 <View style={{paddingHorizontal:15, marginBottom:10, marginTop:20}}>
                        < Text style={{color:TextColor, marginRight:15, marginLeft:30, marginBottom:20, fontWeight:'bold', fontSize:14 }}>Voucher {sheetContent}</Text>
                    
                        <View style={{flexDirection:'row', marginBottom:10, height:50, marginHorizontal:15, borderWidth:1, borderRadius:15}}>
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
                </View>
                :null}
           
                <BottomSheetScrollView style={{flex:1,borderTopRightRadius:50, borderTopLeftRadius:50}}>
                        {sheetContent=="Metode Pembayaran"?
                         <View style={{padding:15, marginTop:20}}>
                            <View style={{borderBottomColor:'#DDDDDD', borderBottomWidth:1}}>
                                <Text style={{color:TextColor, marginRight:15, marginLeft:30, marginBottom:20, fontWeight:'bold', fontSize:14 }}>{sheetContent}</Text>
                            </View>
                            <View>
                                <PaymentMethodItem  label="Kartu kredit atau debit" icon={cardIcon}/>
                                <PaymentMethodItem  label="Link Aja" icon={linkAjaLogo}/>
                                <PaymentMethodItem  label="OVO Cash" icon={ovoLogo}/>
                                <PaymentMethodItem  label="Tunai" icon={cashIcon}/>
                            </View>
                            </View>
                        :
                            <View style={{width:SIZES.width, flex:1, alignItems:'center'}}>
                                {/* menampilkan daftar promo */}
                                {promoList.map((item) => PromoItem(item))}
                            </View>
                        }
                        
                   
                </BottomSheetScrollView>
            </BottomSheet>

               
               
            </ImageBackground>
    );
}