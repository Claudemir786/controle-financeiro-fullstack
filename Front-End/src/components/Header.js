import{Text,View,StyleSheet, TouchableOpacity} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Header({name="Olá Usuário", on}){
   

    return(
        <View style={styles.header}>{/*cabeçalho */}
            <TouchableOpacity style={{marginLeft:20, marginTop:10}} onPress={on}>
                <Ionicons name="person-circle-outline" size={80} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.titleHeader}>{name}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
     header:{        
        backgroundColor:"#006d15",
        marginBottom:15,
        
    },
    titleHeader:{
        color:"#fff",
        fontSize:18,
        marginLeft:20
    },
})