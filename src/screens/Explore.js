/* eslint-disable react-native/no-inline-styles */
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import React, {useEffect, useRef, useState} from 'react';
import {mapDarktheme, mapStandardTheme, markers} from '../model/mapData';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import StarRating from '../components/StarRating';
import {useTheme} from 'react-native-paper';

const {width, height} = Dimensions.get('window');
const cardHeight = 220;
const cardWidth = width <= 450 ? width * 0.8 : width * 0.5;
const cardInsetSpacing = width * 0.1 - 10;

const categories = [
  {
    name: 'Fastfood',
    icon: MaterialCommunityIcons,
    iconName: 'food-fork-drink',
    size: 18,
  },
  {
    name: 'Restaurant',
    icon: Ionicons,
    iconName: 'ios-restaurant',
    size: 18,
  },
  {
    name: 'Dineouts',
    icon: Ionicons,
    iconName: 'md-restaurant',
    size: 18,
  },
  {
    name: 'Snacks Corner',
    icon: MaterialCommunityIcons,
    iconName: 'food',
    size: 18,
  },
  {
    name: 'Hotel',
    icon: MaterialIcons,
    iconName: 'hotel',
    size: 18,
  },
];

const Explore = ({navigation}) => {
  const {dark} = useTheme();

  const initialState = {
    latitude: 6.465422,
    longitude: 3.406448,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };

  const [region] = useState(initialState);
  const _map = useRef(null);
  const _scrollView = useRef(null);

  // let mapIndex = 0;
  const mapAnimation = new Animated.Value(0);

  useEffect(() => {
    let mapIndex = 0;
    mapAnimation.addListener(({value}) => {
      // animate 30% away from landing on the next item
      let index = Math.floor(value / cardWidth + 0.3);
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);
      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const {coordinate} = markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  });

  const interpolations = markers.map((_marker, id) => {
    const inputRange = [
      (id - 1) * cardWidth,
      id * cardWidth,
      (id + 1) * cardWidth,
    ];
    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: 'clamp',
    });
    return {scale};
  });

  const onMarkerPress = (e) => {
    // returns the id of the marker
    const markerID = e._targetInst.return.key;

    let x = markerID * cardWidth + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - cardInsetSpacing;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.container}
        // region={region}
        initialRegion={region}
        customMapStyle={dark ? mapDarktheme : mapStandardTheme}>
        {/* markers  */}
        {markers.map((marker, i) => {
          const scaleStyle = {
            transform: [{scale: interpolations[i].scale}],
          };
          return (
            <MapView.Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title="A title"
              description="describing the marker location"
              onPress={onMarkerPress}>
              <Animated.View style={styles.markerWrap}>
                <Animated.Image
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                  source={require('../assets/map_marker.png')}
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
      {/* text input */}
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search...."
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={styles.textInput}
        />
        <Ionicons name="ios-search" size={20} />
      </View>

      {/* categories */}
      <ScrollView
        style={styles.chipsScrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        contentInset={{
          //for ios only
          bottom: 0,
          top: 0,
          left: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === 'android' ? 20 : 0,
        }}>
        {categories.map(({name, iconName, icon: Icon, size}, i) => (
          <Pressable key={i} style={styles.chipsItem}>
            <Icon name={iconName} size={size} style={styles.chipsIcon} />
            <Text>{name}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* bootom food place card */}
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        contentInset={{
          //for ios only
          bottom: 0,
          top: 0,
          left: cardInsetSpacing,
          right: cardInsetSpacing,
        }}
        contentContainerStyle={{
          // for android
          paddingHorizontal: Platform.OS === 'android' ? cardInsetSpacing : 0,
        }}
        style={styles.scrollView}
        pagingEnabled
        // decelerationRate="fast"
        snapToInterval={cardWidth + cardInsetSpacing}
        snapToAlignment="center"
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}>
        {markers.map((marker) => (
          <View style={styles.card} key={marker.id}>
            <Image
              source={marker.image}
              resizeMode="cover"
              style={styles.cardImage}
            />
            <View style={styles.textContent}>
              <Text style={styles.cardTitle} numberOfLines={1}>
                {marker.title}
              </Text>
              <StarRating ratings={marker.rating} reviews={marker.reviews} />
              <Text style={styles.cardDescription} numberOfLines={1}>
                {marker.description}
              </Text>
              {/* button */}
              <View style={styles.button}>
                <Pressable
                  onPress={() => {}}
                  style={[
                    styles.textSign,
                    {
                      borderColor: '#ff6347',
                      borderWidth: 1,
                    },
                  ]}>
                  <Text style={[styles.signIn, {color: '#ff6347'}]}>
                    Order Now
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    padding: 0,
  },
  chipsScrollView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 90 : 80,
    paddingHorizontal: 10,
  },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    alignItems: 'center',
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - cardWidth,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 2, y: -2},
    height: cardHeight,
    width: cardWidth,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardTitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 11,
    color: '#444',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

// was in state before
// categories: [
//   {
//     name: 'Fastfood',
//     icon: (
//       <MaterialCommunityIcons
//         style={styles.chipsIcon}
//         name="food-fork-drink"
//         size={18}
//       />
//     ),
//   },
//   {
//     name: 'Restaurant',
//     icon: (
//       <Ionicons style={styles.chipsIcon} name="ios-restaurant" size={18} />
//     ),
//   },
//   {
//     name: 'Dineouts',
//     icon: (
//       <Ionicons style={styles.chipsIcon} name="md-restaurant" size={18} />
//     ),
//   },
//   {
//     name: 'Snacks Corner',
//     icon: (
//       <MaterialCommunityIcons
//         style={styles.chipsIcon}
//         name="food"
//         size={18}
//       />
//     ),
//   },
// ],
