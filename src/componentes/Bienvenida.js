import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { Card, Text, Button } from '@rneui/themed';
import { auth } from '../../firebase-config';
import { useNavigation } from '@react-navigation/native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from '../context/AuthContext';
import CepointContext from '../context/CepointContext';
export default function Bienvenida() {
  const {logout}= useContext(UserContext)
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const {state} = useContext(CepointContext)

  const handleSignOut = async()=>{
    try{
      await logout(auth).then(
        async()=>{
         navigation.replace("Login")
         await AsyncStorage.removeItem('Auth Token')
         let authToken = await AsyncStorage.getItem('Auth Token')
         console.log('Token: ', authToken)
       })
       console.log('You are logged out')
     } catch(e) {
       setError(e.message)
       console.log(error)
       throw error;
     }
   };
       
        
                  
                
  



  return (
    <View>
       <Card>
          <Card.Title style={styles.home}>{state.userAccessDetail?state.userAccessDetail.empresa:null}</Card.Title>
          <Card.Divider />
          <Text style={styles.fonts} h4>Bienvenido  {state.userAccessDetail?state.userAccessDetail.empresa:null} test</Text>
 


<Button onPress={handleSignOut}>Salir</Button>



        </Card>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    fonts: {
      marginBottom: 8,
    },
    user: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    image: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    name: {
      fontSize: 16,
      marginTop: 5,
    },

    home:{
      fontSize: 30,
    }
    });
  //TODO: ventana lateral con funciones de app segun tu sesion 
  //Bienvenido fulanito
  //Tu empresa
  //Estado con alamacen 
  //   inicio    |   notificaciones
  