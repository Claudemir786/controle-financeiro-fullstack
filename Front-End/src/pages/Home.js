import{Text,View,StyleSheet, TouchableOpacity} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import Header from "../components/Header";

export default function Home({navigation}){

    
    return(
        <View style={styles.container}>

            <Header name="Claudemir" on={()=> navigation.navigate("profile")}/>

           <View style={styles.body}>{/*corpo*/}
             <Text style={{color:"#fff", textAlign:'center',fontSize:20}}>Mês de gastos:</Text>

                <View style={styles.month}>{/*Mês */}
                    <View style={styles.subtitles}>
                        <Text style={styles.infoText}>Saldo do Mês: </Text> 
                        <Text style={styles.infoText}>Valor R$</Text>                       
                    </View>                   
                    <View style={styles.subtitles}>
                        <Text style={styles.infoText}>Total de saídas</Text>
                         <Text style={styles.infoText}>Valor R$</Text> 
                    </View>
                    <View style={styles.subtitles}>
                        <Text style={styles.infoText}>Total de entradas:</Text>
                         <Text style={styles.infoText}>Valor R$</Text> 
                    </View>                 
                    
                </View>
                    <Text style={{color:"#fff", textAlign:'center',fontSize:20, marginTop:50}}>Gastos por categoria:</Text>
                <View style={styles.month}>{/*Gastos por categoria */}
                    <View style={styles.subtitles}>
                        <Text style={styles.infoText}>Categoria1 </Text> 
                        <Text style={styles.infoText}>Valor R$</Text>                       
                    </View>                   
                    <View style={styles.subtitles}>
                        <Text style={styles.infoText}>categoria2</Text>
                         <Text style={styles.infoText}>Valor R$</Text> 
                    </View>
                    <View style={styles.subtitles}>
                        <Text style={styles.infoText}>categoria3</Text>
                         <Text style={styles.infoText}>Valor R$</Text> 
                    </View>                 

                </View>
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
    month:{
        padding:10,        
    },
    
    infoText:{
        color:"#fff", 
        fontSize:20,
        marginBottom:10,
        marginTop:10,
    },
    subtitles:{
        flexDirection:'row',
        justifyContent:"space-between",
    }

})