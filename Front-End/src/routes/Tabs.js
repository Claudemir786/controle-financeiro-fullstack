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
        screenOptions={{headerShown:false, 
            tabBarStyle:{backgroundColor:"#006d15"}
        }}
                  
        >
            <TABS.Screen
             name="home" component={Home}
             options={{
                tabBarIcon: ({focused})=>{ 
                    
                    if(focused){
                        return <Ionicons name="home" size={30} color="#fff" />  
                    }
                    return <Ionicons name="home" size={30} color="black" />                
                }
             }}
             />
            <TABS.Screen 
            name="add" component={AddTransaction}
             options={{
                tabBarIcon: ({focused})=>{
                    if(focused){
                        return <Ionicons name="add" size={30} color='#fff' />    
                    }
                    return <Ionicons name="add" size={30} color='black' />    
                }
             }}
            />
            <TABS.Screen 
            name="list" component={ListTrnasaction}
             options={{
                tabBarIcon: ({focused})=>{
                    if(focused){
                        return <Ionicons name="list" size={30} color="#fff" />
                    }
                   return <Ionicons name="list" size={30} color="black" />
                }
             }}
            />

        </TABS.Navigator>
    )
}