import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

const Results = ({ route, navigation }) => {
  const { results } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Type</Text>
      </View>
      {results.length === 0 ? (
        <Text style={styles.noResults}>No match found</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{item.Name}</Text>
              <Text style={styles.resultText}>{item.Type}</Text>
            </View>
          )}
        />
      )}
      <Button title="New Search" onPress={() => navigation.navigate('Search')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  noResults: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  resultText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Results;
