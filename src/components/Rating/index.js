import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import SIZES, {ColorPrimary, ColorSecondary, TextColor} from '../../utils/constanta';
import Icon from 'react-native-vector-icons/AntDesign';
import { TextInput } from 'react-native-paper';

export default Rating = ({label, item}) => {
  const [rating, setRating] = useState(0);

  return (
    <View style={{marginHorizontal:15, marginTop:10, paddingBottom:15, borderBottomWidth:2, borderBottomColor:'#DDDDDD' }}>
        <Text style={{color:TextColor}}>Penilaian {label}</Text>
        <View style={{alignItems:'center'}}>
            <Image source={label == 'driver' ? item.driverPicture: item.picture} 
            resizeMode='contain'
            style={{
                width:SIZES.width/5,
                height:SIZES.width/5,
                borderRadius:20,
                margin:10
            }} />
            <Text style={{color:TextColor, fontWeight:'bold'}}>{label == 'driver' ? item.driverName: item.resto}</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:50, marginTop:10}}>
            <TouchableOpacity onPress={()=>setRating(1)}>
                <Icon name='star' size={40} color={rating >=1? '#F2C94C': 'grey'} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>setRating(2)}>
                <Icon name='star' size={40} color={rating >=2? '#F2C94C': 'grey'} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>setRating(3)}>
                <Icon name='star' size={40} color={rating >=3? '#F2C94C': 'grey'} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>setRating(4)}>
                <Icon name='star' size={40} color={rating >=4? '#F2C94C': 'grey'} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>setRating(5)}>
                <Icon name='star' size={40} color={rating >=5? '#F2C94C': 'grey'} />
            </TouchableOpacity>
        </View>
        <Text style={{alignSelf:'center', margin:5, color:'grey'}}>{rating==1?'Kecewa':rating==2?'Tidak Puas':rating==3?'Kurang Puas':rating==4?'Puas':rating==5?'Sempurna':''}</Text>
        <TextInput  
            style={{borderWidth:0, marginHorizontal:40, borderRadius:15, backgroundColor:'#F2F2F2'}}
            theme={{ roundness: 15 }}
            multiline = {true}
            numberOfLines = {4}
            placeholder='Berikan kesanmu disini'
            placeholderTextColor='#828282'
        />
        
    </View>
    );
};