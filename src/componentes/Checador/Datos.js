import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Button } from '@rneui/themed';
import moment from 'moment';

import { useNavigation } from '@react-navigation/native';
import UserContext from '../../context/AuthContext';
import { storage } from '../../../firebase-config';
import { ref,  uploadBytes } from "firebase/storage";
import CepointContext from '../../context/CepointContext';
import { TYPES } from '../../redux/GlobalState';

const Datos = () => {
// state

const [error, setError] = useState(null);
const { user } = useContext(UserContext);
const { dispatch, state, activaOcupado, desactivaOcupado, semana, putAsistencia, TipoAsistencia } = useContext(CepointContext);

// Navigation
const navigation = useNavigation();









// Create data for attendance
const datoAsistencia = {
trabajador: state?.RegistroAsistenciaDetail.nombre || null,
semana: semana,
tipoAsistencia: TipoAsistencia === 0 ? 'Entrada' : 'Salida',
clave: Date.now(),
date: Date(),
presupuesto: state.PresupuestoDetail?.presupuesto || null,
flag:state.PresupuestoDetail?.Estado || null,
identidadChecador: user.uid,
latitud:state.LocationDetail?state.LocationDetail.coords.latitude: null,
longitud: state.LocationDetail?state.LocationDetail.coords.longitude : null
}

const handleClick = async () => {
try {
// Dispatch action
identificadorAsistencia(datoAsistencia.tipoAsistencia, state?.RegistroAsistenciaDetail.ocupado).then(
  await  uploadFile(state.RegistroPhotoDetail),
    navigation.navigate('Checador')
);
// Upload file to Firebase Storage

} 
 catch (error) {
    console.log(error)
}

}



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
    
      const storageRef = ref(storage, `Asistencias/${state?state.PresupuestoDetail.presupuesto:null}/${state?state.RegistroAsistenciaDetail.nombre:null}/${state?state.PutAsistenciaDetail.clave:null}`)
      uploadBytes(storageRef, blob).then((snapshot)=>{
        console.log('Uploaded a data_url string!')
      })
      
    } 

const  identificadorAsistencia= async(params, params1)=> {
      
     
    if (params==='Entrada'&&params1==false){
                       activaOcupado( state?state.RegistroAsistenciaDetail.UID:null).then( 
                       await putAsistencia(state?state.PresupuestoDetail.idProyecto:null))
                           console.log('Ahora ese usuario esta ocupado')
  } else if(params==='Entrada'&&params1==true){
         
                       activaOcupado(state?state.RegistroAsistenciaDetail.UID:null).then( 
                       await putAsistencia(state?state.PresupuestoDetail.idProyecto:null))
                       console.log('Ahora ese usuario esta ocupado')

 } else if(params=='Salida'&&params1==true){
                     desactivaOcupado(state?state.RegistroAsistenciaDetail.UID:null).then( 
                     await putAsistencia(state?state.PresupuestoDetail.idProyecto:null))
                     console.log('Ahora ese usuario esta desocupado')
 } else if(params=='Salida'&&params1==false){
                     desactivaOcupado(state?state.RegistroAsistenciaDetail.UID:null).then( 
                     await putAsistencia(state?state.PresupuestoDetail.idProyecto:null))
                     console.log('Ahora ese usuario esta desocupado')
} else{
      console.log('there a error go and find it')
    }
 
}   




console.log('DATOS PUT ASISTENCIA', state?state.PutAsistenciaDetail:null, state.LocationDetail?state.LocationDetail: null)





   useEffect(
    ()=>{
        dispatch({
            type: TYPES.PUT_ASISTENCIA,
            payload: datoAsistencia
            })
      
      
    }
    ,[]) 






    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title style={styles.title}>Estas registrando a:</Card.Title>
          <Card.Title style={styles.name}>{state ? state.RegistroAsistenciaDetail.nombre : null}</Card.Title>
          <Card.Title style={styles.subtitle}>{state ? state.RegistroAsistenciaDetail.empresa : null}</Card.Title>
          <Card.Title style={styles.subtitle}>{state ? state.RegistroAsistenciaDetail.perfil : null}</Card.Title>
          <Card.Title style={styles.subtitle}>{state ? state.RegistroAsistenciaDetail.ocupado : null}</Card.Title>
          <Card.Title style={styles.subtitle}>#{semana} semana</Card.Title>
          <Card.Title style={styles.subtitle}>{moment().format('LT')}</Card.Title>
          <Card.Title style={styles.subtitle}>{moment().format('L')}</Card.Title>
         
          {!state.RegistroPhotoDetail && (
            <Button style={styles.button} onPress={handleClickCamara}>
              Tomar foto
            </Button>
          )}
          {state.RegistroPhotoDetail && (
            <View style={styles.cameraContainer}>
              <Image source={{ uri: state.RegistroPhotoDetail }} style={styles.image} />
              <Button style={styles.button} onPress={handleClick}>
                Registrar
              </Button>
            </View>
          )}
        </Card>
        {error && <Text style={styles.error}>Error: {error}</Text>}
      </View>
    );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      card: {
        width: '80%',
        padding: 20,
        alignItems: 'center',
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 14,
        marginBottom: 5,
      },
      button: {
        backgroundColor: '#34db77',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        height: 200,
       // Add this line
      },
      
      cameraContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 7,
      },
      image: {
        width: '60%',
        height: 200,
        borderRadius: 5,
      },
      error: {
        color: 'red',
        marginTop: 10,
      },
    });

