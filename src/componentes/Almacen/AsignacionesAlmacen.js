import React, { useState } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import PropTypes from 'prop-types';
import deprecatedPropTypes from 'deprecated-react-native-prop-types';

const CircularImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {
      id: 1,
      image: require('../../../assets/miscelaneos.jpg'),
      label: 'Misceláneos'
    },
    {
      id: 2,
      image: require('../../../assets/herramientas.jpg'),
      label: 'Herramientas'
    },
    {
      id: 3,
      image: require('../../../assets/maquinaria.jpg'),
      label: 'Maquinaria'
    }
  ];

  const renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight
        underlayColor="#dddddd"
        onPress={() => setActiveIndex(index)}
      >
        <View>
          <Image
            style={{ width: 200, height: 200, borderRadius: 100 }}
            source={item.image}
          />
          <Text>{item.label}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <Carousel
      layout={'default'}
      data={data}
      renderItem={renderItem}
      sliderWidth={300}
      itemWidth={200}
      loop={true}
      inactiveSlideOpacity={0.7}
      inactiveSlideScale={0.9}
      firstItem={activeIndex}
    />
  );
};

CircularImageCarousel.propTypes = {
  ...View.propTypes,
  ...deprecatedPropTypes.Image.propTypes
};

export default CircularImageCarousel;



/*
import { View } from 'react-native'
import React, {useState, useContext, useEffect, useCallback} from 'react'
import { Card, Image,  ButtonGroup, Button } from '@rneui/themed';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
import {  StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel'
import * as Location from 'expo-location';
//import CepointContext from '../../context/CepointContext';
//import { TYPES } from '../../redux/GlobalState';





export default function AsignacionesAlmacen() {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {
      id: 1,
      image: require('../../../assets/miscelaneos.jpg'),
      label: 'Misceláneos'
    },
    {
      id: 2,
      image: require('../../../assets/herramientas.jpg'),
      label: 'Herramientas'
    },
    {
      id: 3,
      image: require('../../../assets/maquinaria.jpg'),
      label: 'Maquinaria'
    }
  ];

  const renderItem = ({ item, index }) => {
    return (
      <TouchableHighlight
        underlayColor="#dddddd"
        onPress={() => setActiveIndex(index)}
      >
        <View>
          <Image
            style={{ width: 200, height: 200, borderRadius: 100 }}
            source={item.image}
          />
          <Text>{item.label}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <Carousel
      layout={'default'}
      data={data}
      renderItem={renderItem}
      sliderWidth={300}
      itemWidth={200}
      loop={true}
      inactiveSlideOpacity={0.7}
      inactiveSlideScale={0.9}
      firstItem={activeIndex}
    />
  );
};
 









*/

















