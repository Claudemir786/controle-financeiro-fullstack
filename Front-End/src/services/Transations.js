import { authHeader, BASE_URL } from "./User";


export async function createTransaction(type,value,category,sub_category,description,frequency,start_date,end_Date){
    console.log(type,value,category,sub_category,description,frequency,start_date,end_Date)
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