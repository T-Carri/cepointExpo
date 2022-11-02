import { ThemeProvider, createTheme } from '@rneui/themed';
import { StyleSheet, Text, View, ScrollView,TextInput,TouchableOpacity,Button, Alert} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { app } from '../../firebase-config';
import {getAuth} from 'firebase/auth'
import { getFirestore, doc, getDoc} from "firebase/firestore"
import React, {useContext} from 'react'
import Checador from '../componentes/Checador';
import ControlFacturas from '../componentes/ControlFacturas';
import EstadoNomina from '../componentes/EstadoNomina';
import TuQR from '../componentes/TuQR';
import Bienvenida from '../componentes/Bienvenida';
import {AsignacionProvider} from '../context/AsignacionContext'
import UserContext from '../context/AuthContext';
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function HomeScreen(){
  const {user}= useContext(UserContext)
  const [rol, setUserRol]= React.useState('')
  const auth = getAuth(app);
  const dato= auth.currentUser;
  if (dato!==null){
    console.log( "uid desde homescreen", dato.uid )
  }

  React.useEffect(()=>{
    const querydb=getFirestore();
    const queryDoc = doc(querydb, "users", user.uid);
    getDoc(queryDoc).then(res => {
      setUserRol(res.data())
      console.log( res.data().rol)
 }    )
  },[]) 


    return( 
      

      <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}   
    >
       <Drawer.Screen name="Inicio" component={Bienvenida} options={{ title: 'Inicio',  headerStyle: {
            backgroundColor: '#EED317',
          }}} />
      {rol.checador?(<Drawer.Screen name="Checador" component={Checador} options={{   headerStyle: {
            backgroundColor: '#EED317',
          }}} />):null}
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
  