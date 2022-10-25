import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Text, Button } from '@rneui/themed';
import { auth } from '../../firebase-config';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc} from "firebase/firestore";
export default function Bienvenida() {
  const navigation = useNavigation();
  const handleSignOut= () => {
auth.signOut()
.then(()=> {
  navigation.replace("Login")
})
.catch(error=> alert(error.message))

  }

  const dato= auth.currentUser;
  if (dato!==null){
    console.log( "email", dato.email )
  }

  const [usuario, setUsuario] = useState('')
  /* const identidad = { 
    nombre,
    perfil,
    empresa, 
    activo, 
    ocupado
  }
 */
/*    useEffect(()=>{
    const querydb=getFirestore();
    const queryDoc = doc(querydb, "users", dato.uid);
    getDoc(queryDoc).then(res => {
      setUsuario(res.data())
      console.log( res.data().rol)
 }    )
  },[])   */ 


  return (
    <View>
       <Card>
          <Card.Title>SECMA</Card.Title>
          <Card.Divider />
 
 <Text style={styles.fonts} h2> Come on boy  </Text>


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
    });
  //TODO: ventana lateral con funciones de app segun tu sesion 
  //Bienvenido fulanito
  //Tu empresa
  //Estado con alamacen 
  //   inicio    |   notificaciones
  