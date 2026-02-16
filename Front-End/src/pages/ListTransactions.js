import {View,Text,StyleSheet, ScrollView,FlatList} from "react-native"
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { listHistoric } from "../services/Transations";
import { getName } from "../services/TokenService";

const List = ({item})=>{

    return(
           <View style={styles.rowTrasation}>
                {/*se for entrada é verde */}
                 {item.type === 0 &&(
                    <>
                     <Text style={{color:"#fff", fontSize:20}}>{item?.category}</Text>
                    <Text style={{color:"#2fee09", fontSize:20}}>{item?.value},00 R$</Text>
                    </>
                   
                 )}
                    {/*se for saída é vermelho */}
                 {item.type === 1 &&(
                    <>
                        <Text style={{color:"#fff", fontSize:20}}>{item?.category}</Text>
                        <Text style={{color:"red", fontSize:20}}>{item?.value},00 R$</Text>
                    </>
                 )}
                
            </View>
    )
}

export default function ListTrnasaction({navigation}){

    const[list,setList] = useState(null);
    const[name,setName] = useState("");

    useEffect(()=>{
        getList();
        readName();
    },[])

    //pega o nome que foi guardado do login
    async function readName() {
        const nameUser = await getName();
        setName(nameUser);
        
    }

    async function getList() {
        try{
            const result = await listHistoric();
            //console.log("Teste do que retornou: ", result);

            //renderiza uma menssagem de erro na tela
            if(!result){
                return(
                    <>
                        <Text 
                        style={{color:'red', fontSize:30, textAlign:'center'}}>
                            Falha ao carregar lista de transações
                        </Text>
                    </>
                )
            }else{
                setList(result)                
            }

        }catch(error){
            console.error("Falha ao carregar a lista d transações: ", error);

        }    
    }


    return(
        <View style={styles.container}>
            <Header name={name}  on={()=>navigation.navigate("profile")}/>
            <View style={styles.body}>
                <Text style={{color:"#fff", textAlign:'center',fontSize:25}}>Lista de transações feitas</Text>
                <ScrollView >
                    <FlatList 
                        data={list}
                        keyExtractor={(item)=> item.category}
                        renderItem={({item})=> <List item={item} />}
                    />
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