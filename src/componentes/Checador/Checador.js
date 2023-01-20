import { View } from 'react-native'
import React, {useState, useContext, useEffect, useCallback} from 'react'
import { Card, Image,  ButtonGroup} from '@rneui/themed';
import {  StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CepointContext from '../../context/CepointContext';
import { TYPES } from '../../redux/GlobalState';

export default function Checador() {
  const {dispatch, state, TipoAsistencia, setTipoAsistencia  }=useContext(CepointContext)

  const [selectedIndex, setSelectedIndex] = useState(0);
  

console.log('test TIPO DE ASISTENCIA ', TipoAsistencia)

const navigation = useNavigation();

    

  return (
    <View>


           <Card>
            
           <Card.Title style={styles.checador}>{state.PresupuestoDetail?state.PresupuestoDetail.obra:null}</Card.Title>
          <Card.Title style={styles.checador}>{state.PresupuestoDetail?state.PresupuestoDetail.presupuesto:null}</Card.Title>
          <Card.Title style={styles.checador}>{state.PresupuestoDetail?state.PresupuestoDetail.ubicacion:null}</Card.Title>   
          <Card.Divider />

          <Image
          style={{ width: 200, height: 200, marginBottom: 15, marginLeft: 50 }}
          source={require("../../../assets/200.png")}
          onPress={()=>(
            navigation.navigate('scanner')

          )}
        />




            <ButtonGroup 
            buttons={['Entrada', 'Salida']}
            selectedButtonStyle={{backgroundColor : "#FFC300", color : "black"}}
            selectedTextStyle={{ color : "black"}}
            disabledTextStyle={{color : "white"}}
            selectedIndex={TipoAsistencia}
            onPress={(value)=> {
              setTipoAsistencia(value),
             
              console.log('BOTON ASISTENCIA TIPO ', TipoAsistencia)
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



