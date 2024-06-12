import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { searchItems } from './Database'; // Ensure this function is correctly imported

const Search = ({ navigation }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const handleSearch = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter a name.');
      return;
    }

    try {
      const results = await searchItems(name.trim(), type.trim());
      setName('');
      setType('');
      navigation.navigate('Results', { results });
    } catch (error) {
      Alert.alert('Error', 'Failed to search items');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#000"
      />
      <Text style={styles.label}>Type (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter type"
        value={type}
        onChangeText={setType}
        placeholderTextColor="#000"
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    color: '#000', // Set the text color to black
  },
});

export default Search;
