import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Button } from '@rneui/themed';
import * as Location from 'expo-location';

import { useNavigation } from '@react-navigation/native';
import UserContext from '../../context/AuthContext';
import { storage } from '../../../firebase-config';
import { ref, uploadFile } from "firebase/storage";
import CepointContext from '../../context/CepointContext';
import { TYPES } from '../../redux/GlobalState';

const Datos = () => {
// state
const [location, setLocation] = useState(null);
const [error, setError] = useState(null);
const { user } = useContext(UserContext);
const { dispatch, state, activaOcupado, desactivaOcupado, semana, putAsistencia, TipoAsistencia } = useContext(CepointContext);

// Navigation
const navigation = useNavigation();

// Get current location
useEffect(() => {
(async () => {
try {
let { status } = await Location.requestForegroundPermissionsAsync();
if (status !== 'granted') {
setError('Permission to access location was denied');
return;
}
let location = await Location.getCurrentPositionAsync({});
setLocation(location);
} catch (error) {
console.log('Error getting location:', error);
setError(error);
}
})();
}, []);

// Create data for attendance
const datoAsistencia = {
trabajador: state?.RegistroAsistenciaDetail.nombre || null,
semana: semana,
tipoAsistencia: TipoAsistencia === 0 ? 'Entrada' : 'Salida',
clave: Date.now(),
date: Date(),
presupuesto: state.PresupuestoDetail?.presupuesto || null,
identidadChecador: user.uid,
latitud: location?.coords.latitude || null,
longitud: location?.coords.longitude || null
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
    
      const storageRef = ref(storage, `Asistencias/${state?state.PresupuestoDetail.presupuesto:null}/${state?state.RegistroAsistenciaDetail.nombre:null}/${state.UsuarioAsistenciaDetail?state.UsuarioAsistenciaDetail.clave:null}`)
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