// Input.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { insertItem } from './Database';

const Input = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const handleAddItem = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Name is required');
      return;
    }

    try {
      await insertItem(name.trim(), type.trim());
      Alert.alert('Success', 'Item added successfully');
      setName('');
      setType('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add item');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Type (optional)"
        value={type}
        onChangeText={setType}
      />
      <Button title="Add" onPress={handleAddItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default Input;
