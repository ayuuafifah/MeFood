import React, {useState, useEffect} from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useIsFocused } from '@react-navigation/native';

import { bgHeader, cardIcon, globalIcon, img01, locationIcon, logoutIcon, messageIcon3, pencilIcon, promoIcon, samplePicture } from '../../assets/images';
import SIZES, { ColorPrimary,storage, ColorSecondary, TextColor } from '../../utils/constanta';

export default Profile = ({ navigation }) => {
  const focus = useIsFocused();
  const [profilePicture, setProfilePicture] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  //mengambil data pengguna yang login
  const getData = () => {
    const user = JSON.parse(storage.getString('user'));
    setProfilePicture(storage.getString('user.profilePicture'));
    setName(user.name);
    setEmail(user.email);
  }

  //tampilan item menu
  const Item = ( {page, label, icon})=>{
      return(
        <TouchableOpacity onPress={()=>navigation.navigate(page)} style={{display:'flex', flexDirection:'row',alignItems:'center', width:SIZES.width}}>
                <Image source={icon} style={{flex:1, width:20, height:20}} resizeMode='contain' />
                <View style={{display:'flex', flexDirection:'row', flex:5, justifyContent:'space-between', paddingVertical:15, marginRight:15, alignItems:'center', borderBottomWidth:label=='Logout'?0:2, borderBottomColor:'#DDDDDD'}}>
                  <Text style={{ fontSize:15, color:TextColor}}>{label}</Text>
                  {label =='Logout'?null:
                    <Icon           
                      name='arrow-forward-ios'            
                      size={16}
                      color={TextColor}
                      style={{marginRight:6}}
                    />
                  }
                  
                </View>
        </TouchableOpacity>
      );
  }

  useEffect(()=>{
    getData();
  },[focus]);

  //output tampilan profile
  return (
    <View style={{flex:1,backgroundColor:ColorPrimary}}>
       <StatusBar backgroundColor={ColorSecondary}/>
       <ImageBackground
        source={bgHeader}
        style={{flex:2, alignItems:'center', justifyContent:'flex-end', paddingBottom:10  }}>
          {profilePicture?
             <Image source={{uri:profilePicture}} style={{width:130, height:130, borderRadius:65 }}/>:
             <Image source={samplePicture} style={{width:130, height:130, borderRadius:65 }}/>
          }
         
          {/* redirect ke halaman UpdateProfile ketika icon diklik  */}
          <TouchableOpacity onPress={()=>navigation.navigate('UpdateProfile')} style={{position:'absolute',left:SIZES.width/2+15}}>
            <Image source={pencilIcon} style={{width:SIZES.width/9, height:SIZES.width/9}} resizeMode='contain'/>
          </TouchableOpacity>

       </ImageBackground>
       <View style={{flex:5}}>
            <View style={{alignSelf:'center', alignItems:'center', marginTop:15}}>
              <Text style={{color:TextColor, fontSize:16}}>{name}</Text>
              <Text style={{color:TextColor, fontSize:16}}>{email}</Text>
            </View>
            <Text style={{fontSize:20, fontWeight:'bold', color:TextColor, marginVertical:25, marginLeft:15}}>Akun</Text>
            <View>
              <Item  page='PaymentMethod' label="Metode Pembayaran" icon={cardIcon}/>
              <Item  page='Address' label="Alamat" icon={locationIcon}/>
              <Item  page='Promo' label="Promo" icon={promoIcon}/>
              <Item  page='Language' label="Bahasa" icon={globalIcon}/>
              <Item  page='Message' label="Chat Kami" icon={messageIcon3}/>
              <Item  page='Auth' label="Logout" icon={logoutIcon}/>
            </View>
       </View>    
    </View>
  );
};

