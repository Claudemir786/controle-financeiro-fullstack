import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import CommonInput from "../components/CommonInputField.js";
import { useState } from "react";


export default function Login({navigation}){
    const[email,setEmail] = useState(" ");
    const[password, setPassword] = useState(" ");

    function handleLogin(){
        console.log("email: ", email);
        console.log("senha: ", password);
        navigation.navigate("tabs");
    }

    function handleRegister(){
        navigation.navigate("register");
    }
    return(
        <View style={styles.container}>
         <View style={styles.title}>{/*titulo */}
            <Text style={styles.textTitle}>MyFinance</Text>
         </View>

         <View>{/*Campos input */}
             <CommonInput name="Email:" value={email}  setValue={setEmail} /> 
             <CommonInput name="Senha: " secureTextEntry={true} value={password} setValue={setPassword}/>  
         </View>
          
         <View style={styles.buttonView}>{/*botões*/}
            <TouchableOpacity style={styles.button1} onPress={()=>handleLogin()}>
                <Text style={{textAlign:'center',fontSize:20}}>Entrar</Text>
            </TouchableOpacity>

            <Text style={{color:"#006d15", fontSize:20, textAlign:'center', marginTop:"8%"}}>Não tem uma conta ainda?</Text>

            <TouchableOpacity style={styles.button2} onPress={()=> handleRegister()}>
                 <Text style={{textAlign:'center',fontSize:20, color:"#006d15"}}>Cadastre-se</Text>
            </TouchableOpacity>
         </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
       flex:1,
       backgroundColor:"#000",
        
    },
    textTitle:{
       fontSize:40,
       fontWeight:'500',
       color:'#006d15',
    },
    title:{
        height:"40%",         
        alignItems:'center',
        justifyContent:'center',   
    },
   
    button1:{
        backgroundColor:"#006d15",        
        width:"40%",
        alignSelf:'center',
        borderRadius:5,
        marginTop:"15%",
        padding:15,
        
    },
    button2:{
        backgroundColor:"#000",              
        width:"40%",
        alignSelf:'center',
        borderRadius:5,
        marginTop:"1%",
        padding:15,
       
    }
})