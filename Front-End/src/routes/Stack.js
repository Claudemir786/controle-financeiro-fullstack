import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tabs from "./Tabs";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import AddTransaction from "../pages/AddTransactions";
import ListTrnasaction from "../pages/ListTransactions";
import Header from "../components/Header";
import ChangePassword from "../pages/ChangePassword";
import ChangeEmail from "../pages/ChangeEmail";


const STACK = createNativeStackNavigator();

export default function Stack(){
    return(
        <NavigationContainer>

            <STACK.Navigator initialRouteName="login" screenOptions={{headerShown:false}}>
                <STACK.Screen name="login" component={Login} />
                <STACK.Screen name="register" component={Register} />
                <STACK.Screen name="tabs" component={Tabs} />
                <STACK.Screen name="home" component={Home}/>
                <STACK.Screen name="profile" component={Profile}/>
                <STACK.Screen name="add" component={AddTransaction}/>
                <STACK.Screen name="list" component={ListTrnasaction}/>
                <STACK.Screen name="header" component={Header}/>
                <STACK.Screen name="cPassword" component={ChangePassword}/>
                <STACK.Screen name="cEmail" component={ChangeEmail}/>

            </STACK.Navigator>

        </NavigationContainer>
    )
}