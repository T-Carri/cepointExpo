import { StyleSheet, Text, View, ScrollView,TextInput,TouchableOpacity,Button, Alert, Dimensions, ImageBackground, Image} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import UserContext from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function LoginScreen(){
  const {signIn} = useContext(UserContext)
    const [email, setEmail] = useState('')
    const[password, setPassword]=useState('')
    const [error, setError] = useState('');
    const navigation = useNavigation();
  
  
 
   const handleSignIn = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password).then(
 async (response)=>{
  navigation.replace("Home")
  //console.log('response:',response)
await AsyncStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
let authToken = await AsyncStorage.getItem('Auth Token')
console.log('Token: ', authToken)
}
        
      )
  
     
    } catch (e) {
      setError(e.message)
      console.log(e.message)
      throw error;
    }
  };

  const testToken = async()=>{
    let authToken = await AsyncStorage.getItem('Auth Token')
    //console.log('Token: ', authToken)
    if (authToken!=null){
      navigation.replace("Home")
    }
  
     

  }
    useEffect( ()=>{
 testToken()
    },[]) 
 


    const windowWidth = Dimensions.get('window').width;
    const inputWidth = windowWidth * 0.8;
    const buttonWidth = windowWidth * 0.6;
  
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('./patternpad.png')}
          style={styles.background}
          resizeMode="cover"
        >
              <View style={styles.logoContainer}>
          <Image
            source={require('./logo.png')}
            style={styles.logo}
          />
        </View>
          <View style={styles.login}>
          
            <TextInput 
              value={email} 
              onChangeText={(text) => setEmail(text)} 
              style={[styles.input, { width: inputWidth }]} 
              placeholder="email@example.com"
            />
            
            <TextInput 
              value={password} 
              onChangeText={(text) => setPassword(text)} 
              style={[styles.input, { width: inputWidth, top: '5%'  }]} 
              placeholder="password"
              secureTextEntry={true}
            />
           


            <TouchableOpacity onPress={handleSignIn} style={[styles.button, {backgroundColor: '#00CFEB90', top: '10%'}]}>
                  <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Login</Text>
                </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    login: {
      top: '5%',
      padding: 20,
      alignItems: 'center',
    },
    label: {
      fontSize: 17,
      fontWeight: '400',
      color: 'black',
      marginBottom: 10,
    },
    input: {
      height: 40,
      borderColor: '#000000',
      backgroundColor:'#ffffff', 
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,

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
    logo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      },

      logoContainer: {
        position: 'absolute',
        top: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        },
  
  })








/* 

  return( 
    <View style={styles.container}> 
    <ImageBackground source={require('./patternpad.png')}>
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
    </ImageBackground>
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
      width: 350,
      height: 40,
      borderColor: '#000000',
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
  }); */