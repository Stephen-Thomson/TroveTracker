import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Front = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Trove Tracker!</Text>
      <Image source={require('./imgs/PHIcon.png')} style={styles.image} />
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
    fontWeight: 'bold',
  },
  image: {
    width: 200, // Adjust the width and height as needed
    height: 200,
    marginTop: 20, // Add spacing between text and image
  },
});

export default Front;