import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Overlay, Icon } from '@rneui/themed';
import { BarCodeScanner } from 'expo-barcode-scanner';
import RegistroContext from '../../context/RegistroContext';
import { useNavigation } from '@react-navigation/native';
export default function Scan() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [isLoanding, setIsLoanding]= useState(false);
     const {
       setUsuarioAsistencia,
       fetchUser, 
       registro, 
       tipoAsistencia,
       semana, 
       
      } = useContext(RegistroContext) 
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
      setScanned(true);
     await setUsuarioAsistencia(data)
      fetchUser(data)
      
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      if(data!=null){
   await setVisible(true)
  
      }
      
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}g
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && 
        
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.textPrimary}>{registro.map((e)=>e.nombre)} </Text>
        <Text style={styles.textSecondary}>
        {registro.map((e)=>e.empresa)}
        </Text>
        <Text style={styles.textSecondary}>
        {registro.map((e)=>e.perfil)}
        </Text>
        <Text style={styles.textSecondary}>
          {semana}
        </Text>
        <Text style={styles.textSecondary}>
        {tipoAsistencia==0?'Entrada':'Salida'} 
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
              console.log(error)
            }}}
        />
      </Overlay>
        
       }
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