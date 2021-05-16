import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Error = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 20
  }
});

export default Error;
