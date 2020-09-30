/* eslint-disable react-native/no-inline-styles */
import Notification from './Notification';
import EditProfileScreen from './Profile/EditProfile';
import Explore from './Explore';
import Feather from 'react-native-vector-icons/dist/Feather';
import Home from './Home';
import Icon from 'react-native-vector-icons/dist/Ionicons';
// import MapScreen from './MapScreen';
import Profile from './Profile';
import React from 'react';
import {View} from 'react-native';
import colors from '../constants/colors';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import screens from '../constants/screens';
import {useTheme, Avatar} from 'react-native-paper';
import CardItemsDetails from './CardItemsDetails';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CardListScreen from './CardListScreen';

// Creating screen stacks
// home screens
const HomeStack = createStackNavigator();
const HomeStackScreen = ({navigation}) => {
  const {colors: color} = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: color.background,
          shadowColor: color.background, // ios
          elevation: 0, // android
        },
        headerTintColor: color.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Foodie',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                backgroundColor={color.background}
                color={color.text}
                size={25}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                marginRight: 10,
                alignItems: 'center',
              }}>
              <Icon.Button
                name="ios-search"
                backgroundColor={color.background}
                color={color.text}
                size={23}
                onPress={() => navigation.openDrawer()}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(screens.profile);
                }}
                style={{paddingHorizontal: 1}}>
                <Avatar.Image
                  source={{uri: 'https://onibenjamin.tk/img/portrait4.jpg'}}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="CardListScreen"
        component={CardListScreen}
        options={({route}) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
      <HomeStack.Screen
        name="CardItemsDetails"
        component={CardItemsDetails}
        options={({route}) => ({
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTintColor: '#Fff',
          headerTitle: false,
        })}
      />
    </HomeStack.Navigator>
  );
};
// details screens
const NotificationStack = createStackNavigator();
const NotificationStackScreen = ({navigation}) => (
  <NotificationStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.details,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <NotificationStack.Screen
      name="Notification"
      component={Notification}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            backgroundColor={colors.details}
            size={29}
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </NotificationStack.Navigator>
);
// details screens
const ProfileStack = createStackNavigator();
const ProfileStackScreen = ({navigation}) => {
  const {colors: color} = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: color.background,
          shadowColor: color.background, // ios
          elevation: 0, //android
        },
        headerTintColor: '#000',
        // headerTitleStyle: {marginLeft: 20},
        title: '',
        // headerBackTitleVisible: true,
        // headerBackTitle: 'Back',
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              backgroundColor={color.background}
              color={color.text}
              size={35}
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <Feather.Button
              name="edit"
              backgroundColor={color.background}
              color={color.text}
              size={23}
              onPress={() => navigation.navigate(screens.editProfile)}
            />
          ),
        }}
      />
      <ProfileStack.Screen
        name="Edit Profile"
        component={EditProfileScreen}
        options={{
          title: screens.editProfile,
          headerTitleAlign: 'center',
        }}
      />
    </ProfileStack.Navigator>
  );
};

// Material tabs
const MaterialTab = createMaterialBottomTabNavigator();
const MainTabScreen = () => (
  <MaterialTab.Navigator initialRouteName="Home">
    <MaterialTab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: colors.primary,
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <MaterialTab.Screen
      name="Notifications"
      component={NotificationStackScreen}
      options={{
        tabBarLabel: 'Updates',
        tabBarColor: colors.details,
        tabBarIcon: ({color}) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />
    <MaterialTab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: colors.profile,
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <MaterialTab.Screen
      name="Explore"
      // component={MapScreen}
      component={Explore}
      options={{
        tabBarLabel: 'Explore',
        tabBarColor: colors.explore,
        tabBarIcon: ({color}) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    />
  </MaterialTab.Navigator>
);

export default MainTabScreen;
