import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Overlay, Icon } from '@rneui/themed';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { useNavigation } from '@react-navigation/native';
import CepointContext from '../../context/CepointContext';
import { TYPES } from '../../redux/GlobalState';
export default function Scan() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [isLoanding, setIsLoanding]= useState(false);
    const { state, fetchUser, semana, TipoAsistencia}=useContext(CepointContext)



     const navigation = useNavigation();
    
     const [visible, setVisible] = useState(false);

const toggleOverlay = () => {
  setVisible(!visible);
};
    // console.log(registro)
    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
  
      getBarCodeScannerPermissions();
    }, []);
  
    const handleBarCodeScanned = async ({ type, data }) => {
      try {
        setScanned(true);
      
         fetchUser(data)
         
         // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
         if(data!=null){
      await setVisible(true)
     
         }
         
      } catch (error) {
        console.log('ERROR SCAN', error)
      }

    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    console.log("STATE SCAN",state)
    return (
     
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}g
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && 
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            
   
            <Text style={styles.textPrimary}>{state?state.RegistroAsistenciaDetail.nombre:null} </Text>
            <Text style={styles.textSecondary}> {state?state.RegistroAsistenciaDetail.empresa:null} </Text>
             
                  
                   <Text style={styles.textPrimary}>
                    {state?state.RegistroAsistenciaDetail.perfil:null} 
                   </Text> 
                   <Text style={styles.textSecondary}>
                     {semana}
                   </Text>
                   <Text style={styles.textSecondary}>
                   {TipoAsistencia==0?'Entrada':'Salida'} 
                   </Text>
                   <Text style={styles.textSecondary}>
                   {Date()}
                   </Text>
                   <Button
                     icon={
                       <Icon
                         name="camera"
                         type="font-awesome"
                         color="white"
                         size={25}
                         iconStyle={{ marginRight: 10 }}
                       />
                     }
                     title="Tomar foto"
                     onPress={()=>{
                       try {
                         navigation.navigate('camara')
                         toggleOverlay()
                       } catch (error) {
                         console.log('ERROR LANZANDO CAMARA', error)
                       }}}
                   />
                 
          
          
              </Overlay> }
          
        
       
      </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    textPrimary: {
      marginVertical: 20,
      textAlign: 'center',
      fontSize: 20,
    },
    textSecondary: {
      marginBottom: 10,
      textAlign: 'center',
      fontSize: 17,
    }
  });