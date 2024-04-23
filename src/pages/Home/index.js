import React, {useState, useEffect} from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, FlatList, ScrollView} from 'react-native';
import { ImageSlider } from "react-native-image-slider-banner";
import { TextInput } from 'react-native-paper';

import {bgHeader, deliveryMenu, foodMenu,messageIcon, notivicationIcon, pharmacyMenu, sampleNewThisWeek, sampleSpecialPromo1, sampleSpecialPromo2, transportMenu } from '../../assets/images';
import SIZES, { ColorPrimary, TextColor, ColorSecondary } from '../../utils/constanta';

export default Home = ({ navigation }) => {
  const [specialPromoList, setSpecialPromoList] = useState();
  const [newThisWeekList, setNewThisWeekList] = useState();

  //Inisiasi dummy data
  const getData = ()=>{
    let dummyDataSpecialPromo = [
      {banner: sampleSpecialPromo1},
      {banner: sampleSpecialPromo2},
      {banner: sampleSpecialPromo1},
      {banner: sampleSpecialPromo2},
      {banner: sampleSpecialPromo1},
      {banner: sampleSpecialPromo2},
    ];

    let dummyDataNewThisWeek = [
      {banner: sampleNewThisWeek},
      {banner: sampleSpecialPromo2}
    ];

    setSpecialPromoList(dummyDataSpecialPromo);
    setNewThisWeekList(dummyDataNewThisWeek);
  }

  //Tampilan item promo spesial
  const SpecialPromoItem = (item) => {
    return(
      <TouchableOpacity style={{margin:10, marginRight:5, borderRadius:10, shadowColor: 'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2}, shadowRadius: 10, elevation: 3, backgroundColor:ColorPrimary}}>
          <Image source={item.banner} style={{width:SIZES.width/2-50, height:SIZES.width/2-100, borderRadius:10}} resizeMode='stretch'/>
      </TouchableOpacity>
    );
  }

  //Tampilan item baru minggu ini
  const NewThisWeekItem = (item) => {
    return(
      <TouchableOpacity style={{marginBottom:10, borderRadius:10, shadowColor: 'black', shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2}, shadowRadius: 10, elevation: 3, backgroundColor:ColorPrimary}}>
          <Image source={item.banner} style={{width:SIZES.width-40, height:SIZES.width/2, borderRadius:10}} resizeMode='stretch'/>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    getData();
  },[]);

  //output tampilan home
  return (
    <View style={{flex:1,backgroundColor:ColorPrimary, paddingBottom:70}}>
      <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
              source={bgHeader}
              style={{paddingBottom:10, height:190  }}>
          </ImageBackground>

          <View style={{position:'absolute', marginLeft:15, marginRight:5, alignItems:'center', justifyContent:'center', top:120}}>
            <ImageSlider 
                data={[
                    {img: require('../../assets/images/HomeBanner.png')},
                    {img: require('../../assets/images/HomeBanner.png')}
                ]}
                localImg
                autoPlay
                timer={5000}
                preview={false}
                closeIconColor="#fff"
                caroselImageStyle={{width:SIZES.width-30, borderRadius:15, height:SIZES.width/2-25, resizeMode:'contain'}}
                caroselImageContainerStyle={{marginRight:10, height:SIZES.width/2+5}}
                activeIndicatorStyle={{width:10, height:10, backgroundColor:'#AAE997'}}
                indicatorContainerStyle={{top:10}}
            />
          </View>

          <View style={{flex:1, marginTop:SIZES.width/2-45}}> 
              <View style={{display:'flex', flexDirection:'row', alignItems:'center', marginHorizontal:15, justifyContent:'space-between'}}>

                {/* redirect ke halaman foodMenu ketika diklik*/}
                <TouchableOpacity onPress={()=>navigation.navigate('TabsFood')} style={{backgroundColor:'rgba(201,241,189,0.3)', borderRadius:15}}>
                    <Image source={foodMenu} style={{width:SIZES.width*0.19, height:SIZES.width*0.19}} resizeMode='contain'/>
                </TouchableOpacity>

                {/* redirect ke halaman deliveryMenu ketika diklik*/}
                <TouchableOpacity onPress={()=>navigation.navigate('DeliveryMenu')} style={{backgroundColor:'rgba(201,241,189,0.3)', borderRadius:15}}>
                    <Image source={deliveryMenu} style={{width:SIZES.width*0.19, height:SIZES.width*0.19}} resizeMode='contain'/>
                </TouchableOpacity>

                {/* redirect ke halaman transportMenu ketika diklik*/}
                <TouchableOpacity onPress={()=>navigation.navigate('TransportMenu')} style={{backgroundColor:'rgba(201,241,189,0.3)', borderRadius:15}}>
                    <Image source={transportMenu} style={{width:SIZES.width*0.19, height:SIZES.width*0.19}} resizeMode='contain'/>
                </TouchableOpacity>

                {/* redirect ke halaman pharmacyMenu ketika diklik*/}
                <TouchableOpacity  onPress={()=>navigation.navigate('PharmacyMenu')} style={{backgroundColor:'rgba(201,241,189,0.3)', borderRadius:15}}>
                    <Image source={pharmacyMenu} style={{width:SIZES.width*0.19, height:SIZES.width*0.19}} resizeMode='contain'/>
                </TouchableOpacity>
              </View>

              <View style={{marginTop:15}}>
                <Text style={{marginTop:20, marginHorizontal:15, fontSize:18, fontWeight:'600', color:TextColor}}>Promo spesial untukmu</Text>
                {/*menampilkan item2 promo spesial*/}
                <FlatList style={{marginHorizontal:15}} 
                  data={specialPromoList}
                  keyExtractor={(item, index) => item.id }
                  renderItem={({item}) => SpecialPromoItem(item) }
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  autoPlay
                /> 
              </View>

              {newThisWeekList?
              <View>            
                <Text style={{marginTop:25, marginBottom:10, fontSize:18, fontWeight:'600', marginLeft:15, color:TextColor}}>Ada yang baru minggu ini</Text>
                  <View style={{alignItems:'center'}}>
                        {/* menampilkan item2 baru minggu ini */}
                        {newThisWeekList.map((item) => NewThisWeekItem(item))}
                  </View>
                
              </View>:null}
                
          </View>
      </ScrollView>
      
      <View style={{position:'absolute', top:0, left:0, padding:15, backgroundColor:ColorSecondary, width:SIZES.width, height:85, alignItems:'center', display:'flex', flexDirection:'row'}}>
              <TextInput
                  theme={{ roundness: 10 }}
                  style={{backgroundColor:'white', height:40, flex:1, overflow:'hidden', borderRadius:10}}
                  placeholder='Search'
                  placeholderTextColor="#BDBDBD"
                  color={ColorSecondary}
                  left={ <TextInput.Icon color="#8C8C8C" icon="search" size={20} /> }
              />

              {/* redirect ke halaman Notivication ketika diklik*/}
              <TouchableOpacity onPress={()=>navigation.navigate("Notification")}>
                  <Image source={notivicationIcon} style={{width:25, margin:10, height:25}} resizeMode='contain'/>
              </TouchableOpacity>

              {/* redirect ke halaman Message ketika diklik*/}
              <TouchableOpacity onPress={()=>navigation.navigate("Message")}>
                 <Image source={messageIcon} style={{width:30, height:25}} resizeMode='contain'/>
              </TouchableOpacity>

      </View>
    </View>
  );
};

