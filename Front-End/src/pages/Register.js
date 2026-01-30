import {View,Text,StyleSheet, TouchableOpacity} from "react-native"
import CommonInput from "../components/CommonInputField.js";
import { useState } from "react";
import { UserCreate } from "../services/User.js";

export default function Register({navigation}){

    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

   async function handleRegister(){     
        if(!name || !password || !email || name.length <= 2 || email.length < 8 || password.length < 6)alert("Digite os campos corretamente");

        try{
            const result = await UserCreate(name,email,password);
            if(result){
                alert("Usuário criado com sucesso");
                navigation.navigate("login");
            }
            //console.log("resultado: ", result);
        }catch(err){
            console.error("Erro ao criar usuário novo: ", err);
            alert("Não foi possivel criar um novo usuário");
        }       
            
    }

    return(
        <View style={styles.container}>
            <View style={styles.title}>{/*titulo */}
                <Text style={styles.textTitle}>MyFinance</Text>
            </View>

            <View>{/*Campos e inputs */}
                <CommonInput name="Nome: " value={name} setValue={setName}/>
                <CommonInput name="Email: " value={email} setValue={setEmail}/>
                <CommonInput name="Senha:" secureTextEntry={true} value={password} setValue={setPassword}/>

            </View>

            <TouchableOpacity style={styles.button} onPress={()=> handleRegister()}>

                <Text  style={{textAlign:'center',fontSize:20, color:"#000"}}>Cadastrar</Text>

            </TouchableOpacity>
            
            

      </View>

    );
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
   button:{
        backgroundColor:"#006d15",        
        width:"40%",
        alignSelf:'center',
        borderRadius:5,
        marginTop:"15%",
        padding:15, 
   }
})