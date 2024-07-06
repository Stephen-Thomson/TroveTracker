import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { insertItem } from './Database';
import { useTheme } from './ThemeContext';
import { lightTheme, darkTheme } from './themes';

const Input = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const styles = getStyles(currentTheme);

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
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor= {theme.text}
        value={name}
        onChangeText={setName}
        maxLength={255}
      />
      <Text style={styles.label}>Type (optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Type (optional)"
        placeholderTextColor= {theme.text}
        value={type}
        onChangeText={setType}
        maxLength={255}
      />
      <Button title="Add" onPress={handleAddItem} />
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

export default Input;
