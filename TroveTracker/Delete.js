import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { searchItems, deleteItemsByIds } from './Database';

const Delete = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSearch = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter a name.');
      return;
    }

    try {
      const searchResults = await searchItems(name.trim(), type.trim());
      setResults(searchResults);
      setSelectedIds([]);
      setName('');
      setType('');
    } catch (error) {
      console.error('Failed to search items:', error); // Log the error
      Alert.alert('Error', 'Failed to search items');
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      Alert.alert('Validation Error', 'Please select at least one item to delete.');
      return;
    }

    try {
      await deleteItemsByIds(selectedIds);
      Alert.alert('Success', 'Items deleted successfully');
      setResults([]);
      setName('');
      setType('');
      setSelectedIds([]);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete items');
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
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
      {results.length > 0 && (
  <>
    <View style={styles.headerContainer}>
      <View style={styles.checkboxColumn}>
        <Text style={styles.headerText}>Select</Text>
      </View>
      <View style={styles.nameColumn}>
        <Text style={styles.headerText}>Name</Text>
      </View>
      <View style={styles.typeColumn}>
        <Text style={styles.headerText}>Type</Text>
      </View>
    </View>
    <FlatList
      data={results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.resultContainer}>
          <View style={styles.checkboxColumn}>
            <CheckBox
              value={selectedIds.includes(item.id)}
              onValueChange={() => handleCheckboxChange(item.id)}
              tintColors={{ true: 'black', false: 'black' }}
            />
          </View>
          <View style={styles.nameColumn}>
            <Text style={styles.resultText}>{item.Name}</Text>
          </View>
          <View style={styles.typeColumn}>
            <Text style={styles.resultText}>{item.Type}</Text>
          </View>
        </View>
      )}
    />
    <Button title="Delete" onPress={handleDelete} disabled={selectedIds.length === 0} />
  </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  headerText: {
    fontWeight: 'bold',
    color: 'black',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultText: {
    color: 'black',
  },
  flatList: {
    flex: 1,
  },
  checkboxColumn: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 8,
  },
  nameColumn: {
    flex: 1,
    paddingRight: 8,
    paddingLeft: 50,
  },
  typeColumn: {
    width: 100,
    paddingRight: 8,
  },
});


export default Delete;
