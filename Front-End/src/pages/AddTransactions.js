import {View,Text,StyleSheet,TextInput, ScrollView, TouchableOpacity} from "react-native"
import Header from "../components/Header";
import CommonInput from "../components/CommonInputField";
import {Picker} from "react-native-web"
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from "react";
import { CATEGORYEXPENSES } from "../components/CategoryArray";
import { Checkbox } from "expo-checkbox";
import { createTransaction } from "../services/Transations";

export default function AddTransaction({navigation}){
    const[type,setType] = useState("");
    const[category,setCategory] = useState("");
    const[subCategory, setSubCategory]=useState("");
    const[date,setDate]= useState(new Date());
    const[showDate, setShowDate] = useState(false);
    const[showDateEnd, setShowDateEnd]=useState(false);
    const[dateEnd, setDateEnd] = useState(new Date());
    const[frequenc, setFreq] = useState(false);
    const[frequency, setFreqy] = useState(false);
    const[value, setValue]= useState("");
    const[description,setDescription] = useState("");
    const[error, setError] = useState(false)

    const whenSelecting = (event, dateSelect)=>{
        setShowDate(false)
        if(dateSelect){
            setDate(dateSelect);
            
        }
    }
    const whenSelectingDataEnd = (event, dataSelect)=>{
        setShowDateEnd(false);
        if(dataSelect){
            setDateEnd(dataSelect);
        }
    }

    async function handleCreate(){
        //console.log(`Dados retornados: ${type} ${value} ${category} ${subCategory} ${description}`);
        const valueFloat = parseFloat(value);
        //console.log("valor em numero: ", valueFloat);

        //Verificação de campos
        if(!type || !value || !date)alert("por favor preencha os dados corretamente");
        if(type === "Entrada")setCategory("Entrada dinheiro");

        try {
            const result = await createTransaction(type,valueFloat,category,subCategory,description,frequency,date,dateEnd)
            if(!result){               
                setError(true)//usa esse valor para renderizar a mensagem de erro na tela 
            }else{
                alert("Transação adicionada com sucesso");
                navigation.navigate("tabs");
            }            
            
        } catch (err) {
             console.error("não foi possível criar nova transação: ", err);
        }
        
        
    }
    
    return(
        <View style={styles.container}>
            <Header name="Olá usuário" on={()=> navigation.navigate("profile")}/>          

            <View style={styles.body}>{/*corpo */}
                <Text style={{color:"#fff", textAlign:'center',fontSize:25}}>adicionar nova transação</Text>

                <ScrollView style={styles.form}>{/*formulário*/}

                    {/*CAMPO DE TIPO */}
                    <Text style={styles.text}>Tipo:</Text>
                    <Picker 
                    selectedValue={type} 
                    onValueChange={(value)=> setType(value)}
                    style={styles.picker}
                    > 
                        <Picker.Item label="Selecione" />
                        <Picker.Item label="Entrada" value="Entrada"/>
                        <Picker.Item label="Saída" value="Saída"/>
                    </Picker>

                    
                    {/*CAMPO DE VALOR*/}
                    <Text style={styles.text}>Valor:</Text>
                    <TextInput
                    keyboardType="decimal-pad"
                    value={value}
                    style={styles.input}
                    onChangeText={(text) =>{
                        const clean =text.replace(/[^0-9.]/g, '');
                        setValue(clean);
                    }}
                    />

                    {/*SOMENTE SE "TIPO" FOR SAÍDA */}
                    {type === "Saída" && (
                        <>
                             <Text style={styles.text}>Categoria:</Text>
                    <Picker 
                    selectedValue={category} 
                    onValueChange={(value)=> setCategory(value)}
                    style={styles.picker}
                    >
                       <Picker.Item label="Selecione"  />                       
                       {CATEGORYEXPENSES.map(c=>(
                        <Picker.Item 
                            key={c.categoria}
                            label={c.categoria}
                            value = {c.categoria}
                        />
                       ))
                        }                        
              
                    </Picker>

                    {/*CAMPO DE SUBCATEGORIA */}
                    <Text style={styles.text}>SubCategoria:</Text>
                        <Picker.Item label="Selecione"  />
                        <Picker
                         selectedValue={subCategory} 
                         onValueChange={(v)=> setSubCategory(v)}
                         style={styles.picker}
                        >
                            
                            {CATEGORYEXPENSES
                                .filter(c => c.categoria === category)
                                .map(c =>
                                    c.itens.map(item => (
                                    <Picker.Item
                                        key={item}
                                        label={item}
                                        value={item}
                                    />
                                    ))
                                )
                           
                            }                    
                        </Picker>   
                        </>
                             
                    ) 
                        
                    }

                     {/*DESCRIÇÃO */}          
                    <CommonInput name="Descrição:" value={description} setValue={setDescription}/>{/*componente pronto */}

                    <Text style={styles.text}>Frequência mensal:</Text>
                    <View style={{flexDirection:'row', justifyContent:"center"}}>
                        <Checkbox value={frequency} onValueChange={setFreqy} style={{padding:10}}/>    
                        <Text style={{color:"#fff",marginLeft:10, marginRight:10, fontSize:15}}>Sim</Text>
                        <Checkbox value={frequenc} onValueChange={setFreq} style={{padding:10}}/>
                        <Text style={{color:"#fff",marginLeft:10, marginRight:10,fontSize:15}}>Não</Text>                 
                    </View>

                  
                    {/*DATA */}
                    <Text style={styles.text}>Data</Text>
                    <TouchableOpacity onPress={()=>setShowDate(true)}>
                        <Text style={styles.text}>{date.toLocaleDateString('pt-br')}</Text>
                    </TouchableOpacity>
                    {showDate && (
                        <DateTimePicker value={date} mode="date" display="default" onChange={whenSelecting} />
                    )}

                    {/*se o botão de sim para "frequência mensal" for escolhido*/}
                    {frequency &&(
                        <>
                         <Text style={styles.text}>Data de Encerramento:</Text>
                          <TouchableOpacity onPress={()=>setShowDateEnd(true)}>
                            <Text style={styles.text}>{date.toLocaleDateString('pt-br')}</Text>
                          </TouchableOpacity>
                          {showDateEnd &&(
                            <DateTimePicker value={dateEnd} mode="date" display="default" onChange={whenSelectingDataEnd} />
                          )}
                        </>
                         
                    )} 
                    <TouchableOpacity 
                    style={styles.button}
                    onPress={()=> handleCreate()}
                    >
                        <Text style={{color:'#fff', fontSize:25, textAlign:'center'}}>Criar</Text>
                    </TouchableOpacity> 
                    {error &&(
                        <Text style={{fontSize: 25, color: 'red', textAlign:'center'}}>
                    Não foi possível criar transação
                        </Text>
            
                    )}        
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
    form:{
        marginTop:30,
    },
    text:{
       color:"#006d15", 
       textAlign:'center',
       fontSize:25,
       marginBottom:10,
       marginTop:20,
        
    },
    picker:{
        width:"65%",        
        textAlign:'center',
        alignSelf:'center',
        padding:10,
        color:'#fff',
        backgroundColor:'#000',   
        borderRadius:8,
        borderColor:"#006d15"     
    },
    button:{
        backgroundColor:"#006d12",
        width:'50%',
        alignSelf:'center',
        marginTop:20,        
        marginBottom:50,
        borderRadius:20,
        padding:15,

    },
    input:{
        borderBottomWidth:1,
        width:'65%',
        textAlign:'center',
        padding:10,
        marginTop:10,  
        marginBottom:15,   
        borderBlockColor:"#006d15",
        color:"#fff",
        alignSelf:'center',
    }
   
});