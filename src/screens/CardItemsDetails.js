import * as Animatable from 'react-native-animatable';

import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ImageHeaderScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {mapDarktheme, mapStandardTheme} from '../constants/map';

import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useTheme} from 'react-native-paper';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

const CardItemsDetails = ({route}) => {
  const {data} = route.params;
  const {dark, colors} = useTheme();
  const navTitleRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageHeaderScrollView
        minHeight={MIN_HEIGHT}
        maxHeight={MAX_HEIGHT}
        minOverlayOpacity={0.3}
        maxOverlayOpacity={0.6}
        renderHeader={() => {
          return <Image source={data.image} style={styles.image} />;
        }}
        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Text style={styles.imageTitle}>{data.title}</Text>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleRef}>
            <Text style={styles.navTitle}>{data.title}</Text>
          </Animatable.View>
        )}>
        <TriggeringView
          style={[
            styles.section,
            {backgroundColor: colors.background, color: colors.text},
          ]}
          onHide={() => navTitleRef.current.fadeInUp(200)}
          onDisplay={() => navTitleRef.current.fadeOut(100)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={[styles.title, {color: colors.text}]}>Overview</Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <FontAwesome name="star" size={18} color="#ff6347" />
              <Text style={{marginHorizontal: 3, color: colors.text}}>
                {data.rating}
              </Text>
              <Text style={{color: colors.text}}>({data.reviews})</Text>
            </View>
          </View>
        </TriggeringView>
        <View
          style={[
            styles.section,
            styles.sectionLarge,
            {backgroundColor: colors.background, color: colors.text},
          ]}>
          <Text style={[styles.sectionContent, {color: colors.text}]}>
            {data.description}
          </Text>
          <Text style={[styles.sectionContent, {color: colors.text}]}>
            {data.description}
          </Text>
          <Text style={[styles.sectionContent, {color: colors.text}]}>
            {data.description}
          </Text>
        </View>

        {/* section */}
        <View
          style={[
            styles.section,
            {backgroundColor: colors.background, color: colors.text},
          ]}>
          <View style={styles.categories}>
            {data.categories.map((category, i) => (
              <View style={styles.categoryContainer} key={i}>
                <FontAwesome name="tag" size={18} color="#Fff" />
                <Text style={styles.category}>{category}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* map */}
        <View
          style={[
            styles.section,
            {
              height: 350,
              backgroundColor: colors.background,
              color: colors.text,
            },
          ]}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.container}
            region={{
              latitude: data.coordinate.latitude,
              longitude: data.coordinate.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.015,
            }}
            customMapStyle={dark ? mapDarktheme : mapStandardTheme}>
            <MapView.Marker
              coordinate={data.coordinate}
              // title="A title"
              // description="describing the marker location"
              // onPress={onMarkerPress}
              // image={require('../assets/map_marker.png')}
            />
          </MapView>
        </View>
      </ImageHeaderScrollView>
    </View>
  );
};

export default CardItemsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 300,
  },
});
