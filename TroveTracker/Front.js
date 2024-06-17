import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Front = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Trove Tracker!</Text>
      <Image source={require('./imgs/TTFront.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default Front;