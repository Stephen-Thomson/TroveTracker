import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppWrapper from './AppWrapper';

const Stack = createStackNavigator();

const App = () => {
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
