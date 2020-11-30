/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Routes from './Routes/Routes';

// import Login from './Screens/Auth/Login';
AppRegistry.registerComponent(appName, () =>Routes);
