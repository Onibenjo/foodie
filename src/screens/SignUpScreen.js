/* eslint-disable react-native/no-inline-styles */
import * as Animatable from 'react-native-animatable';

import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constants/colors';
import screens from '../constants/screens';
import {useAuth} from '../context/auth';

const SignUpScreen = ({navigation}) => {
  const {signUp} = useAuth();
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };
  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirmPassword: val,
    });
  };

  const handleShowPassword = (val) => {
    if (val === 'confirm') {
      setData({
        ...data,
        confirm_secureTextEntry: !data.confirm_secureTextEntry,
      });
    } else {
      setData({
        ...data,
        secureTextEntry: !data.secureTextEntry,
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Register Now</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <ScrollView>
          <Text style={styles.textFooter}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={textInputChange}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={[styles.textFooter, styles.mt35]}>Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry}
              style={styles.textInput}
              onChangeText={handleConfirmPasswordChange}
              autoCapitalize="none"
            />
            <Pressable onPress={handleShowPassword}>
              <Feather
                name={data.secureTextEntry ? 'eye-off' : 'eye'}
                color="grey"
                size={20}
              />
            </Pressable>
          </View>
          {/* confir password */}
          <Text style={[styles.textFooter, styles.mt35]}>Confirm Password</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={data.confirm_secureTextEntry}
              style={styles.textInput}
              onChangeText={handlePasswordChange}
              autoCapitalize="none"
            />
            <Pressable onPress={() => handleShowPassword('confirm')}>
              <Feather
                name={data.confirm_secureTextEntry ? 'eye-off' : 'eye'}
                color="grey"
                size={20}
              />
            </Pressable>
          </View>
          {/* buttons */}
          <View style={styles.button}>
            <Pressable onPress={() => signUp()} style={styles.signIn}>
              <LinearGradient
                colors={['#88d4c4', '#01ab9d']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Register
                </Text>
              </LinearGradient>
            </Pressable>

            <Pressable
              onPress={() => navigation.goBack()}
              // onPress={() => navigation.navigate(screens.signIn)}
              style={[styles.signIn, styles.signUp]}>
              <Text style={styles.textSign}>Sign In</Text>
            </Pressable>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  mt35: {
    marginTop: 25,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
  footer: {
    flex: 6,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  textHeader: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  textFooter: {
    color: '#05375a',
    // fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    color: '#05375a',
    paddingLeft: 10,
  },
  button: {
    alignItems: 'center',
    marginTop: 40,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  signUp: {
    borderWidth: 1,
    marginTop: 15,
    borderColor: colors.primary,
    color: colors.primary,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
