import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ListHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Gists</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F3F3F3',
    height: 28,
    justifyContent: 'center',
    paddingLeft: 16,
  },
  title: {
    fontFamily: 'Helvetica',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 17,
    color: '#000000'
  },
});

export default ListHeader;
