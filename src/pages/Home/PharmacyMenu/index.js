import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { sampleInformation } from '../../../assets/images';
import SIZES, { ColorPrimary, TextColor } from '../../../utils/constanta';
import { dummyDataApotek } from '../../../utils/StaticDatabase';

export default PharmacyMenu = ({ navigation }) => {
    const [informationList, setInformationList] = useState([]);
    const [apotekList, setApotekList] = useState([]);

    //Inisiasi data dummy
    const getData = ()=>{
        let dummyInformations = [
            {banner: sampleInformation}
        ];
        setApotekList(dummyDataApotek);
        setInformationList(dummyInformations);
    }

    //tampilan item informasi
    const InformationItem = (item) => {
        return(
        <TouchableOpacity style={{margin:5, marginLeft:15, borderRadius:25}}>
            <Image source={item.banner} style={{width:SIZES.width-60, height:(SIZES.width-80)*0.75, borderRadius:15,}} resizeMode='stretch'/>
        </TouchableOpacity>
        );
    }

    //tampilan item apotek
    const ApotekItem = (item) => {
        return(
            <TouchableOpacity onPress={()=>navigation.navigate('Apotek', {apotek:item})} style={{width:SIZES.width-30, flexDirection:'row', alignItems:'center'}}>
                    <Image source={item.picture} style={{width:90, height:90, borderRadius:15}} resizeMode='contain' />
                    <View style={{overflow:'hidden', marginHorizontal:5, height:100, paddingLeft:5, justifyContent:'center'}}> 
                        <Text style={{color:TextColor, fontSize:16, fontWeight:'bold'}}>{item.name}</Text>
                        <View style={{flexDirection:'row',marginTop:10, alignItems:'baseline'}}>
                            <Icon name='star' size={18} color="#F2C94C"/>
                            <Text style={{color:TextColor, fontSize:14, marginLeft:5}}>{item.rating}</Text> 
                            <View style={{backgroundColor:"#D9D9D9", borderRadius:5, margin:7, width:7, height:7}} />
                            <Text style={{color:TextColor, fontSize:14}}>{item.distance>=100? item.distance/1000 :item.distance} {item.distance>=100? "km":"m"}</Text>
                            <View style={{backgroundColor:"#D9D9D9", borderRadius:5, margin:7, width:7, height:7}} />
                            <Text style={{color:TextColor, fontSize:14}}>{item.orderTimeEstimation}</Text>
                        </View>
                    </View>
            </TouchableOpacity>
        );
    }


    useEffect(() => {
        getData();
      },[]);

    //output tampilan halaman Pahrmacy menu
    return(
        <View style={{flex:1, backgroundColor:ColorPrimary}}>
            <View style={{flexDirection:'row', margin:15, marginTop:25, alignItems:'center'}}>
             <Icon            
                  name='arrow-left'            
                  size={30}
                  color={TextColor}
                  onPress={()=>navigation.goBack()}
              />
                <View style={{marginLeft:'auto', marginRight:'auto', paddingRight:45}}>
                    <Text style={{color:TextColor, fontSize:20, fontWeight:'bold' }}>
                        Pharmacy
                    </Text>
                </View>
            </View>
            
            {informationList?
                //menampilkan daftar informasi
                <View>
                    <FlatList style={{marginHorizontal:15}} 
                        data={informationList}
                        renderItem={({item}) => InformationItem(item) }
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            :null}

            {apotekList?
                //Tampilan ketika apotek list != null
                <View>
                    <View style={{marginTop:25, marginHorizontal:15, justifyContent:'space-between', flexDirection:'row'}}>
                        <Text style={{fontSize:16, color:TextColor, fontWeight:'bold'}}>Semua Apotek</Text>
                        <TouchableOpacity 
                            style={{flexDirection:'row', alignItems:'center'}}
                        >
                            <Text style={{color:'#BDBDBD', fontSize:14}}> 
                                Lihat semua
                            </Text>
                            <Icon
                                name='chevron-right'
                                size={25}
                                color='#BDBDBD'
                            />
                        </TouchableOpacity>
                    </View>
                    
                    {/* menampilkan daftar apotek */}
                    <FlatList 
                        style={{height:SIZES.height-((SIZES.width-80)*0.75)-100, marginHorizontal:15}} 
                        data={apotekList}
                        renderItem={({item}) => ApotekItem(item)}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            :null}
        </View>
    );
}