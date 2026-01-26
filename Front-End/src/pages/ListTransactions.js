import {View,Text,StyleSheet} from "react-native"
import Header from "../components/Header";

export default function ListTrnasaction({navigation}){

    return(
        <View style={styles.container}>
            <Header/>
            <Text>Lista de transações</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#006d15",
    },

});