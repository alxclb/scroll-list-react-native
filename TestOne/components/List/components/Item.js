import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const SIZE = Dimensions.get('window').width - 100;

const Item = ({item}) => {
  const [fileName, setFileName] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    for (let name in item.files) {
      setFileName(name);
    }
  }, [item]);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => fadeOut());
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => openCloseModal(false));
  };

  const openCloseModal = bool => {
    setIsVisible(bool);
    if(bool==true){
      fadeIn();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.press}
        onPress={() => openCloseModal(true)}>
        <Image
          style={styles.avatar}
          source={{
            uri: item.owner.avatar_url,
          }}
        />
        <Text style={styles.title}>{fileName}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isVisible}
        onRequestClose={() => openCloseModal(false)}
      >
        <TouchableOpacity
          disabled={true}
          style={styles.modal}>
          <Animated.Image
            style={{
              height: SIZE,
              width: SIZE,
              opacity: fadeAnim,
            }}
            source={{
              uri: item.owner.avatar_url,
            }}
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#FFFFFF',
    paddingLeft: 10,
    borderBottomColor: '#C8C7CC',
    borderBottomWidth: 1,
  },
  press: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    left: 25,
    fontFamily: 'Helvetica',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 17,
    color: '#000000',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Item;
