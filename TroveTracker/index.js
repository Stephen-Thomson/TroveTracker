import { AppRegistry } from 'react-native';
import App from './App'; // Import your App component from App.js
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App); // Register the App component