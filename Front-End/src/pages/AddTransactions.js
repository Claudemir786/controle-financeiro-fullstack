import {View,Text,StyleSheet,TextInput, ScrollView, TouchableOpacity} from "react-native"
import Header from "../components/Header";
import CommonInput from "../components/CommonInputField";
import {Picker} from "react-native-web"
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from "react";
import { CATEGORYEXPENSES } from "../components/CategoryArray";
import { Checkbox } from "expo-checkbox";

export default function AddTransaction({navigation}){
    const[tipo,setTipo] = useState("");
    const[category,setCategory] = useState("");
    const[subCategory, setSubCategory]=useState("");
    const[date,setDate]= useState(new Date());
    const[showDate, setShowDate] = useState(false);
    const[showDateEnd, setShowDateEnd]=useState(false);
    const[dateEnd, setDateEnd] = useState(new Date());
    const[frequenc, setFreq] = useState(false);
    const[frequency, setFreqy] = useState(false);


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
    
    return(
        <View style={styles.container}>
            <Header name="Olá usuário" on={()=> navigation.navigate("profile")}/>          

            <View style={styles.body}>{/*corpo */}
                <Text style={{color:"#fff", textAlign:'center',fontSize:25}}>adicionar nova transação</Text>

                <ScrollView style={styles.form}>{/*formulário*/}

                    <Text style={styles.text}>Tipo:</Text>
                    <Picker 
                    selectedValue={tipo} 
                    onValueChange={(value)=> setTipo(value)}
                    style={styles.picker}
                    >
                        <Picker.Item label="Entrada" value="Entrada"/>
                        <Picker.Item label="Saída" value="Saída"/>
                    </Picker>
                    
                    <CommonInput name="Valor:" />{/*componente pronto */}

                    <Text style={styles.text}>Categoria:</Text>
                    <Picker 
                    selectedValue={category} 
                    onValueChange={(value)=> setCategory(value)}
                    style={styles.picker}
                    >
                        <Picker.Item label="Selecione" value=" "/>                        
                       {CATEGORYEXPENSES.map(c=>(
                        <Picker.Item 
                            key={c.categoria}
                            label={c.categoria}
                            value = {c.categoria}
                        />
                       ))
                        }                        
              
                    </Picker>
                    <Text style={styles.text}>SubCategoria:</Text>
                        <Picker
                         selectedValue={subCategory} 
                         onValueChange={(value)=> setSubCategory(value)}
                         style={styles.picker}
                        >
                            <Picker.Item label="Selecione" value=" "/>
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
                    <CommonInput name="Descrição:" />{/*componente pronto */}

                    <Text style={styles.text}>Frequência mensal:</Text>
                    <View style={{flexDirection:'row', justifyContent:"center"}}>
                        <Checkbox value={frequency} onValueChange={setFreqy} style={{padding:10}}/>    
                        <Text style={{color:"#fff",marginLeft:10, marginRight:10, fontSize:15}}>Sim</Text>
                        <Checkbox value={frequenc} onValueChange={setFreq} style={{padding:10}}/>
                        <Text style={{color:"#fff",marginLeft:10, marginRight:10,fontSize:15}}>Não</Text>                 
                    </View>
                  
                    <Text style={styles.text}>Data Inicio</Text>
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
                            <DateTimePicker value={date} mode="date" display="default" onChange={whenSelectingDataEnd} />
                          )}
                        </>
                         
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
    }
   
});