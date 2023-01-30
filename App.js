
import { NavigationContainer, StackActions } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import React from 'react';
import LoginScreen from './src/views/LoginScreen';
import HomeScreen from './src/views/HomeScreen';

import Scan from './src/componentes/Checador/scan';

import Datos from './src/componentes/Checador/Datos';
import Camara from './src/componentes/Checador/Camara';
import FaceRecognition from './src/componentes/Checador/CamaraReconocimientoFacial';
import {AuthContextProvider} from './src/context/AuthContext'

import { CepointContextProvider } from './src/context/CepointContext';
const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <AuthContextProvider>
    <CepointContextProvider>


   
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" >
       <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
       <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
       <Stack.Screen name="scanner" component={Scan} options={{ headerShown: false }}/>
       {/* <Stack.Screen name="datosRegistroAsistencia" component={Datos}  /> */}
        <Stack.Screen name="camara" component={Camara}  /> 
       <Stack.Screen name="camaraRF1" component={FaceRecognition} options={{ headerShown: true }} />
    </Stack.Navigator>
  </NavigationContainer>
  
   
    </CepointContextProvider>
    </AuthContextProvider>
  );
}


