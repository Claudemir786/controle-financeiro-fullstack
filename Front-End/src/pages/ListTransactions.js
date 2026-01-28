import {View,Text,StyleSheet, ScrollView} from "react-native"
import Header from "../components/Header";

export default function ListTrnasaction({navigation}){

    return(
        <View style={styles.container}>
            <Header on={()=>navigation.navigate("profile")}/>
            <View style={styles.body}>
                <Text style={{color:"#fff", textAlign:'center',fontSize:25}}>Lista de transações</Text>
                <ScrollView>
                    <View style={styles.rowTrasation}>
                        <Text style={{color:"#fff", fontSize:20}}>Categoria 1</Text>
                        <Text style={{color:"#fff", fontSize:20}}>500,00 R$</Text>
                    </View>
                    <View style={styles.rowTrasation}>
                        <Text style={{color:"#fff", fontSize:20}}>Categoria 2</Text>
                        <Text style={{color:"#fff", fontSize:20}}>500,00 R$</Text>
                    </View>
                </ScrollView>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#006d15",
    },
    body:{
        backgroundColor:"#000",
        flex:1,
        borderTopEndRadius:30,
        borderTopStartRadius:30   

    },
    rowTrasation:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginEnd:20,
        marginStart:20
    }

});