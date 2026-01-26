import {View,Text,StyleSheet} from "react-native"
import Header from "../components/Header";

export default function AddTransaction({navigation}){

    return(
        <View style={styles.container}>
            <Header name="Claudemir"/>
            <Text>adicionar nova transação</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#006d15",
    },
   
});