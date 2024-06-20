import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { setTable } from './Database';

const Front = () => {
  const [selectedOption, setSelectedOption] = useState('Inventory');

  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
    setTable(option);
  };

  useEffect(() => {
    setTable('Inventory');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to</Text>
      <Text style={styles.text}>Trove Tracker</Text>
      
      <View style={styles.space} />

      <Text style={styles.subtitle}>Set which table you wish to use</Text>

      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxWrapper}>
          <CheckBox
            value={selectedOption === 'Inventory'}
            onValueChange={() => handleCheckboxChange('Inventory')}
            tintColors={{ true: '#000', false: '#000' }}
          />
          <Text style={styles.checkboxLabel}>Inventory</Text>
        </View>
        <View style={styles.checkboxWrapper}>
          <CheckBox
            value={selectedOption === 'Wanted'}
            onValueChange={() => handleCheckboxChange('Wanted')}
            tintColors={{ true: '#000', false: '#000' }}
          />
          <Text style={styles.checkboxLabel}>Wanted</Text>
        </View>
      </View>

      <View style={styles.space} />

      <Image source={require('./imgs/TTFront.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
    color: '#000',
    fontFamily: 'Harrington Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  space: {
    height: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});

export default Front;
