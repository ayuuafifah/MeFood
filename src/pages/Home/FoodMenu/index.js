import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView  } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { foodIcon2,  nearbyIcon, nightIcon,  sampleBannerFood, samplePopularFood1, samplePopularFood2, samplePopularFood3, samplePopularFood4, voucherIcon, winnerIcon } from '../../../assets/images';
import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../../utils/constanta'; 
import { dummyDataResto } from '../../../utils/StaticDatabase';

export default FoodMenu = ({ navigation }) => {
    const [selectedAddress, setSelectedAddress] = useState("Jalan Diponegoro");
    const [popularFoodList, setPopularFoodList] = useState();
    const [keyword, setKeyword] = useState();

    //Inisiasi data dummy
    const getData = ()=>{

        let dummyDataPopularFood = [
            {banner: samplePopularFood1},
            {banner: samplePopularFood2},
            {banner: samplePopularFood3},
            {banner: samplePopularFood4},
        ];

        setPopularFoodList(dummyDataPopularFood);
    }

    //Tampilan item2 makanan populer
    const PopularFoodItem = (item) => {
        return(
        <TouchableOpacity style={{margin:5, borderRadius:10}}>
            <Image source={item.banner} style={{width:SIZES.width/3-30, height:SIZES.width/3-30, borderRadius:10}} resizeMode='stretch'/>
        </TouchableOpacity>
        );
    }

    //Tampilan item2 resto
    const RestoItem = (item)=>{
        return(
            !( item.restoName.toLowerCase().includes(keyword.toLowerCase())) ? null :
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
                                {item.restoDiscounts.map((dsc)=>{
                                    return(
                                        <View style={{flexDirection:'row', marginBottom:'auto', marginLeft:5, padding:3, backgroundColor:'rgba(255,0,0,0.09)', borderWidth:1, borderColor:'#FF0000', borderRadius:5}}>
                                            <Icon name='brightness-percent' size={18} color={TextColor}/>
                                            <Text style={{color:TextColor, marginLeft:5}}>{dsc.discount}</Text>
                                        </View>
                                    );
                                })}
                        </ScrollView>
                    </View>
                </View>
            </TouchableOpacity>
            );
        }

    
    //tampilan item2 menu (terdekat, promo , etc)
    const MenuItem = ({name, icon, title, message, data})=>{
        return(
            <TouchableOpacity onPress={()=>navigation.navigate('Resto',{title:title , message:message, data:data})} style={{width:SIZES.width/4,height:SIZES.width/4, alignItems:'center'}}>
                <Image source={icon} style={{width:55, height:55, marginBottom:5}} resizeMode='stretch'/>
                <Text style={{color:TextColor, fontWeight:'600', fontSize:14}}>
                    {name}
                </Text>
            </TouchableOpacity>
        );
    }

    useEffect(() => {
        getData();
      },[]);

    //output tampilan FoodMenu
    return(
        <View style={{flex:1,backgroundColor:ColorPrimary, paddingBottom:70}}>
            <View style={{flexDirection:'row', margin:15, marginTop:25}}>
             <Icon            
                  name='arrow-left'            
                  size={30}
                  color={TextColor}
                  onPress={()=>navigation.goBack()}
              />
                <View style={{marginLeft:10}}>
                    <Text style={{color:TextColor, }}>
                        Antar Ke
                    </Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={{color:TextColor, fontSize:17, marginRight:10 }}>
                            {selectedAddress}
                        </Text>
                        <Icon            
                            name='arrow-down-drop-circle-outline'            
                            size={20}
                            color={TextColor}
                        />
                    </View>
                    
                </View>
            </View> 

            
                <TextInput
                    theme={{ roundness: 10 }}
                    style={{backgroundColor:'white', margin:15, borderColor:'#D9D9D9', borderWidth:2, height:40, borderRadius:10}}
                    placeholder='Pesan Apa'
                    placeholderTextColor="#BDBDBD"
                    left={ <TextInput.Icon color="#8C8C8C" icon="search" size={20} /> }
                    value={keyword}
                    onChangeText={(text)=>setKeyword(text)}
                />
                
                {keyword?
                    //Tampilan ketika menggunakan fitur search resto
                    <View> 
                        {/* menampilkan daftar resto berdasarkan keyword */}
                        <FlatList
                        data={dummyDataResto}
                        renderItem={({item}) => RestoItem(item)}
                        />
                    </View>
                :
                    //Tampilan ketika tidak menggunakan fitur search
                    <ScrollView>
                        <View>
                            <View style={{paddingHorizontal:15, paddingTop:5}}> 
                                <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20, marginBottom:30}}>
                                    <MenuItem icon={nearbyIcon} name="Terdekat"  title="Terdekat" message="Nikmati makanan yang ada di resto terdekatmu"/>
                                    <MenuItem icon={voucherIcon} name="Promo"  title="Promo"  message="Jangan lupa disimpan ya vouchernya"/>                  
                                    <MenuItem icon={winnerIcon} name="Terlaris"  title="Terlaris"  message="Nikmati makanan terlaris saat ini"/>
                                </View>
                                <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:20}}>
                                    <MenuItem icon={nightIcon} name="Buka 24 Jam"  title="Buka 24 Jam"  message="Pilih dan nikmati makanan 24 jam"/>
                                    <MenuItem icon={foodIcon2} name="Senua Jenis" title="Semua Jenis Makanan" message="Pilih dan nikmati semua jenis makanan"/>
                                    <View style={{width:SIZES.width/4,height:SIZES.width/4}}/>
                                </View>
                            </View>

                            <View style={{alignItems:'center'}}>
                                <TouchableOpacity style={{margin:5, marginHorizontal:20}}>
                                        <Image source={sampleBannerFood} style={{width:SIZES.width-30, height:SIZES.width/2, borderRadius:15,}} resizeMode='stretch' />
                                </TouchableOpacity>
                            </View>

                            {popularFoodList?
                                //tanpilan ketika popularFoodList != null
                                <View>
                                    <View style={{marginTop:25, marginHorizontal:15, justifyContent:'space-between', flexDirection:'row'}}>
                                        <Text style={{fontSize:16, fontWeight:'bold', color:TextColor}}>Makanan Populer</Text>
                                        <TouchableOpacity 
                                            onPress={()=>navigation.navigate('Resto',{title:"Terlaris" , message:"Nikmati makanan terlaris saat ini"})}
                                            style={{flexDirection:'row', alignItems:'center'}}
                                        >
                                            <Text style={{color:'#BDBDBD', fontSize:14}}> 
                                                Lihat semua
                                            </Text>
                                            <Icon
                                                name='chevron-right'
                                                size={25}
                                                color='#BDBDBD'
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    {/* menampilkan daftar makanan populer */}
                                    <FlatList style={{marginHorizontal:15}} 
                                            data={popularFoodList}
                                            renderItem={({item}) => PopularFoodItem(item) }
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={false}
                                        />
                                </View>
                            :null}
                        </View>
                    </ScrollView>
                }
        </View>
    );
}