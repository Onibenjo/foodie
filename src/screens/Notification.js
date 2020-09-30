/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Animated,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import notifications from '../model/notifications';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';

// const width = 500;
// const width = Dimensions.get('window').width * 0.8;
const width = Dimensions.get('screen').width * 0.95;
const height = 70;

const VisibleItem = ({
  data: {item},
  rowHeightAnimatedValue,
  removeRow,
  leftActionState,
  rightActionState,
}) => {
  if (rightActionState) {
    Animated.timing(rowHeightAnimatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      removeRow();
    });
  }

  return (
    <Animated.View
      style={[
        styles.rowFront,
        {
          height: rowHeightAnimatedValue,
        },
      ]}>
      <TouchableHighlight style={styles.rowFrontVisible}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.details}>{item.details}</Text>
        </View>
      </TouchableHighlight>
    </Animated.View>
  );
};
const HiddenItemActions = ({
  onClose,
  onDelete,
  swipeAnimatedValue,
  leftActionActivated,
  rightActionActivated,
  rowActionAnimatedValue,
  rowHeightAnimatedValue,
}) => {
  if (rightActionActivated) {
    Animated.spring(rowActionAnimatedValue, {
      toValue: width,
      speed: 100,
      useNativeDriver: false,
    }).start();
  } else {
    Animated.spring(rowActionAnimatedValue, {
      toValue: 75,
      useNativeDriver: false,
    }).start();
  }
  return (
    <Animated.View
      style={[
        styles.rowBack,
        {
          height: rowHeightAnimatedValue,
        },
      ]}>
      <Text>Left</Text>
      {!leftActionActivated && (
        <TouchableOpacity
          onPress={onClose}
          style={[styles.backRightBtn, styles.backRightBtnLeft]}>
          <Icon
            name="close-circle-outline"
            size={25}
            style={styles.trash}
            color="#fff"
          />
        </TouchableOpacity>
      )}
      {!leftActionActivated && (
        <Animated.View
          style={[
            styles.backRightBtn,
            styles.backRightBtnRight,
            {
              flex: 1,
              width: rowActionAnimatedValue,
            },
          ]}>
          <TouchableOpacity
            onPress={onDelete}
            style={[styles.backRightBtn, styles.backRightBtnRight]}>
            <Animated.View
              style={[
                styles.trash,
                {
                  transform: [
                    {
                      scale: swipeAnimatedValue.interpolate({
                        inputRange: [-90, -45],
                        outputRange: [1, 0],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}>
              <Icon name="trash-can-outline" size={25} color="#fff" />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const Details = ({navigation}) => {
  const [listData, setListData] = useState(() =>
    notifications.map((item, i) => ({
      key: `${i}`,
      ...item,
    })),
  );
  const onClose = (row, id) => {
    if (row[id]) {
      row[id].closeRow();
    }
  };
  const onDelete = (row, key) => {
    onClose(row, key);
    const filteredData = listData.filter((data) => data.key !== key);
    setListData(filteredData);
  };
  const renderItem = (data, row) => {
    const rowHeightAnimatedValue = new Animated.Value(height);
    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => onDelete(row, data.item.key)}
      />
    );
  };

  const renderHiddenItem = (data, row) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(height);
    return (
      <HiddenItemActions
        data={data}
        row={row}
        onClose={() => onClose(row, data.item.key)}
        onDelete={() => onDelete(row, data.item.key)}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
      />
    );
  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const onLeftActionStatusChange = (rowKey) => {
    console.log('onLeftActionStatusChange', rowKey);
  };

  const onRightActionStatusChange = (rowKey) => {
    console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = (rowKey) => {
    console.log('onRightAction', rowKey);
    // onDelete(notifications, rowKey);
  };

  const onLeftAction = (rowKey) => {
    console.log('onLeftAction', rowKey);
  };

  return (
    <View>
      <StatusBar barStyle="light-content" />
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        // disableRightSwipe
        onRowDidOpen={onRowDidOpen}
        leftActivationValue={100}
        rightActivationValue={-200}
        leftActionValue={0}
        rightActionValue={-1 * width}
        onLeftAction={onLeftAction}
        onRightAction={onRightAction}
        onLeftActionStatusChange={onLeftActionStatusChange}
        onRightActionStatusChange={onRightActionStatusChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    // borderRadius: 5,
    height: height,
    margin: 5,
    marginBottom: 5,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: height,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
    color: '#fff',
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
});

export default Details;
