import React, {useState, useEffect} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, FlatList, ScrollView  } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../../../../utils/constanta';


export default Medicine = ({ navigation, route}) => {
    const {medicine} = route.params;
    const [cart,setCart] = useState(0);
    const [keyword, setKeyword] = useState('');

    //menambahkan ke keranjang
    const addToCart =()=>{
        setCart(cart+1)
    }

    //mengeluarkan dari keranjang
    const takeOutFromCart =()=>{
        setCart(cart-1)
    }

    //output tampilan halaman medicine
    return(
        <View style={{flex:1, backgroundColor:ColorPrimary}}>
            
                <View style={{ flexDirection:'row', alignItems:'center', margin:15}}>
                    <View style={{marginBottom:10, backgroundColor:ColorPrimary, padding:3, borderRadius:20}}  >
                        <Icon           
                            name='arrow-left'            
                            size={28}
                            color={TextColor}
                            onPress={()=>navigation.goBack()}
                        />
                    </View>
            
                    <TextInput
                        theme={{ roundness: 10 }}
                        style={{backgroundColor:'white', margin:10, borderColor:'#D9D9D9', borderWidth:2, height:40, flex:1, borderRadius:10}}
                        placeholder='Cari obat apa?'
                        placeholderTextColor="#BDBDBD"
                        value={keyword}
                        onChangeText={(text)=>setKeyword(text)}
                        left={ <TextInput.Icon color="#8C8C8C" icon="search" size={20} /> }
                    />

                    <View style={{backgroundColor:ColorPrimary, padding:3, borderRadius:20}}  >
                        <Icon            
                            name='share-variant-outline'            
                            size={28}
                            color={TextColor}
                        />
                    </View>
                </View>

                <View style={{width:SIZES.width-30, marginHorizontal:15 , marginVertical:5, borderBottomWidth:3, borderBottomColor:'#DDDDDD', paddingBottom:10}}>
                    
                    <Image source={medicine.picture} imageStyle={{ borderRadius: 15}} style={{ marginTop:5, alignSelf:'center', width:SIZES.width/2, height:SIZES.width/2}} resizeMode='stretch'/>
                    
                    <View style={{height:70, justifyContent:'space-around', marginTop:'auto'}}>
                        <Text style={{color:TextColor,fontWeight:'bold', fontSize:16}}>{medicine.name}</Text>
                        <View style={{flexDirection:'row', height:40, alignItems:'center'}}>
                            <Text style={{color:TextColor,fontWeight:'bold', fontSize:16}}>Rp. {medicine.price}<Text style={{color:'#DDDDDD'}}> / {medicine.package}</Text></Text>
                            {cart>0?
                                 //tampilan ketika isi cart > 0
                                 <View style={{marginLeft:'auto', justifyContent:'space-between',alignItems:'center', flexDirection:'row'}}>
                                    <View style={{padding:2, borderRadius:20, borderWidth:2, borderColor:ColorSecondary}}>
                                        <Icon         
                                                name='minus'            
                                                size={16}
                                                color={ColorSecondary}
                                                onPress={()=>takeOutFromCart()}
                                            />
                                    </View>
                                    <Text style={{color:TextColor, marginHorizontal:25}}>{cart}</Text>
                                    <View style={{padding:3, borderRadius:20, borderWidth:2, borderColor:ColorSecondary}}>
                                        <Icon         
                                                name='plus'            
                                                size={16}
                                                color={ColorSecondary}
                                                onPress={()=>addToCart()}
                                            />
                                    </View>
                                </View>
                            :
                                //tampilan ketika isi cart == 0
                                <TouchableOpacity onPress={()=>addToCart()} style={{borderWidth:2, marginLeft:'auto', borderColor:ColorSecondary, borderRadius:15, paddingHorizontal:30, paddingVertical:4}}>
                                    <Text style={{color:ColorSecondary, fontWeight:'bold'}}>Tambah</Text>
                                </TouchableOpacity>
                            }
                            
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <View style={{marginHorizontal:15, marginTop:10, borderBottomWidth:1, borderBottomColor:'#DDDDDD', paddingBottom:10}}>
                        <Text style={{color:TextColor, fontSize:15, marginBottom:5, fontWeight:'bold'}}>Deskripsi</Text>
                        <Text style={{color:TextColor}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget nunc eget tellus hendrerit maximus. Morbi non venenatis mi, non vehicula erat. Donec maximus nec felis non pharetra. Proin rutrum orci ligula, nec tristique nisi accumsan in. Ut fringilla urna sit amet vestibulum dignissim. Cras sed lorem sed elit porttitor tempus. Sed accumsan mauris ut elit vulputate iaculis. Aenean eget ultricies ex. Mauris augue nibh, placerat nec mi nec, dignissim luctus nibh. Morbi ullamcorper in nisi vitae vestibulum. Fusce mauris libero, porttitor nec suscipit sit amet, pretium eget nisl. </Text>
                    </View>
                    <View style={{marginHorizontal:15, marginTop:10, borderBottomWidth:1, borderBottomColor:'#DDDDDD', paddingBottom:10}}>
                        <Text style={{color:TextColor, fontSize:15,marginBottom:5, fontWeight:'bold'}}>Komposisi</Text>
                        <Text style={{color:TextColor}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    </View>
                    <View style={{marginHorizontal:15, marginTop:10, borderBottomWidth:1, borderBottomColor:'#DDDDDD', paddingBottom:10}}>
                        <Text style={{color:TextColor, fontSize:15, marginBottom:5, fontWeight:'bold'}}>Indikasi</Text>
                        <Text style={{color:TextColor}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    </View>
                    <View style={{marginHorizontal:15, marginTop:10, borderBottomWidth:1, borderBottomColor:'#DDDDDD', paddingBottom:10}}>
                        <Text style={{color:TextColor, fontSize:15,marginBottom:5, fontWeight:'bold'}}>Dosis</Text>
                        <Text style={{color:TextColor}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                    </View>
                </ScrollView>

                {cart>0?
                    //menampilkan tombol ketika cart > 0
                    //redirect ke halaman ConfirmPharmOrder ketika tombol diklik
                    <TouchableOpacity  
                        onPress={()=>navigation.navigate('ConfirmPharmOrder',{cart, medicine})}
                        style={{position:'absolute', flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderRadius:15, backgroundColor:ColorSecondary, width:SIZES.width-30, height:50, bottom:20, left:15}}>
                        <Text style={{marginLeft:15, color:ColorPrimary, fontSize:16}} >{cart} Pesanan</Text>
                        <Text style={{marginRight:15, color:ColorPrimary, fontSize:16}}>{medicine.price*cart}</Text>
                    </TouchableOpacity>
                :null
                }
                

           
        </View>
    );
}