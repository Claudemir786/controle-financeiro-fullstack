import { Text, View,StyleSheet,TouchableOpacity } from "react-native";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { getName, logout } from "../services/TokenService";



export default function Profile({navigation}){
    const [name,setName]= useState("");

    useEffect(()=>{
        readName();
    },[])

    async function readName() {
        const nameUser = await getName();
        setName(nameUser);
    }

    async function handleLogout() {
        await logout();
        navigation.replace("login")
    }

    
    
    return(
        <View style={styles.container}>            
            <Header name={name}/>
            <View style={styles.body}>{/*Corpo */}
                
                <View >{/*primeiro botão */}
                    <TouchableOpacity style={styles.buttonPrimary} onPress={()=> navigation.navigate("cEmail")}>
                        <Text style={styles.textButton}>Alterar Email</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop:100}}>{/*Segundo botão */}
                    <TouchableOpacity style={styles.buttonPrimary} onPress={()=> navigation.navigate("cPassword")}>
                         <Text style={styles.textButton}>Alterar Senha</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.viewButton}>{/*Tterceiro Botão(Sair) */}
                    <TouchableOpacity style={styles.buttonSecundary} onPress={()=>handleLogout()}>
                        <Text style={styles.textButton}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
        flex:1,
        alignItems:'center'
    },
    header:{
        alignSelf:'center'
    },
    body:{
        marginTop:100,
        width:'90%'
        
    },
    viewButton:{
        marginTop:200,

    },
    buttonPrimary:{
        backgroundColor:'#006d15',
        marginTop:10,
        borderRadius:20,
        padding:10,

    },
    buttonSecundary:{
        backgroundColor:'#006d15',
        borderRadius:20,
        padding:10,
        width:'50%',
        alignSelf:'center'
    },
    textButton:{
        fontSize:30,
        textAlign:'center',
        color:'#000',
    }
})