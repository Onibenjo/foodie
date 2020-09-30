import {StyleSheet, View} from 'react-native';

import React from 'react';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

const Layout = ({styles: style, children}) => (
  <View style={[styles.container, style]}>{children}</View>
);

export default Layout;
