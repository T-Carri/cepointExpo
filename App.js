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
import Datos from './src/componentes/Checador/Datos'
import Camara from './src/componentes/Checador/Camara';
//import { app } from './firebase-config';
//import {getAuth} from 'firebase/auth'
import {RegistroProvider} from './src/context/RegistroContext'
import { AsignacionProvider } from './src/context/AsignacionContext';
import {AuthContextProvider} from './src/context/AuthContext'
import { UsuarioContextProvider } from './src/context/UsuarioContext';

const Stack = createNativeStackNavigator();

export default function App() {
  //const auth = getAuth(app)

  //const usuario = auth.currentUser; 

  return (
    <AuthContextProvider>
<UsuarioContextProvider>
  <RegistroProvider>
    <AsignacionProvider> 
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" >
       <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
       <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
       <Stack.Screen name="scanner" component={Scan} options={{ headerShown: false }}/>
       <Stack.Screen name="datosRegistroAsistencia" component={Datos}  />
       <Stack.Screen name="camara" component={Camara}  />
    </Stack.Navigator>
  </NavigationContainer>
    </AsignacionProvider>
  </RegistroProvider>
    </UsuarioContextProvider>
    </AuthContextProvider>
  );
}

//TODO: CAMBIAR EL COLOR DE APP A AMARILLO CON NEGRO ready?
// 'initialRouteName="Login"', lo quite de stack. navigator 
