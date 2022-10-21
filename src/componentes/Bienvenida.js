import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Card, Text } from '@rneui/themed';
export default function Bienvenida() {
  return (
    <View>
       <Card>
          <Card.Title>SECMA</Card.Title>
          <Card.Divider />
 
 <Text style={styles.fonts} h2> Come on boy  </Text>






        </Card>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    fonts: {
      marginBottom: 8,
    },
    user: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    image: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    name: {
      fontSize: 16,
      marginTop: 5,
    },
    });
  //TODO: ventana lateral con funciones de app segun tu sesion 
  //Bienvenido fulanito
  //Tu empresa
  //Estado con alamacen 
  //   inicio    |   notificaciones
  