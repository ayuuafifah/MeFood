import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity,FlatList, Image } from 'react-native';
import { format } from "date-fns";
import { TextInput } from 'react-native-paper';
import differenceInDays from 'date-fns/differenceInDays'
import Icon from "react-native-vector-icons/MaterialIcons";

import SIZES, { ColorPrimary, ColorSecondary, TextColor } from "../../../../utils/constanta";



export default MessageDetail= ({ navigation, route}) => {
    const item = route.params.item;
    const [messages, setMessages] = useState();
    const [draf, setDraf ] = useState();

    //inisiasi data
    const getData = () =>{
        setMessages(item.message);
    }
    
    //Tampilan balon chat
    const MessageItem = (item, index) =>{
        //menghitung jarak waktu pengirimna pesan dengan waktu saat ini
        const dateDif = differenceInDays(new Date(item.date),new Date()); 
        const date = dateDif == 0 ? 'Hari ini' : dateDif == - 1? 'kemarin' : format(new Date(item.date), 'dd/MM/yyyy');
        return(
            <View>
                {index == 0 || item.date != messages[index-1].date ?
                    <View style={{backgroundColor:'rgba(217,217,217,0.2)', marginLeft:'auto', marginVertical:5, padding:5, paddingHorizontal:15, borderRadius:15, marginRight:'auto'}}>
                        <Text style={{color:'#BDBDBD'}}>{date}</Text>
                    </View>:null
                }
                 {item.from == 'You'?
                    //tampilan balon chat yang dikirim
                    <View style={{backgroundColor:'#31CB00', marginVertical:15, marginLeft:'auto',  maxWidth:SIZES.width-35, marginRight:15, alignSelf:'flex-end', padding:15, borderTopLeftRadius:20, borderBottomRightRadius:20, borderBottomLeftRadius:20}}>
                        <Text style={{color:ColorPrimary}}>{item.text}</Text>
                    </View>
                    :
                    //tampilan balon chat yang diterima
                    <View style={{backgroundColor:'#F6F6F6', marginVertical:15, marginLeft:15, marginRight:'auto', maxWidth:SIZES.width-35,  padding:15,  borderTopRightRadius:20, borderBottomLeftRadius:20, borderBottomRightRadius:20}}>
                        <Text style={{color:TextColor}}>{item.text}</Text>
                    </View>
                }
            </View>
           
        );
    }

    //fungsi untuk menghandle ketika tombol kirim diklik
    const sendPressed = () => {
        setDraf();//mengosongkan ruang input pesan
    }

    useEffect(()=>{
        getData();
    },[])

    //output tampilan halaman message
    return(
        <View style={{flex:1, backgroundColor:ColorPrimary}}>
            <View style={{display:'flex', flexDirection:'row',alignItem : 'center', alignContent:'center', height:80, paddingTop:20, borderBottomWidth:3, borderBottomColor:'#DDDDDD', marginHorizontal:15,}}>
                <Icon            
                    name='arrow-back'
                    style={{alignSelf:'center', marginRight:15, marginBottom:15}}            
                    size={30}
                    color={TextColor}
                    onPress={()=>navigation.goBack()}
                />
                <Image source={item.picture} style={{width:45, height:45, marginRight:15, alignSelf:'center'}} resizeMode='contain' />
                <Text style={{fontWeight:'bold', alignSelf:'center', color:TextColor, fontFamily:'DMSans-Bold', fontSize:16 }}>{item.name}</Text>
            </View>  

            {/* menampilkan daftar pesan */}
            <FlatList 
                data={messages}
                renderItem={({item, index})=>MessageItem(item,index)}
            />

            <View style={{position:'absolute', flexDirection:'row', bottom:0, width:SIZES.width, height:70, alignItems:'center', borderTopWidth:4, borderTopColor:'rgba(0,0,0,0.15)'}}>
                <TextInput
                  theme={{ roundness: 25 }}
                  style={{backgroundColor:'white', margin:10, borderColor:TextColor, borderWidth:2, height:40, flex:1, borderRadius:25}}
                  placeholder='Pesan...'
                  placeholderTextColor="#BDBDBD"
                  value={draf}
                  onChangeText={text => setDraf(text)}
                  left={ !draf &&<TextInput.Icon color={TextColor} icon="insert-emoticon" size={23} /> }
                  right={!draf && <TextInput.Icon color={TextColor} icon="attachment" size={23} /> }
                />
                <TouchableOpacity onPress={()=>sendPressed()} style = {{backgroundColor:ColorSecondary, width:40, height:40, marginRight:10, alignItems:'center', justifyContent:'center', borderRadius:20}}>
                    <Icon color={ColorPrimary} name='send' size={25}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}