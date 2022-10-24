import { ThemeProvider, createTheme } from '@rneui/themed';
import { StyleSheet, Text, View, ScrollView,TextInput,TouchableOpacity,Button, Alert} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Checador from '../componentes/Checador';
import ControlFacturas from '../componentes/ControlFacturas';
import EstadoNomina from '../componentes/EstadoNomina';
import TuQR from '../componentes/TuQR';
import Bienvenida from '../componentes/Bienvenida';

function CustomDrawerContent(props) {
  return (
    
    <DrawerContentScrollView {...props}>
      
      <DrawerItemList {...props} />

  </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function HomeScreen(){

    return(
      <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
       <Drawer.Screen name="Inicio" component={Bienvenida} />
      <Drawer.Screen name="Checador" component={Checador} />
      <Drawer.Screen name="Control de Facturas" component={ControlFacturas} />
      <Drawer.Screen name="Estado de Nomina" component={EstadoNomina} />
      <Drawer.Screen name="TuQR" component={TuQR} />
      
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
  