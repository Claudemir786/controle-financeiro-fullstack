import{Text,View,StyleSheet, TouchableOpacity,FlatList} from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import Header from "../components/Header";
import { useState, useEffect } from "react";
import { readUser } from "../services/User";
import { getItemAsync } from "expo-secure-store";
import { list } from "../services/Transations";
import{useFocusEffect} from '@react-navigation/native';
import { useCallback } from "react";

//Pega o mês atual 
const month = new Date().toLocaleDateString('pt-Br',{
    month: 'long'
}).replace(/^./, l => l.toUpperCase());

//renderiza as categorias
const SpendingCategory = ({category})=>{
        return (
            <>
            
            <View style={styles.subtitles}>
                <Text style={styles.infoText}>{category?.category} </Text> 
                <Text style={styles.infoText}>{category?.total},00 R$</Text>                       
            </View>                   
             
            </>
                      
        )
}

export default function Home({navigation}){

    const [name,setName] = useState("");
    const [trasactionsResume, setTransactionsResume] = useState(null);
    const [categoryResume, setCategoryResume] = useState(null);
    

    useFocusEffect(
        useCallback(()=>{
            nameUser();//busca no banco antes 
            getTransactions();  
        },[])
    )

    async function nameUser(){
        try {
            const result = await readUser();
            if(!result){
                throw new Error("Falha ao buscar nome");
                //console.log("resultado: ", result);                
            }else{
                setName(result);
            }
            
        } catch (error) {
            console.error("erro ao utilizar o nome de usuário: ", error);            
        }
    } 

    async function getTransactions(){
        try {
            const result = await list();
            if(!list){
                //console.log("lista de trasações: ", list);
                throw new Error("falha ao buscar todas as transações do usuário");
            }else{
                //console.log("O que Retornou: ", result);
                setTransactionsResume(result.resume);
                setCategoryResume(result.category);

            }
            
        } catch (error) {
            console.error("Erro ao buscar informações de transações: ", error);
        }
    }

   
    
    return(
        <View style={styles.container}>

            <Header name={name} on={()=> navigation.navigate("profile")}/>

           <View style={styles.body}>{/*corpo*/}
             <Text style={{color:"#fff", textAlign:'center',fontSize:20}}>{month} :</Text>
          
                <View style={styles.month}>{/*Mês */}
                    <View style={styles.subtitles}>                       
                        <Text style={styles.infoText}>Saldo do Mês: </Text> 
                        <Text style={styles.infoText}>{trasactionsResume?.saldo},00 R$</Text>                       
                    </View>                   
                    <View style={styles.subtitles}>
                        <Text style={styles.infoText}>Total de saídas</Text>
                         <Text style={[styles.infoText, {color:"red"} ]}>- {trasactionsResume?.totalSaidas},00 R$</Text> 
                    </View>
                    <View style={styles.subtitles}>
                        <Text style={styles.infoText}>Total de entradas:</Text>
                         <Text style={[styles.infoText, {color:"#006d15"} ]}>{trasactionsResume?.totalEntradas},00 R$</Text> 
                    </View>                 
                    
                </View>
                    <Text style={{color:"#fff", textAlign:'center',fontSize:20, marginTop:50}}>Gastos por categoria</Text>
                <View style={styles.month}>{/*Gastos por categoria */}
                    <FlatList 
                        data={categoryResume}
                        keyExtractor={(item)=> item.category}
                        renderItem={({item})=> <SpendingCategory category={item} />}
                    />
                             

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