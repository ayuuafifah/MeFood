import React, {useEffect} from 'react';
import {ScrollView, ToastAndroid  } from 'react-native';

import{ ColorPrimary } from '../../../../../utils/constanta'
import { Button, HeaderBar, Rating } from '../../../../../components';

export default PharmacyRating = ({ navigation, route}) => {

    //tampilan halaman PharmacyRating
    return(
        <ScrollView style={{flex:1,backgroundColor:ColorPrimary, paddingBottom:70}}>
            <HeaderBar navigation={navigation} headerText='Penilaian' type={2}/>
            <Rating label='driver' item={route.params} />
            <Button label="Submit" 
            action={()=>{
                //redirect ke halaman home
                navigation.navigate('Tabs');
                ToastAndroid.show('Berhasil memberi penilaian',ToastAndroid.SHORT);
            }}
            />
            
        </ScrollView>
    );
}