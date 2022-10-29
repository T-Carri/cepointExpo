import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView,TextInput,TouchableOpacity,Button, Alert} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import LoginScreen from './src/views/LoginScreen';
import HomeScreen from './src/views/HomeScreen';
//import ScanScreen from './src/componentes/checador/ScanScreen'
import Scan from './src/componentes/Checador/scan';
//import { app } from './firebase-config';
//import {getAuth} from 'firebase/auth'



const Stack = createNativeStackNavigator();

export default function App() {
  //const auth = getAuth(app)

  //const usuario = auth.currentUser; 

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" >
       <Stack.Screen name="Login" component={LoginScreen}/>
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="scanner" component={Scan} />
       <Stack.Screen name="scanner" component={Scan} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

//TODO: CAMBIAR EL COLOR DE APP A AMARILLO CON NEGRO ready?
// 'initialRouteName="Login"', lo quite de stack. navigator 
 {/*     */}