import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import * as FaceDetector from 'expo-face-detector';
import * as firebase from 'firebase';
import {Camera} from 'expo-camera';
import * as faceapi from 'face-api.js';

const FaceRecognition = () => {
const [hasPermission, setHasPermission] = useState(null);
const [faceDetected, setFaceDetected] = useState(false);

const [faceID, setFaceID] = useState(null);
const [storageRef, setStorageRef] = useState(null);

useEffect(() => {
(async () => {
const { status } = await Camera.requestCameraPermissionsAsync();
setHasPermission(status === 'granted');
setStorageRef(firebase.storage().ref());
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

const compareFaces = async () => {
if (faceDetected) {
try {
const faceImage = await storageRef
.child(`faces/${faceID}.jpg`)
.getDownloadURL();
const detectedFace = await fetch(faceImage).then((response) => response.blob());
const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 160 });
const detections = await faceapi
.detectSingleFace(detectedFace, options)
.withFaceLandmarks()
.withFaceDescriptor();


    if (detections) {
      // Compare the detected face with the stored face using face-api.js
      // and do something with the result (e.g. navigate to a different screen)

/*       const ref =storage.ref( 'Rostros/' + detectedFace.id);
const url = await ref.getDownloadURL();
const storedFace = await faceapi.fetchImage(url);
const distance = faceapi.round(faceapi.euclideanDistance(detectedFace.descriptor, storedFace.descriptor)); */



/* const storedFace = await faceapi.fetchImage(storedFaceUrl);
const storedFaceDetection = await faceapi.detectSingleFace(storedFace, options).withFaceDescriptor();
const similarity = await faceapi.compareFaces(detections.descriptor, storedFaceDetection.descriptor);
if (similarity > 0.7) {
  // navigate to a different screen or perform some other action
}
 */





    } else {
      console.log('No se detecto ningun rostro');
    }
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
faceDetectorSettings={{
mode: FaceDetector.Constants.Mode.fast,
detectLandmarks: FaceDetector.Constants.Landmarks.none,
runClassifications: FaceDetector.Constants.Classifications.none,
}}>
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
onPress={compareFaces}>
<Text>Comparar Rostros</Text>
</TouchableOpacity>
</View>
</Camera>
</View>
);
};
export default FaceRecognition;