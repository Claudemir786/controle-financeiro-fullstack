import {View, Text,StyleSheet, TouchableOpacity} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';

export default function IconPerson({name ="user", onPress}){

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>onPress}>
                <Ionicons name="person-circle-sharp" size={90} color="#006d15" />                
            </TouchableOpacity>
           <Text style={styles.text}>Olá {name}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        
    },
    text:{
        fontSize:23,
        color:"#ffff",
    },
    icon:{

    }
})