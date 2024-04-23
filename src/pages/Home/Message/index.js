import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity,FlatList, Image } from 'react-native';

import SIZES, { ColorPrimary, ColorSecondary, TextColor } from '../../../utils/constanta';
import { HeaderBar, Button } from '../../../components';
import { adminChatImage, dummyPerson, messageIcon, messageIcon2 } from "../../../assets/images";

export default Message= ({ navigation }) => {
  const [messageList, setMessageList] = useState();
  
  //inisiasi dummy data
  const getData = ()=>{
      let dummyData = [
        { 
          name: 'Anton',
          picture: dummyPerson, 
          message:[
                  { from:'Anton', text:'Mohon ditunggu', time:'10:00', date: '2023-11-20'},
                  { from:'You', text:'Oke Mas', time:'10:01', date: '2023-11-20'},
                ],
        },
        {
          name: 'Admin',
          picture: adminChatImage, 
          message:[
                  { 
                    from: 'Admin', 
                    text:'Lorem ipsum dolor sit amet',
                    time:'10:00',
                    date: '2023-11-20'
                  },
                  { 
                    from: 'You', 
                    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    time:'10:00',
                    date: '2023-11-20'
                  },
                  { 
                    from: 'Admin', 
                    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula dui non odio iaculis pharetra. In non mollis est. Etiam consectetur dolor augue, at tincidunt lectus vehicula sed. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. Proin magna sem, interdum venenatis vulputate et, malesuada sit amet sem.',  
                    time:'10:00',
                    date: '2023-11-22'
                  },
                ],
        }
      ];

      setMessageList(dummyData);
  }

  //Tampilan item2 daftar pesan
  const MessageItem = (item)=>{
    return(
      <TouchableOpacity 
        onPress={()=>navigation.navigate("MessageDetail", {item:item})}
        style={{width:SIZES.width-30, margin:15, paddingHorizontal:20, paddingBottom:15, display:'flex', flexDirection:'row', alignItems:'center'}}>
          <Image source={item.picture} style={{width:50, height:50, marginRight:10}} resizeMode='contain' />
          <View style={{ flex:2}}>
            <Text style={{color:TextColor, fontSize:16}}>{item.name}</Text>
            <Text numberOfLines={2} style={{color:'rgba(0,0,0,0.55)', fontSize:14}}>{item.message[item.message.length-1].from == 'You' && 'You : '}{item.message[item.message.length-1].text}</Text>
          </View>
          <View style={{marginLeft:'auto', alignSelf:'flex-start', justifyContent:'flex-start', width:40}}>
            <Text style={{color:TextColor}}>{item.message[item.message.length-1].time}</Text>
          </View>
        </TouchableOpacity>
    );
  }

  useEffect(() => {
    getData();
  },[]);
  
  //output tampilan halaman message 
  return (
    <View style={{flex:1, backgroundColor:ColorPrimary}}>
        <HeaderBar navigation={navigation} headerText='Pesan' type={2}/>
        <View style={{height:20}}/>

        {messageList?
            //menampikan daftar pesan ketika messageList != null
             <FlatList
                data={messageList}
                renderItem={({item}) => MessageItem(item) }
            />
        :
          //tampilan ketika messageList == null
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <View style={{alignItems:'center'}}>
                    <Image source={messageIcon2} style={{width:SIZES.width/3.5, height:SIZES.width/3.5}} resizeMode='contain'/>
                    <Text style={{color:TextColor, fontSize:18}}>Belum ada pesan</Text>
                </View>
                 
            </View>

        }
       
    </View>
  );
};

