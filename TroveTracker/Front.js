import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Switch } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { setTable } from './Database';
import { useTheme } from './ThemeContext';
import { lightTheme, darkTheme } from './themes';

const Front = () => {
  const [selectedOption, setSelectedOption] = useState('Inventory');
  const { theme, toggleTheme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const styles = getStyles(currentTheme);

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
            tintColors={{ true: currentTheme.borderColor, false: currentTheme.borderColor }}
          />
          <Text style={styles.checkboxLabel}>Inventory</Text>
        </View>
        <View style={styles.checkboxWrapper}>
          <CheckBox
            value={selectedOption === 'Wanted'}
            onValueChange={() => handleCheckboxChange('Wanted')}
            tintColors={{ true: currentTheme.borderColor, false: currentTheme.borderColor }}
          />
          <Text style={styles.checkboxLabel}>Wanted</Text>
        </View>
      </View>

      <View style={styles.space} />

      <Image source={require('./imgs/TTFront.png')} style={styles.image} />

      <View style={styles.space} />

      <View style={styles.themeSwitchContainer}>
        <Text style={styles.themeSwitchLabel}>Light Mode</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          thumbColor={currentTheme.switchThumb}
          trackColor={{ false: currentTheme.switchTrackFalse, true: currentTheme.switchTrackTrue }}
        />
        <Text style={styles.themeSwitchLabel}>Dark Mode</Text>
      </View>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  text: {
    fontSize: 36,
    color: theme.text,
    fontFamily: 'Harrington Bold',
  },
  subtitle: {
    fontSize: 16,
    color: theme.text,
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
    color: theme.text,
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
  themeSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    color: theme.text,
  },
  themeSwitchLabel: {
    fontSize: 16,
    color: theme.text,
    marginHorizontal: 10,
  },
});

export default Front;
