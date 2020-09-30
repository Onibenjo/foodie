/* eslint-disable react-native/no-inline-styles */
import {
  Avatar,
  Caption,
  Text,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';

// import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import React from 'react';
import Share from 'react-native-share';
import files from '../../assets/filesBase64';

const Profile = ({navigation}) => {
  const handleShare = async () => {
    const shareOptions = {
      message:
        "Order your next meal. I've already ordered more than 10 jollof on it.",
      url: files.appLogo,
      // urls: [files.image1, files.image2],
    };
    try {
      const res = await Share.open(shareOptions);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* avatar and name */}
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image
            source={{uri: 'https://onibenjamin.tk/img/portrait4.jpg'}}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}>
              Oni Benjo
            </Title>
            <Caption style={styles.caption}>@onibenjo</Caption>
          </View>
        </View>
      </View>

      {/* user info */}
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="map-marker-radius"
            color="#777777"
            size={25}
          />
          <Text style={styles.infoText}>Nigeria</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="phone" color="#777777" size={25} />
          <Text style={styles.infoText}>+234 80 400 311</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="email" color="#777777" size={25} />
          <Text style={styles.infoText}>onibenjo@onibenjo.tech</Text>
        </View>
      </View>

      {/* details */}
      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, styles.borderRight]}>
          <Title>#2300</Title>
          <Caption style={styles.caption}>Wallet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>300</Title>
          <Caption style={styles.caption}>Orders</Caption>
        </View>
      </View>

      {/* menu wrapper */}
      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={26}
              color="#ff6347"
            />
            <Text style={styles.menuItemText}>Favourites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons
              name="credit-card"
              size={26}
              color="#ff6347"
            />
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={handleShare}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons
              name="share-outline"
              size={26}
              color="#ff6347"
            />
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons
              name="account-check-outline"
              size={26}
              color="#ff6347"
            />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <MaterialCommunityIcons
              name="cog-outline"
              size={26}
              color="#ff6347"
            />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  infoText: {
    color: '#777777',
    marginLeft: 20,
  },
  borderRight: {
    borderRightColor: '#dddddd',
    borderRightWidth: 1,
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  infoBoxWrapper: {
    flexDirection: 'row',
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    height: 150,
  },
  infoBox: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
