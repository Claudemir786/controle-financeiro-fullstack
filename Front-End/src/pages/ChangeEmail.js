import { Text, View,StyleSheet,TouchableOpacity } from "react-native";
import Header from "../components/Header";
import CommonInput from "../components/CommonInputField";
import { useEffect, useState } from "react";
import { getName } from "../services/TokenService";
import { alterEmail } from "../services/User";


export default function ChangeEmail({navigation}){

    const[email,setEmail] = useState("");
    const[newEmail,setNewEmail] = useState("");
    const[name, setName] = useState("");
    const[message,setmessage] = useState(false);

    useEffect(()=>{
        readName();
    },[]);

    async function readName() {
        const nameUser = await getName();
        setName(nameUser);
    }

    async function handleAlterEmail() {
        if(email.length < 10 || newEmail.length < 10){
            alert("Preencha os dados corretamente");

        }else{

        try {
            const result = await alterEmail(newEmail,email);
            if(!result){

                alert("não foi possivel alterar email");
                setmessage(true);

            }else{

                alert("Email alterado com sucesso");
            }
            
        } catch (error) {
            console.error("Não foi possivel alterar email: ", error);

        }
    }
    }


    return(
        <View style={styles.container}>            
            <Header name={name} on={()=>navigation.goBack()}/>
            <View style={styles.body}>{/*corpo */}
                <CommonInput name="Email atual" value={email} setValue={setEmail()} />
                <CommonInput name="Novo email" value={newEmail} setValue={setNewEmail()}/>
                {message === true &&(
                    <>
                        <Text style={{
                            color:"red", fontSize:20, textAlign:'center', marginTop:5 }
                            }>Não foi possível alterar email</Text>
                    </>
                )}
                <TouchableOpacity style={styles.button} onPress={()=>handleAlterEmail()}>
                    <Text style={styles.text}>Concluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000',
        alignItems:'center'
    },
    body:{
        marginTop:100,
        width:'100%'
    },
    button:{
        marginTop:80,
        alignSelf:'center',
        backgroundColor:'#006d15',
        padding:15,
        borderRadius:15,
        width:'40%'
    }, 
    text:{
        color:'#fff',
        fontSize:25,
        textAlign:'center'
    }
})