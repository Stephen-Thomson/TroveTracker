import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useTheme } from './ThemeContext';
import { lightTheme, darkTheme } from './themes';

const Results = ({ route, navigation }) => {
  const { results } = route.params;
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const styles = getStyles(currentTheme);

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

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.background,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
  },
  noResults: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: theme.text,
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  resultText: {
    fontSize: 16,
    color: theme.text,
  },
});

export default Results;