export default Datos;










/*

import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Button } from '@rneui/themed';


import { useNavigation } from '@react-navigation/native';
import UserContext from '../../context/AuthContext';
import { storage } from '../../../firebase-config';
import { ref,  uploadBytes } from "firebase/storage";
import CepointContext from '../../context/CepointContext';
import { TYPES } from '../../redux/GlobalState';

const Datos = () => {
// state

const [error, setError] = useState(null);
const { user } = useContext(UserContext);
const { dispatch, state, activaOcupado, desactivaOcupado, semana, putAsistencia, TipoAsistencia } = useContext(CepointContext);

// Navigation
const navigation = useNavigation();









// Create data for attendance
const datoAsistencia = {
trabajador: state?.RegistroAsistenciaDetail.nombre || null,
semana: semana,
tipoAsistencia: TipoAsistencia === 0 ? 'Entrada' : 'Salida',
clave: Date.now(),
date: Date(),
presupuesto: state.PresupuestoDetail?.presupuesto || null,
identidadChecador: user.uid,
latitud:state.LocationDetail?state.LocationDetail.coords.latitude: null,
longitud: state.LocationDetail?state.LocationDetail.coords.longitude : null
}

const handleClick = async () => {
try {
// Dispatch action
identificadorAsistencia(datoAsistencia.tipoAsistencia, state?.RegistroAsistenciaDetail.ocupado).then(
  await  uploadFile(state.RegistroPhotoDetail),
    navigation.navigate('Checador')
);
// Upload file to Firebase Storage

} 
 catch (error) {
    console.log(error)
}

}



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
    
      const storageRef = ref(storage, `Asistencias/${state?state.PresupuestoDetail.presupuesto:null}/${state?state.RegistroAsistenciaDetail.nombre:null}/${state?state.PutAsistenciaDetail.clave:null}`)
      uploadBytes(storageRef, blob).then((snapshot)=>{
        console.log('Uploaded a data_url string!')
      })
      
    } 

const  identificadorAsistencia= async(params, params1)=> {
      
     
    if (params==='Entrada'&&params1==false){
                       activaOcupado( state?state.RegistroAsistenciaDetail.UID:null).then( 
                       await putAsistencia(state?state.PresupuestoDetail.idProyecto:null))
                           console.log('Ahora ese usuario esta ocupado')
  } else if(params==='Entrada'&&params1==true){
         
                       activaOcupado(state?state.RegistroAsistenciaDetail.UID:null).then( 
                       await putAsistencia(state?state.PresupuestoDetail.idProyecto:null))
                       console.log('Ahora ese usuario esta ocupado')

 } else if(params=='Salida'&&params1==true){
                     desactivaOcupado(state?state.RegistroAsistenciaDetail.UID:null).then( 
                     await putAsistencia(state?state.PresupuestoDetail.idProyecto:null))
                     console.log('Ahora ese usuario esta desocupado')
 } else if(params=='Salida'&&params1==false){
                     desactivaOcupado(state?state.RegistroAsistenciaDetail.UID:null).then( 
                     await putAsistencia(state?state.PresupuestoDetail.idProyecto:null))
                     console.log('Ahora ese usuario esta desocupado')
} else{
      console.log('there a error go and find it')
    }
 
}   




console.log('DATOS PUT ASISTENCIA', state?state.PutAsistenciaDetail:null, state.LocationDetail?state.LocationDetail: null)





   useEffect(
    ()=>{
        dispatch({
            type: TYPES.PUT_ASISTENCIA,
            payload: datoAsistencia
            })
      
      
    }
    ,[]) 






return (
<View style={styles.container}>
<Card>







<Card style={styles.card}>
      
      <Card.Title>  Estas registrando a:  </Card.Title>
      <Card.Title style={styles.nombre}>  {state?state.RegistroAsistenciaDetail.nombre:null}  </Card.Title>
      <Card.Title>  {state?state.RegistroAsistenciaDetail.empresa:null}  </Card.Title>
      <Card.Title>  {state?state.RegistroAsistenciaDetail.perfil:null}  </Card.Title>
      <Card.Title>  {state?state.RegistroAsistenciaDetail.ocupado:null}  </Card.Title>
        <Card.Title>  # {semana} semana  </Card.Title>
        
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















</Card>
{error && <Text>Error: {error}</Text>}
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
},
});

export default Datos;

 */