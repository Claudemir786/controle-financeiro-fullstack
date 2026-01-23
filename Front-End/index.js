import { registerRootComponent } from 'expo';

//import App from './App';
//import CommonInput from './src/components/CommonInputField';
//import IconPerson from './src/components/IconPerson';
//import Login from './src/pages/Login';
//import Register from './src/pages/Register';
import Stack from './src/routes/Stack';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Stack);
