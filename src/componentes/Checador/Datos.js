import React, { useContext, useEffect } from 'react'
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import { Card, ButtonGroup, Button} from '@rneui/themed';
import RegistroContext from '../../context/RegistroContext'
import Icon from '@mdi/react'
import { mdiAccountClock } from '@mdi/js'
import AsignacionContext from '../../context/AsignacionContext';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../firebase-config';
import UserContext from '../../context/AuthContext';
import { useState } from 'react';
import { storage } from '../../../firebase-config';
import {  ref, uploadBytes, uploadString } from "firebase/storage"
export default function Datos() {
  const navigation = useNavigation();
    const {usuarioAsistencia,
      registro, 
      tipoAsistencia, 
      image, 
      setImage, 
      activaOcupado,
      desactivaOcupado,
      semana  
    } = useContext(RegistroContext)
    const {currentU, putAsistencia , setPostReg, asignacion }= useContext(AsignacionContext)
     const {user} =useContext(UserContext )
     const [Ocupado, setOcupado]= useState()
    const dato= auth.currentUser;
  //calculadora de numero de semana


const nombre = registro.map((e)=>e.nombre)
const ocupado =  registro.map((e)=>e.ocupado).toString()
const presupuesto = asignacion.map((e)=>e.presupuesto)
const date = Date.now()
/* const nombre = registro.map((e)=>e.nombre)

 */

async function uploadFile(file) {
const blob = await new Promise((resolve, reject)=>{
  const xhr = new XMLHttpRequest()
xhr.onload= function (){
  resolve(xhr.response);
};
xhr.responseType ="blob";
xhr.open("GET", file, true);
xhr.send(null) 
})

  const storageRef = ref(storage, `Asistencias/${presupuesto}/${nombre}/${date}`)
  uploadBytes(storageRef, blob).then((snapshot)=>{
    console.log('Uploaded a data_url string!')
  })
  
}

const datoAsistencia= {
  trabajador:  registro.map((e)=>e.nombre).toString(),
  semana: semana, 
  tipoAsistencia: tipoAsistencia==0?'Entrada':'Salida',
  turno: 'get it', 
  date: Date(),  
  identidadChecador: user.uid
}
  

 console.log('usuario asistencia:', usuarioAsistencia)
console.log('ocupado:', ocupado)
console.log('name:', nombre)
console.log('datoAsistencia:', datoAsistencia)
console.log('Datos Image', image)


const handleClick= async ()=>{
  try {
    identificadorAsistencia(datoAsistencia.tipoAsistencia,ocupado).then(
      setImage(null),
       navigation.navigate('Checador')
      ).then(
      uploadFile(image)
        )
        
    }    catch (error) {
     console.log(error)
   }
  
 }
         
        
    
 






//funcion que identifique si esta registrando una entrada o una checada
  const  identificadorAsistencia= async(params, params1)=> {
  //console.log('params: ', params, 'params1    ', params1)
 
  
    if (params==='Entrada'&&params1=='false'){
  activaOcupado().then( 
        await putAsistencia())
      console.log('Ahora ese usuario esta ocupado')
    } else if(params==='Entrada'&&params1=='true'){
  Alert.alert(
    "Usuario Ocupado!",
    "Verifique con recursos humanos su estado o verifique que necesita registrar Entrada",
    [{
      text: "Aceptar", 
      onPress: ()=> navigation.navigate('Checador'),
      style: "cancel"
  
    }], { cancelable: false}
    )} else if(params=='Salida'&&params1=='true'){
      desactivaOcupado().then( 
        await putAsistencia())
      console.log('Ahora ese usuario esta desocupado')
    } else if(params=='Salida'&&params1=='false'){
      Alert.alert(
        "Este Usuario no estaba registrado!",
        "Verifique con recursos humanos su estado o verifique que necesita registrar Salida",
        [{
          text: "Aceptar", 
          onPress: ()=> navigation.navigate('Checador'),
          style: "cancel"
      
        }], { cancelable: false}
        )
    } else{
      console.log('there a error go and find it')
    }
 
}  


const handleClickCamara= ()=>{
  try {
   
        navigation.navigate('camara')
    
   }    catch (error) {
    console.log(error)
  }
 
}

useEffect(
  ()=>{
    setPostReg(datoAsistencia)
    
    
  }
  ,[])

  

  return (
    <View style={{ flex: 1}}>
        <Card style={styles.card}>
  
<Card.Title>  Estas registrando a:  </Card.Title>
<Card.Title style={styles.nombre}>  {registro.map((e)=>e.nombre)}  </Card.Title>
<Card.Title>  {registro.map((e)=>e.empresa)}  </Card.Title>
<Card.Title>  {registro.map((e)=>e.perfil)}  </Card.Title>
<Card.Title>  {registro.map((e)=>e.ocupado)}  </Card.Title>
  <Card.Title>  # {semana} semana  </Card.Title>
   <Card.Title style={styles.EoS}>  {tipoAsistencia==0?'Entrada':'Salida'}     </Card.Title>     
<Card.Title>  {Date()}  </Card.Title>


{image?null:<Button onPress={handleClickCamara}>Tomar foto </Button>}


<Card style={{ flex: 1}}>
  {image&&
      <Button onPress={handleClick}>Registra </Button>}

      <View style={styles.cameraContainer}>
 

      </View>

</Card>
        </Card>
        {image && <Image source={{uri: image}} style={{flex:1}}/>}
    </View>
        
        
  )
}

const styles = StyleSheet.create({
 
 
  nombre:{
    fontSize: 20,
  },
  EoS:{
    fontSize: 30,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
},
  });