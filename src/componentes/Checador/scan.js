import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Overlay } from '@rneui/themed';
import { BarCodeScanner } from 'expo-barcode-scanner';
import RegistroContext from '../../context/RegistroContext';
import { useNavigation } from '@react-navigation/native';
export default function Scan() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [isLoanding, setIsLoanding]= useState(false);
     const {setUsuarioAsistencia, fetchUser, registro} = useContext(RegistroContext) 
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
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      setUsuarioAsistencia(data)
      fetchUser(data)
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      if(data!=null){
setIsLoanding(false )
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
        
        <Overlay /* isVisible={visible} */ onBackdropPress={toggleOverlay}>
        <Text style={styles.textPrimary}>Hello!</Text>
        <Text style={styles.textSecondary}>
          Welcome to React Native Elements
        </Text>
        <Button
          icon={
            <Icon
              name="wrench"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
          title="Start Building"
          onPress={toggleOverlay}
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
    button:{


    }
  });