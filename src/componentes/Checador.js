import { View, Text } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Card, Button, Image,  ButtonGroup} from '@rneui/themed';
import {  StyleSheet } from 'react-native';
import { auth } from '../../firebase-config';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, get, query, where, collection, getDocs, onSnapshot} from "firebase/firestore"
//import ScanScreen from './Checador/'

export default function Checador() {
  const [selectedIndex, setSelectedIndex] = useState(0);
   const [asignacion, setAsignacion]= React.useState([])
   
  const dato= auth.currentUser;
  if (dato!==null){
    console.log( "uid desde checador:", dato.uid )
  }
//getDoc

const navigation = useNavigation();


const getPresupuestos =async () => {
  const querydb=getFirestore();
  const q = query(collection(querydb, "asignaciones"),where("residenteUid", "==", dato.uid ))
  await onSnapshot(q, (query)=>{
    const data=[]
    query.forEach((doc)=>{
      data.push(doc.data())
    })

    setAsignacion(data)
  }) }

  useEffect(()=>{
    getPresupuestos()

    
  },[])
    
   


console.log("hook: ", asignacion.map((e)=>e.obra));

/*  const getAsignacion =async () => {
  const querydb=getFirestore();
  const q = query(collection(querydb, "asignaciones"),where("residenteUid", "==", dato.uid ))
  await getDocs(q, (query)=>{
    console.log("datos:",query)
 
    const data=[]
    query.forEach((doc)=>{
      data.push(doc.data())
      console.log("datos:",doc.data())
    }) 

    setAsignacion(data) 
  }) } 
//residenteUid

  useEffect(()=>{
    getAsignacion()
    console.log(asignacion)
  },[])
     */

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
