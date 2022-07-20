import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Marker } from 'react-native-maps';

import { colors, fonts } from '../../../../styles';

import MapView from 'react-native-maps';

export default function MapViewFunction(props) {
  const [coord, setCoord] = useState([])
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [markerPoint, setMarkerPoint] = useState(null)

  console.log("Map view enter", props.coordenates)
  const route = useRoute();

  useEffect(() => {
    console.log("Map view useeffect", props.coordenates)
    if (props.coordenates) {
      setRegion({
        latitude: props.coordenates.lat,
        longitude: props.coordenates.lng,
        latitudeDelta: 0.0030,
        longitudeDelta: 0.0030,
      })

      setMarkerPoint({ latitude: props.coordenates.lat, longitude: props.coordenates.lng })
    } else {
      setMarkerPoint(null)
    }
  }, [props.coordenates])

  // onRegionChange = (region) =>  {
  //   setRegion(region)
  // }

  return (


    <View style={styles.container}>
      <MapView style={styles.map}
        region={region}
      // onRegionChange={this.onRegionChange}
      >
        {markerPoint? 
        <Marker
          coordinate={markerPoint}
        // image={{uri: 'custom_pin'}}
        />
        :false}
      </MapView>
    </View>






  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

});
