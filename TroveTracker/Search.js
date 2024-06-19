import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { searchItems } from './Database';

const Search = ({ navigation }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const handleSearch = async () => {
    if (!name.trim() && !type.trim()) {
      Alert.alert('Validation Error', 'Please enter a name or type.');
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

  const isButtonDisabled = !name.trim() && !type.trim();

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
      <Button title="Search" onPress={handleSearch} disabled={isButtonDisabled} />
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
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    color: '#000',
  },
});

export default Search;
