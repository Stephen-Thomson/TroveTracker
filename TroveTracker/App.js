// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppWrapper from './AppWrapper';
import { initDatabase } from './Database'; // Import the database initialization function

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    const initializeDB = async () => {
      try {
        await initDatabase();
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Failed to initialize database', error);
      }
    };

    initializeDB();
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="AppWrapper" component={AppWrapper} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
