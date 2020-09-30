import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {data} from '../model/data';
import Card from '../components/Card';
import screens from '../constants/screens';

const CardListScreen = ({navigation}) => {
  const renderItem = ({item}) => {
    return (
      <Card
        itemData={item}
        onPress={() => {
          navigation.navigate(screens.cardItemsDetails, {data: item});
        }}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CardListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
  },
});
