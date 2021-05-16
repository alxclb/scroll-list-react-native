import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const ListFooter = ({isLoading}) => {
  return isLoading ? (
    <View style={styles.loader}>
      <ActivityIndicator
        color="#FFFFFF"
        size="large"
        style={{alignSelf: 'center'}}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default ListFooter;
