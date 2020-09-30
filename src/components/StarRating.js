import {StyleSheet, Text, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import React from 'react';

const StarRating = ({ratings = 0, reviews}) => {
  // This array will contain our star tags. We will include this
  // array between the view tag.
  let stars = [];
  // Loop 5 times
  for (let i = 1; i <= 5; i++) {
    // set the path to filled stars
    let name = 'ios-star';
    // If ratings is lower, set the path to unfilled stars
    if (i > ratings) {
      name = 'ios-star-outline';
    }

    stars.push(<Ionicons name={name} size={15} style={styles.star} key={i} />);
  }

  return (
    <View style={styles.container}>
      {stars}
      <Text style={styles.text}>({reviews})</Text>
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: '#FF8C00',
  },
  text: {
    fontSize: 12,
    marginLeft: 5,
    color: '#444',
  },
});
