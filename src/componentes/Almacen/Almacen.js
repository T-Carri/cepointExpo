import { View } from 'react-native'
import React, {useState, useContext, useEffect, useCallback, StyleSheet} from 'react'
import { Card, Image,  ButtonGroup, Button } from '@rneui/themed';           
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
//import CepointContext from '../../context/CepointContext';
//import { TYPES } from '../../redux/GlobalState';

export default function Almacen() {
 // const {dispatch, state  }=useContext(CepointContext)

  const [selectedIndex, setSelectedIndex] = useState(0);




const navigation = useNavigation();




return (
    <View>


           <Card>
            
           <Button
              title="Asignar"
              onPress={()=>(
                navigation.navigate('asignacionesAlmacen')
    
              )}
              containerStyle={{
                borderRadius: 5,
                height: 200,
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              buttonStyle={{ backgroundColor: 'rgba(255, 193, 7, 1)', height: 150 }}
              titleStyle={{
                color: 'white',
                marginHorizontal: 20,
              }}
            />

<Button
              title="Ingresar"
              onPress={()=>(
                navigation.navigate('ingresosAlmacen')
    
              )}
              buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' ,
              height: 150
            }}
              containerStyle={{
                borderRadius: 5,
                height: 200,
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{
                color: 'white',
                marginHorizontal: 20,
                
              }}
            />
         

         </Card>
    </View>
  )
}

/* const styles = StyleSheet.create({
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
  }) */


























