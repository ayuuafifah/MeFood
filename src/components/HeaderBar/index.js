import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import SIZES, { TextColor } from '../../utils/constanta';

const HeaderBar = ({navigation, headerText, type, page}) => {
  return (
    type == 1?
    <View style={{marginHorizontal:15, paddingTop:35, paddingBottom:25, borderBottomWidth:3, borderColor:'#BDBDBD'}}>
      <Text style={{fontSize:38, color:TextColor, fontFamily:'DMSans-Bold'}}>{headerText}</Text>
    </View>
    :type == 2 ?
    
      <View style={styles.viewStyle2}>
          <View style={{position:'absolute', left:0, top:25}}>
            <Icon            
                  name='arrow-back'            
                  size={30}
                  color={TextColor}
                  onPress={()=>page? navigation.navigate(page):navigation.goBack()}
              />
          </View>
            
          
        
          <Text style={{marginTop:30, fontWeight:'bold', color:TextColor, fontFamily:'DMSans-Bold', fontSize:16 }}>{headerText}</Text>
          
          
      </View>  
    :
      <View>
          <View style={styles.viewStyle1}>
              <Icon            
                  name='arrow-back'            
                  size={30}
                  color={TextColor}
                  onPress={()=>navigation.goBack()}
              />
          </View>

          <Text style={styles.textStyle}>{headerText}</Text>
      </View>
  );
};

const styles = {
  viewStyle1: {
    justifyContent : 'center',
    height:60,
    margin: 15
  },

  viewStyle2: {
    display:'flex',
    flexDirection:'row',
    alignItem : 'center',
    justifyContent:'center',
    height:80,
    borderBottomWidth:3,
    borderBottomColor:'#DDDDDD',
    marginHorizontal:15,

  },

  textStyle: {
    padding:15,
    paddingTop:50,
    fontSize:30,
    fontWeight:'bold',
    color:TextColor,
    fontFamily:'DMSans-Bold',
  }
};

export default HeaderBar;