import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView  } from 'react-native';
import Icon from "react-native-vector-icons/Fontisto";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/MaterialIcons";

import {  sampleFood1,  sampleFood3} from '../../../../assets/images';
import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../../../utils/constanta'
import { HeaderBar } from '../../../../components';


export default FavoriteFood = ({ navigation }) => {
    const [favoriteList, setFavoriteList] = useState();
  
    //Inisiasi data dummy
    const getData = ()=>{
        let dummyDataFavorite = [
            {picture:sampleFood3 , category:'Minuman, Sweets', item:'Ice Cream Dondon', rating:'4.7', distance:'1.0 km', orderTimeEstimation:'25 min', discount:['10% off']},
            {picture:sampleFood1 , category:'Makanan', item:'Melted Cheese Pizza', rating:'4.8', distance:'1.3 km', orderTimeEstimation:'35 min', discount:['5% off']},
        ];

        setFavoriteList(dummyDataFavorite);
    }

    //Tampilan item2 makanan favorite
    const FavoriteItem = (item)=>{
        return(
        <TouchableOpacity style={{margin:5, marginTop:20, paddingBottom:10, marginHorizontal:15, borderBottomWidth:1, borderBottomColor:'#DDDDDD'}}>
            <View style={{width:SIZES.width-30, display:'flex', flexDirection:'row', alignItems:'center'}}>
                <Image source={item.picture} style={{width:75, height:75, borderRadius:15}} resizeMode='contain' />
                <View style={{overflow:'hidden', marginHorizontal:5, height:110, paddingLeft:5}}> 
                    <Text style={{color:TextColor,fontWeight:'bold', fontSize:18}}>{item.item}</Text>
                    <Text style={{color:TextColor, marginVertical:3, fontSize:14}}>{item.category}</Text>
                    <View style={{flexDirection:'row', alignItems:'baseline'}}>
                        <Icon name='star' size={18} color="#F2C94C"/>
                        <Text style={{color:TextColor, fontSize:14, marginLeft:5}}>{item.rating}</Text> 
                        <View style={{backgroundColor:"#D9D9D9", borderRadius:5, margin:7, width:7, height:7}} />
                        <Text style={{color:TextColor, fontSize:14}}>{item.distance}</Text>
                        <View style={{backgroundColor:"#D9D9D9", borderRadius:5, margin:7, width:7, height:7}} />
                        <Text style={{color:TextColor, fontSize:14}}>{item.orderTimeEstimation}</Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {item.discount.map((value)=>{
                            return(
                                <View style={{flexDirection:'row', marginBottom:'auto', marginLeft:5, padding:3, backgroundColor:'rgba(255,0,0,0.09)', borderWidth:1, borderColor:'#FF0000', borderRadius:5}}>
                                    <Icon2 name='brightness-percent' size={18} color={TextColor}/>
                                    <Text style={{color:TextColor, marginLeft:5}}>{value}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Icon2 name='heart' size={35} color='#FF0000'/>
                <TouchableOpacity style={{padding:5, paddingHorizontal:10, margin:'auto', borderColor:ColorSecondary, borderWidth:1, borderRadius:15}}>
                    <Text style={{color:ColorSecondary}}>Pesan</Text>
                </TouchableOpacity>
            </View>

        </TouchableOpacity>
        );
    }

    useEffect(() => {
        getData();
    },[]);



    //Output tampilan halaman Favorite
    return(
        <View style={{flex:1,backgroundColor:ColorPrimary, paddingBottom:70}}>
            <HeaderBar navigation={navigation} headerText='Pesanan' type={1}/>
        
            {favoriteList?
                //tampilan ketika favoriteList != null
                <View style={{flex:1}}>
                    {/* menampilkan daftar makanan favorite */}
                    <FlatList
                    data={favoriteList}
                    renderItem={({item}) => FavoriteItem(item) }
                    />
                </View>   
            :
                //tampilan ketika favoriteList == null
                <View style={{flex:1, alignItems:'center', marginTop:SIZES.height/4}}>
                    <Icon3 name="receipt" color="#BDBDBD" size={SIZES.width/4}/>
                    <Text style={{color:TextColor, fontSize:14}}>Ketika kamu menggunakan pelayanan kami,</Text> 
                    <Text style={{color:TextColor, fontSize:14}}>kamu dapat melihatnya disini</Text>
                </View>
            }
        </View>
    );
}