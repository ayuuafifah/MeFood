import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import SIZES, { ColorPrimary, ColorSecondary, TextColor } from '../../../utils/constanta';
import { HeaderBar } from '../../../components';
import { cardIcon, cashIcon, linkAjaLogo, ovoLogo } from "../../../assets/images";

export default PaymentMethod= ({ navigation }) => {

  //tampilan item2 payment method
  const Item = ({navigation, page, label, icon})=>{
      return(
        <TouchableOpacity onPress={()=>navigation.navigate(page)} style={{display:'flex', flexDirection:'row',alignItems:'center',marginRight:15, justifyContent:'center', width:SIZES.width-30, borderBottomWidth:label=='OVO Cash'?4:0, borderBottomColor:label=='Tunai'?ColorPrimary:'#DDDDDD'}}>
                <Image source={icon} style={{marginRight:10, width:35, height:25}} resizeMode='stretch' />
                <View style={{display:'flex', flexDirection:'row', flex:5, justifyContent:'space-between', paddingVertical:25, alignItems:'center', borderBottomWidth:label=='OVO Cash'?0:2, borderBottomColor:label=='Tunai'?ColorPrimary:'#DDDDDD'}}>
                  <Text style={{ fontSize:18, color:TextColor}}>{label}</Text>
                  {label =='Tunai'?null:
                    <Icon           
                      name='plus-circle'            
                      size={25}
                      color={ColorSecondary}
                    />
                  }
                </View>
        </TouchableOpacity>
      );
  }
  
  //output tampilan halaman payment method
  return (
    <View style={{flex:1, backgroundColor:ColorPrimary}}>
        <HeaderBar navigation={navigation} headerText='Metode Pembayaran' type={2}/>
        <View style={{padding:15, marginTop:20}}>
            <Text style={{color:TextColor, marginBottom:20, fontSize:16 }}>Tambah Metode</Text>

            <Item navigation={navigation} page='PaymentMethod' label="Kartu kredit atau debit" icon={cardIcon}/>
            <Item navigation={navigation} page='PaymentMethod' label="Link Aja" icon={linkAjaLogo}/>
            <Item navigation={navigation} page='PaymentMethod' label="OVO Cash" icon={ovoLogo}/>
        </View>
        <View style={{padding:15, marginTop:10}}>
            <Text style={{color:TextColor, fontSize:16 }}>Metode Lainnya</Text>

            <Item navigation={navigation} page='PaymentMethod' label="Tunai" icon={cashIcon}/>
        </View>
    </View>
  );
};

