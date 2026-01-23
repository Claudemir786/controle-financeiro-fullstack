import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tabs from "./Tabs";


const STACK = createNativeStackNavigator();

export default function Stack(){
    return(
        <NavigationContainer>

            <STACK.Navigator initialRouteName="login" screenOptions={{headerShown:false}}>
                <STACK.Screen name="login" component={Login} />
                <STACK.Screen name="register" component={Register} />
                <STACK.Screen name="tabs" component={Tabs} />
            </STACK.Navigator>

        </NavigationContainer>
    )
}