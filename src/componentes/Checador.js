import { View, Text } from 'react-native'
import React, {useState, useContext} from 'react'
import { Card, Button, Image,  ButtonGroup} from '@rneui/themed';
import {  StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  AsignacionContext   from '../context/AsignacionContext';
import RegistroContext from '../context/RegistroContext';
export default function Checador() {
  const {asignacion} = useContext(AsignacionContext)
const {setTipoAsistencia} = useContext(RegistroContext)
  const [selectedIndex, setSelectedIndex] = useState(0);
  
//console.log(asignacion)
//console.log(asignacion.data()) 

console.log('TEST VALUE TIPO DE ASISTENCIA', selectedIndex)

const navigation = useNavigation();

    

  return (
    <View>


           <Card>
            
           <Card.Title style={styles.checador}>{asignacion.map((e)=>e.obra)}</Card.Title>
          <Card.Title style={styles.checador}>{asignacion.map((e)=>e.presupuesto)}</Card.Title>
          <Card.Title style={styles.checador}>{asignacion.map((e)=>e.ubicacion)}</Card.Title>   
          <Card.Divider />

          <Image
          style={{ width: 200, height: 200, marginBottom: 15, marginLeft: 50 }}
          source={require("../../assets/200.png")}
          onPress={()=>(
            navigation.navigate('scanner')

          )}
        />




            <ButtonGroup 
            buttons={['Entrada', 'Salida']}
            selectedButtonStyle={{backgroundColor : "#FFC300", color : "black"}}
            selectedTextStyle={{ color : "black"}}
            disabledTextStyle={{color : "white"}}
            selectedIndex={ selectedIndex}
            onPress={(value)=> {
              setSelectedIndex(value),
              setTipoAsistencia(value)
            }}
            containerStyle={{ 
              marginBottom: 20, 
              backgroundColor : "#070101",
              color : "white"}}
            
            />

         </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  subHeader: {
    backgroundColor : "#f9130c",
    color : "black",
    textAlign : "center",
    paddingVertical : 5,
    marginBottom : 10
  },
  
  checador:{
    fontSize: 30,
  }
  })


// onPress={} in the image for activate the qr service 
// such fetch {name} in the qr an then build an interface with 

// name, entrada: Date()
// name, salida
// 
