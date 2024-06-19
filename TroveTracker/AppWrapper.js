import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screen components
import Front from './Front';
import Search from './Search';
import Input from './Input';
import ReadFile from './ReadFile';
import Delete from './Delete';
import Help from './Help';
import Results from './Results';

const Stack = createStackNavigator();

const AppWrapper = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Trove Tracker</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Front')} style={styles.button}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Input')} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ReadFile')} style={styles.button}>
          <Text style={styles.buttonText}>File</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Delete')} style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Help')} style={styles.button}>
          <Text style={styles.buttonText}>Help</Text>
        </TouchableOpacity>
      </View>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Front" component={Front} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Input" component={Input} />
        <Stack.Screen name="ReadFile" component={ReadFile} />
        <Stack.Screen name="Delete" component={Delete} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Results" component={Results} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#800080',
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 48,
    fontFamily: 'Harrington'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 0,
  },
  button: {
    backgroundColor: '#0000ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    margin: 0,
  },
});

export default AppWrapper;
