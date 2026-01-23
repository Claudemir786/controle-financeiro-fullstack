import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home.js";

const TABS = createBottomTabNavigator();

export default function Tabs(){
    return(
        <TABS.Navigator initialRouteName="home" screenOptions={{headerShown:false}}>
            <TABS.Screen name="home" component={Home}/>
        </TABS.Navigator>
    )
}