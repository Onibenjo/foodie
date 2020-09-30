/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Feather from 'react-native-vector-icons/dist/Feather';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import ImageCropPicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {TextInput} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import color from '../../constants/colors';

const btnColor = color.editInfoBtn;
// const btnColor = '#FF6347';
// 0 t0 -71
function LightenDarkenColor(col, amt) {
  col = parseInt(col, 16);
  return (
    ((col & 0x0000ff) + amt) |
    ((((col >> 8) & 0x00ff) + amt) << 8) |
    (((col >> 16) + amt) << 16)
  ).toString(16);
}

let myColor = 'FF6347';
// myColor = LightenDarkenColor(myColor, -90);
// myColor = '#' + myColor;

const EditProfileScreen = () => {
  const [image, setImage] = useState(
    'https://onibenjamin.tk/img/portrait4.jpg',
  );
  const {colors} = useTheme();
  myColor = '#' + LightenDarkenColor(myColor, -7);

  const sheetRef = React.useRef(null);
  const fall = React.useRef(new Animated.Value(1)).current;

  const takePhotoFromCamera = () => {
    ImageCropPicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      setImage(image.path);
      sheetRef.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      setImage(image.path);
      sheetRef.current.snapTo(1);
    });
  };

  // scrollable body
  const renderContent = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <Pressable style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </Pressable>
      <Pressable style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </Pressable>
      <Pressable
        style={styles.panelButton}
        onPress={() => sheetRef.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </Pressable>
    </View>
  );

  // renders the non scrollable part
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <Text>Opoor</Text>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[350, 0]}
        // borderRadius={10}
        renderContent={renderContent}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <ScrollView>
        <Animated.View
          style={{
            margin: 30,
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}>
          <View style={styles.alignCenter}>
            <Pressable onPress={() => sheetRef.current.snapTo(0)}>
              <View style={styles.imageBgWrapper}>
                <ImageBackground
                  source={{
                    uri: image,
                  }}
                  style={styles.imageBg}
                  imageStyle={{borderRadius: 15}}>
                  <View style={styles.cameraWrapper}>
                    <MaterialCommunityIcons
                      name="camera"
                      size={25}
                      color="#fff"
                      style={styles.camera}
                    />
                  </View>
                </ImageBackground>
              </View>
            </Pressable>

            {/* text */}
            <Text style={styles.username}>Oni Benjo</Text>
          </View>

          {/* text input */}
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCorrect={false}
            />
          </View>
          {/* last name */}
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCorrect={false}
            />
          </View>
          {/* phone number */}
          <View style={styles.action}>
            <Feather name="phone" color={colors.text} size={20} />
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="#666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCorrect={false}
              keyboardType="number-pad"
            />
          </View>
          {/* email */}
          <View style={styles.action}>
            <FontAwesome name="envelope-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              keyboardType="email-address"
              autoCorrect={false}
            />
          </View>
          {/* country */}
          <View style={styles.action}>
            <FontAwesome name="globe" color={colors.text} size={20} />
            <TextInput
              placeholder="Country"
              placeholderTextColor="#666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCorrect={false}
            />
          </View>
          {/* city */}
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              color={colors.text}
              size={20}
            />
            <TextInput
              placeholder="City"
              placeholderTextColor="#666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCorrect={false}
            />
          </View>

          {/* button */}
          <TouchableOpacity
            onPress={() => {}}
            style={styles.commandButton}
            android_ripple={{color: myColor}}>
            <Text style={styles.panelButtonTitle}>Submit</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  username: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  alignCenter: {
    alignItems: 'center',
  },
  cameraWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    padding: 7,
  },
  imageBgWrapper: {
    width: 150,
    height: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBg: {
    width: 150,
    height: 150,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: btnColor,
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: btnColor,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
