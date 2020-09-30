import {Pressable, StyleSheet, Text} from 'react-native';

import React from 'react';

const Button = ({onPress, children, title, style, textStyle}) => (
  <Pressable onPress={onPress} style={{...styles.btnStyle, ...style}}>
    <Text style={[styles.textStyle, textStyle]}>
      {title ? title : children}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  btnStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 3,
    backgroundColor: '#007aff',
    // flex: 1,
    // alignSelf: 'stretch',
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '600',
  },
});
export default Button;
