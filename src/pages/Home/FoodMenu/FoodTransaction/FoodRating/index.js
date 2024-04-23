import React, { useEffect} from 'react';
import { ScrollView, ToastAndroid  } from 'react-native';

import { ColorPrimary } from '../../../../../utils/constanta'
import { Button, Rating, HeaderBar } from '../../../../../components';

export default FoodRating = ({ navigation, route}) => {
    const {item} = route.params;

    useEffect(()=>{
        console.log(item);
    },[])

    //output tampilan halaman foodRating
    return(
        <ScrollView style={{flex:1,backgroundColor:ColorPrimary, paddingBottom:70}}>
            <HeaderBar navigation={navigation} headerText='Penilaian' type={2}/>
            <Rating label='driver' item={item} />
            <Rating label='resto' item={item} />
            <Button label="Submit" 
                action={()=>{
                    navigation.navigate('FoodTransaction');//redirect ke halaman foodTransaction
                    ToastAndroid.show('Berhasil memberi penilaian',ToastAndroid.SHORT);
                }}
            />
        </ScrollView>
    );
}