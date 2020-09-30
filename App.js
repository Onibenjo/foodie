import React, {useEffect, useMemo, useReducer} from 'react';
import {getToken, removeToken, setToken} from './src/utils';

// import {ActivityIndicator} from 'react-native-paper';
import BookmarksScreen from './src/screens/BookmarksScreen';
import {DrawerContent} from './src/screens/DrawerContent';
import KeyboardAvoidingScreen from './src/screens/AuthScreens/KeyboardAvoidingScreen';
import Layout from './src/components/Layout';
import LottieView from 'lottie-react-native';
import MainTabScreen from './src/screens/MainTabScreen';
import OverlaySigninScreen from './src/screens/AuthScreens/OverlaySigninScreen';
import {ProvideAuth} from './src/context/auth';
import {ProvideTheme} from './src/context/theme';
import SafeAreaFix from './src/components/SafeAreaFix';
import SettingsScreen from './src/screens/SettingsScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SplashScreen from './src/screens/SplashScreen';
import {SpotifyTransition} from './src/constants/spotifyTransition';
import {StatusBar} from 'react-native';
import SupportScreen from './src/screens/SupportScreen';
// import {Provider as PaperProvider} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import screens from './src/constants/screens';

// Drawer screen
const Drawer = createDrawerNavigator();
const DrawerStackScreen = () => (
  <Drawer.Navigator
    initialRouteName="HomeDrawer"
    // drawerContent={DrawerContent}
    drawerContent={(props) => <DrawerContent {...props} />}
    screenOptions={{
      // cardOverlayEnabled: true,
      gestureEnabled: true,
    }}>
    <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
    <Drawer.Screen name={screens.support} component={SupportScreen} />
    <Drawer.Screen name={screens.settings} component={SettingsScreen} />
    <Drawer.Screen name={screens.bookmarks} component={BookmarksScreen} />
  </Drawer.Navigator>
);
// Auth screens
const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator
    headerMode="none"
    screenOptions={{
      cardOverlayEnabled: true,
      gestureEnabled: true,
    }}>
    <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
    <AuthStack.Screen name={screens.signIn} component={SignInScreen} />
    <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <AuthStack.Screen
      name={screens.keyboardAvoiding}
      component={KeyboardAvoidingScreen}
    />
    <AuthStack.Screen
      name={screens.overlaySignin}
      component={OverlaySigninScreen}
    />
  </AuthStack.Navigator>
);

//Optional -- Signin out, the signin screen slides in
//Incase u dont want that, u can do this
//disabling animation creates an
//instant jump between auth stack
const RootStack = createStackNavigator();
const RootStackScreen = ({userToken}) => (
  <RootStack.Navigator
    headerMode="none"
    screenOptions={{
      cardOverlayEnabled: true,
      gestureEnabled: true,
      ...SpotifyTransition,
    }}>
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerStackScreen}
        options={
          {
            // animationEnabled: false,
          }
        }
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={
          {
            // animationTypeForReplace: 'pop',
          }
        }
      />
    )}
  </RootStack.Navigator>
);

const initialLoginState = {
  userToken: null,
  userName: null,
  isLoading: true,
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userName: action.payload.id,
        userToken: action.payload.token,
        isLoading: false,
      };
    case 'RETRIEVE_TOKEN':
      return {...state, isLoading: false, userToken: action.payload.token};
    case 'LOGOUT':
      return {...state, userToken: null, userName: null, isLoading: false};
    case 'TOGGLE_LOADING':
      return {...state, isLoading: !state.isLoading};
    case 'REGISTER':
      return {
        ...state,
        isLoading: false,
        userName: action.payload.id,
        userToken: action.payload.token,
      };
  }
};

const App = () => {
  // const [userToken, setUserToken] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  const [state, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (user) => {
        try {
          if (!user) {
            return;
          }
          const {token, username} = user;

          await setToken(token);
          dispatch({type: 'LOGIN', payload: {id: username, token}});
        } catch (error) {
          console.log(error);
        }
      },
      signUp: async (username, password) => {
        try {
          let token = null;
          if (username && password) {
            token = 'onibenjo';
            await setToken(token);
          }
          dispatch({type: 'REGISTER', payload: {id: username, token}});
        } catch (e) {
          console.log(e);
        }
      },
      signOut: async () => {
        try {
          await removeToken();
          dispatch({type: 'LOGOUT'});
        } catch (error) {
          console.log(error);
        }
      },
      toggleLoading: () => {
        dispatch({type: 'TOGGLE_LOADING'});
      },
    }),
    [],
  );

  useEffect(() => {
    const initState = async () => {
      try {
        const token = await getToken();
        console.log(token);
        if (token !== null) {
          dispatch({type: 'RETRIEVE_TOKEN', payload: {token: token}});
        } else {
          dispatch({type: 'LOGOUT'});
        }
      } catch (e) {
        console.log({e});
        // catch error here
        // Maybe sign_out user!
      }
    };
    initState();
  }, []);

  return state.isLoading ? (
    <Layout>
      {/* <ActivityIndicator size="large" /> */}
      <LottieView
        source={require('./src/assets/lottie/rocket.json')}
        autoPlay
        loop
      />
    </Layout>
  ) : (
    <SafeAreaFix>
      <ProvideTheme>
        <StatusBar barStyle="light-content" />
        <ProvideAuth value={{...state, ...authContext}}>
          <RootStackScreen userToken={state.userToken} />
        </ProvideAuth>
      </ProvideTheme>
    </SafeAreaFix>
    // <ProvideAuth value={authContext}>
    //   <Provider theme={PaperDarkTheme}>
    //     {/* <StatusBar barStyle="light-content" /> */}
    //     <NavigationContainer theme={NavigationDarkTheme}>
    //       <RootStackScreen userToken={state.userToken} />
    //     </NavigationContainer>
    //   </Provider>
    // </ProvideAuth>
  );
};

export default App;
