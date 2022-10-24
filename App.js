import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView,TextInput,TouchableOpacity,Button, Alert} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import LoginScreen from './src/views/LoginScreen';
import HomeScreen from './src/views/HomeScreen';
import { app } from './firebase-config';
import {getAuth} from 'firebase/auth'



const Stack = createNativeStackNavigator();

export default function App() {
  const auth = getAuth(app)

  const usuario = auth.currentUser; 

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" >
      {usuario==null
      ?(<><Stack.Screen name="Login" component={LoginScreen}/></>
      ):(<><Stack.Screen name="Home" component={HomeScreen} /></>)}
    </Stack.Navigator>
  </NavigationContainer>
  );
}

//TODO: CAMBIAR EL COLOR DE APP A AMARILLO CON NEGRO ready?
// 'initialRouteName="Login"', lo quite de stack. navigator 