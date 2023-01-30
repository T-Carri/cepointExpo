import React, { useState, useEffect } from 'react';
import { Alert, View, TouchableOpacity, Text, Button } from 'react-native';
import { Camera, Permissions } from 'expo-camera';
import { FaceDetector } from 'expo-face-detector';

const FaceRecognition = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [faceId, setFaceId] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  
/*   useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    })();
  }, []);
 */


  useEffect(() => {
    (async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted');
    })();
    }, []);

  const handleFacesDetected = async ({ faces }) => {
    if (faces.length > 0) {
      setFaceDetected(true);
      setFaceId(faces[0].faceID);
    } else {
      setFaceDetected(false);
      setFaceId(null);
    }
  };

  const showFaceId = () => {
    if (faceDetected) {
      Alert.alert('Face ID', faceId);
    } else {
      Alert.alert('Face ID', 'No se detecto ningun rostro');
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return (
      <View>
        <Text>No se otorgaron permisos para acceder a la cámara</Text>
        <Button title="Reintentar" onPress={() => setHasCameraPermission(null)} />
      </View>
    );
  }

  return (
    <View>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
            runClassifications: FaceDetector.FaceDetectorClassifications.none,
            minDetectionInterval: 100,
            tracking: true,
          }}
        onFocusChanged={({ isFocused }) => setIsFocused(isFocused)}
      />
      <TouchableOpacity onPress={showFaceId}>
        <Text>Mostrar Face ID</Text>
      </TouchableOpacity>
    </View>
  );
};
export default FaceRecognition;


/* import React, { useState, useEffect } from 'react';
import { Alert, View, TouchableOpacity, Text } from 'react-native';
import * as FaceDetector from 'expo-face-detector';
import { Camera } from 'expo-camera';
import * as faceapi from 'face-api.js';

const FaceRecognition = () => {
const [hasPermission, setHasPermission] = useState(null);
const [faceDetected, setFaceDetected] = useState(false);
const [faceId, setFaceId] = useState(null);

useEffect(() => {
(async () => {
const { status } = await Camera.requestCameraPermissionsAsync();
setHasPermission(status === 'granted');
})();
}, []);

const onFacesDetected = async ({ faces }) => {
if (faces.length > 0) {
setFaceDetected(true);
const face = await faceapi.detectSingleFace(faces[0].image.data).withFaceLandmarks().withFaceDescriptor();
setFaceId(face.descriptor);
} else {
setFaceDetected(false);
setFaceId(null);
}
};

const showFaceId = () => {
if (faceDetected) {
Alert.alert('Face ID', faceId);
} else {
Alert.alert('Face ID', 'No se detecto ningun rostro');
}
};

if (hasPermission === null) {
return <View />;
}
if (hasPermission === false) {
return <Text>No se otorgaron permisos para acceder a la cámara</Text>;
}

return (
<View>
<Camera
style={{ flex: 1 }}
type={Camera.Constants.Type.front}
onFacesDetected={onFacesDetected}
faceDetectorSettings={{
mode: FaceDetector.FaceDetectorMode.fast,
detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
runClassifications: FaceDetector.FaceDetectorClassifications.all
}}
>
<View
style={{
flex: 1,
backgroundColor: 'transparent',
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center'
}}
>
<TouchableOpacity
style={{
backgroundColor: '#fff',
borderRadius: 50,
padding: 10,
margin: 40
}}
onPress={showFaceId}
>
<Text>Mostrar ID de rostro</Text>
</TouchableOpacity>
</View>
</Camera>
</View>
);
};

export default FaceRecognition;



 */


