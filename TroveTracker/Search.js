import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { searchItems } from './Database';
import { useTheme } from './ThemeContext';
import { lightTheme, darkTheme } from './themes';

const Search = ({ navigation }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const styles = getStyles(currentTheme);

  const handleSearch = async () => {
    if (!name.trim() && !type.trim()) {
      Alert.alert('Validation Error', 'Please enter a name or type.');
      return;
    }
  
    try {
      console.log('Searching for Name:', name.trim(), 'Type:', type.trim());
      const results = await searchItems(name.trim(), type.trim());
      setName('');
      setType('');
      navigation.navigate('Results', { results });
    } catch (error) {
      console.error('Search Error:', error);
      Alert.alert('Error', 'Failed to search items');
    }
  };

  const isButtonDisabled = !name.trim() && !type.trim();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        placeholderTextColor= {theme.text}
      />
      <Text style={styles.label}>Type (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter type"
        value={type}
        onChangeText={setType}
        placeholderTextColor= {theme.text}
      />
      <Button title="Search" onPress={handleSearch} disabled={isButtonDisabled} />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: theme.background,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: theme.text,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: theme.borderColor,
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    color: theme.text,
  },
});

export default Search;
