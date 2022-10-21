import { View, Text } from 'react-native'
import React from 'react'
import { Card, Button } from '@rneui/themed';


export default function Checador() {
  return (
    <View>
           <Card>
          <Card.Title>Obra: mex6</Card.Title>
          <Card.Divider />
          <Button
              title="QR"
              icon={{
                name: 'user',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              iconRight
              iconContainerStyle={{ marginLeft: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: 'rgba(199, 43, 98, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            />

         </Card>
    </View>
  )
}


//TODO: JALAR DATOS DE API 

//TODO: analizar "npm i qr-scanner"

//coloque url: de asignacion 
//hacer receptor de axios en interfaz de usuario checador "asigancion"
//hacer disparador de axios en interfaz de usuario checador
//colocar boton  con imagen de QR con acceso a QR
