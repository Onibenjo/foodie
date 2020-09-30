import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import React from 'react';
import StarRating from '../components/StarRating';
import Swiper from 'react-native-swiper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../constants/colors';
import screens from '../constants/screens';
import {useTheme} from 'react-native-paper';

const categories = [
  {
    id: 134,
    title: 'Restaurant',
    icon: {
      icon: Ionicons,
      name: 'ios-restaurant',
      size: 34,
    },
  },
  {
    id: 135,
    title: 'Snacks Center',
    icon: {
      icon: MaterialCommunityIcons,
      name: 'food',
      size: 35,
    },
  },
  {
    id: 136,
    title: 'Fastfood',
    icon: {
      icon: MaterialCommunityIcons,
      name: 'food-fork-drink',
      size: 35,
    },
  },
];

const height =
  Dimensions.get('window').height >= 600
    ? 250
    : Dimensions.get('window').height / 3;
console.log(Dimensions.get('window').height, height);

const Home = ({navigation}) => {
  const {dark} = useTheme();
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />

      {/* slider */}
      <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          horizontal={false}
          height={height}
          // activeDotColor={colors.editInfoBtn}
          loop
          // showsButtons
        >
          <View style={styles.slide}>
            <Image
              source={require('../assets/banners/food-banner3.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/banners/food-banner1.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={{uri: 'https://source.unsplash.com/random?beverage'}}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={{uri: 'https://source.unsplash.com/random?food'}}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={{uri: 'https://source.unsplash.com/random?snack'}}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper>
      </View>

      {/* categories */}
      <View style={styles.categoryContainer}>
        {categories.map(({id, icon, title}) => (
          <TouchableOpacity
            key={id}
            onPress={() => {
              navigation.navigate(screens.cardList, {title: title});
            }}
            style={styles.categoryBtn}>
            <View style={styles.categoryIcon}>
              <icon.icon
                name={icon.name}
                size={icon.size}
                color={colors.accentDark}
              />
            </View>
            <Text style={styles.categoryBtnTxt}>{title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/*  */}

      {/* catergories 2 */}
      <View style={[styles.categoryContainer, {marginVertical: 20}]}>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <MaterialIcons name="hotel" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Hotels</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <Ionicons name="md-restaurant" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Dineouts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <MaterialIcons name="expand-more" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Show More</Text>
        </TouchableOpacity>
      </View>

      {/* recently viewed */}
      <View style={styles.cardsWrapper}>
        <Text
          style={[
            styles.cardHeaderText,
            {
              color: dark ? '#ddd' : '#333',
            },
          ]}>
          Recently Viewed
        </Text>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={require('../assets/banners/food-banner1.jpg')}
              style={styles.cardImg}
              resizeMode="cover"
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Iya Yusuf</Text>
            <StarRating ratings={3} reviews="77" />
            <Text style={styles.cardDetails}>I love the amala</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={require('../assets/banners/food-banner5.jpg')}
              style={styles.cardImg}
              resizeMode="cover"
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>S.U.B</Text>
            <StarRating ratings={3} reviews="77" />
            <Text style={styles.cardDetails}>I love the amala</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={require('../assets/banners/food-banner1.jpg')}
              style={styles.cardImg}
              resizeMode="cover"
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Bukatee</Text>
            <StarRating ratings={1} reviews="77" />
            <Text style={styles.cardDetails}>I love the amala</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={require('../assets/banners/food-banner2.jpg')}
              style={styles.cardImg}
              resizeMode="cover"
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Iya Yusuf</Text>
            <StarRating ratings={5} reviews="77" />
            <Text style={styles.cardDetails}>I love the amala</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 5,
  },
  cardHeaderText: {
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  sliderContainer: {
    height: height,
    width: '90%',
    marginTop: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    // width: 450,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    // width: '100%',
    // width: '30%',
    minWidth: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fdeae7' /* '#FF6347' */,
    borderRadius: 10,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: colors.accentDark,
  },
  cardsWrapper: {
    marginTop: 20,
    marginBottom: 30,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    // shadowColor: '#999',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    elevation: 2,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});
