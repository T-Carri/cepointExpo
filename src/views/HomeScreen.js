import { ThemeProvider, createTheme } from '@rneui/themed';
import { StyleSheet, Text, View, ScrollView,TextInput,TouchableOpacity,Button, Alert} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import React, {useContext} from 'react'
import Checador from '../componentes/Checador';
import ControlFacturas from '../componentes/ControlFacturas';
import EstadoNomina from '../componentes/EstadoNomina';
import TuQR from '../componentes/TuQR';
import Bienvenida from '../componentes/Bienvenida';
import { useNavigation } from '@react-navigation/native';
import UsuarioContext from '../context/UsuarioContext';


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function HomeScreen(){
  const navigation = useNavigation();
  const {Usuario} = useContext(UsuarioContext)
  //console.log('lets do it ',Usuario)

  




    return( 
      

      <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}   
    >
       <Drawer.Screen name="Inicio" component={Bienvenida} options={{ title: 'Inicio',  headerStyle: {
            backgroundColor: '#EED317',
          }}} />
      {Usuario.checador&&<Drawer.Screen name="Checador" component={Checador} options={{   headerStyle: {
            backgroundColor: '#EED317',
          }}} />} 
      <Drawer.Screen name="Control de Facturas" component={ControlFacturas}  options={{   headerStyle: {
            backgroundColor: '#EED317',
          }}}/>
      <Drawer.Screen name="Estado de Nomina" component={EstadoNomina} options={{   headerStyle: {
            backgroundColor: '#EED317',
          }}} />
      <Drawer.Screen name="TuQR" component={TuQR} options={{   headerStyle: {
            backgroundColor: '#EED317',
          }}} />
    </Drawer.Navigator>

 
      );
    
  }
  const theme = createTheme({
    lightColors: {
      primary: '#5C5C5C',
    },
    darkColors: {
      primary: '#000',
    },
  });
  