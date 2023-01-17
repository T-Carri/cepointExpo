import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet ,Text, View, Button, Image, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import RegistroContext from '../../context/RegistroContext';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
 
  const {setImage, image}=useContext(RegistroContext)
useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
})();
  }, []);

  const takePicture = async () => {
let options={
  quality:0.3
}

    if(camera){
        const data = await camera.takePictureAsync(options)
        setImage(data.uri);
        console.log('DATA PIC',data)
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  return (
   <View style={{ flex: 1}}>

<View style={styles.container}>
      <Camera style={styles.camera} ref={ref => setCamera(ref)}    >
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {
        try {
          takePicture()
         
        } catch (error) {
          console.log(error)
        }}
        
      }/>
            
        </View>
      </Camera>
    </View>



      
      {image && <Image source={{uri: image}} style={{flex:1}}/>}  
      
      {image&&
    
    <View style={styles.buttonContainer1}>
    <TouchableOpacity 
    style={styles.button1} 
    onPress={()=>(navigation.navigate('datosRegistroAsistencia'))} />
    </View>
       }
        

     
   
      
    
   </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  cameraContainer: {
      flex: 1,
      flexDirection: 'row'
  },
  fixedRatio:{
      flex: 1,
      aspectRatio: 1
  },  
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    
    backgroundColor: 'transparent',
    margin: 64,
   
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
      width: 70,
      height: 70,
      bottom: 0,
      borderRadius: 50,
      backgroundColor: '#fff'
      
  },
   
  buttonContainer1: {
  
    flexDirection: 'row',
    backgroundColor: '#081109'
   
  },
  button1: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
      width: 70,
      height: 70,
      bottom: 0,
      borderRadius: 50,
      backgroundColor: '#1BD120'
      
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  }
})

//