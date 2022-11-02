import { StyleSheet, Text, View, ScrollView,TextInput,TouchableOpacity,Button, Alert} from 'react-native';
//import {signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {auth} from '../../firebase-config'
import React, {useEffect, useState, useContext} from 'react';
import UserContext from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
//import { UserAuth } from '../context/AuthContext';

export default function LoginScreen(){
  const {signIn} = useContext(UserContext)
    const [email, setEmail] = useState('')
    const[password, setPassword]=useState('')
    const [error, setError] = useState('');
    const navigation = useNavigation();
  
  
   /*  const auth= getAuth(app);  
   const usuario = auth.currentUser; */
   // const {signIn} = UserAuth();  
   const handleSignIn = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigation.replace("Home")
     
    } catch (e) {
      setError(e.message)
      console.log(e.message)
      throw error;
    }
  };

  



/* 
   const handleSignIn = async() =>{
   
   await signInWithEmailAndPassword(auth,email,password)
   .then((userCredentials)=>{
      const user =userCredentials.user;
      console.log('test usuario:', user.email);
     
    }).catch(error=> alert(error.message))
  } 
   

useEffect( ()=>{ 
  const unsubscribe = onAuthStateChanged(auth,(user=>{
    if(user){
      navigation.replace("Home")
    }
  }))
  return  unsubscribe
}, [])

 */



/*    
const handleSubmit = async (e)=> {
  e.preventDefault();
  setError('')
  try{
    await signIn(email, password)
     navigation.navigate('Home')  
  } catch (e){
    setError(e.message)
    console.log(e.message)
  }

}
 */
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
  <TextInput 
  value={email} 
  onChangeText={(text) => setEmail(text)} 
  style={styles.input} 
  placeholder="email@example.com"/>
  </View>
  <View>
    <Text style={{fontSize:17, fontWeight:'400', color:'black'}}>password</Text>
  <TextInput 
  value={password} 
  onChangeText={(text) => setPassword(text)} 
  style={styles.input} placeholder="password"/>
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