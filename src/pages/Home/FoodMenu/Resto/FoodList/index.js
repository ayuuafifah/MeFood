import React, {useState,useRef, useMemo, useCallback, useEffect} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView } from "@gorhom/bottom-sheet";

import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../../../../utils/constanta';
import { dummyDataFoodPromo, dummyDataResto, dummyDataVoucherPromo } from '../../../../../utils/StaticDatabase';
import { DropdownPromo } from '../../../../../components';


export default FoodList= ({ navigation, route}) => {
    const {resto} = route.params;
    const [foodList, setFoodList] = useState();
    const [cart, setCart] = useState(new Map());
    const [totalPrice, setTotalPrice]=useState(0);
    const [totalQuantity, setTotalQuantity]=useState(0);
    const [keyword, setKeyword] = useState();
    const [promoList, setPromoList]=useState([]);
    const [sheetContent, setSheetContent]= useState([]);
    const sheetRef =  useRef();
    const snapPoints = useMemo(() => ["1","65%" ], []);

    //Inisiasi data dummy
    const getData = ()=>{
        setPromoList(dummyDataFoodPromo);
        setFoodList(resto['foods']);
    }

    //Menampilkan bottom sheet ketika promo diklik
    const handleSnapPress = useCallback((index, sheetContent) => {
        setSheetContent(sheetContent);
        sheetRef.current?.snapToIndex(index);
    }, []);

    //Menutup bottom sheet ketika tombol pakai pada promo diklik
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


//Menghitung dan menyimpan total harga dan quantity yang ada di cart
  const setTotal = () => {
    let quantity = 0;
    let price =0;

    cart.forEach((value)=>{
        quantity+=value.get('quantity');
        price+= value.get('quantity')*value.get('price');
    });

    setTotalPrice(price);
    setTotalQuantity(quantity);
  }

  //Menambahkan makanan ke cart
  const addToCart=(item)=>{
        const items = cart;

        if (items.get(item.id) === undefined){
            const food = new Map(Object.entries(item));
            food.set('quantity', 1);
            items.set(item.id, food);
        }else{
            const food = items.get(item.id);
            food.set('quantity', food.get('quantity')+1);
            items.set(item.id, food);
        }
       
        setCart(items);
        setTotal();
  }

  //Mengeluarkan makanan dari cart
  const takeOutFromCart=(item)=>{
        const items = cart;
        const food = items.get(item.id);

        if (food.get('quantity') > 1){
            food.set('quantity', food.get('quantity')-1);
        }else{
            items.delete(item.id);
        }
    
        setCart(items);
        setTotal();
    }

    //menambahkan makanan ke favorite
    const addToFavorite=(index)=>{
        let foods = foodList;
        foods[index].isFavorite = !foods[index].isFavorite;
        setFoodList(foods); 
        navigation.navigate('FoodList', {resto:resto});
    }

    //tampilan item2 makanan
  const FoodItem = (item, index)=>{
    return(
        keyword =='' || keyword == null || item.name.toLowerCase().includes(keyword.toLowerCase()) ?
        <View style={{width:SIZES.width/2-25, marginTop:25, height:SIZES.width/2+75, marginBottom:cart.size>0 && index == foodList.length-1? 70:0}}>
            <ImageBackground source={item.picture} imageStyle={{ borderRadius: 15}} style={{width:SIZES.width/2-25, height:SIZES.width/2-25}} resizeMode='stretch'>
                <TouchableOpacity onPress={()=>addToFavorite(index)} style={{backgroundColor:ColorPrimary, padding:3, borderRadius:15, margin:5, marginLeft:'auto'}}>
                    <Icon         
                        name={item.isFavorite?'heart':'heart-outline'}            
                        size={20}
                        color={item.isFavorite?'red':'black'} 
                    />
                </TouchableOpacity>
            </ImageBackground>
            <Text style={{color:TextColor,fontWeight:'bold', fontSize:16}}>{item.name}</Text>
            <Text style={{color:TextColor,fontWeight:'bold', fontSize:16}}>{item.price}</Text>
            {cart.get(item.id)!=undefined?
                <View style={{padding:4, paddingHorizontal:15, marginTop:'auto', justifyContent:'space-around', borderRadius:15, alignItems:'center', flexDirection:'row'}}>
                    <View style={{padding:5, borderRadius:20, borderWidth:2, borderColor:ColorSecondary}}>
                        <Icon         
                                name='minus'            
                                size={15}
                                color={ColorSecondary}
                                onPress={()=>takeOutFromCart(item)}
                            />
                    </View>
                    <Text style={{color:TextColor}}>{cart.get(item.id).get('quantity')}</Text>
                    <View style={{padding:5, borderRadius:20, borderWidth:2, borderColor:ColorSecondary}}>
                        <Icon         
                                name='plus'            
                                size={15}
                                color={ColorSecondary}
                                onPress={()=>addToCart(item)}
                            />
                    </View>
                </View>
            :
            <TouchableOpacity onPress={()=>addToCart(item)} style={{borderWidth:2, borderColor:ColorSecondary, padding:4, marginTop:'auto', borderRadius:15, alignItems:'center'}}>
            <Text style={{color:ColorSecondary, fontSize:16}}>Tambah</Text>
            </TouchableOpacity>
            }
           
        </View>:null
        );
    }

    //tampilan item2 promo
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
    });

    
    //output tampilan halaman FoodList
    return(
        <View style={{flex:1,backgroundColor:ColorPrimary}}>
            
            <View style={{ flexDirection:'row', alignItems:'center', margin:15}}>
                <Icon 
                    style={{marginBottom:15}}            
                    name='arrow-left'            
                    size={30}
                    color={TextColor}
                    onPress={()=>navigation.goBack()}
                />
                <TextInput
                  theme={{ roundness: 10 }}
                  style={{backgroundColor:'white', margin:10, borderColor:'#D9D9D9', borderWidth:2, height:40, flex:1, borderRadius:10}}
                  placeholder='Mau makan apa?'
                  placeholderTextColor="#BDBDBD"
                  value={keyword}
                  onChangeText={text => setKeyword(text)}
                  left={ <TextInput.Icon color="#8C8C8C" icon="search" size={20} /> }
                />
                <Icon            
                    name='share-variant-outline'            
                    size={30}
                    color={TextColor}
                />
            </View>

            <View style={{marginHorizontal:15, alignItems:'center', flexDirection:'row'}}>
                <Image source={resto['restoPicture']} style={{borderRadius:15, width:100, height:100}} resizeMode='stretch'/>
                <View style={{overflow:'hidden', marginHorizontal:5, paddingLeft:5}}> 
                    <Text style={{color:TextColor, fontWeight:'bold', fontSize:16}}>{resto['restoName']}</Text>
                    <Text style={{color:TextColor, marginVertical:3, fontSize:14}}>{resto['category']}</Text>
                    <View style={{flexDirection:'row', alignItems:'baseline'}}>
                        <Icon name='star' size={18} color="#F2C94C"/>
                        <Text style={{color:TextColor, fontSize:14, marginLeft:5}}>{resto['restoRating']}</Text> 
                        <View style={{backgroundColor:"#D9D9D9", borderRadius:5, margin:7, width:7, height:7}} />
                        <Text style={{color:TextColor, fontSize:14}}>{resto['distance']>=100? resto['distance']/1000 :resto['distance']} {resto['distance']>=100? "km":"m"}</Text>
                        <View style={{backgroundColor:"#D9D9D9", borderRadius:5, margin:7, width:7, height:7}} />
                        <Text style={{color:TextColor, fontSize:14}}>{resto['orderTimeEstimation']}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity onPress={() => handleSnapPress(1, "Promo")} style={{ margin:15, marginVertical:25}}>
                <DropdownPromo/>
            </TouchableOpacity> 
            
            <Text style={{marginLeft:15, color:TextColor, fontSize:16, fontWeight:'bold'}}>
                Menu
            </Text>
            {foodList?
                //tampilan ketika foodList != null
                <View style={{flex:1}}>
                    {/* menampilkan daftar makanan */}
                    <FlatList
                    style={{marginHorizontal:15, marginBottom:15}}
                    columnWrapperStyle={{justifyContent:'space-between'}}
                    numColumns={2}
                    keyExtractor={(item, index) => item.id }
                    data={foodList}
                    renderItem={({item, index}) => FoodItem(item, index) }
                    showsVerticalScrollIndicator={false}
                    />
                </View>   
            :
                //tampilan ketika foodList == null
                <View style={{flex:1, alignItems:'center', marginTop:"35%"}}>
                    <Icon name="food-off-outline" color="#BDBDBD" size={SIZES.width/4}/>
                    <Text style={{color:TextColor, fontSize:14, margin:10}}>Makanan tidak ditemukan</Text> 
                </View>
            } 

            {cart.size>0?
                //Tampilan ketika terdapat makanan yang dimasukan ke cart
                <TouchableOpacity  
                  // redirect ke halaman ConfirmFoodOrder saat tombol diklik
                  onPress={()=>navigation.navigate('ConfirmFoodOrder',{cart, resto})}
                  style={{position:'absolute', flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderRadius:15, backgroundColor:ColorSecondary, width:SIZES.width-30, height:50, bottom:20, left:15}}>
                    <Text style={{marginLeft:15, color:ColorPrimary, fontSize:16}} >{totalQuantity} Pesanan</Text>
                    <Text style={{marginRight:15, color:ColorPrimary, fontSize:16}}>{totalPrice}</Text>
                </TouchableOpacity>
            :null
            }


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
                    <View style={{width:SIZES.width, flex:1, alignItems:'center'}}>
                        {promoList.map((item) => PromoItem(item))}
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    );
}