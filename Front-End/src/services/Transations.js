import { authHeader, BASE_URL } from "./User";


export async function createTransaction(type,value,category,subCategory,description,monthFrequency,startDate,endDate){
    console.log(type,value,category,subCategory,description,monthFrequency,startDate,endDate)
    try {

        //organiza as datas para ser inseridas no banco corretamente
        startDate = startDate.toISOString().slice(0,10);
        endDate = endDate.toISOString().slice(0,10)

        if(type === "Entrada"){
            category = "Entrada dinheiro";
        }

        //se a frequência for mensal a data final é desconsiderada; 
        if(monthFrequency === false){
            endDate = null;
        }
        const result = await fetch(`${BASE_URL}createT`,{
            method:'POST',
            headers:await authHeader(),
            body: JSON.stringify({type,value,category,subCategory,description,monthFrequency,startDate,endDate})
        })

        if(!result.ok)throw new Error("Falha, transação não foi adicionada ao Banco corretamente");

        return true;
        
    } catch (error) {
        console.error("Erro ao criar nova transação: ", error);
        return false;
    }
}

export async function list(){
    try {

        const result = await fetch(`${BASE_URL}info`,{
            method:'GET',
            headers: await authHeader()
        })

        if(!result.ok)throw new Error("Dados não retornaram do banco");
        //console.log("Query foi um sucesso!!");
        const res = await result.json();
        return res;
        
    } catch (error) {
        console.error("Erro ao buscar histórico de transações: ", error);
        return false;
    }
}