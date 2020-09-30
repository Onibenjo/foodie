/* eslint-disable react-native/no-inline-styles */
import {
  Animated,
  CheckBox,
  Dimensions,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

const {width, height} = Dimensions.get('screen');
// const gradientColor = ['#ff0099', '#493240'];
const gradientColor = ['rgba(255,166,0,1)', 'rgba(255,99,97,1)'];
const gradientLocations = [0.147, 0.73];

const OverlaySigninScreen = () => {
  const screenAnimation = React.useRef(new Animated.Value(height)).current;
  const inputAnimation = React.useRef(new Animated.Value(0)).current;

  //wrapping the func in callback
  const AnimateContainer = React.useCallback(() => {
    Animated.timing(screenAnimation, {
      toValue: height / 3,
      duration: 1000,
      easing: Easing.elastic(1.3),
      useNativeDriver: false,
    }).start();
  }, [screenAnimation]);
  //   animate the input to keyboardview
  const AnimateInput = () => {
    Animated.timing(inputAnimation, {
      toValue: -height / 5,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };
  //  reverse animate the input to keyboardview
  const reverseAnimateInput = () => {
    Animated.timing(inputAnimation, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const AnimatedContainer = {
    height: screenAnimation,
  };
  const AnimatedInput = {
    transform: [
      {
        translateY: inputAnimation,
      },
    ],
  };

  const handleBlur = () => {
    reverseAnimateInput();
  };
  const handleFocus = () => {
    AnimateInput();
  };

  // aniating on mount
  React.useEffect(() => {
    AnimateContainer();
  }, [AnimateContainer]);

  return (
    <Animated.View style={[styles.container, AnimatedContainer]}>
      <LinearGradient
        locations={gradientLocations}
        useAngle
        angle={90}
        colors={gradientColor}
        style={[styles.centerAlign, {height: '100%'}]}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </LinearGradient>
      <View style={[styles.centerAlign, styles.content]}>
        <Animated.View style={[styles.inputContainer, AnimatedInput]}>
          <Text style={styles.signIn}>Sign In</Text>
          <View style={{marginVertical: 30}}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onBlur={handleBlur}
              onFocus={handleFocus}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flex: 0.5,
                flexDirection: 'row',
                alignItems: 'flex-start',
              }}>
              <CheckBox style={{width: 20, height: 20, borderColor: '#aaa'}} />
              <Text style={{marginLeft: 8}}>Remember Me</Text>
            </View>
            <View
              style={{
                flex: 0.5,
                alignItems: 'flex-end',
                paddingHorizontal: 5,
              }}>
              <Pressable onPress={() => {}}>
                <Text style={{marginLeft: 8}}>Forgot Password?</Text>
              </Pressable>
            </View>
          </View>
          <Pressable onPress={() => {}}>
            <LinearGradient
              locations={gradientLocations}
              useAngle
              angle={90}
              colors={gradientColor}
              style={[styles.signInBtn]}>
              <Text style={styles.textSign}>SIGN IN</Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default OverlaySigninScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height / 2,
  },
  content: {
    marginTop: 1,
    backgroundColor: 'rgba(200,200,200,0.9)',
    height: height,
  },
  centerAlign: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width / 5,
    height: width / 5,
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,1)',
    marginTop: -height / 1.5,
    borderRadius: 20,
    width: width / 1.2,
    height: height / 2,
    padding: 20,
  },
  signIn: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 0.8,
    borderColor: '#333',
    borderRadius: 20,
    width: '100%',
    padding: 10,
    marginVertical: 10,
    textAlign: 'center',
  },
  signInBtn: {
    borderRadius: 20,
    marginTop: 20,
  },
  textSign: {
    padding: 20,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
