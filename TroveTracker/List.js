import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getAllItems } from './Database';
import { useTheme } from './ThemeContext';
import { lightTheme, darkTheme } from './themes';

const List = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const styles = getStyles(currentTheme);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const allItems = await getAllItems();
        const sortedItems = allItems.sort((a, b) => a.Name.localeCompare(b.Name));
        setItems(sortedItems);
      } catch (error) {
        console.error('Failed to retrieve items:', error);
      }
    };
    fetchItems();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.nameColumn}>
          <Text style={styles.headerText}>Name</Text>
        </View>
        <View style={styles.typeColumn}>
          <Text style={styles.headerText}>Type</Text>
        </View>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.nameColumn}>
              <Text style={styles.resultText}>{item.Name}</Text>
            </View>
            <View style={styles.typeColumn}>
              <Text style={styles.resultText}>{item.Type}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.background,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 8,
    backgroundColor: theme.itemBackground,
    borderRadius: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 8,
    backgroundColor: theme.headerBackground,
    borderRadius: 4,
  },
  headerText: {
    fontWeight: 'bold',
    color: theme.text,
  },
  resultText: {
    color: theme.text,
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

export default List;
