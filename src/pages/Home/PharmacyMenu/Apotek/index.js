import React, {useState, useEffect} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, FlatList, ScrollView  } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../../../utils/constanta';


export default Apotek = ({ navigation, route}) => {
    const {apotek} = route.params;
    const [medicineList, setMedicineList]= useState();
    const [keyword, setKeyword] = useState('');

    //inisiasi data dummy
    const getData = ()=>{
        setMedicineList(apotek.medicine);
    }

    //Tampilan item obat
    const MedicineItem = (item)=>{
        return(
            keyword =='' || keyword == null || item.name.toLowerCase().includes(keyword.toLowerCase()) ?
                <TouchableOpacity onPress={()=>navigation.navigate('Medicine',{medicine:item})} style={{width:SIZES.width/2-25, marginTop:25, height:SIZES.width/2+15, padding:5, borderRadius:15, borderColor:'#BDBDBD', alignItems:'center', borderWidth:1}}>
                    
                    <Image source={item.picture} imageStyle={{ borderRadius: 15}} style={{ marginTop:10, width:SIZES.width/3.5, height:SIZES.width/3.5}} resizeMode='stretch'/>
                    
                    <TouchableOpacity style={{backgroundColor:item.iconColor, width:25, height:25, borderRadius:15, position:'absolute', borderWidth:1, borderColor:TextColor, right:10, top:10}}/>
                    <View style={{height:75, justifyContent:'space-around', width:'100%', marginTop:'auto'}}>
                        <Text style={{color:TextColor,fontWeight:'bold', fontSize:16}}>{item.name}</Text>
                        <Text style={{color:TextColor,fontWeight:'bold', fontSize:16}}>{item.price}<Text style={{color:'#DDDDDD'}}> / {item.package}</Text></Text>
                    </View>
                
                </TouchableOpacity>
            :null
            );
        }


    useEffect(() => {
        getData();
      },[]);

    //output tampilan halaman Apotek
    return(
        <View style={{flex:1, backgroundColor:ColorPrimary}}>
            <ImageBackground source={apotek.banner} style={{height:180}}>
                <View style={{ flexDirection:'row', alignItems:'center', margin:15}}>
                    <View style={{marginBottom:10, backgroundColor:ColorPrimary, padding:3, borderRadius:20}}  >
                        <Icon           
                            name='arrow-left'            
                            size={28}
                            color={TextColor}
                            onPress={()=>navigation.goBack()}
                        />
                    </View>
            
                    <TextInput
                        theme={{ roundness: 10 }}
                        style={{backgroundColor:'white', margin:10, borderColor:'#D9D9D9', borderWidth:2, height:40, flex:1, borderRadius:10}}
                        placeholder='Cari obat apa?'
                        placeholderTextColor="#BDBDBD"
                        value={keyword}
                        onChangeText={(text)=>setKeyword(text)}
                        left={ <TextInput.Icon color="#8C8C8C" icon="search" size={20} /> }
                    />

                    <View style={{backgroundColor:ColorPrimary, padding:3, borderRadius:20}}  >
                        <Icon            
                            name='share-variant-outline'            
                            size={28}
                            color={TextColor}
                        />
                    </View>
                </View>
            </ImageBackground>

            <View style={{marginHorizontal:15, paddingVertical:10}}>
                <Text style={{color:TextColor, fontSize:16, fontWeight:'bold'}}>{apotek.name}</Text>
                <Text style={{color:TextColor, marginVertical:5}}>{apotek.address}</Text>
                <View style={{flexDirection:'row', alignItems:'baseline'}}>
                        <Icon name='star' size={18} color="#F2C94C"/>
                        <Text style={{color:TextColor, fontSize:14, marginLeft:5}}>{apotek.rating}</Text> 
                        <View style={{backgroundColor:"#D9D9D9", borderRadius:5, margin:7, width:7, height:7}} />
                        <Text style={{color:TextColor, fontSize:14}}>{apotek.distance>=100? apotek.distance/1000 :apotek.distance} {apotek.distance>=100? "km":"m"}</Text>
                        <View style={{backgroundColor:"#D9D9D9", borderRadius:5, margin:7, width:7, height:7}} />
                        <Text style={{color:TextColor, fontSize:14}}>{apotek.orderTimeEstimation}</Text>
                </View>
            </View>

            {medicineList?
                //tampilan ketikan medicineList != Null
                <View style={{flex:1}}>
                    <Text style={{color:TextColor, fontSize:16, fontWeight:'bold', marginLeft:15, marginTop:10}}>Lihat Produk</Text>
                    {/* menampilkan daftar obat */}
                    <FlatList
                        style={{marginHorizontal:15, marginBottom:15}}
                        columnWrapperStyle={{justifyContent:'space-between'}}
                        numColumns={2}
                        keyExtractor={(item, index) => item.id }
                        data={medicineList}
                        renderItem={({item}) => MedicineItem(item) }
                        showsVerticalScrollIndicator={false}
                    />
                </View>   
            :null}
           
        </View>
    );
}