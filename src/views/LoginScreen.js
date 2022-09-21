import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { StyleSheet, Text, View, ScrollView,TextInput,TouchableOpacity,Button, Alert} from 'react-native';
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from '../../firebase-config'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
//LoginScreen 
export default function LoginScreen(){
    const [email, setEmail] = React.useState('')
    const[password, setPassword]=React.useState('')
    const navigation = useNavigation();
  
    const app = initializeApp(firebaseConfig);
    const auth= getAuth(app);  
  
  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
      console.log('Account created!')
      const user =userCredential.user;
      console.log(user)}).catch(error=>{
        console.log(error)
        Alert.alert(error.message)
      })
  }
  const handleSignIn = () =>{
    signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
      console.log('Signed in!')
      const user =userCredential.user;
      console.log(user)
      navigation.navigate('Home')
    }).catch(error=>{
      console.log(error)
    })
  }
  
  return( 
    <View style={styles.container}> 
    <ScrollView contentContainerStyle={{
      flex:1, 
      width:'100%',
      height: '100%',
      alignItems: 'center',
      justifyContent:'center',
    }}>
  <View >
    <Text style={{fontSize:17, fontWeight:'400', color:'black'}}>E-mail</Text>
  <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="email@example.com"/>
  </View>
  <View>
    <Text style={{fontSize:17, fontWeight:'400', color:'black'}}>password</Text>
  <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="password"/>
  </View>
  <TouchableOpacity onPress={handleSignIn} style={[styles.button, {backgroundColor: '#00CFEB90'}]}>
                  <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Login</Text>
                </TouchableOpacity>
    </ScrollView>
    </View>
  )
  
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: 250,
      height: 40,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
      borderColor: '#fff',
      borderWidth: 1,
    },
    input: {
      width: 250,
      height: 40,
      borderColor: '#fff',
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      backgroundColor: '#ffffff90',
      marginBottom: 20
    },
    login: {
      width: 350,
      height: 500,
      borderColor: '#fff',
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
    },
  });