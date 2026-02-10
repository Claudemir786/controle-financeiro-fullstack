import { registerRootComponent } from 'expo';
import Login from './src/pages/Login';
//import Stack from './src/routes/Stack';

import Stack from './src/routes/Stack';
import App from './App';
import Home from './src/pages/Home';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
