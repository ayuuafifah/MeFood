import React, {useState, useEffect} from 'react';
import { View, Text,  TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

import { dummyPerson,sampleFood1, sampleFood2 } from '../../../../assets/images';
import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../../../utils/constanta'
import { HeaderBar } from '../../../../components';


export default FoodTransaction = ({ navigation }) => {
    const [TransactionList, setTransactionList] = useState();
  
    //Inisiasi data dummy
    const getData = ()=>{
        let dummyDataTransaction = [
            {orderId:"1234567890", picture:sampleFood2, time: '19.30', createdAt:"1 Des 2023 10.00", resto:'Meriana Pizza', item:[{name:'Melted Cheese Pizza', quantity:1}, {name:'Meat with Tomato Pizza', quantity:1}], quantity:1, paymentMethod:"Tunai", totalPrice:107000, price:105000, deliveryFee:10000, serviceFee:2000, discount:10000, processId:3, process:'Diambil', processDetail:"Pesanan sedang dalam perjalanan", assessmentCompleted:false, driverName:'Anton', driverPicture:dummyPerson},
            {orderId:"9472102344", picture:sampleFood1, time: '20 Sep 2023', createdAt:" 20 Sep 2023 10.00", resto: 'Korean BBQ Grill', item:[{name:'Spicy Tteokbokki', quantity:1}], quantity:1, paymentMethod:"Tunai",  totalPrice:38000, price:38000, deliveryFee:13000, serviceFee:2000, discount:15000, processId:4, process:'Selesai', processDetail:"Pesanan sudah selesai", assessmentCompleted:false, driverName:'Anton', driverPicture:dummyPerson},
            {orderId:"3245678654", picture:sampleFood1, time: '19 Sep 2023', createdAt:"19 Sep 2023 10.00", resto: 'Korean BBQ Grill', item:[{name:'Spicy Tteokbokki', quantity:1}], quantity:2, paymentMethod:"Tunai", totalPrice:76000, price:34000, deliveryFee:10000, serviceFee:2000, discount:10000,processId:4, process:'Selesai', processDetail:"Pesanan sudah selesai", assessmentCompleted:true, driverName:'Anton', driverPicture:dummyPerson},
        ];

        setTransactionList(dummyDataTransaction);
    }

    //Tampilan item2 transaksi
    const TransactionItem = (item)=>{
        return(
        //redirect ke halaman detailTransactionFood ketika item diklik
        <TouchableOpacity onPress={()=>navigation.navigate('DetailTransactionFood', {transaction:item})} style={{margin:5, marginTop:20, marginHorizontal:15, borderBottomWidth:3, borderBottomColor:'#DDDDDD'}}>
            <View style={{width:SIZES.width-30, display:'flex', flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#DDDDDD' }}>

                <Image source={item.picture} style={{width:75, height:75, borderRadius:15}} resizeMode='contain' />
                <View style={{flex:1, flexDirection:'row', height:110, justifyContent:'space-between'}}>
                    <View style={{overflow:'hidden', marginHorizontal:5, padding:5}}> 
                        <Text style={{color:TextColor, fontWeight:'bold', fontSize:18}}>{item.resto}</Text>
                        {item.item.map(food => <Text style={{color:TextColor, marginVertical:3, fontSize:14}}>{food.name} - {food.quantity}</Text> )}
                        <Text style={{color:TextColor, fontSize:16}}>{item.totalPrice}</Text>
                    </View>

                    <View style={{padding:5, alignItems:'flex-end' }}>
                    <Text style={{color:'rgba(0,0,0,0.55)', fontSize:14}}>{item.time}</Text>
                    </View>
                    </View>
            </View>
            
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginVertical:5}}>
            <Text style={{color:TextColor, marginHorizontal:5}}>{item.process}</Text>
                {item.process!='Selesai'?
                    //tampilan item transaksi yang belum selesai
                    <Text style={{color:TextColor, marginHorizontal:5}}>{item.processDetail}</Text>
                :
                    item.assessmentCompleted?
                        //tampilan item transaksi yang sudah selesai dan sudah diberi penilaian
                        <View>
                            <TouchableOpacity style={{padding:5, paddingHorizontal:10, backgroundColor:ColorSecondary,borderRadius:15}}>
                                <Text  style={{color:ColorPrimary}}>Pesan Lagi</Text>
                            </TouchableOpacity>
                        </View>
                    :
                        //tampilan item transaksi yang sudah selesai namun belum diberi penilaian
                        <View style={{flexDirection:'row'}}>
                             {/* redirect ke halaman Foodrating ketika tombol beri penilaian diklik */}
                            <TouchableOpacity onPress={()=>navigation.navigate('FoodRating', {item})} style={{padding:5, paddingHorizontal:10, marginRight:5, borderColor:ColorSecondary, borderWidth:1, borderRadius:15}}>
                                <Text style={{color:ColorSecondary}}>Beri Penilaian</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{padding:5, paddingHorizontal:10, backgroundColor:ColorSecondary,borderRadius:15}}>
                                <Text  style={{color:ColorPrimary}}>Pesan Lagi</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
            <Text style={{color:'#BDBDBD', margin:5}}>{item.orderId}</Text>
        </TouchableOpacity>
        );
    }


    useEffect(() => {
        getData();
    },[]);


    //output tampilan halaman foodtransaction
    return(
        <View style={{flex:1,backgroundColor:ColorPrimary, paddingBottom:70}}>
            <HeaderBar navigation={navigation} headerText='Pesanan' type={1}/>
        
            {TransactionList?
                //Tampilan ketika TransactionList != null
                <View style={{flex:1, marginTop:18}}>
                    {/* menampilkan daftar transaksi */}
                    <FlatList
                    data={TransactionList}
                    renderItem={({item}) => TransactionItem(item) }
                    />
                </View>   
            :
                //Tampilan ketika TransactionList == null
                <View style={{flex:1, alignItems:'center', marginTop:SIZES.height/4}}>
                    <Icon name="receipt" color="#BDBDBD" size={SIZES.width/4}/>
                    <Text style={{color:TextColor, fontSize:14}}>Ketika kamu menggunakan pelayanan kami,</Text> 
                    <Text style={{color:TextColor, fontSize:14}}>kamu dapat melihatnya disini</Text>
                </View>
            }
        </View>
    );
}