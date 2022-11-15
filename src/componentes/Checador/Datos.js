import React, { useContext, useEffect } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native';
import { Card, ButtonGroup, Button} from '@rneui/themed';
import RegistroContext from '../../context/RegistroContext'
import Icon from '@mdi/react'
import { mdiAccountClock } from '@mdi/js'
import AsignacionContext from '../../context/AsignacionContext';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../firebase-config';
import UserContext from '../../context/AuthContext';
export default function Datos() {
  const navigation = useNavigation();
    const {usuarioAsistencia, registro, tipoAsistencia, image, setImage, activaOcupado, desactivaOcupado } = useContext(RegistroContext)
    const {currentU, putAsistencia , setPostReg, uploadFile }= useContext(AsignacionContext)
     const {user} =useContext(UserContext )
    const dato= auth.currentUser;
  //calculadora de numero de semana
    const currentdate = new Date();
var oneJan = new Date(currentdate.getFullYear(),0,1);
var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
var result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);

const nombre = registro.map((e)=>e.nombre)
console.log('name:', nombre)
 const datoAsistencia= {
  trabajador:  registro.map((e)=>e.nombre)  ,
  semana: result, 
  tipoAsistencia: tipoAsistencia==0?'Entrada':'Salida',
  turno: 'get it', 
  date: Date(),  
  identidadChecador: user.uid
}
 
console.log('datoAsistencia:', datoAsistencia)

console.log('Datos Image', image)
const handleClick= async ()=>{
  try {
   await putAsistencia().then(
    setImage(null),
     navigation.navigate('Checador')
    ).then(
identificadorAsistencia(datoAsistencia.tipoAsistencia)
    ).then(
      await uploadFile(image)
      
    )
       
      
   }    catch (error) {
    console.log(error)
  }
 
}
 
console.log('es entrada o salida?:  ',datoAsistencia.tipoAsistencia)

//funcion que identifique si esta registrando una entrada o una checada
 function identificadorAsistencia(params) {
  if (params==='Entrada'){
    activaOcupado()
    console.log('Ahora ese usuario esta ocupado')
  } else{
    desactivaOcupado()
    console.log('Ahora ese usuario esta desocupado')
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
  <Card.Title>  # {result} semana  </Card.Title>
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