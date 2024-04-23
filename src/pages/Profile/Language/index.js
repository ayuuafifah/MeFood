import React, { useState } from "react";
import { View, Text, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

import SIZES, { ColorPrimary, ColorSecondary, TextColor } from '../../../utils/constanta';
import { HeaderBar } from '../../../components';

export default Language= ({ navigation }) => {
  const [selected, setSelected]= useState("English");
  
  //output tampilan halaman Language
  return (
    <View style={{flex:1, backgroundColor:ColorPrimary}}>
        <HeaderBar navigation={navigation} headerText='Bahasa' type={2}/>

        <TouchableOpacity 
          style={{width:SIZES.width-30, margin:15, marginTop:35, paddingHorizontal:20, paddingBottom:15, display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderBottomWidth:1, borderBottomColor:'#DDDDDD'}}
          onPress={()=>setSelected("English")}>
            <View>
              <Text style={{color:TextColor, fontSize:16}}>English</Text>
              <Text style={{color:'rgba(0,0,0,0.55)', fontSize:14}}>Inggris</Text>
            </View>
            <Icon
                  name="check-circle"
                  size={20}
                  color={selected=="English"?ColorSecondary:ColorPrimary}
            />
        </TouchableOpacity>

        <TouchableOpacity 
          style={{width:SIZES.width-30, margin:15, paddingHorizontal:20, paddingBottom:15, display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', borderBottomWidth:1, borderBottomColor:'#DDDDDD'}}
          onPress={()=>setSelected("Indonesia")}>
            <View>
              <Text style={{color:TextColor, fontSize:16}}>Indonesia</Text>
              <Text style={{color:'rgba(0,0,0,0.55)', fontSize:14}}>indonesia</Text>
            </View>
            <Icon
                  name="check-circle"
                  size={20}
                  color={selected=="Indonesia"?ColorSecondary:ColorPrimary}
            />
        </TouchableOpacity>

    </View>
  );
};

