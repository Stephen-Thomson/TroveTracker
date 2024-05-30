import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { insertItemsFromCSV } from './Database';

const ReadFile = () => {
  const [filePath, setFilePath] = useState(null);

  const handleBrowse = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: ['text/csv'], // Only allow CSV files
      });
      setFilePath(res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
      } else {
        Alert.alert('Error', 'Failed to select file');
      }
    }
  };

  const handleAddItems = async () => {
    try {
      await insertItemsFromCSV(filePath);
      Alert.alert('Success', 'Items added successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to add items');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.filePath}>
        {filePath ? filePath : 'Select File'}
      </Text>
      <Button title="Browse" onPress={handleBrowse} />
      {filePath && (
        <Button title="Add Items" onPress={handleAddItems} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  filePath: {
    marginBottom: 16,
    fontSize: 16,
  },
});

export default ReadFile;
