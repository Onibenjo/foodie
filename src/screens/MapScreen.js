import {Image, StyleSheet, Text, View} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, {useEffect, useState} from 'react';
import {mapDarktheme, mapStandardTheme} from '../model/mapData';

import {useTheme} from 'react-native-paper';

const MapScreen = ({navigation}) => {
  const {dark} = useTheme();

  const [region, , setRegion] = useState({
    latitude: 6.465422,
    longitude: 3.406448,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     const location = JSON.stringify(position);
    //     console.log(location);
    //     // setState({location});
    //   },
    //   (error) => Alert.alert(error.message),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    // );
  }, []);

  return (
    // <View style={styles.container}>
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      region={region}
      customMapStyle={dark ? mapDarktheme : mapStandardTheme}>
      <Marker
        coordinate={{
          // latitude: 37.78825,
          // longitude: -122.4324,
          ...region,
        }}
        title="A title"
        description="describing the marker location"
        onDragEnd={(e) => setRegion({...e.nativeEvent.coordinate})}

        // image={require('../assets/map_marker.png')}
      >
        <Callout>
          <View>
            <View style={styles.bubble}>
              <Text style={styles.name}>Favourite restaurant</Text>
              <Text>A short desc</Text>
              <Image
                source={require('../assets/banners/food-banner1.jpg')}
                style={styles.image}
              />
            </View>
            <View style={styles.arrowBorder} />
            <View style={styles.arrow} />
          </View>
        </Callout>
      </Marker>
    </MapView>
    // </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    // height: 400,
    // width: 400,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    height: '100%',
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // arrow below bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  // character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // character image
  image: {
    width: 120,
    height: 80,
  },
});
