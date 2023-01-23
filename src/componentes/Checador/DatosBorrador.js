import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Button } from '@rneui/themed';
import * as Location from 'expo-location';

import { useNavigation } from '@react-navigation/native';
import UserContext from '../../context/AuthContext';
import { storage } from '../../../firebase-config';
import { ref, uploadFile, uploadBytes } from "firebase/storage";
import CepointContext from '../../context/CepointContext';
import { TYPES } from '../../redux/GlobalState';


//OLD
/* import React, { useContext, useEffect, useState } from 'react'
import {  View, StyleSheet, Image } from 'react-native';
import { Card, Button} from '@rneui/themed';
import * as Location from 'expo-location';


import { useNavigation } from '@react-navigation/native';

import UserContext from '../../context/AuthContext';

import { storage } from '../../../firebase-config';
//HAY UNA DIFERENCIA ENTRE EL CODIGO QUE ME RECOMENDO GIA (chatGPT), TAL DIFERENCIA ES QUE CONSIDERA MEJOR PRACTICA SUBIR upload QUE uploadBytes

import {  ref, uploadBytes } from "firebase/storage"
import CepointContext from '../../context/CepointContext';
import { TYPES } from '../../redux/GlobalState';
 */




const Datos = () => {
// state GIA
const [location, setLocation] = useState(null);
const [error, setError] = useState(null);
const { user } = useContext(UserContext);
const { dispatch, state, activaOcupado, desactivaOcupado, semana, putAsistencia, TipoAsistencia } = useContext(CepointContext);
// state OLD
/* 
const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null); 
const {user} =useContext(UserContext) 
const {dispatch, state,   activaOcupado, desactivaOcupado, semana, putAsistencia, TipoAsistencia }=useContext(CepointContext)

*/





// Navigation GIA SAME THAN OLD
const navigation = useNavigation();




// Get current location GIA
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

// Get current location OLD
/* useEffect(() => {
  (async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
     
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      console.log('THIS IS THE ERROR IN LOCATION',error);
    }
  })();
}, []); */












// Create data for attendance GIO
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



// Create data for attendance  OLD
/* const datoAsistencia= {
  trabajador:  state?state.RegistroAsistenciaDetail.nombre:null,
  semana: semana, 
  tipoAsistencia: TipoAsistencia==0?'Entrada':'Salida',
  clave: Date.now(),
  date: Date(),  
  presupuesto:state.PresupuestoDetail?state.PresupuestoDetail.presupuesto:null,
  identidadChecador: user.uid, 
  latitud: location&&location.coords.latitude, 
  longitud:  location&&location.coords.longitude

} */





//handleClick GIA
const handleClick = async () => {
try {
// Dispatch action
identificadorAsistencia(datoAsistencia.tipoAsistencia, state?.RegistroAsistenciaDetail.ocupado).then(
dispatch({
type: TYPES.PUT_ASISTENCIA,
payload: datoAsistencia
}), 
navigation.navigate('Checador')
).then(
  uploadFile(state.RegistroPhotoDetail)
    );} catch (error) {
      console.log(error)
    }

//handleClick OLD
    
/* const handleClick= async ()=>{
  try {
    identificadorAsistencia(datoAsistencia.tipoAsistencia,  state?state.RegistroAsistenciaDetail.ocupado:null).then(
      dispatch({
        type: TYPES.REGISTRO_PHOTO,
         payload:null }),
       navigation.navigate('Checador')
      ).then(
      uploadFile(state.RegistroPhotoDetail)
        )
        
    }    catch (error) {
     console.log(error)
   }
  console.log('datoAsistencia', datoAsistencia)
 } */
         




// Upload file to Firebase Storage gio
/* const storageRef = ref(storage, `Asistencias/${state?.PresupuestoDetail.presupuesto}/${state?.RegistroAsistenciaDetail.nombre}/${state.UsuarioAsistenciaDetail?.clave}`);


uploadFile(storageRef, file)
.then(() => console.log('File uploaded successfully'))
.catch((error) => console.log('Error uploading file:', error));
} catch (error) {
console.log('Error in handleClick:', error);
}
} */

//Upload file to firebase storage old
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

///////////Apartir de aqui agregare partes del codigo que GIA no me dio

 
    //funcion que identifique si esta registrando una entrada o una checada

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


   const handleClickCamara= ()=>{
    try {
     
          navigation.navigate('camara')
      
     }    catch (error) {
      console.log(error)
    }
   
  } 


/*   useEffect(
    ()=>{
      dispatch({type:TYPES.SET_USUARIO_ASISTENCIA , payload:datoAsistencia})
      
      
    }
    ,[]) */
  






return (
<View style={styles.container}>

  



 <Card style={styles.card}>
      
      <Card.Title>  Estas registrando a:  </Card.Title>
      <Card.Title style={styles.nombre}>  {state?state.RegistroAsistenciaDetail.nombre:null}  </Card.Title>
      <Card.Title>  {state?state.RegistroAsistenciaDetail.empresa:null}  </Card.Title>
      <Card.Title>  {state?state.RegistroAsistenciaDetail.perfil:null}  </Card.Title>
      <Card.Title>  {state?state.RegistroAsistenciaDetail.ocupado:null}  </Card.Title>
        <Card.Title>  # {semana} semana  </Card.Title>
         <Card.Title style={styles.EoS}>  {TipoAsistencia==0?'Entrada':'Salida'}     </Card.Title>     
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
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
},
});


}





















