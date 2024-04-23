import React, {useState, useEffect} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, FlatList, ScrollView  } from 'react-native';
import { bgHeader, deliveryMenu, foodMenu, img01, messageIcon, notivicationIcon, percentIcon, pharmacyMenu, sampleFood4, sampleFood5, sampleFood6, sampleFood7, sampleNewThisWeek, sampleSpecialPromo1, sampleSpecialPromo2, transportMenu } from '../../assets/images';
import MapView from 'react-native-maps';
import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../utils/constanta';
import { ImageSlider } from "react-native-image-slider-banner";

import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default PrintDetail = ({items, borderWidth, fontWeigh, paddingVertical}) => {
       

    const Item = ({label, value}) => {
        return(
           <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontWeight:fontWeigh?fontWeigh:'normal', color:TextColor}}>{label.replace("_"," ")}</Text>
                <Text style={{fontWeight:fontWeigh?fontWeigh:'normal', color:TextColor}}>{value}</Text>
           </View>
        );
    }

    return (
        <View style={{marginHorizontal:15, paddingTop:paddingVertical?paddingVertical:20, paddingBottom: paddingVertical?paddingVertical:0, borderBottomColor:'#DDDDDD', borderBottomWidth:borderWidth?borderWidth:0}}>
           {items.map((user) => {
          let keys = Object.keys(user);
          return (
            <View>{keys.map(key => {
              return (
                <Item label={key} value={user[key]}/>
              )
            })}</View>
          )
        })}
        </View>
    );
}