// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppWrapper from './AppWrapper';
import { initDatabase } from './Database';
import { ThemeProvider } from './ThemeContext';

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
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="AppWrapper" component={AppWrapper} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
