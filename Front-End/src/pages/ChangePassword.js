import { Text, View,StyleSheet,TouchableOpacity } from "react-native";
import Header from "../components/Header";
import CommonInput from "../components/CommonInputField";
import { useEffect, useState } from "react";
import { getName } from "../services/TokenService";
import { alterPassword } from "../services/User";

export default function ChangePassword({navigation}){
    const [name,setName] = useState("");
    const[password,setPassword] = useState("");
    const[mError, setMError] = useState(false);

    useEffect(()=>{
        readtName();
    })
    
    async function readtName() {
        const nameUser = await getName();
        setName(nameUser);
    }

    async function handleAlterPassword(){
        if(!password || password.length < 6){
            alert("Digite o campo corretamente");
        }else{

            try {
                const result = await alterPassword(password);
                console.log("Resultado foi: ", result);
                if(!result){
                    setMError(true);
                }else{
                    alert("Senha alterada com sucesso")
                    navigation.navigate("tabs")
                }
            } catch (error) {
                console.error("Falha ao modificar a senha: ", error);                
            }
        }
    }

    
    return(
          <View style={styles.container}>            
              <Header name={name} on={()=>navigation.goBack()}/>
              <View style={styles.body}>{/*corpo */}                 
                  
                  <CommonInput name="Nova senha" secureTextEntry={true} value={password} setValue={setPassword}/>
                  <TouchableOpacity
                   style={styles.button}
                   onPress={()=> handleAlterPassword()}
                   >
                      <Text style={styles.text}>Concluir</Text>
                  </TouchableOpacity>

                  {/*menssagem de erro*/}
                  {mError === true &&(
                    <>
                        <Text style={{
                        color:"red", fontSize:20, textAlign:'center', marginTop:5 }
                        }>Falha ao alterar senha</Text>
                    </>
                  )}
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