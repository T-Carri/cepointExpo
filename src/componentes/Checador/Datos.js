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
import CepointContext from '../../context/CepointContext';
import { TYPES } from '../../redux/GlobalState';
export default function Datos() {
  const navigation = useNavigation();
  const {dispatch, state,   activaOcupado,
    desactivaOcupado }=useContext(CepointContext)



    const {
      usuarioAsistencia,
      tipoAsistencia, 
    
      
    
      semana  
    } = useContext(RegistroContext)

    const {currentU, putAsistencia , setPostReg, asignacion, postReg }= useContext(AsignacionContext)
     
    
    const {user} =useContext(UserContext )

     const [Ocupado, setOcupado]= useState()
    const dato= auth.currentUser;
  //calculadora de numero de semana



const ocupado =  state?state.RegistroAsistenciaDetail.ocupado:null

//const date = datoAsistencia.clave&&datoAsistencia.clave

//console.log('POSTREG: ', postReg)
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

  const storageRef = ref(storage, `Asistencias/${state?state.RegistroAsistenciaDetail.presupuesto:null}/${state?state.RegistroAsistenciaDetail.nombre:null}/${postReg.clave}`)
  uploadBytes(storageRef, blob).then((snapshot)=>{
    console.log('Uploaded a data_url string!')
  })
  
}

const datoAsistencia= {
  trabajador:  state?state.RegistroAsistenciaDetail.nombre:null,
  semana: semana, 
  tipoAsistencia: tipoAsistencia==0?'Entrada':'Salida',
  clave: Date.now(),
  date: Date(),  
  presupuesto: asignacion.map((e)=>e.presupuesto).toString(),
  identidadChecador: user.uid
}
  

/*  console.log('usuario asistencia:', usuarioAsistencia)
console.log('ocupado:', ocupado)
console.log('name:', nombre)
console.log('datoAsistencia:', datoAsistencia)
console.log('Datos Image', image)
 */

const handleClick= async ()=>{
  try {
    identificadorAsistencia(datoAsistencia.tipoAsistencia,ocupado).then(
      dispatch({type: TYPES.REGISTRO_PHOTO, payload:null }),
       navigation.navigate('Checador')
      ).then(
      uploadFile(state.RegistroPhotoDetail)
        )
        
    }    catch (error) {
     console.log(error)
   }
  
 }
         
        
    
 






//funcion que identifique si esta registrando una entrada o una checada
  const  identificadorAsistencia= async(params, params1)=> {
  //console.log('params: ', params, 'params1    ', params1)
 
  
    if (params==='Entrada'&&params1=='false'){
  activaOcupado( state?state.RegistroAsistenciaDetail.UID:null).then( 
        await putAsistencia())
      console.log('Ahora ese usuario esta ocupado')
    } else if(params==='Entrada'&&params1=='true'){
         
      activaOcupado(state?state.RegistroAsistenciaDetail.UID:null).then( 
        await putAsistencia())
      console.log('Ahora ese usuario esta ocupado')

    } else if(params=='Salida'&&params1=='true'){
      desactivaOcupado(state?state.RegistroAsistenciaDetail.UID:null).then( 
        await putAsistencia())
      console.log('Ahora ese usuario esta desocupado')
    } else if(params=='Salida'&&params1=='false'){
      desactivaOcupado(state?state.RegistroAsistenciaDetail.UID:null).then( 
        await putAsistencia())
      console.log('Ahora ese usuario esta desocupado')
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
<Card.Title style={styles.nombre}>  {state?state.RegistroAsistenciaDetail.nombre:null}  </Card.Title>
<Card.Title>  {state?state.RegistroAsistenciaDetail.empresa:null}  </Card.Title>
<Card.Title>  {state?state.RegistroAsistenciaDetail.perfil:null}  </Card.Title>
<Card.Title>  {state?state.RegistroAsistenciaDetail.ocupado:null}  </Card.Title>
  <Card.Title>  # {semana} semana  </Card.Title>
   <Card.Title style={styles.EoS}>  {tipoAsistencia==0?'Entrada':'Salida'}     </Card.Title>     
<Card.Title>  {Date()}  </Card.Title>


{state.RegistroPhotoDetail?null:<Button onPress={handleClickCamara}>Tomar foto </Button>}


<Card style={{ flex: 1}}>
  {state.RegistroPhotoDetail&&
      <Button onPress={handleClick}>Registra </Button>}

      <View style={styles.cameraContainer}>
 

      </View>

</Card>
        </Card>
        {state.RegistroPhotoDetail && <Image source={{uri: state.RegistroPhotoDetail}} style={{flex:1}}/>}
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