import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import React from 'react';

const KeyboardAvoidingScreen = () => {
  const [error, setError] = React.useState('');
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={styles.footer}>
          <View style={styles.flex}>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.error}>{error}</Text>
          </View>
          <TextInput placeholder="Email...." style={styles.email} />
          <Button
            title="Click me"
            onPress={() => {
              Keyboard.dismiss();
              setError('There was an error');
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default KeyboardAvoidingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: 'green',
  },
  footer: {
    padding: 40,
    backgroundColor: 'white',
  },
  email: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    height: 40,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
});