import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Card, Button } from '@rneui/themed';
import * as Location from 'expo-location';

import { useNavigation } from '@react-navigation/native';
import UserContext from '../../context/AuthContext';
import { storage } from '../../../firebase-config';
import { ref, uploadFile, uploadBytes } from "firebase/storage";
import CepointContext from '../../context/CepointContext';
import { TYPES } from '../../redux/GlobalState';







const Datos = () => {
// state GIA
const [location, setLocation] = useState(null);
const [error, setError] = useState(null);
const { user } = useContext(UserContext);
const { dispatch, state, activaOcupado, desactivaOcupado, semana, putAsistencia, TipoAsistencia } = useContext(CepointContext);





// Navigation GIA SAME THAN OLD
const navigation = useNavigation();




// Get current location GIA
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









// Create data for attendance GIO
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







//handleClick GIA
/* const handleClick = async () => {
try {
// Dispatch action
identificadorAsistencia(datoAsistencia.tipoAsistencia, state?.RegistroAsistenciaDetail.ocupado).then(
dispatch({
type: TYPES.PUT_ASISTENCIA,
payload: datoAsistencia
}), 
navigation.navigate('Checador')
).then(
  uploadFile(state.RegistroPhotoDetail)
    );} catch (error) {
      console.log(error)
    } */

         


 const handleClick= async ()=>{
  try {
    identificadorAsistencia(datoAsistencia.tipoAsistencia,  state?state.RegistroAsistenciaDetail.ocupado:null).then(
      dispatch({
        type: TYPES.REGISTRO_PHOTO,
         payload:null }),
       navigation.navigate('Checador')
      ).then(
      uploadFile(state.RegistroPhotoDetail)
        )
        
    }    catch (error) {
     console.log(error)
   }
  console.log('datoAsistencia', datoAsistencia)
 }




//Upload file to firebase storage old
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

///////////Apartir de aqui agregare partes del codigo que GIA no me dio

 
    //funcion que identifique si esta registrando una entrada o una checada

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
  






return (
<View style={styles.container}>

  



 <Card style={styles.card}>
      
      <Card.Title>  Estas registrando a:  </Card.Title>
      <Card.Title style={styles.nombre}>  {state?state.RegistroAsistenciaDetail.nombre:null}  </Card.Title>
      <Card.Title>  {state?state.RegistroAsistenciaDetail.empresa:null}  </Card.Title>
      <Card.Title>  {state?state.RegistroAsistenciaDetail.perfil:null}  </Card.Title>
      <Card.Title>  {state?state.RegistroAsistenciaDetail.ocupado:null}  </Card.Title>
        <Card.Title>  # {semana} semana  </Card.Title>
         <Card.Title style={styles.EoS}>  {TipoAsistencia==0?'Entrada':'Salida'}     </Card.Title>     
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
);
};





const styles = StyleSheet.create({
  container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  },
  });
  
  export default Datos