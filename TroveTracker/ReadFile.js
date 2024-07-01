import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { insertItemsFromCSV } from './Database';

const ReadFile = () => {
  const [fileName, setFileName] = useState(null);
  const [fileContents, setFileContents] = useState(''); 

  const handleBrowse = async () => {
    try {
      console.log('Selecting file...');
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('File selected:', res);

      if (res.length > 0) {
        const selectedFile = res[0];
        const fileContent = await RNFS.readFile(selectedFile.uri, 'utf8');
        console.log('File content:', fileContent);
        setFileContents(fileContent);
        setFileName(selectedFile.name);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled file picking');
      } else {
        Alert.alert('Error', 'Failed to pick file: ' + err.message || 'Unknown error');
        console.log('Error picking file:', err);
      }
    }
  };

  const handleAddItems = async () => {
    if (!fileContents) {
      Alert.alert('Error', 'No file selected');
      return;
    }
    try {
      console.log('File content to be processed:', fileContents);
      await insertItemsFromCSV(fileContents);
      Alert.alert('Success', 'Items have been added from the CSV file');
    } catch (error) {
      console.log('Error inserting items from CSV:', error);
      Alert.alert('Error', 'Failed to add items from the CSV file' + error.message || 'Unknown error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.filePath}>
        {fileName ? fileName : 'Select File'}
      </Text>
      <Button title="Browse" onPress={handleBrowse} />
      {fileName && (
        <View style={styles.spacing}>
          <Button title="Add Items" onPress={handleAddItems} />
        </View>
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
    color: 'black',
  },
  spacing: {
    marginTop: 20, // Add space between the buttons
  },
});

export default ReadFile;
