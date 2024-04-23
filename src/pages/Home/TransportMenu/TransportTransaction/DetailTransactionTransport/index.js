import React, {useEffect,useCallback, useMemo, useRef, useState} from 'react';
import { View, Text, ImageBackground, Image  } from 'react-native';
import Icon2 from "react-native-vector-icons/SimpleLineIcons";
import Icon3 from "react-native-vector-icons/Ionicons";
import Icon4 from "react-native-vector-icons/MaterialCommunityIcons";

import { dummyPerson, mapsView } from '../../../../../assets/images';
import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../../../../utils/constanta'

export default DetailTransactionTransport = ({ navigation, route}) => {
    const [message, setMessage] = useState();

    //Inisiasi data dummy
    const getData = ()=>{
        let x =  { 
            name: 'Anton',
            picture: dummyPerson, 
            message:[
                    { from:'Anton', text:'Mohon ditunggu', time:'10:00', date: '2023-11-20'},
                    { from:'You', text:'Oke Mas', time:'10:01', date: '2023-11-20'},
                  ],
          }
        setMessage(x);
    }

    //dummy auto update status
    const dummyUpdateStatus = () => {
        setTimeout(() => {
            //redirect ke halaman TransportRating
            navigation.navigate('TransportRating',  {driverName:'Anton', driverPicture:dummyPerson})
        }, 5000);
    };
  
    useEffect(() => {
        getData();
        dummyUpdateStatus();
    },[]);


    //output tampilan halaman Detail Transaction Transport
    return(
        <ImageBackground source={mapsView} resizeMode='cover' style={{flex:1}}>
 
            <View style={{position:'absolute', top:15, left:15, backgroundColor:ColorPrimary, padding:5, borderRadius:25, shadowColor:'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2}, shadowRadius: 10, elevation: 3}}>
                <Icon4            
                    name='arrow-left'            
                    size={30}
                    color={ColorSecondary}
                    onPress={()=>navigation.goBack()}
                />
            </View>
                <View style={{position:'absolute', backgroundColor:ColorPrimary, height:230, bottom:0, left:30,borderTopRightRadius:20, borderTopLeftRadius:20,  width:SIZES.width-60, paddingHorizontal:15}}>
                    <View style={{width:30, backgroundColor:'#bdbdbd',alignSelf:'center', marginTop:10, marginBottom:10, borderRadius:10, height:4}}/>
                    <View style={{width:SIZES.width-90,  flexDirection:'row', alignItems:'center', justifyContent:'center', paddingVertical:15, borderBottomWidth:3, borderBottomColor:'#DDDDDD'}}>
                        <Image source={dummyPerson} style={{width:60, height:60, margin:10}}/>
                        <View>
                            <Text style={{color:TextColor, fontSize:16}}>Anton</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:TextColor, fontSize:14}}>Honda Vario</Text> 
                                <View style={{backgroundColor:"#D9D9D9", borderRadius:5, margin:7, width:7, height:7}} />
                                <Text style={{color:TextColor, fontSize:14, marginLeft:5}}>BE7777DR</Text> 
                            </View>
                        </View>
                    </View>

                    <View style={{width:SIZES.width-90, paddingVertical:35, flexDirection:'row'}}>
                            <View style={{width:'50%', alignItems:'center', borderRightWidth:1, borderRightColor:TextColor}}>
                                <Icon2 name='phone' size={30} color={TextColor} style={{marginHorizontal:10, marginRight:15}}/>
                            </View>
                            <View style={{width:'50%', alignItems:'center'}}>
                                {/* redirect ke halaman MessageDetail ketika icon diklik */}
                                <Icon3 onPress={()=>navigation.navigate("MessageDetail", {item:message})} name='chatbox-ellipses-outline' size={30} color={TextColor}/>
                            </View>     
                    </View>
                </View>
        </ImageBackground>
    );
} 