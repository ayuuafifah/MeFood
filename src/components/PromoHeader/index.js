import React, {useState, useEffect} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, FlatList, ScrollView  } from 'react-native';
import { bgHeader, deliveryMenu, foodMenu, img01, messageIcon, notivicationIcon, percentIcon, pharmacyMenu, sampleFood4, sampleFood5, sampleFood6, sampleFood7, sampleNewThisWeek, sampleSpecialPromo1, sampleSpecialPromo2, transportMenu } from '../../assets/images';
import MapView from 'react-native-maps';
import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../utils/constanta';
import { ImageSlider } from "react-native-image-slider-banner";

import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default PromoHeader = ({ navigation }) => {

    const voucherList = [
          {title:'Diskon 30%', description:'Khusus pesanan aneka bakso, minimal order 30rb', expiredDate:'10 Des 2023'},
          {title:'Gratis Ongkir', description:'Khusus pesanan dengan minimal order 10rb', expiredDate:'10 Des 2023'},
        ];
       

    const VoucherItem = (item) => {
        return(
            <View style={{width:250, height:110, justifyContent:'center', marginRight:10, padding:5, borderColor:TextColor, borderWidth:2, borderRadius:15, alignItems:'flex-end', backgroundColor:'rgba(225,200,1,0.5)'}}>
                <Image source={percentIcon} style={{width:SIZES.width/5-20, height:SIZES.width/5-20}} resizeMode='stretch' />
                <View style={{width:240, height:100, position:'absolute', top:5, left:5}}>
                    <Text style={{color:TextColor, fontSize:16, fontWeight:'bold', marginBottom:5}}>Diskon 35%</Text>
                    <Text style={{color:TextColor,marginBottom:5}}>Khusus pesanan aneka bakso, minimal order 30rb</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon name="calendar-clock-outline" size={18} color={TextColor}/>
                        <Text style={{color:TextColor, marginHorizontal:5,}}>Hingga 10 Des 2023</Text>
                        <Icon style={{marginLeft:'auto', marginRight:5}} name="plus-circle-outline" size={23} color={ColorSecondary}/>
                    </View>
                </View>
            </View>
        );
    }

 

    

    return(
        <View>
            <View style={{height:225}}>
                <View style={{backgroundColor:'#FFC801', width:SIZES.width, height:170}} />
            </View>

             <View style={{position:'absolute', marginLeft:50, marginRight:40, alignItems:'center', justifyContent:'center', top:30 }}>
                <ImageSlider 
                    data={[
                        {img: require('../../assets/images/promoBanner.jpg')},
                        {img: require('../../assets/images/promoBanner.jpg')}
                    ]}
                    localImg
                    autoPlay
                    timer={5000}
                    preview={false}
                    closeIconColor="#fff"
                    caroselImageStyle={{width:SIZES.width-100, height:170, resizeMode:'stretch'}}
                    caroselImageContainerStyle={{marginRight:10, height:195}}
                    activeIndicatorStyle={{width:10, height:10, backgroundColor:'#FFC801'}}
                    indicatorContainerStyle={{top:10}}
                />
            </View>
            
            <View style={{position:'absolute', top:15, left:15}}>
                <Icon            
                    name='arrow-left'            
                    size={30}
                    color={TextColor}
                    onPress={()=>navigation.goBack()}
                />
            </View>



            <View style={{paddingHorizontal:15, marginBottom:15,}}>
                <Text style={{fontSize:18, fontWeight:'bold', color:TextColor}}>Promo</Text>
                <Text style={{color:'rgba(0,0,0,0.8)'}}>Jangan lupa disimpan ya vouchernya</Text>
            </View>

            {voucherList?
                <View>
                    <FlatList 
                        style={{paddingLeft:10, width:SIZES.width}} 
                        data={voucherList}
                        renderItem={({item}) => VoucherItem(item)}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            :null
            }

            <Text style={{fontSize:16, fontWeight:'bold', margin:15, marginBottom:5, color:TextColor}}>Resto dengan banyak promo</Text>   
        </View>
    );
}