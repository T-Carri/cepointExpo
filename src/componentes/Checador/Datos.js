import React, { useContext, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Card,  Image,  ButtonGroup, Button} from '@rneui/themed';
import RegistroContext from '../../context/RegistroContext'
import Icon from '@mdi/react'
import { mdiAccountClock } from '@mdi/js'
import AsignacionContext from '../../context/AsignacionContext';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../firebase-config';
import UserContext from '../../context/AuthContext';
export default function Datos() {
  const navigation = useNavigation();
    const {usuarioAsistencia, registro, tipoAsistencia } = useContext(RegistroContext)
    const {currentU, putAsistencia , setPostReg}= useContext(AsignacionContext)
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
  tipoAsistencia: tipoAsistencia===0?'Entrada':'Salida',
  turno: 'get it', 
  date: Date(),  
  identidadChecador: user.uid
}
 
console.log('datoAsistencia:', datoAsistencia)
const handleClick= ()=>{
  try {
    putAsistencia().then(
        navigation.navigate('Checador')
    )
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
    <View>
        <Card style={styles.card}>
      {/*   <Icon path={mdiAccountClock}
        title="User Profile"
        size={1}
        horizontal
        vertical
        rotate={90}
        color="red"
        spin/> */}
<Card.Title>  Estas registrando a:  </Card.Title>
<Card.Title style={styles.nombre}>  {registro.map((e)=>e.nombre)}  </Card.Title>
<Card.Title>  {registro.map((e)=>e.empresa)}  </Card.Title>
<Card.Title>  {registro.map((e)=>e.perfil)}  </Card.Title>
  <Card.Title>  # {result} semana  </Card.Title>
   <Card.Title style={styles.EoS}>  {tipoAsistencia===0?'Entrada':'Salida'}     </Card.Title>     
<Card.Title>  {Date()}  </Card.Title>
<Button onPress={handleClick}>Tomar foto </Button>
        </Card>

    </View>
        
        
  )
}

const styles = StyleSheet.create({
 
 
  nombre:{
    fontSize: 20,
  },
  EoS:{
    fontSize: 30,
  }
  });