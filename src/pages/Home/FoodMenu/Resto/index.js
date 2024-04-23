import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView  } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { PromoHeader } from '../../../../components';
import { dummyDataResto } from '../../../../utils/StaticDatabase';
import {circumIcon, eatingBanner} from '../../../../assets/images';
import SIZES, { ColorPrimary, TextColor } from '../../../../utils/constanta';

export default Resto = ({ navigation, route}) => {
    const {title, message} = route.params;
    const [restoList, setRestoList] = useState();
  
  //Inisiasi data dummy
  const getData = ()=>{
      setRestoList(dummyDataResto);
  }

  //tampilan item2 resto
  const RestoItem = (item)=>{
    return(
        <TouchableOpacity onPress={()=>navigation.navigate('FoodList', {resto:item})} style={{margin:5, marginLeft:25, marginHorizontal:15}}>
            <View style={{width:SIZES.width-30, display:'flex', flexDirection:'row', alignItems:'center'}}>
                <Image source={item.restoPicture} style={{width:95, height:95, borderRadius:15}} resizeMode='contain' />
                <View style={{overflow:'hidden', marginHorizontal:5, height:110, paddingLeft:5}}> 
                    <Text style={{color:TextColor, fontSize:18}}>{item.restoName}</Text>
                    <Text style={{color:TextColor, marginVertical:3, fontSize:14}}>{item.category}</Text>
                    <View style={{flexDirection:'row', alignItems:'baseline'}}>
                        <Icon name='star' size={18} color="#F2C94C"/>
                        <Text style={{color:TextColor, fontSize:14, marginLeft:5}}>{item.restoRating}</Text> 
                        <View style={{backgroundColor:"#D9D9D9", borderRadius:5, margin:7, width:7, height:7}} />
                        <Text style={{color:TextColor, fontSize:14}}>{item.distance>=100? item.distance/1000 :item.distance} {item.distance>=100? "km":"m"}</Text>
                        <View style={{backgroundColor:"#D9D9D9", borderRadius:5, margin:7, width:7, height:7}} />
                        <Text style={{color:TextColor, fontSize:14}}>{item.orderTimeEstimation}</Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {/* menampilkan daftar diskon */}
                            {item.restoDiscounts.map((dsc)=>{
                                return(
                                    <View style={{flexDirection:'row', marginBottom:'auto', marginLeft:5, padding:3, backgroundColor:'rgba(255,0,0,0.09)', borderWidth:1, borderColor:'#FF0000', borderRadius:5}}>
                                        <Image source={circumIcon} style={{width:20, height:20}}/>
                                        <Text style={{color:TextColor, marginLeft:2}}>{dsc.discount}</Text>
                                    </View>
                                );
                            })}
                    </ScrollView>
                </View>
            </View>
        </TouchableOpacity>
        );
    }

    useEffect(() => {
        getData();
    },[]);

    
    //Output tampilan halaman resto
    return(
        <View style={{flex:1,backgroundColor:ColorPrimary}}>
            
            { title == 'Promo'?
                //Tampilan header ketika title == 'promo'
                <PromoHeader navigation={navigation}/>
            :   
                //Tampilan header ketika title != 'promo'
                <View>
                    <View style={{width:SIZES.width, padding:20, alignItems:'center'}}>
                        <Image source={eatingBanner} style={{width:SIZES.width*0.7, height:180}} resizeMode='stretch' />
                        
                    </View>

                    <View style={{position:'absolute', top:15, left:15}}>
                        <Icon            
                            name='arrow-left'            
                            size={30}
                            color={TextColor}
                            onPress={()=>navigation.goBack()}
                        />
                    </View>

                    <View style={{paddingHorizontal:15}}>
                        <Text style={{fontSize:18, fontWeight:'bold', color:TextColor}}>{title}</Text>
                        <Text style={{color:'rgba(0,0,0,0.8)'}}>{message}</Text>
                    </View>

                    <View style={{marginVertical:15}}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{paddingLeft:15}}>
                            <TouchableOpacity style={{padding:5, paddingHorizontal:7, marginRight:5, borderColor:'DDDDDD', justifyContent:'center', borderWidth:1, borderRadius:20}}>
                                <Icon name="filter-variant" color={TextColor} size={20} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:5, paddingHorizontal:7, marginRight:5, justifyContent:'center', borderColor:'DDDDDD', borderWidth:1, borderRadius:20}}>
                                <Text style={{color:TextColor}}>Terdekat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:5, paddingHorizontal:7, marginRight:5, justifyContent:'center', borderColor:'DDDDDD', borderWidth:1, borderRadius:20}}>
                                <Text style={{color:TextColor}}>Bintang 4+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:5, paddingHorizontal:7, marginRight:5, justifyContent:'center', borderColor:'DDDDDD', borderWidth:1, borderRadius:20}}>
                                <Text style={{color:TextColor}}>Rentang Harga</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:5, paddingHorizontal:7, marginRight:5, justifyContent:'center', borderColor:'DDDDDD', borderWidth:1, borderRadius:20}}>
                                <Text style={{color:TextColor}}>Jenis Makanan</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            }

            {restoList?
                //Tampilan ketika restoList != null
                <View style={{flex:1}}>
                    {/* //menampilkan daftar resto berdasarkan filter menu yang dipilih sebelumnya */}
                    <FlatList
                    data={title =="Terdekat" ?restoList.sort((a, b) => a.distance - b.distance) :
                            title =="Promo"? restoList.filter((item)=> item.restoDiscounts.length>0).sort((a, b) => b.restoDiscounts.length - a.restoDiscounts.length):
                                title == "Terlaris"? restoList.sort((a, b) => b.quantitySold - a.quantitySold):
                                    title == "Buka 24 Jam"? restoList.filter((item)=>{return item.isAlwaysOpen == true}):
                                        restoList
                    }
                    keyExtractor={(item, index) => item.id }
                    renderItem={({item}) => RestoItem(item) }
                    />
                </View>   
            :
                //Tampilan ketika restoList == null
                <View style={{flex:1, alignItems:'center', marginTop:"35%"}}>
                    <Icon name="food-off-outline" color="#BDBDBD" size={SIZES.width/4}/>
                    <Text style={{color:TextColor, fontSize:14, margin:10}}>Makanan tidak ditemukan</Text> 
                </View>
            } 
        </View>
    );
}