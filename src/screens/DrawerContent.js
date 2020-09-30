import {
  Avatar,
  Caption,
  Drawer,
  Paragraph,
  Switch,
  Text,
  Title,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {StyleSheet, View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import screens from '../constants/screens';
import {useAuth} from '../context/auth';
import {useThemeContext} from '../context/theme';

export function DrawerContent(props) {
  const {signOut} = useAuth();
  const {dark} = useTheme();
  const {toggleTheme} = useThemeContext();
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {/* user information */}
          <View style={styles.userInfoSection}>
            <View style={styles.userDetails}>
              <Avatar.Image
                source={{uri: 'https://source.unsplash.com/random?lady'}}
                size={70}
              />
              <View style={styles.username}>
                <Title style={styles.title}>Benjo</Title>
                <Caption style={styles.caption}>@onibenjo</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  6
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  60
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View>
          </View>
          {/* drawer menus */}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              label="Home"
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              onPress={() => navigation.navigate(screens.home)}
            />
            <DrawerItem
              label="Profile"
              icon={({color, size}) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              onPress={() => navigation.navigate(screens.profile)}
            />
            <DrawerItem
              label="Bookmarks"
              icon={({color, size}) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              onPress={() => navigation.navigate(screens.bookmarks)}
            />
            <DrawerItem
              label="Settings"
              icon={({color, size}) => (
                <Icon name="cog-outline" color={color} size={size} />
              )}
              onPress={() => navigation.navigate(screens.settings)}
            />
            <DrawerItem
              label="Support"
              icon={({color, size}) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              onPress={() => navigation.navigate(screens.support)}
            />
          </Drawer.Section>
          {/* dark theme switch */}
          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={toggleTheme}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      {/* sign out */}
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Log Out"
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          onPress={() => signOut()}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
  },
  userDetails: {
    flexDirection: 'row',
    marginTop: 15,
  },
  username: {
    flexDirection: 'column',
    marginLeft: 15,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});
