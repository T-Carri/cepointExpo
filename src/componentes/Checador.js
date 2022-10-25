import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { Card, Button, Image,  ButtonGroup} from '@rneui/themed';
import {  StyleSheet } from 'react-native';
import { auth } from '../../firebase-config';

import { getFirestore, doc, getDoc} from "firebase/firestore"
//import ScanScreen from './Checador/'

export default function Checador() {
  const [selectedIndex, setSelectedIndex] = useState(0);
   const [rol, setUserRol]= React.useState('')

  const dato= auth.currentUser;
  if (dato!==null){
    console.log( "uid desde checador:", dato.uid )
  }

  /* React.useEffect(()=>{
    const querydb=getFirestore();
    const queryDoc = doc(querydb, "users", dato.uid);
    getDoc(queryDoc).then(res => {
      setUserRol(res.data())
      console.log( res.data().rol)
 }    )
  },[])  */
    

  return (
    <View>
           <Card>
          <Card.Title>Obra: mex6</Card.Title>
          <Card.Divider />

          <Image
          style={{ width: 200, height: 200, marginBottom: 15, marginLeft: 50 }}
          source={require("../../assets/200.png")}
          onPress={()=>(
            alert('come on')

          )}
        />




            <ButtonGroup 
            buttons={['Entrada', 'Salida']}
            selectedButtonStyle={{backgroundColor : "#FFC300", color : "black"}}
            selectedTextStyle={{ color : "black"}}
            disabledTextStyle={{color : "white"}}
            selectedIndex={ selectedIndex}
            onPress={(value)=> {
              setSelectedIndex(value)
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
  }
  })


// onPress={} in the image for activate the qr service 
// such fetch {name} in the qr an then build an interface with 

// name, entrada: Date()
// name, salida
// 
