import React, { useContext, useEffect } from 'react'
import {  View, StyleSheet, Image } from 'react-native';
import { Card, Button} from '@rneui/themed';

import Icon from '@mdi/react'
import { mdiAccountClock } from '@mdi/js'

import { useNavigation } from '@react-navigation/native';

import UserContext from '../../context/AuthContext';

import { storage } from '../../../firebase-config';
import {  ref, uploadBytes } from "firebase/storage"
import CepointContext from '../../context/CepointContext';
import { TYPES } from '../../redux/GlobalState';
export default function Datos() {
  const navigation = useNavigation();
  const {dispatch, state,   activaOcupado,
    desactivaOcupado, semana, putAsistencia }=useContext(CepointContext)
    const {user} =useContext(UserContext )
 
    console.log('TIPO ASISTENCIA', state.TipoAsistenciaDetail )
    
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
    
      const storageRef = ref(storage, `Asistencias/${state?state.PresupuestoDetail.presupuesto:null}/${state?state.RegistroAsistenciaDetail.nombre:null}/${state.UsuarioAsistenciaDetail?state.UsuarioAsistenciaDetail.clave:null}`)
      uploadBytes(storageRef, blob).then((snapshot)=>{
        console.log('Uploaded a data_url string!')
      })
      
    }
    
    const datoAsistencia= {
      trabajador:  state?state.RegistroAsistenciaDetail.nombre:null,
      semana: semana, 
      tipoAsistencia: state.TipoAsistenciaDetail==0?'Entrada':'Salida',
      clave: Date.now(),
      date: Date(),  
      presupuesto:state.PresupuestoDetail?state.PresupuestoDetail.presupuesto:null,
      identidadChecador: user.uid
    }
      
    
    
    const handleClick= async ()=>{
      try {
        identificadorAsistencia(datoAsistencia.tipoAsistencia,  state?state.RegistroAsistenciaDetail.ocupado:null).then(
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
      
     
      
        if (params==='Entrada'&&params1=='false'){
      activaOcupado( state?state.RegistroAsistenciaDetail.UID:null).then( 
            await putAsistencia(state?state.PresupuestoDetail.idProyecto:null))
          console.log('Ahora ese usuario esta ocupado')
        } else if(params==='Entrada'&&params1=='true'){
             
          activaOcupado(state?state.RegistroAsistenciaDetail.UID:null).then( 
            await putAsistencia(state?state.PresupuestoDetail.idProyecto:null))
          console.log('Ahora ese usuario esta ocupado')
    
        } else if(params=='Salida'&&params1=='true'){
          desactivaOcupado(state?state.RegistroAsistenciaDetail.UID:null).then( 
            await putAsistencia(state?state.PresupuestoDetail.idProyecto:null))
          console.log('Ahora ese usuario esta desocupado')
        } else if(params=='Salida'&&params1=='false'){
          desactivaOcupado(state?state.RegistroAsistenciaDetail.UID:null).then( 
            await putAsistencia(state?state.PresupuestoDetail.idProyecto:null))
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
        dispatch({type:TYPES.SET_USUARIO_ASISTENCIA , payload:datoAsistencia})
        
        
      }
      ,[])
    
      
    console.log('STATEEEEEEEEEETOTALPERRO', state)
      return (
        <View style={{ flex: 1}}>
            <Card style={styles.card}>
      
    <Card.Title>  Estas registrando a:  </Card.Title>
    <Card.Title style={styles.nombre}>  {state?state.RegistroAsistenciaDetail.nombre:null}  </Card.Title>
    <Card.Title>  {state?state.RegistroAsistenciaDetail.empresa:null}  </Card.Title>
    <Card.Title>  {state?state.RegistroAsistenciaDetail.perfil:null}  </Card.Title>
    <Card.Title>  {state?state.RegistroAsistenciaDetail.ocupado:null}  </Card.Title>
      <Card.Title>  # {semana} semana  </Card.Title>
       <Card.Title style={styles.EoS}>  {state.TipoAsistenciaDetail==0?'Entrada':'Salida'}     </Card.Title>     
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


    
      
    

    
  

     

















