/* eslint-disable react-native/no-inline-styles */
import * as Animatable from 'react-native-animatable';

import {
  Alert,
  Platform,
  Pressable,
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
import Users from '../model/users';
import colors from '../constants/colors';
import screens from '../constants/screens';
import {useAuth} from '../context/auth';

const SignInScreen = ({navigation}) => {
  const {signIn, toggleLoading} = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: '',
    password: 'password',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = (val) => {
    setData({
      ...data,
      username: val,
      check_textInputChange: val.trim().length >= 4,
      isValidUser: val.trim().length >= 4,
    });
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
      isValidPassword: val.trim().length >= 8,
    });
  };

  const handleShowPassword = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const {username, password} = data;

    if (!username.length || !password.length) {
      // Vibration.vibrate(3000);
      Alert.alert('Incomplete details', 'Username and password are required', [
        {text: 'Okay'},
      ]);
      setLoading(false);
      return;
    }
    // checking for user
    const foundUser = Users.find(
      (user) => user.username === username && user.password === password,
    );
    // user not found
    if (!foundUser) {
      // Vibration.vibrate(3000);
      Alert.alert('Invalid credentials', 'Username or password is incorrect', [
        {text: 'Okay'},
      ]);
      setLoading(false);
      return;
    }
    // toggleLoading();
    await signIn(foundUser);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Welcome</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.textFooter}>Username</Text>
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
        {!data.isValidUser && (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long
            </Text>
          </Animatable.View>
        )}

        {/* password */}
        <Text style={[styles.textFooter, styles.mt35]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="Your Password"
            secureTextEntry={data.secureTextEntry}
            style={styles.textInput}
            onChangeText={handlePasswordChange}
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

        {!data.isValidPassword && (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters or longer
            </Text>
          </Animatable.View>
        )}
        <Pressable>
          <Text style={{marginTop: 5, color: colors.primary, fontSize: 12}}>
            Forgot Password?
          </Text>
        </Pressable>

        {/* buttons */}
        <View style={styles.button}>
          <Pressable style={styles.signIn} onPress={handleSubmit}>
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
                {loading ? 'Loading ....' : 'Sign In'}
              </Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate(screens.signUp)}
            style={[styles.signIn, styles.signUp]}>
            <Text style={styles.textSign}>Create An Account</Text>
          </Pressable>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  mt35: {
    marginTop: 35,
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
    flex: 4,
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
    // fontSize: 15,
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
    marginTop: 30,
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
  errorMsg: {
    color: 'rgba(255,0,0,.71)',
    fontSize: 11,
  },
});
