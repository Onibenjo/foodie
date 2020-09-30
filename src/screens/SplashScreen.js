import * as Animatable from 'react-native-animatable';

import {
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import colors from '../constants/colors';
import screens from '../constants/screens';

const SplashScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Stay connected</Text>
        <Text style={styles.text}>Sign in with your account</Text>
        <View style={styles.button}>
          <Pressable
            onPress={() => {
              navigation.navigate(screens.signIn);
            }}>
            <LinearGradient
              colors={['#88d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#Fff" sze={20} />
            </LinearGradient>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate(screens.keyboardAvoiding);
            }}>
            <LinearGradient
              colors={['#88d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Get Started 2</Text>
              <MaterialIcons name="navigate-next" color="#Fff" sze={20} />
            </LinearGradient>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate(screens.overlaySignin);
            }}>
            <LinearGradient
              colors={['#88d4c4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Get Started 3</Text>
              <MaterialIcons name="navigate-next" color="#Fff" sze={20} />
            </LinearGradient>
          </Pressable>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
const logo_height = height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: logo_height,
    height: logo_height,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
