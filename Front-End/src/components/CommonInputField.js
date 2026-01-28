import {View, Text, TextInput, StyleSheet} from "react-native"

export default function CommonInput({name='default:',placeholder='', setValue, value, secureTextEntry}){

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{name}</Text>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                onChangeText={setValue}/*para ser usado com useStage nas paginas */
                value={value}
                secureTextEntry={secureTextEntry}/*Será true se o campo for de senha*/
               
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:"100%",        
        marginTop:5,
    },
    input:{
        borderBottomWidth:1,
        width:'65%',
        textAlign:'center',
        padding:10,
        marginTop:10,  
        marginBottom:15,   
        borderBlockColor:"#006d15",
        color:"#fff"
    },
    text:{
        fontSize:25,
        color:"#006d15",
        fontWeight:'500'
    }
}
  
)