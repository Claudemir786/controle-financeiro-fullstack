import { Text, View,StyleSheet,TouchableOpacity } from "react-native";
import Header from "../components/Header";
import CommonInput from "../components/CommonInputField";

export default function ChangePassword({navigation}){

    return(
          <View style={styles.container}>            
              <Header on={()=>navigation.goBack()}/>
              <View style={styles.body}>{/*corpo */}
                  <CommonInput name="Senha atual" secureTextEntry={true} />
                  <CommonInput name="Nova senha" secureTextEntry={true}/>
                  <TouchableOpacity style={styles.button}>
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