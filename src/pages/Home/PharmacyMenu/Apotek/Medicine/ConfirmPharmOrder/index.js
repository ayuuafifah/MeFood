import React, {useEffect,useCallback, useMemo, useRef, useState} from 'react';
import { View, Text,  TouchableOpacity, Image, FlatList, ScrollView  } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";
import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { cardIcon, cashIcon, linkAjaLogo, ovoLogo} from '../../../../../../assets/images';
import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../../../../../utils/constanta';
import { dummyDataPharmPromo} from '../../../../../../utils/StaticDatabase';
import { DropdownAddress, DropdownPromo, HeaderBar, PrintDetail, DropdownPaymentMethode } from '../../../../../../components';

export default ConfirmPharmOrder= ({ navigation, route}) => {
    let {cart, medicine} = route.params;
    const [detail, setDetail] = useState([{Harga:0, Ongkir:0, Biaya_layanan:0, Diskon:0}]);
    const [note, setNote] = useState('');
    const [promoList, setPromoList]=useState();
    const [sheetContent, setSheetContent]= useState([]);
    const [SelectedPaymentMethod,  setSelectedPaymentMethod] = useState('Tunai');
    const sheetRef =  useRef();
    const snapPoints = useMemo(() => ["1","75%"], []);
    
    //inisiasi data dummy
    const getData = ()=>{
        let x = [ { Harga:medicine.price*cart, Ongkir:5000, Biaya_layanan:2000, Diskon:5000 },];
        setDetail(x);
        setPromoList(dummyDataPharmPromo);
    }

    // membuka bottom sheet
    const handleSnapPress = useCallback((index, sheetContent) => {
        setSheetContent(sheetContent);
        sheetRef.current?.snapToIndex(index);
    }, []);

     // menutup bottom sheet
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);
    
    //menambah quantitas obat ke cart
    const plusQuantity = ()=>{
        cart = cart+1;
        navigation.navigate('ConfirmPharmOrder',{cart:cart, medicine:medicine});
        getData();
    }

    //mengurangi quantitas obat ke cart
    const minusQuantity = ()=>{
        if(cart > 1){
            cart = cart-1;
            navigation.navigate('ConfirmPharmOrder',{cart:cart, medicine:medicine});
            getData();
        }else{
            navigation.goBack();
        }
        
    }

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
                      <TouchableOpacity onPress={()=>handleClosePress()} style={{padding:5, paddingHorizontal:15, borderWidth:1, borderColor:ColorSecondary, borderRadius:12}}>
                        <Text style={{color:ColorSecondary}}>Pakai</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
        );
    }


    //aksi ketika tompol pesan sekarang di klik
    const submitPressed = () => {
        let med = [];
        med.push({name:medicine.name, quantity:cart});

        //data transaksi
        let data = {orderId:"1234567890",
            processId:1, 
            price:detail[0].Harga, totalPrice: detail[0].Harga + detail[0].Ongkir + detail[0].Biaya_layanan - detail[0].Diskon, deliveryFee:detail[0].Ongkir, 
            serviceFee:detail[0].Biaya_layanan, 
            discount:detail[0].Diskon, 
            picture:medicine.picture, 
            time: '19.30', 
            createdAt:"1 Des 2023 10.00", 
            resto:medicine.name, 
            item: med
        }

        //redirect ke halaman DetailTransactionPharmacy
        navigation.navigate('DetailTransactionPharmacy', {transaction:data})
    }

    useEffect(() => {
        getData();
    },[]);

    
    //output tampilan halaman Confirm Pharm Order
    return(
        <ScrollView style={{backgroundColor:ColorPrimary}}>
             <HeaderBar navigation={navigation} headerText='Konfirmasi Pesanan' type={2}/>
             <TouchableOpacity onPress={()=>navigation.navigate('SelectAddress')}>
                <DropdownAddress/>
             </TouchableOpacity>
             
             <View  style={{borderBottomColor:'#DDDDDD', borderBottomWidth:1}}>
                    <View style={{ paddingVertical:10,  marginHorizontal:15}}>
                        <View>
                            <View style={{flexDirection:'row', alignItems:'center', paddingVertical:5}}>
                                <Image source={medicine.picture} style={{borderRadius:15, width:70, height:70}} resizeMode='stretch'/>
                                <Text numberOfLines={1} style={{color:TextColor, width:SIZES.width/2-20, marginLeft:10, fontSize:16, fontWeight:'bold'}}>{medicine.name}</Text>
                                <View style={{width:110, marginLeft:'auto', justifyContent:'space-around', alignItems:'center', flexDirection:'row'}}>
                                    <View style={{padding:5, borderRadius:20, borderWidth:2, borderColor:ColorSecondary}}>
                                        <Icon         
                                                name='minus'            
                                                size={15}
                                                color={ColorSecondary}
                                                onPress={()=>minusQuantity()}
                                            />
                                    </View>
                                    <Text style={{color:TextColor}}>{cart}</Text>
                                    <View style={{padding:5, borderRadius:20, borderWidth:2, borderColor:ColorSecondary}}>
                                        <Icon         
                                                name='plus'            
                                                size={15}
                                                color={ColorSecondary}
                                                onPress={()=>plusQuantity()}
                                            />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

            </View>

            <TouchableOpacity onPress={() => handleSnapPress(1, "Promo")} style={{ marginHorizontal:15, paddingVertical:15, borderBottomColor:'#DDDDDD', borderBottomWidth:2}}>
                <DropdownPromo/>
            </TouchableOpacity> 

            <TouchableOpacity onPress={() => handleSnapPress(1, "Metode Pembayaran")} style={{ marginHorizontal:15, paddingVertical:15, borderBottomColor:'#DDDDDD', borderBottomWidth:1}}>
                <DropdownPaymentMethode/>
            </TouchableOpacity>   

            <PrintDetail items={detail}/>
            <PrintDetail items={[{Total:detail[0].Harga + detail[0].Ongkir + detail[0].Biaya_layanan - detail[0].Diskon }]} fontWeigh="bold" paddingVertical={20} borderWidth={2}/>

           <View style={{marginTop:25}}>
           <Button action={()=>submitPressed()} label="Pesan Sekarang"/>
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
                        :sheetContent=="Promo"?
                            <View style={{width:SIZES.width, flex:1, alignItems:'center'}}>
                                {/* menampilkan daftar promo */}
                                {promoList.map((item) => PromoItem(item))}
                            </View>
                            :
                            <View style={{padding:15, marginTop:20}}>
                                <View style={{borderBottomColor:'#DDDDDD', borderBottomWidth:1}}>
                                    <Text style={{color:TextColor, marginRight:15, marginLeft:30, marginBottom:20, fontWeight:'bold', fontSize:14 }}>{sheetContent}</Text>
                                </View>
                                <TextInput  
                                    style={{backgroundColor:ColorPrimary}}
                                    multiline = {true}
                                    numberOfLines = {6}
                                    placeholder='Tambahkan catatan disini'
                                    placeholderTextColor='#828282'
                                    value={note}
                                    onChange={(text)=>setNote(text)}
                                />
                                <TouchableOpacity onPress={handleClosePress} style={{margin:15, marginLeft:'auto', borderColor:ColorSecondary, borderWidth:2, borderRadius:10, padding:6}}>
                                    <Text style={{color:ColorSecondary, fontWeight:'bold'}}>Simpan</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        
                   
                </BottomSheetScrollView>
            </BottomSheet>
            
        </ScrollView>
    );
}