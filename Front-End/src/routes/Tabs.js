import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home.js";
import AddTransaction from "../pages/AddTransactions.js";
import ListTrnasaction from "../pages/ListTransactions.js";
import Ionicons from '@expo/vector-icons/Ionicons';

const TABS = createBottomTabNavigator();

export default function Tabs(){
    return(
        <TABS.Navigator 
        initialRouteName="home" 
        screenOptions={{headerShown:false, tabBarStyle:{backgroundColor:"#006d15"}, tabBarShowLabel:false}}        
        >
            <TABS.Screen
             name="home" component={Home}
             options={{
                tabBarIcon: ({focused})=>{ 
                    
                    if(focused){
                        return <Ionicons name="home" size={40} color="#fff" />  
                    }
                    return <Ionicons name="home" size={40} color="black" />                
                }
             }}
             />
            <TABS.Screen 
            name="add" component={AddTransaction}
             options={{
                tabBarIcon: ({focused})=>{
                    if(focused){
                        return <Ionicons name="add" size={50} color='#fff' />    
                    }
                    return <Ionicons name="add" size={50} color='black' />    
                }
             }}
            />
            <TABS.Screen 
            name="list" component={ListTrnasaction}
             options={{
                tabBarIcon: ({focused})=>{
                    if(focused){
                        return <Ionicons name="list" size={40} color="#fff" />
                    }
                   return <Ionicons name="list" size={40} color="black" />
                }
             }}
            />

        </TABS.Navigator>
    )
}