/* import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import * as FaceDetector from 'expo-face-detector';
import { Camera } from 'expo-camera';
import * as faceapi from 'face-api.js';

const FaceRecognition = () => {
const [hasPermission, setHasPermission] = useState(null);
const [faceDetected, setFaceDetected] = useState(false);
const [faceID, setFaceID] = useState(null);

useEffect(() => {
(async () => {
const { status } = await Camera.requestCameraPermissionsAsync();
setHasPermission(status === 'granted');
})();
}, []);

const onFacesDetected = ({ faces }) => {
if (faces.length > 0) {
setFaceDetected(true);
setFaceID(faces[0].faceID);
} else {
setFaceDetected(false);
setFaceID(null);
}
};

const showFaceID = async () => {
if (faceDetected) {
try {
Alert.alert('Rostro detectado', 'ID del rostro: ' + faceID);
} catch (error) {
console.log(error);
}
}
};

if (hasPermission === null) {
return <View />;
}
if (hasPermission === false) {
return <Text>No se otorgaron permisos para acceder a la cámara</Text>;
}




  

return (
<View>
<Camera
style={{ flex: 1 }}
type={Camera.Constants.Type.front}
onFacesDetected={onFacesDetected}
>
<View
style={{
flex: 1,
backgroundColor: 'transparent',
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
}}>
<TouchableOpacity
style={{
backgroundColor: '#fff',
borderRadius: 50,
padding: 10,
margin: 40,
}}
onPress={showFaceID}>
<Text>Mostrar ID del rostro</Text>
</TouchableOpacity>
</View>
</Camera>
</View>
);
};

export default FaceRecognition;

 */








/* import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
//import * as FaceDetector from 'expo-face-detector';
//import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
//import firebase from 'firebase';
import * as faceapi from 'face-api.js';
import { storage } from '../../../firebase-config';
export default function App() {
//const [hasPermission, setHasPermission] = useState(null);
const [face, setFace] = useState({});
const [isFaceDetected, setIsFaceDetected] = useState(false);
const [hasCameraPermission, setHasCameraPermission] = useState(null);
useEffect(() => {
(async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraStatus.status === 'granted');
})();
}, []);
useEffect(()=>{console.log(face)})

const handleFacesDetected = async ({ faces }) => {
if (faces.length > 0) {
setFace(faces[0]);
setIsFaceDetected(true);
} else {
setIsFaceDetected(false);
}
};

const compareWithFirebase = async (detectedFace) => {
const ref =storage.ref( 'Rostros/' + detectedFace.id);
const url = await ref.getDownloadURL();
const storedFace = await faceapi.fetchImage(url);
const distance = faceapi.round(faceapi.euclideanDistance(detectedFace.descriptor, storedFace.descriptor));


if (distance < 0.6) {
  console.log("Face matched with stored face, distance: " + distance);
} else {
  console.log("Face did not match with stored face, distance: " + distance);
}
}

if (hasCameraPermission === null) {
return <View />;
}
if (hasCameraPermission === false) {
return <Text>No access to camera</Text>;
}

return (
<View style={{ flex: 1 }}>
<Camera style={{ flex: 1 }} type={Camera.Constants.Type.front} onFacesDetected={handleFacesDetected}>
<View
style={{
flex: 1,
backgroundColor: 'transparent',
flexDirection: 'row',
justifyContent: 'center',
}}>
<TouchableOpacity
style={{
flex: 0.1,
alignSelf: 'flex-end',
alignItems: 'center',
}}
onPress={async () => {
if (isFaceDetected) {
await compareWithFirebase(face);
}
}}>
<Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Compare </Text>
</TouchableOpacity>
</View>
</Camera>
</View>
);
} */



/*


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as FaceDetector from 'expo-face-detector';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as firebase from 'firebase';

const FaceRecognition = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [faceData, setFaceData] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleFacesDetected = ({ faces }) => {
        if (faces.length > 0) {
            setFaceData(faces[0]);
        }
    };

    const handleFaceRecognition = async () => {
        if (!faceData) {
            console.log('No se detectó ningún rostro');
            return;
        }

        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child('images/face.jpg');

        try {
            const url = await imageRef.getDownloadURL();
            const response = await fetch(url);
            const blob = await response.blob();

            const image = await faceapi.fetchImage(blob);
            const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
            if(detections.length > 0) {
                //detections[0].descriptor es el descriptor del rostro detectado
                //comparar con el descriptor del rostro almacenado en firebase
                //usando algún algoritmo de comparación de vectores como distancia Euclidiana
                //si la distancia es menor a un threshold entonces es un match
                //puedes usar la libreria 'node-euclidean-distance'
                const distance = euclideanDistance(detections[0].descriptor, storedDescriptor)
                if (distance < threshold) {
                    console.log("Rostro reconocido");
                } else {
                    console.log("Rostro no reconocido");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No se tienen permisos para usar la cámara</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera 
                style={{ flex: 1 }} 
                type={type}
                onFacesDetected={handleFacesDetected}
                faceDetectorSettings={{
                    mode: FaceDetector.Constants

*/