import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image,ToastAndroid, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

import SIZES, { ColorPrimary, ColorSecondary, TextColor, storage } from '../../../utils/constanta';
import { HeaderBar } from '../../../components';
import { samplePicture } from "../../../assets/images";


export default UpdateProfile= ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(storage.getString('user.profilePicture'));
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();


  //mengambil data user yang login
  const getData = () => {
    const user = JSON.parse(storage.getString('user'));
    console.log(user);
    setName(user.name);
    setPhone(user.phone);
    setEmail(user.email);
  }

  //membuka galery
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };
  

  //validasi ketika tombol simpan diklik
  const savePressed = ()=>{
    if(name && email && phone){
      if(phone.length >= 11 && phone.length <=14){
        
          //mengupdate data pengguna
          let user = JSON.parse(storage.getString('user'));
          user.name = name;
          user.phone = phone;
          user.email = email;

          //menyimpan data pengguna
          storage.set('user.profilePicture', selectedImage);
          storage.set('user', JSON.stringify(user));

          ToastAndroid.show('Berhasil Mengupdate Profile',ToastAndroid.SHORT);
          //redirect ke halaman profile
          navigation.navigate("Tabs");
        }else{
          ToastAndroid.show('Nomor Hp harus terdiri dari 11-14 karakter ',ToastAndroid.SHORT);
        }
    }else{
      ToastAndroid.show('Seluruh field tidak boleh kosong',ToastAndroid.SHORT);
    }
  }

  useEffect(()=>{
    getData();
  },[]);
  
  return (
    <View style={{flex:1, backgroundColor:ColorPrimary}}>
        <HeaderBar navigation={navigation} headerText='Ubah Profile' type={2}/>
        <View style={{width:SIZES.width, alignItems:'center', marginTop:20, marginBottom:40}}>
            {selectedImage?
              <Image source={{ uri: selectedImage }} style={{width:SIZES.width/3, borderRadius:SIZES.width/6, height:SIZES.width/3}} resizeMode='stretch' />:
              <Image source={samplePicture} style={{width:SIZES.width/3, height:SIZES.width/3}} resizeMode='stretch' />
            }
            <TouchableOpacity onPress={openImagePicker} style={{padding:10, borderRadius:SIZES.width/6, backgroundColor:ColorPrimary, borderRadius:22, position:'absolute', bottom:0, left:SIZES.width/2+20, elevation:2}}>
                <Icon           
                    name='camera'            
                    size={25}
                    color="#B3B3B3"
                />
            </TouchableOpacity>
        </View>
      
        <View
          style={{width:SIZES.width-30, marginHorizontal:15, marginTop:10, paddingBottom:5, display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderBottomColor:'#DDDDDD'}}>
            <View>
              <Text style={{color:TextColor, fontSize:16}}>Nama</Text>
              <TextInput
                style={{backgroundColor:'white', width:SIZES.width-30, borderRadius:10}}
                color={ColorSecondary}
                value={name}
                onChangeText={text=> setName(text)}
            /> 
            </View>
        </View>
        <View
          style={{width:SIZES.width-30, marginHorizontal:15, marginTop:10, paddingBottom:5, display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderBottomColor:'#DDDDDD'}}>
            <View>
              <Text style={{color:TextColor, fontSize:16}}>Nomor Hp</Text>
              <TextInput
                style={{backgroundColor:'white', width:SIZES.width-30, borderRadius:10}}
                color={ColorSecondary}
                value={phone}
                onChangeText={text=> setPhone(text)}
            /> 
            </View>
        </View>
        <View
          style={{width:SIZES.width-30, marginHorizontal:15, marginTop:10, marginBottom:50, paddingBottom:5, display:'flex', flexDirection:'row', alignItems:'center', borderBottomWidth:1, borderBottomColor:'#DDDDDD'}}>
            <View>
              <Text style={{color:TextColor, fontSize:16}}>Email</Text>
              <TextInput
                style={{backgroundColor:'white', width:SIZES.width-30, borderRadius:10}}
                color={ColorSecondary}
                value={email}
                onChangeText={text=> setEmail(text)}
            /> 
            </View>
        </View>

        <Button action={savePressed} label="Simpan"/>

    </View>
  );
};

