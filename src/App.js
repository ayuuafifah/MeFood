import React from 'react';
import { PaperProvider,Card, Avatar, Button} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import {StatusBar} from 'react-native';
import Routes from './routes';
import { ColorPrimary } from './utils/constanta';
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Entypo";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider
         settings={{
          icon: props => <Icon {...props} />,
          icon2: props => <Icon2 {...props} />,
        }}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Routes/>
        </GestureHandlerRootView>
      </PaperProvider>
    </NavigationContainer>
  );
}