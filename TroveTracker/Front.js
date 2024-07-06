import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { setTable } from './Database';
import { useTheme } from './ThemeContext';
import { lightTheme, darkTheme } from './themes';

const Front = () => {
  const [selectedOption, setSelectedOption] = useState('Inventory');
  const { theme, toggleTheme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const styles = getStyles(currentTheme);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setTable(selectedOption);
  };

  useEffect(() => {
    setTable('Inventory');
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to</Text>
        <Text style={styles.text}>Trove Tracker</Text>
        
        <View style={styles.space} />

        <Text style={styles.subtitle}>Set which table you wish to use</Text>

        <View style={styles.radioGroup}>
          <TouchableOpacity onPress={() => handleOptionChange('Inventory')}>
            <View style={styles.radioButtonContainer}>
              <View style={styles.radioButton}>
                {selectedOption === 'Inventory' ? <View style={styles.radioButtonInner} /> : null}
              </View>
              <Text style={styles.radioLabel}>Inventory</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleOptionChange('Wanted')}>
            <View style={styles.radioButtonContainer}>
              <View style={styles.radioButton}>
                {selectedOption === 'Wanted' ? <View style={styles.radioButtonInner} /> : null}
              </View>
              <Text style={styles.radioLabel}>Wanted</Text>
            </View>
          </TouchableOpacity>
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
    </ScrollView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
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
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: theme.primary,
  },
  radioLabel: {
    color: theme.text,
  },
});

export default Front;
