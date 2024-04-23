import React, {useEffect,useCallback, useMemo, useRef, useState} from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView  } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { cardIcon, cashIcon, linkAjaLogo,  ovoLogo } from '../../../../../../assets/images';
import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../../../../../utils/constanta';
import {  dummyDataFoodPromo } from '../../../../../../utils/StaticDatabase';
import { DropdownAddress, DropdownPromo, HeaderBar, PrintDetail, DropdownPaymentMethode } from '../../../../../../components';


export default ConfirmFoodOrder= ({ navigation, route}) => {
    const {cart, resto} = route.params;
    const [detail, setDetail] = useState([{ Harga:0, Ongkir:0, Biaya_layanan:0, Diskon: 0 }]);
    const [note, setNote] = useState('');
    const [promoList, setPromoList]=useState();
    const [sheetContent, setSheetContent]= useState([]);
    const [selectedPaymentMethod,  setSelectedPaymentMethod] = useState('Tunai');
    const sheetRef =  useRef();
    const snapPoints = useMemo(() => ["1","65%" ], []);

    //Inisiasi data dummy
    const getData = ()=>{
        let price =0;
    
        cart.forEach(value => price+= value.get('quantity')*value.get('price'));

        let x = [ { Harga:price, Ongkir:10000, Biaya_layanan:2000, Diskon:2000 },];

        setDetail(x);
        setPromoList(dummyDataFoodPromo);
    }

    //Menampilkan bottom sheet ketika promo/payment method/catatan diklik
    const handleSnapPress = useCallback((index, sheetContent) => {
        setSheetContent(sheetContent);
        sheetRef.current?.snapToIndex(index);
    }, []);

    //Menutup bottom sheet setelah promo/payment method/catatan selesai dipilih
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);

     //tampilan backdrop bottomSheet
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
    
    
    //menambah quantity makanan
    const plusQuantity = (id)=>{
        const item = cart.get(id);
        console.log(cart.size);
        item.set('quantity', item.get('quantity')+1);
        cart.set(id, item);
        navigation.navigate('ConfirmFoodOrder',{cart, resto})
        getData()
    }

    //mengurangi quantity makanan
    const minusQuantity = (id)=>{
        const item = cart.get(id);
        if(item.get('quantity') > 1){
            item.set('quantity', item.get('quantity')-1);
            cart.set(id, item)
        }else{
            cart.delete(id);
        }

        if(cart.size > 0){
            navigation.navigate('ConfirmFoodOrder',{cart, resto});
            getData()
        }else{
            navigation.goBack();
        }
        
    }

 //tampilan item makanan
  const foodItem=(item)=>{
        return(
            <View>
                <View style={{flexDirection:'row', alignItems:'center', paddingVertical:5}}>
                    <Image source={item.get('picture')} style={{borderRadius:15, width:70, height:70}} resizeMode='stretch'/>
                    <Text numberOfLines={1} style={{color:TextColor, marginLeft:10, width:SIZES.width/2.3, fontSize:16, fontWeight:'bold'}}>{item.get('name')}</Text>
                    <View style={{width:110, marginLeft:'auto', justifyContent:'space-around', alignItems:'center', flexDirection:'row'}}>
                        <View style={{padding:5, borderRadius:20, borderWidth:2, borderColor:ColorSecondary}}>
                            <Icon         
                                    name='minus'            
                                    size={15}
                                    color={ColorSecondary}
                                    onPress={()=>minusQuantity(item.get('id'))}
                                />
                        </View>
                        <Text style={{color:TextColor}}>{item.get('quantity')}</Text>
                        <View style={{padding:5, borderRadius:20, borderWidth:2, borderColor:ColorSecondary}}>
                            <Icon         
                                    name='plus'            
                                    size={15}
                                    color={ColorSecondary}
                                    onPress={()=>plusQuantity(item.get('id'))}
                                />
                        </View>
                    </View>
                </View>
            </View>
        );
  }

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
                {label == selectedPaymentMethod?
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
 
    //aksi pemesanan ketikan tombol pesan sekarang diklik
    const submitPressed = () => {
        let foods = [];
        Array.from(cart.values()).map(item => {
            foods.push({name:item.get('name'), quantity:item.get('quantity')});
        });

        let data = {orderId:"1234567890",
            processId:1, 
            price:detail[0].Harga, totalPrice: detail[0].Harga + detail[0].Ongkir + detail[0].Biaya_layanan - detail[0].Diskon, deliveryFee:detail[0].Ongkir, 
            serviceFee:detail[0].Biaya_layanan, 
            discount:detail[0].Diskon, 
            picture:resto.restoPicture, 
            time: '19.30', 
            createdAt:"1 Des 2023 10.00", 
            resto:resto.restoName, 
            item: foods
        }
        
        //redirect ke halaman DetailTransactionFood
        navigation.navigate('DetailTransactionFood', {transaction:data})
    }

    useEffect(() => {
        getData();
    },[]);

    
    //Output tampilan halaman ConfirmFoodOrder
    return(
        <View style={{flex:1}}>
        <ScrollView style={{ backgroundColor:ColorPrimary}}>
             <HeaderBar navigation={navigation} headerText='Konfirmasi Pesanan' type={2}/>
             <TouchableOpacity onPress={()=>navigation.navigate('SelectAddress')}>
                <DropdownAddress/>
             </TouchableOpacity>
             
             <View  style={{borderBottomColor:'#DDDDDD', borderBottomWidth:1}}>
                    <View style={{ paddingVertical:10,  marginHorizontal:15}}>
                        {   
                            //menampilkan daftar makanan dalam keranjang
                            Array.from(cart.values()).map((item)=>foodItem(item))
                        }
                    </View>

                    <TouchableOpacity onPress={() => handleSnapPress(1, "Tambah Catatan")} style={{marginBottom:15, padding:5, paddingHorizontal:10, borderWidth:2, borderColor:ColorSecondary, borderRadius:15, marginLeft:15, marginRight:'auto'}}>
                        <Text style={{color:ColorSecondary}}>Catatan</Text>
                    </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => handleSnapPress(1, "Promo")} style={{ marginHorizontal:15, paddingVertical:15, borderBottomColor:'#DDDDDD', borderBottomWidth:2}}>
                <DropdownPromo/>
            </TouchableOpacity> 

            <TouchableOpacity onPress={() => handleSnapPress(1, "Metode Pembayaran")} style={{ marginHorizontal:15, paddingVertical:15, borderBottomColor:'#DDDDDD', borderBottomWidth:1}}>
                <DropdownPaymentMethode/>
            </TouchableOpacity>   

            <PrintDetail items={detail}/>
            <PrintDetail items={[{Total:detail[0].Harga + detail[0].Ongkir + detail[0].Biaya_layanan - detail[0].Diskon }]} fontWeigh="bold" borderWidth={1} paddingVertical={20}/>

           <View style={{marginTop:25}}>
           <Button action={()=>submitPressed()} label="Pesan Sekarang"/>
            </View> 
          
          
            
        </ScrollView>
        <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                index={0}
                backdropComponent={renderBackdrop}
                >
                {sheetContent=="Promo"?
                 <View style={{paddingHorizontal:15, marginTop:20}}>
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
        </View>
    );
}