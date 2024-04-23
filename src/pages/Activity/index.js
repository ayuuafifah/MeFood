import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList,Image, StatusBar } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

import { dummyPerson, emptyActivityIcon, foodMenu, img01, sampleFood1, sampleFood2 } from '../../assets/images';
import SIZES, { ColorPrimary, ColorSecondary, TextColor } from '../../utils/constanta';
import { HeaderBar } from '../../components';

export default Activity = ({ navigation }) => {
  const [filter, setFilter] = useState("process");
  const [processList, setProcessList] = useState();
  const [historyList, setHistoryList] = useState();
  
  //Inisiasi data dummy
  const getData = ()=>{
      let dummyDataHistory = [
        {orderId:"9472102344", picture:sampleFood2, time: '28 Okt 2023', createdAt:"28 Okt 2023 10.00", resto: 'Korean BBQ Grill', item:[{name:'Spicy Tteokbokki', quantity:1}], quantity:1, paymentMethod:"Tunai",  totalPrice:38000, price:38000, deliveryFee:13000, serviceFee:2000, discount:15000, processId:4, process:'Selesai', processDetail:"Pesanan sudah selesai", assessmentCompleted:false, driverName:'Anton', driverPicture:dummyPerson}
       ];

       let dummyDataProcess = [
        {orderId:"1234567890", picture:sampleFood1, time: '19.30', createdAt:"1 Des 2023 10.00", resto:'Meriana Pizza', item:[{name:'Melted Cheese Pizza', quantity:1}, {name:'Meat with Tomato Pizza', quantity:1}], quantity:1, paymentMethod:"Tunai", totalPrice:107000, price:105000, deliveryFee:10000, serviceFee:2000, discount:10000, processId:2, process:'Dimasak', processDetail:"Pesanan sedang dalam perjalanan", assessmentCompleted:false, driverName:'Anton', driverPicture:dummyPerson},
        {orderId:"9472102344", picture:sampleFood2, time: '19.00', createdAt:"1 Des 2023 10.00", resto: 'Korean BBQ Grill', item:[{name:'Spicy Tteokbokki', quantity:1}], quantity:1, paymentMethod:"Tunai",  totalPrice:38000, price:38000, deliveryFee:13000, serviceFee:2000, discount:15000, processId:3, process:'Diambil', processDetail:"Pesanan sedang dalam perjalanan", assessmentCompleted:false, driverName:'Anton', driverPicture:dummyPerson}
       ];

      setHistoryList(dummyDataHistory);
      setProcessList(dummyDataProcess);
  }

  //tampilan item2 nama dan quantity makanan
  const foodListItem = (food)=>{
    return(
      <Text style={{color:TextColor, marginVertical:3, fontSize:14}}>{food.name} - {food.quantity}</Text>
    );
  }

  //tampilan item2 aktivitas
  const ActivityItem = (item)=>{
    return(
      //redirect ke halaman DetailTransactionFood ketika item diklik
      <TouchableOpacity  onPress={()=>navigation.navigate('DetailTransactionFood', {transaction:item, page:'Activity'})} style={{margin:5, marginHorizontal:15, borderBottomWidth:1, borderBottomColor:'#DDDDDD'}}>
        <View style={{width:SIZES.width-30, display:'flex', flexDirection:'row'}}>

            <Image source={foodMenu} style={{width:75, height:75}} resizeMode='contain' />
            
            <View style={{ overflow:'hidden', maxWidth:SIZES.width/2, marginHorizontal:5, padding:5}}> 
              <Text style={{color:TextColor, fontSize:18}}>{item.resto}</Text>
              {item.item.map(food => foodListItem(food))}
              <Text style={{color:TextColor, fontSize:16}}>{item.price}</Text>
            </View>

            <View style={{ padding:5, marginLeft:'auto' }}>
              <Text style={{color:'rgba(0,0,0,0.55)', fontSize:14}}>{item.time}</Text>
            </View>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', margin:15}}>
           <Icon
              name="access-time"
              size={20}
              color={TextColor}
            />
          <Text style={{color:TextColor, marginHorizontal:5}}>{item.process}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    getData();
  },[]);

  //output tampilan halaman Activity
  return (
    <View style={{flex:1, backgroundColor:ColorPrimary}}>
      <StatusBar barStyle = "dark-content" backgroundColor={ColorPrimary}/>
      <View style={{height:170}}>
        <HeaderBar navigation={navigation} headerText='Aktivitas' type={1}/>
        <View style={{paddingHorizontal:15, paddingTop:10, marginBottom:10, display:'flex', flexDirection:'row'}}>
          <TouchableOpacity 
            style={{margin:5, padding:5, borderBottomWidth:3, borderBottomColor:filter=="process"? ColorSecondary: ColorPrimary }}
            onPress={()=>setFilter("process")} >
              <Text style={{color:TextColor, fontSize:16 }}>Proses</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{margin:5, padding:5, borderBottomWidth:3, borderBottomColor:filter=="history"? ColorSecondary: ColorPrimary }}
              onPress={()=>setFilter("history")} >
                <Text style={{color:TextColor, fontSize:16 }}>Riwayat</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={{flex:1}}> 
        { filter == 'process'?
            //menampilkan aktivitas yang sedang berlangsung
            processList? 
              <View style={{flex:1}}>
                {/* menampilkan daftar aktivitas ketika processList != null */}
                <FlatList
                  data={processList}
                  renderItem={({item}) => ActivityItem(item) }
                />
              </View>   
            :
              //tampilan ketika processList == null
              <View style={{flex:1, marginBottom:SIZES.height/9, alignItems:'center',alignContent:'center', justifyContent:'center', height:SIZES.height/2}}>
                <Image source={emptyActivityIcon} style={{width:SIZES.width/4, height:SIZES.width/4, marginBottom:15}} resizeMode='contain' />
                <Text style={{color:TextColor, fontSize:14}}>Ketika kamu menggunakan pelayanan kami,</Text> 
                <Text style={{color:TextColor, fontSize:14}}>kamu dapat melihatnya disini</Text>
              </View>  
        :
            //menampilkan aktivitas yang sudah selesai
            historyList?
              <View style={{flex:1}}>
                {/* menampilkan daftar history ketika historyList != null */}
                <FlatList
                  data={historyList}
                  renderItem={({item}) => ActivityItem(item) }
                />
              </View>   
            :
            //tampilan ketika historyList == null
            <View style={{flex:1, marginBottom:SIZES.height/9, alignItems:'center',alignContent:'center', justifyContent:'center', height:SIZES.height/2}}>
              <Image source={emptyActivityIcon} style={{width:SIZES.width/4, height:SIZES.width/4, marginBottom:15}} resizeMode='contain' />
              <Text style={{color:TextColor, fontSize:14}}>Ketika kamu menggunakan pelayanan kami,</Text> 
              <Text style={{color:TextColor, fontSize:14}}>kamu dapat melihatnya disini</Text>
            </View>
        }
      </View>
    </View>
  );
};

