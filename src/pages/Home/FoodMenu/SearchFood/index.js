import React, {useState, useEffect} from 'react';
import { View, Text,  TouchableOpacity, Image, FlatList } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from "react-native-vector-icons/Entypo";

import SIZES, { ColorPrimary, TextColor } from '../../../../utils/constanta';
import { dummyDataFoods } from '../../../../utils/StaticDatabase';

export default SearchFood = ({ navigation }) => {
    const [searchHistory, setSearchHistory] = useState();
    const [keyword, setKeyword] = useState();

    //Inisiasi dummy data
    const getData = ()=>{
        let dummyDataHistory = [
          {keyword: 'Mie Ayam'},
          {keyword: 'Bakso'},
          {keyword: 'Ayam Geprek'}
        ];
         
        setSearchHistory(dummyDataHistory);
    }

    //menambahkan riwayat pencarian
    const addSearchHistory = (keyword) => {
        if(keyword){
            searchHistory.push({keyword: keyword});
            console.log(searchHistory);
        }
    }

    //menghapus riwayat pencarian
    const deleteSearchHistory = (index) =>{
        if(index){
            setSearchHistory(searchHistory.slice(0, index))
        }else{
            setSearchHistory();
        }
    }

    //tampilan item2 makanan
    const FoodItem = (item)=>{
        return(
            !( item.name.toLowerCase().includes(keyword.toLowerCase())) ? null :
            <TouchableOpacity style={{margin:5, marginHorizontal:15}}>
                <View style={{width:SIZES.width-30, display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <Image source={item.picture} style={{width:95, height:95, borderRadius:15}} resizeMode='contain' />
                    <View style={{overflow:'hidden', marginHorizontal:5, height:110, justifyContent:'center', paddingLeft:5}}> 
                        <Text style={{color:TextColor, fontSize:18}}>{item.name}</Text>
                        {/* <Text style={{color:TextColor, marginVertical:3, fontSize:14}}>{item.category}</Text> */}
                        <View style={{flexDirection:'row', alignItems:'baseline'}}>
                            <Icon name='star' size={18} color="#F2C94C"/>
                            <Text style={{color:TextColor, fontSize:14, marginLeft:5}}>{item.rating}</Text> 
                            <View style={{backgroundColor:"#D9D9D9", borderRadius:5, margin:7, width:7, height:7}} />
                            <Text style={{color:TextColor, fontSize:14}}>{item.distance>=100? item.distance/1000 :item.distance} {item.distance>=100? "km":"m"}</Text>
                            <View style={{backgroundColor:"#D9D9D9", borderRadius:5, margin:7, width:7, height:7}} />
                            <Text style={{color:TextColor, fontSize:14}}>{item.orderTimeEstimation}</Text>
                        </View>
                        <Text style={{color:TextColor, fontSize:18}}>{item.price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            );
        }

    useEffect(() => {
        getData();
    },[]);

    return(
        <View style={{flex:1,backgroundColor:ColorPrimary}}>
             <TextInput
                  theme={{ roundness: 10 }}
                  style={{backgroundColor:'white', margin:15, marginTop:25, borderColor:'#D9D9D9', borderWidth:2, height:40, borderRadius:10}}
                  placeholder='Pesan Apa'
                  placeholderTextColor="#BDBDBD"
                  left={ <TextInput.Icon color="#8C8C8C" icon="search" size={20} /> }
                  value={keyword}
                  onChangeText={text=> setKeyword(text)}
                  onEndEditing={() => addSearchHistory(keyword)}
            />

             {keyword?
                    //Tampilan ketika menggunakan fitur search
                    <View> 
                        {/* menampilkan daftar makanan sesuai keyword */}
                        <FlatList
                        data={dummyDataFoods}
                        renderItem={({item}) => FoodItem(item)}
                        />
                    </View>
                :
                    //Tampilan ketika tidak menggunakan fitur search
                    searchHistory?
                        <View>
                            <View style={{flexDirection:'row', margin:15, alignItems:'center', justifyContent:'space-between'}}>
                                <Text style={{fontSize:16, color:TextColor}} >Riwayat pencarian</Text>
                                <TouchableOpacity onPress={()=>deleteSearchHistory()}><Text  style={{fontSize:16, color:'#BDBDBD'}}>Bersihkan semua</Text></TouchableOpacity> 
                            </View>
                             {/* menampilkan daftar riwayat pencarian */}   
                            <FlatList
                            data={searchHistory}
                            renderItem={({item, index}) => {
                                return(  
                                        <TouchableOpacity onPress={()=> setKeyword(item.keyword)} style={{width:SIZES.width, flexDirection:'row',padding:15, alignItems:'center'}}>
                                            <Icon name='back-in-time' size={25} color={TextColor}/>
                                            <Text style={{marginHorizontal:10, fontSize:16, color:TextColor, marginRight:'auto'}}>{item.keyword}</Text>
                                            <Icon name='cross' size={25} color={TextColor} onPress={()=>deleteSearchHistory(index)} />
                                        </TouchableOpacity>
                                    )}}
                            />
                        </View>
                    : null
            }
        </View>
    );
}